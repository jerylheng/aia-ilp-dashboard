const EMBEDDED_FUNDS=[
["F001","AIA Acorns of Asia Fund","SGD"],["F002","AIA Adventurous Index Fund (USD)","USD"],["F003","AIA Adventurous Index Fund","SGD"],["F004","AIA Elite Adventurous Fund (USD)","USD"],["F005","AIA Elite Adventurous Fund","SGD"],["F006","AIA Elite Balanced Fund (USD)","USD"],["F007","AIA Elite Balanced Fund","SGD"],["F008","AIA Elite Conservative Fund (USD)","USD"],["F009","AIA Elite Conservative Fund","SGD"],["F010","AIA Emerging Markets Balanced Fund","SGD"],["F011","AIA Emerging Markets Equity Fund","SGD"],["F012","AIA European Equity Fund","SGD"],["F013","AIA Global Adventurous Income Fund","SGD"],["F014","AIA Global Balanced Fund","SGD"],["F015","AIA Global Bond Fund","SGD"],["F016","AIA Global Dynamic Income Fund","SGD"],["F017","AIA Global Equity Fund","SGD"],["F018","AIA Global Property Returns Fund","SGD"],["F019","AIA Global Technology Fund","SGD"],["F020","AIA Greater China Balanced Fund","SGD"],["F021","AIA Greater China Equity Fund","SGD"],["F022","AIA Growth Fund","SGD"],["F023","AIA India Balanced Fund","SGD"],["F024","AIA India Equity Fund","SGD"],["F025","AIA India Opportunities Fund","SGD"],["F026","AIA International Health Care Fund","SGD"],["F027","AIA Japan Balanced Fund","SGD"],["F028","AIA Japan Equity Fund","SGD"],["F029","AIA Multi Select 30","SGD"],["F030","AIA Multi Select 50","SGD"],["F031","AIA Multi Select 70","SGD"],["F032","AIA Portfolio 100","SGD"],["F033","AIA Portfolio 30","SGD"],["F034","AIA Portfolio 50","SGD"],["F035","AIA Portfolio 70","SGD"],["F036","AIA Regional Equity Fund","SGD"],["F037","AIA Regional Fixed Income Fund","SGD"],["F038","AIA S$ Money Market Fund","SGD"],["F039","AIA Shariah Global Diversified Fund","SGD"],["F040","AIA Sustainable Multi-Thematic Fund","SGD"],["F041","AIA US Equity Fund","SGD"]
].map(x=>({id:x[0],name:x[1],currency:x[2]}));

let state={tab:"dashboard",q:"",selected:"F041",data:null};

async function load(){
  try{
    const r=await fetch("./data/live.json?v=20261006-4",{cache:"no-store"});
    state.data=await r.json();
  }catch(e){
    state.data={mode:"performance_snapshot",funds:[],benchmark:null};
  }
  const snap=new Map((state.data.funds||[]).map(x=>[x.id,x]));
  state.funds=EMBEDDED_FUNDS.map(f=>({...f,...(snap.get(f.id)||{}),hasPerformance:snap.has(f.id)}));
  render();
}

const pct=v=>v==null?"—":Number(v).toFixed(2)+"%";
const selected=()=>state.funds.find(f=>f.id===state.selected)||state.funds[0];
const benchmark=()=>state.data?.benchmark||{};
function beat(v,b){return v!=null&&b!=null?v-b:null}

function dashboard(){
 const fs=state.funds, available=fs.filter(f=>f.hasPerformance).length,b=benchmark();
 return `<section class="hero"><div class="label">Published performance comparison</div><h1>AIA ILP vs S&amp;P 500</h1><p>Compare published AIA fund returns against the S&amp;P 500 Total Return. No live NAV feed is used.</p></section>
 <div class="grid">
 <div class="card"><div class="label">Funds covered</div><div class="value">${available}/${fs.length}</div></div>
 <div class="card"><div class="label">Performance date</div><div class="value">${state.data?.performance_as_of||"—"}</div></div>
 <div class="card"><div class="label">Benchmark</div><div class="value">S&amp;P 500 TR</div></div>
 <div class="card"><div class="label">Update model</div><div class="value">Published snapshot</div></div>
 </div>
 <div class="section"><h2>S&amp;P 500 Total Return</h2><div class="grid">
 <div class="card"><div class="label">1Y</div><div class="value">${pct(b.oneYear)}</div></div>
 <div class="card"><div class="label">3Y CAGR</div><div class="value">${pct(b.threeYear)}</div></div>
 <div class="card"><div class="label">5Y CAGR</div><div class="value">${pct(b.fiveYear)}</div></div>
 <div class="card"><div class="label">10Y CAGR</div><div class="value">${pct(b.tenYear)}</div></div>
 </div></div>
 <div class="section"><div class="notice">AIA fund returns are published fund-level returns, generally calculated bid-to-bid with income/dividends reinvested. Currency and measurement dates must be checked before making a like-for-like comparison.</div></div>`;
}

function fundsView(){
 const list=state.funds.filter(f=>f.name.toLowerCase().includes(state.q.toLowerCase()));
 return `<input id="fundSearch" class="search" placeholder="Search AIA funds…" value="${state.q}">
 <div class="section"><h2>${list.length} funds</h2><div class="fund-list">${list.map(f=>`<button type="button" class="fund" data-id="${f.id}"><div><div class="fund-name">${f.name}</div><div class="meta">${f.currency} · ${f.hasPerformance?"Published performance":"Performance pending"}</div></div><span class="badge">${pct(f.oneYear)}</span></button>`).join("")}</div></div>`;
}

function compare(){
 const f=selected(),b=benchmark();
 if(!f)return "<div class='notice'>No fund selected.</div>";
 const rows=[["1 Year","oneYear"],["3 Year CAGR","threeYear"],["5 Year CAGR","fiveYear"],["10 Year CAGR","tenYear"]];
 return `<section class="hero"><div class="label">Fund comparison</div><h1>${f.name}</h1><p>AIA published performance versus S&amp;P 500 Total Return for the selected period.</p></section>
 <select id="fundSelect" class="select">${state.funds.map(x=>`<option value="${x.id}" ${x.id===f.id?"selected":""}>${x.name}</option>`).join("")}</select>
 <div class="grid">${rows.map(r=>`<div class="card"><div class="label">${r[0]} — AIA</div><div class="value">${pct(f[r[1]])}</div><div class="meta">S&amp;P 500: ${pct(b[r[1]])} · Difference: ${pct(beat(f[r[1]],b[r[1]]))}</div></div>`).join("")}</div>
 <div class="section"><div class="notice">${f.hasPerformance?"Source: AIA Singapore published fund performance snapshot.":"This fund is in the 41-fund universe but its published performance has not yet been loaded into the snapshot."}</div></div>`;
}

function client(){
 const f=selected(),b=benchmark();
 return `<section class="hero"><div class="label">Client presentation mode</div><h1>${f.name}</h1><p>Historical fund performance only — not a policy return illustration.</p></section>
 <div class="grid"><div class="card"><div class="label">1Y AIA</div><div class="value">${pct(f.oneYear)}</div></div><div class="card"><div class="label">1Y S&amp;P 500 TR</div><div class="value">${pct(b.oneYear)}</div></div><div class="card"><div class="label">5Y AIA</div><div class="value">${pct(f.fiveYear)}</div></div><div class="card"><div class="label">5Y S&amp;P 500 TR</div><div class="value">${pct(b.fiveYear)}</div></div></div>
 <div class="notice">Past performance is not indicative of future performance. Fund returns do not represent the net return of an individual ILP policy after policy charges, insurance costs, premium allocation, or cash-flow timing.</div>`;
}

function render(){
 const app=document.getElementById("app"); if(!app)return;
 const body=state.tab==="dashboard"?dashboard():state.tab==="funds"?fundsView():state.tab==="compare"?compare():client();
 app.innerHTML=`<header class="top"><div class="brand">AIA ILP Performance</div><div class="sub">Published returns · Singapore</div><div class="status"><span class="dot"></span>PERFORMANCE SNAPSHOT</div></header><main class="content">${body}</main><nav class="bottom"><div class="nav">
 <button type="button" data-tab="dashboard" class="${state.tab==="dashboard"?"active":""}"><span class="icon">⌂</span>Dashboard</button>
 <button type="button" data-tab="funds" class="${state.tab==="funds"?"active":""}"><span class="icon">◫</span>Funds</button>
 <button type="button" data-tab="compare" class="${state.tab==="compare"?"active":""}"><span class="icon">⇄</span>Compare</button>
 <button type="button" data-tab="client" class="${state.tab==="client"?"active":""}"><span class="icon">◉</span>Client</button></div></nav>`;
 
 const s=document.getElementById("fundSearch");if(s)s.oninput=()=>{state.q=s.value;render()};
 
 const sel=document.getElementById("fundSelect");if(sel)sel.onchange=()=>{state.selected=sel.value;render()};
}
document.addEventListener("click",e=>{const tab=e.target.closest("[data-tab]");if(tab){e.preventDefault();state.tab=tab.dataset.tab;render();return}const fund=e.target.closest(".fund[data-id]");if(fund){e.preventDefault();state.selected=fund.dataset.id;state.tab="compare";render()}});
load();