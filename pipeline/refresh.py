import json, re, requests
from curl_cffi import requests as cf_requests
from datetime import datetime, timezone
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"data/live.json"
UNIVERSE=ROOT/"data/funds.json"
AIA_INDEX="https://www.aia.com.sg/en/our-products/save-and-invest/aia-funds-information/aia-fund-price"
YAHOO_CHART="https://query1.finance.yahoo.com/v8/finance/chart/%5ESP500TR?range=10y&interval=1d&events=div%2Csplits"
TIMEOUT=45000

def clean_num(s):
    m=re.search(r"[-+]?\d+(?:,\d{3})*(?:\.\d+)?", s.replace("%",""))
    return float(m.group(0).replace(",","")) if m else None

def performance_from_tables(page):
    tables=page.locator("table").all_inner_texts()
    for raw in tables:
        lines=[re.sub(r"\s+"," ",x).strip() for x in raw.splitlines() if x.strip()]
        for i,line in enumerate(lines):
            if "fund (bid-to-bid)" in line.lower():
                vals=[clean_num(x) for x in line.split() if clean_num(x) is not None]
                if len(vals)>=8:
                    return {"oneYear":vals[3],"threeYear":vals[4],"fiveYear":vals[5],"tenYear":vals[6],"sinceInception":vals[7]}
    return {}

def bid_price(page):
    text=page.locator("body").inner_text()
    m=re.search(r"Bid price\s+([0-9]+(?:\.[0-9]+)?)", text, re.I)
    return float(m.group(1)) if m else None

def yahoo_history():
    r=requests.get(YAHOO_CHART,timeout=30,headers={"User-Agent":"Mozilla/5.0"})
    r.raise_for_status()
    j=r.json()["chart"]["result"][0]
    q=j["indicators"]["quote"][0]
    prices=[]
    for ts,c in zip(j["timestamp"],q["close"]):
        if c is not None:
            prices.append({"date":datetime.fromtimestamp(ts,timezone.utc).date().isoformat(),"value":float(c)})
    return prices

def href_map(page):
    names=[f["name"] for f in json.loads(UNIVERSE.read_text())["funds"]]
    found={}
    for a in page.locator("a").all():
        try:
            txt=re.sub(r"\s+"," ",a.inner_text()).strip()
            href=a.get_attribute("href")
            if not href: continue
            for name in names:
                if txt==name or name in txt:
                    found[name]=("https://www.aia.com.sg"+href) if href.startswith("/") else href
        except Exception:
            pass
    return found

def main():
    universe=json.loads(UNIVERSE.read_text())["funds"]
    failures=[]
    results=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True,args=["--disable-http2"])
        page=browser.new_page()
        page.goto(AIA_INDEX,wait_until="commit",timeout=TIMEOUT)
        page.wait_for_timeout(5000)
        page.wait_for_timeout(3000)
        urls=href_map(page)
        for f in universe:
            name=f["name"]
            url=urls.get(name)
            if not url:
                failures.append({"fund":name,"message":"AIA fund URL not found on official fund index"})
                results.append({**f,"status":"Feed unavailable"})
                continue
            try:
                page.goto(url,wait_until="domcontentloaded",timeout=TIMEOUT)
                page.wait_for_timeout(2500)
                perf=performance_from_tables(page)
                latest=bid_price(page)
                if not perf and latest is None:
                    raise RuntimeError("AIA page loaded but no performance/bid values were rendered")
                results.append({**f,"latest":latest,"ytd":None,"oneYear":perf.get("oneYear"),"threeYear":perf.get("threeYear"),"fiveYear":perf.get("fiveYear"),"tenYear":perf.get("tenYear"),"sinceInception":perf.get("sinceInception"),"source_url":url,"status":"Live from AIA"})
            except Exception as e:
                failures.append({"fund":name,"message":str(e)[:300]})
                results.append({**f,"status":"Feed unavailable"})
        browser.close()
    try:
        sp=yahoo_history()
    except Exception as e:
        sp=[]
        failures.append({"fund":"S&P 500 Total Return","message":"Yahoo chart retrieval failed: "+str(e)[:250]})
    coverage=sum(1 for f in results if f.get("status")=="Live from AIA")
    live=coverage==len(universe) and len(sp)>250
    out={"generated_at":datetime.now(timezone.utc).isoformat(),"live":live,
         "coverage":{"aia_funds_live":coverage,"aia_funds_total":len(universe),"benchmark_history_points":len(sp)},
         "benchmark":{"symbol":"^SP500TR","name":"S&P 500 Total Return","currency":"USD","source":"Yahoo Finance","prices":sp},
         "funds":results,"failures":failures}
    OUT.write_text(json.dumps(out,indent=2))
    print(json.dumps({"live":live,"coverage":coverage,"total":len(universe),"sp_points":len(sp),"failures":len(failures)},indent=2))
    if coverage==0 or not sp:
        raise SystemExit("No verified live data was retrieved; refusing to publish as live.")
if __name__=="__main__":
    main()
