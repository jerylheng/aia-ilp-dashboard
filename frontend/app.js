const FALLBACK="./data/funds.json";
const EMBEDDED_FUNDS={"source":"AIA Singapore / Morningstar Quickrank","universe_as_of":"2026-10-06","live":false,"funds":[{"id":"F001","name":"AIA Acorns of Asia Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F002","name":"AIA Adventurous Index Fund (USD)","currency":"USD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F003","name":"AIA Adventurous Index Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F004","name":"AIA Elite Adventurous Fund (USD)","currency":"USD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F005","name":"AIA Elite Adventurous Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F006","name":"AIA Elite Balanced Fund (USD)","currency":"USD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F007","name":"AIA Elite Balanced Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F008","name":"AIA Elite Conservative Fund (USD)","currency":"USD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F009","name":"AIA Elite Conservative Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F010","name":"AIA Emerging Markets Balanced Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F011","name":"AIA Emerging Markets Equity Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F012","name":"AIA European Equity Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F013","name":"AIA Global Adventurous Income Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F014","name":"AIA Global Balanced Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F015","name":"AIA Global Bond Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F016","name":"AIA Global Dynamic Income Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F017","name":"AIA Global Equity Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F018","name":"AIA Global Property Returns Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F019","name":"AIA Global Technology Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F020","name":"AIA Greater China Balanced Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F021","name":"AIA Greater China Equity Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F022","name":"AIA Growth Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F023","name":"AIA India Balanced Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F024","name":"AIA India Equity Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F025","name":"AIA India Opportunities Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F026","name":"AIA International Health Care Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F027","name":"AIA Japan Balanced Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F028","name":"AIA Japan Equity Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F029","name":"AIA Multi Select 30","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F030","name":"AIA Multi Select 50","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F031","name":"AIA Multi Select 70","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F032","name":"AIA Portfolio 100","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F033","name":"AIA Portfolio 30","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F034","name":"AIA Portfolio 50","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F035","name":"AIA Portfolio 70","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F036","name":"AIA Regional Equity Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F037","name":"AIA Regional Fixed Income Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F038","name":"AIA S$ Money Market Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F039","name":"AIA Shariah Global Diversified Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F040","name":"AIA Sustainable Multi-Thematic Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"},{"id":"F041","name":"AIA US Equity Fund","currency":"SGD","latest":null,"ytd":null,"oneYear":null,"threeYear":null,"fiveYear":null,"tenYear":null,"benchmark":"Official fund benchmark","status":"Awaiting verified feed"}]};
let state={tab:"dashboard",q:"",selected:null,data:null};

async function load(){
  try{
    const r=await fetch("./data/live.json",{cache:"no-store"});
    if(!r.ok) throw new Error("live data unavailable");
    state.data=await r.json();
  }catch(e){
    try{
      const r=await fetch(FALLBACK,{cache:"no-store"});
      if(!r.ok) throw new Error("fund universe unavailable");
      state.data=await r.json();
    }catch(e2){
      state.data=EMBEDDED_FUNDS;
      state.data.coverage={aia_funds_live:0,aia_funds_total:(state.data.funds||[]).length};
      state.data.live=false;
    }
  }
  state.selected=state.data?.funds?.[0]?.id||null;
  render();
}
function funds(){return state.data?.funds||[]}
function selected(){return funds().find(f=>f.id===state.selected)||funds()[0]}
function pct(v){return v==null?"—":Number(v).toFixed(2)+"%"}
function status(){
  if(state.data?.live) return "LIVE AIA DATA";
  const c=state.data?.coverage||{};
  return c.fallback_quotes_live ? `FALLBACK LIVE ${c.fallback_quotes_live}/${c.aia_funds_total||funds().length}` : `FEED ${c.aia_funds_live||0}/${c.aia_funds_total||funds().length}`;
}
function dashboard(){
  const fs=funds(),c=state.data?.coverage||{};
  return `
    <section class="hero"><div class="label">Advisor view</div><h1>AIA ILP Performance</h1>
    <p>Singapore ILP fund dashboard with S&amp;P 500 Total Return reference data.</p></section>
    <div class="grid">
      <div class="card"><div class="label">Funds tracked</div><div class="value">${fs.length}</div></div>
      <div class="card"><div class="label">AIA verified</div><div class="value">${c.aia_funds_live||0}/${fs.length}</div></div>
      <div class="card"><div class="label">Fallback quotes</div><div class="value">${c.fallback_quotes_live||0}/${fs.length}</div></div>
      <div class="card"><div class="label">Benchmark</div><div class="value">S&amp;P 500 TR</div></div>
      <div class="card"><div class="label">Refresh</div><div class="value">Daily</div></div>
    </div>
    <div class="section"><h2>Data integrity</h2><div class="notice">Primary route: AIA Singapore/Morningstar. Fallback data is clearly labelled and is not presented as official AIA performance.</div></div>`;
}
function fundsView(){
  const list=funds().filter(f=>f.name.toLowerCase().includes(state.q.toLowerCase()));
  return `
    <input id="fundSearch" class="search" placeholder="Search AIA funds…" value="${state.q}">
    <div class="section"><h2>${list.length} funds</h2><div class="fund-list">
    ${list.map(f=>`<button class="fund" data-id="${f.id}"><div><div class="fund-name">${f.name}</div><div class="meta">${f.currency} · ${f.status}</div></div><span class="badge">${pct(f.oneYear)}</span></button>`).join("")}
    </div></div>`;
}
function compare(){
  const f=selected(); if(!f)return "<div class='notice'>No fund selected.</div>";
  return `
    <section class="hero"><div class="label">Comparison engine</div><h1>${f.name}</h1>
    <p>Fund-level performance versus S&amp;P 500 Total Return. The official fund benchmark is the primary like-for-like reference where applicable.</p></section>
    <select id="fundSelect" class="select">${funds().map(x=>`<option value="${x.id}" ${x.id===f.id?"selected":""}>${x.name}</option>`).join("")}</select>
    <div class="grid">
      <div class="card"><div class="label">1Y</div><div class="value">${pct(f.oneYear)}</div></div>
      <div class="card"><div class="label">3Y CAGR</div><div class="value">${pct(f.threeYear)}</div></div>
      <div class="card"><div class="label">5Y CAGR</div><div class="value">${pct(f.fiveYear)}</div></div>
      <div class="card"><div class="label">10Y CAGR</div><div class="value">${pct(f.tenYear)}</div></div>
      <div class="card"><div class="label">Since inception</div><div class="value">${pct(f.sinceInception)}</div></div>
      <div class="card"><div class="label">Latest bid</div><div class="value">${f.latest==null?"—":Number(f.latest).toFixed(4)}</div></div>
    </div>
    <div class="section"><h2>Source</h2><div class="notice">${f.status}. Policy-level charges and insurance costs are not included.</div></div>`;
}
function client(){
  const f=selected();
  return `<section class="hero"><div class="label">Client Presentation Mode</div><h1>${f?.name||"AIA ILP Fund"}</h1><p>Fund-level performance only. Policy charges, insurance costs and cash-flow timing are not included.</p></section>
  <div class="grid">
    <div class="card"><div class="label">1 Year</div><div class="value">${pct(f?.oneYear)}</div></div>
    <div class="card"><div class="label">5 Year CAGR</div><div class="value">${pct(f?.fiveYear)}</div></div>
    <div class="card"><div class="label">10 Year CAGR</div><div class="value">${pct(f?.tenYear)}</div></div>
    <div class="card"><div class="label">Latest bid</div><div class="value">${f?.latest==null?"—":Number(f.latest).toFixed(4)}</div></div>
  </div><div class="notice">Confirm applicable policy fees and charges before presenting policy-level outcomes.</div>`;
}
function render(){
  const app=document.getElementById("app");
  if(!app){document.body.innerHTML="<div class='notice'>Dashboard initialization error.</div>";return}
  app.innerHTML=`
    <header class="top"><div class="brand">AIA ILP Performance</div><div class="sub">Singapore · Advisor Dashboard</div><div class="status"><span class="dot"></span>${status()}</div></header>
    <main class="content">${state.tab==="dashboard"?dashboard():state.tab==="funds"?fundsView():state.tab==="compare"?compare():client()}</main>
    <nav class="bottom"><div class="nav">
      <button data-tab="dashboard" class="${state.tab==="dashboard"?"active":""}"><span class="icon">⌂</span>Dashboard</button>
      <button data-tab="funds" class="${state.tab==="funds"?"active":""}"><span class="icon">◫</span>Funds</button>
      <button data-tab="compare" class="${state.tab==="compare"?"active":""}"><span class="icon">⇄</span>Compare</button>
      <button data-tab="client" class="${state.tab==="client"?"active":""}"><span class="icon">◉</span>Client</button>
    </div></nav>`;
  document.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{state.tab=b.dataset.tab;render()});
  const search=document.getElementById("fundSearch");
  if(search) search.oninput=()=>{state.q=search.value;render()};
  document.querySelectorAll(".fund[data-id]").forEach(b=>b.onclick=()=>{state.selected=b.dataset.id;state.tab="compare";render()});
  const select=document.getElementById("fundSelect");
  if(select) select.onchange=()=>{state.selected=select.value;render()};
}
window.addEventListener("error",e=>{const app=document.getElementById("app");if(app&&!app.innerHTML.trim())app.innerHTML='<div class="notice">Dashboard loaded, but a browser error occurred. Please reload once.</div>'});
load();