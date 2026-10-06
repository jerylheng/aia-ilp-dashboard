const EMBEDDED_FUNDS=[
["F001","AIA Acorns of Asia Fund","SGD"],["F002","AIA Adventurous Index Fund (USD)","USD"],["F003","AIA Adventurous Index Fund","SGD"],["F004","AIA Elite Adventurous Fund (USD)","USD"],["F005","AIA Elite Adventurous Fund","SGD"],["F006","AIA Elite Balanced Fund (USD)","USD"],["F007","AIA Elite Balanced Fund","SGD"],["F008","AIA Elite Conservative Fund (USD)","USD"],["F009","AIA Elite Conservative Fund","SGD"],["F010","AIA Emerging Markets Balanced Fund","SGD"],["F011","AIA Emerging Markets Equity Fund","SGD"],["F012","AIA European Equity Fund","SGD"],["F013","AIA Global Adventurous Income Fund","SGD"],["F014","AIA Global Balanced Fund","SGD"],["F015","AIA Global Bond Fund","SGD"],["F016","AIA Global Dynamic Income Fund","SGD"],["F017","AIA Global Equity Fund","SGD"],["F018","AIA Global Property Returns Fund","SGD"],["F019","AIA Global Technology Fund","SGD"],["F020","AIA Greater China Balanced Fund","SGD"],["F021","AIA Greater China Equity Fund","SGD"],["F022","AIA Growth Fund","SGD"],["F023","AIA India Balanced Fund","SGD"],["F024","AIA India Equity Fund","SGD"],["F025","AIA India Opportunities Fund","SGD"],["F026","AIA International Health Care Fund","SGD"],["F027","AIA Japan Balanced Fund","SGD"],["F028","AIA Japan Equity Fund","SGD"],["F029","AIA Multi Select 30","SGD"],["F030","AIA Multi Select 50","SGD"],["F031","AIA Multi Select 70","SGD"],["F032","AIA Portfolio 100","SGD"],["F033","AIA Portfolio 30","SGD"],["F034","AIA Portfolio 50","SGD"],["F035","AIA Portfolio 70","SGD"],["F036","AIA Regional Equity Fund","SGD"],["F037","AIA Regional Fixed Income Fund","SGD"],["F038","AIA S$ Money Market Fund","SGD"],["F039","AIA Shariah Global Diversified Fund","SGD"],["F040","AIA Sustainable Multi-Thematic Fund","SGD"],["F041","AIA US Equity Fund","SGD"]
].map(x=>({id:x[0],name:x[1],currency:x[2]}));

let state={tab:"dashboard",q:"",selected:"F041",data:null,projection:{initial:100000,startYear:new Date().getFullYear(),contribution:1000,frequency:"monthly",years:10,aiaReturn:null,spReturn:null}};

async function load(){
  try{
    const r=await fetch("./data/live.json?v=20261006-7",{cache:"no-store"});
    state.data=await r.json();
  }catch(e){
    state.data={mode:"performance_snapshot",funds:[],benchmark:null};
  }
  const snap=new Map((state.data.funds||[]).map(x=>[x.id,x]));
  state.funds=EMBEDDED_FUNDS.map(f=>({...f,...(snap.get(f.id)||{}),hasPerformance:snap.has(f.id)}));
  render();
}

const pct=v=>v==null?"—":Number(v).toFixed(2)+"%";
const money=v=>Number.isFinite(v)?new Intl.NumberFormat("en-SG",{style:"currency",currency:"SGD",maximumFractionDigits:0}).format(v):"—";
function esc(v){return String(v??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
function num(id,fallback,min=0,max=1000000000){const el=document.getElementById(id);const n=el?Number(el.value):fallback;return Number.isFinite(n)?Math.min(max,Math.max(min,n)):fallback}
const selected=()=>state.funds.find(f=>f.id===state.selected)||state.funds[0];
const benchmark=()=>state.data?.benchmark||{};
function beat(v,b){return v!=null&&b!=null?v-b:null}

function dashboard(){
 const fs=state.funds,available=fs.filter(f=>f.hasPerformance).length,latestCoverage=fs.filter(f=>f.hasPerformance&&f.asOf===state.data?.latest_published_as_of).length,b=benchmark();
 const latest=state.data?.latest_published_as_of||state.data?.performance_as_of||"—";
 return `<section class="hero"><div class="label">AIA published performance comparison</div><h1>AIA ILP vs S&amp;P 500</h1><p>Compare published AIA fund returns against the S&amp;P 500 Total Return. Use Projection to model a client’s contributions and an assumed return rate.</p></section>
 <div class="grid">
 <div class="card"><div class="label">Funds with data</div><div class="value">${available}/${fs.length}</div></div>
 <div class="card"><div class="label">Latest-date coverage</div><div class="value">${latestCoverage}/${fs.length}</div></div>
 <div class="card"><div class="label">Latest published data</div><div class="value">${latest}</div></div>
 <div class="card"><div class="label">Benchmark</div><div class="value">S&amp;P 500 TR</div></div>
 </div>
 <div class="section"><h2>S&amp;P 500 Total Return</h2><div class="grid">
 <div class="card"><div class="label">1Y</div><div class="value">${pct(b.oneYear)}</div></div>
 <div class="card"><div class="label">3Y CAGR</div><div class="value">${pct(b.threeYear)}</div></div>
 <div class="card"><div class="label">5Y CAGR</div><div class="value">${pct(b.fiveYear)}</div></div>
 <div class="card"><div class="label">10Y CAGR</div><div class="value">${pct(b.tenYear)}</div></div>
 </div></div>
 <div class="section"><div class="notice">AIA fund returns are published fund-level returns, generally calculated bid-to-bid with income/dividends reinvested. Each fund carries its own <strong>as-of date</strong> so older fallback data is not presented as current.</div></div>`;
}
function fundsView(){
 const list=state.funds.filter(f=>f.name.toLowerCase().includes(state.q.toLowerCase()));
 return `<input id="fundSearch" class="search" placeholder="Search AIA funds…" value="${esc(state.q)}">
 <div class="section"><h2>${list.length} funds</h2><div class="fund-list">${list.map(f=>`<button type="button" class="fund" data-id="${f.id}"><div><div class="fund-name">${esc(f.name)}</div><div class="meta">${f.currency} · ${f.hasPerformance?`As of ${esc(f.asOf||state.data?.performance_as_of||"—")}`:"Performance pending"}</div></div><span class="badge">${pct(f.oneYear)}</span></button>`).join("")}</div></div>`;
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

function projectionInputs(f,b){
 const p=state.projection;
 const defaultAia=f?.fiveYear!=null?Number(f.fiveYear):null;
 const defaultSp=b?.fiveYear!=null?Number(b.fiveYear):null;
 if(p.aiaReturn==null&&defaultAia!=null)p.aiaReturn=defaultAia;
 if(p.spReturn==null&&defaultSp!=null)p.spReturn=defaultSp;
 return `<div class="projection-grid">
 <label>Starting amount<input id="pInitial" type="number" min="0" step="1000" value="${p.initial}"></label>
 <label>Starting year<input id="pStart" type="number" min="1900" max="2100" step="1" value="${p.startYear}"></label>
 <label>Additional contribution<input id="pContribution" type="number" min="0" step="100" value="${p.contribution}"></label>
 <label>Contribution frequency<select id="pFrequency"><option value="monthly" ${p.frequency==="monthly"?"selected":""}>Monthly</option><option value="yearly" ${p.frequency==="yearly"?"selected":""}>Yearly</option></select></label>
 <label>Projection period<input id="pYears" type="number" min="1" max="60" step="1" value="${p.years}"></label>
 <label>AIA expected return<input id="pAiaReturn" type="number" step="0.1" value="${p.aiaReturn??""}" placeholder="e.g. 8"></label>
 <label>S&amp;P 500 expected return<input id="pSpReturn" type="number" step="0.1" value="${p.spReturn??""}" placeholder="e.g. 8"></label>
 </div>`;
}

function simulate(initial,contribution,frequency,years,aiaRate,spRate,startYear){
 const monthly=frequency==="monthly";
 const steps=monthly?years*12:years;
 const aiaM=monthly?Math.pow(1+aiaRate/100,1/12)-1:null;
 const spM=monthly?Math.pow(1+spRate/100,1/12)-1:null;
 let aia=initial,sp=initial,total=initial;
 const rows=[{year:startYear,aia,sp,total}];
 for(let step=1;step<=steps;step++){
   if(monthly){aia*=1+aiaM;sp*=1+spM;aia+=contribution;sp+=contribution;total+=contribution;}
   else{aia*=1+aiaRate/100;sp*=1+spRate/100;aia+=contribution;sp+=contribution;total+=contribution;}
   if(step%(monthly?12:1)===0)rows.push({year:startYear+step/(monthly?12:1),aia,sp,total});
 }
 return rows;
}

function chartSvg(rows){
 const w=900,h=360,pad={l:64,r:24,t:24,b:46};
 const vals=rows.flatMap(r=>[r.aia,r.sp,r.total]);
 const max=Math.max(...vals,1),min=0;
 const x=i=>pad.l+(w-pad.l-pad.r)*(i/(rows.length-1||1));
 const y=v=>h-pad.b-(h-pad.t-pad.b)*((v-min)/(max-min));
 const path=k=>rows.map((r,i)=>`${i?"L":"M"}${x(i).toFixed(1)},${y(r[k]).toFixed(1)}`).join(" ");
 const grid=[0,.25,.5,.75,1].map(t=>{const yy=y(max*t);return `<line x1="${pad.l}" y1="${yy}" x2="${w-pad.r}" y2="${yy}" class="chart-grid"/><text x="${pad.l-8}" y="${yy+4}" text-anchor="end" class="chart-axis">${money(max*t)}</text>`}).join("");
 const labels=rows.map((r,i)=>{if(rows.length>12&&i%Math.ceil(rows.length/8)!==0&&i!==rows.length-1)return "";return `<text x="${x(i)}" y="${h-18}" text-anchor="middle" class="chart-axis">${Math.round(r.year)}</text>`}).join("");
 return `<div class="chart-wrap"><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Projected portfolio values over time"><g>${grid}${labels}<path d="${path("aia")}" class="chart-line chart-aia"/><path d="${path("sp")}" class="chart-line chart-sp"/><path d="${path("total")}" class="chart-line chart-contrib"/></g></svg><div class="legend"><span><i class="legend-dot aia"></i>AIA fund</span><span><i class="legend-dot sp"></i>S&amp;P 500</span><span><i class="legend-dot contrib"></i>Total contributions</span></div></div>`;
}

function projection(){
 const f=selected(),b=benchmark(),p=state.projection;
 if(p.aiaReturn==null&&f?.fiveYear!=null)p.aiaReturn=Number(f.fiveYear);
 if(p.spReturn==null&&b?.fiveYear!=null)p.spReturn=Number(b.fiveYear);
 const aiaRate=Number(p.aiaReturn),spRate=Number(p.spReturn);
 const valid=[p.initial,p.startYear,p.contribution,p.years,aiaRate,spRate].every(Number.isFinite)&&p.initial>=0&&p.startYear>=1900&&p.startYear<=2100&&p.contribution>=0&&p.years>=1&&p.years<=60&&aiaRate>-100&&spRate>-100;
 if(!valid)return `<section class="hero"><div class="label">Client projection</div><h1>Investment projection</h1><p>Enter a starting amount, contributions and assumed returns to compare the selected AIA fund with the S&amp;P 500.</p></section>${projectionInputs(f,b)}<div class="notice">Please enter valid amounts, years and expected return assumptions.</div>`;
 const rows=simulate(p.initial,p.contribution,p.frequency,p.years,aiaRate,spRate,p.startYear);
 const last=rows[rows.length-1],gainA=last.aia-last.total,gainS=last.sp-last.total;
 return `<section class="hero"><div class="label">Client projection</div><h1>${esc(f?.name||"AIA fund")} vs S&amp;P 500</h1><p>Illustrative future-value model using your assumed returns. This is not a policy benefit illustration or a guaranteed return.</p></section>
 <div class="section"><h2>1. Set the scenario</h2>${projectionInputs(f,b)}<button type="button" class="primary" id="recalculate">Calculate projection</button></div>
 <div class="grid projection-summary">
 <div class="card"><div class="label">Total contributions</div><div class="value">${money(last.total)}</div></div>
 <div class="card"><div class="label">AIA projected value</div><div class="value">${money(last.aia)}</div><div class="meta">${pct(aiaRate)} assumed · gain ${money(gainA)}</div></div>
 <div class="card"><div class="label">S&amp;P 500 projected value</div><div class="value">${money(last.sp)}</div><div class="meta">${pct(spRate)} assumed · gain ${money(gainS)}</div></div>
 <div class="card"><div class="label">Projection end</div><div class="value">${Math.round(last.year)}</div><div class="meta">${p.frequency} contributions</div></div>
 </div>
 <div class="section"><h2>2. Projected growth</h2>${chartSvg(rows)}</div>
 <div class="section"><div class="notice"><strong>Important:</strong> Expected return is an assumption you control. AIA fund historical performance is not a forecast. The model does not include policy charges, insurance costs, premium allocation differences, taxes, inflation, or market volatility. S&amp;P 500 figures are shown for comparison only and are not a like-for-like benchmark for every AIA fund.</div></div>`;
}

function client(){
 const f=selected(),b=benchmark();
 return `<section class="hero"><div class="label">Client presentation mode</div><h1>${esc(f.name)}</h1><p>Historical fund performance only — not a policy return illustration.</p></section>
 <div class="grid"><div class="card"><div class="label">1Y AIA</div><div class="value">${pct(f.oneYear)}</div></div><div class="card"><div class="label">1Y S&amp;P 500 TR</div><div class="value">${pct(b.oneYear)}</div></div><div class="card"><div class="label">5Y AIA</div><div class="value">${pct(f.fiveYear)}</div></div><div class="card"><div class="label">5Y S&amp;P 500 TR</div><div class="value">${pct(b.fiveYear)}</div></div></div>
 <div class="notice">Past performance is not indicative of future performance. Fund returns do not represent the net return of an individual ILP policy after policy charges, insurance costs, premium allocation, or cash-flow timing.</div>`;
}

function render(){
 const app=document.getElementById("app"); if(!app)return;
 const body=state.tab==="dashboard"?dashboard():state.tab==="funds"?fundsView():state.tab==="compare"?compare():state.tab==="projection"?projection():client();
 app.innerHTML=`<header class="top"><div class="brand">AIA ILP Performance</div><div class="sub">Published returns · Singapore</div><div class="status"><span class="dot"></span>PERFORMANCE SNAPSHOT</div></header><main class="content">${body}</main><nav class="bottom"><div class="nav">
 <button type="button" data-tab="dashboard" class="${state.tab==="dashboard"?"active":""}"><span class="icon">⌂</span>Dashboard</button>
 <button type="button" data-tab="funds" class="${state.tab==="funds"?"active":""}"><span class="icon">◫</span>Funds</button>
 <button type="button" data-tab="compare" class="${state.tab==="compare"?"active":""}"><span class="icon">⇄</span>Compare</button>
 <button type="button" data-tab="projection" class="${state.tab==="projection"?"active":""}"><span class="icon">↗</span>Project</button>\n <button type="button" data-tab="client" class="${state.tab==="client"?"active":""}"><span class="icon">◉</span>Client</button></div></nav>`;
 
 const s=document.getElementById("fundSearch");if(s)s.oninput=()=>{state.q=s.value;render()};
 
 const sel=document.getElementById("fundSelect");if(sel)sel.onchange=()=>{state.selected=sel.value;state.projection.aiaReturn=null;render()};
 const recalc=document.getElementById("recalculate");if(recalc)recalc.onclick=()=>{state.projection.initial=num("pInitial",state.projection.initial);state.projection.startYear=num("pStart",state.projection.startYear,1900,2100);state.projection.contribution=num("pContribution",state.projection.contribution);state.projection.years=num("pYears",state.projection.years,1,60);state.projection.aiaReturn=num("pAiaReturn",state.projection.aiaReturn??0,-99.9,100);state.projection.spReturn=num("pSpReturn",state.projection.spReturn??0,-99.9,100);render()};
 const freq=document.getElementById("pFrequency");if(freq)freq.onchange=()=>{state.projection.frequency=freq.value;render()};
}
document.addEventListener("click",e=>{const tab=e.target.closest("[data-tab]");if(tab){e.preventDefault();state.tab=tab.dataset.tab;render();return}const fund=e.target.closest(".fund[data-id]");if(fund){e.preventDefault();state.selected=fund.dataset.id;state.tab="compare";render()}});
load();