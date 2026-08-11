/* =========================================================
    นวดแป้งโมจิ (Mochi Kneader) 
   ========================================================= */

// ---------- 1) STATE ----------
const state = {
  flour: 0,        // จำนวนแรงนวดโมจิที่มี (currency)
  clickPower: 1,    // ได้แรงนวดกี่หน่วยต่อการคลิก 1 ครั้ง
  totalCps: 0       // แรงนวดที่ผลิตอัตโนมัติต่อวินาที
};

// ---------- ไอคอน ----------
const ICONS = {
  hands:   `<img src="./hands.png" alt="มือน้อยช่วยนวด">`,
  mortar:  `<img src="./mortar.png" alt="ครกไม้โบราณ">`,
  crank:   `<img src="./crank.png" alt="เครื่องนวดมือหมุน">`,
  workshop:`<img src="./shop.png" alt="โรงงานโมจิเล็ก ๆ">`,
  factory: `<img src="./factory.png" alt="โรงงานอุตสาหกรรมโมจิ">`
};

// รายการอุปกรณ์ ผู้ช่วย (ปรับราคาถูกลง เล่นง่าย ตัวเลขไม่โดด)
const buildings = [
  { id: "hands",   icon: ICONS.hands,   name: "มือน้อยช่วยนวด",         desc: "เพื่อนบ้านมาช่วยนวดให้",   baseCost: 10,   cps: 1,   owned: 0 },
  { id: "mortar",  icon: ICONS.mortar,  name: "ครกไม้โบราณ",             desc: "นวดแป้งแบบดั้งเดิม",       baseCost: 30,   cps: 3,   owned: 0 },
  { id: "crank",   icon: ICONS.crank,   name: "เครื่องนวดมือหมุน",       desc: "หมุนได้เร็วกว่าแรงมือ",    baseCost: 100,  cps: 8,   owned: 0 },
  { id: "workshop",icon: ICONS.workshop,name: "โรงงานโมจิเล็ก ๆ",        desc: "ทีมงาน 5 คน นวดกันทั้งวัน", baseCost: 300,  cps: 20,  owned: 0 },
  { id: "factory", icon: ICONS.factory, name: "โรงงานอุตสาหกรรมโมจิ",   desc: "สายพานนวดแป้งอัตโนมัติ",   baseCost: 800,  cps: 50,  owned: 0 }
];

// ---------- 2) DOM REFS ----------
const flourCountEl = document.getElementById("flourCount");
const cpsDisplayEl = document.getElementById("cpsDisplay");
const mochiBtn = document.getElementById("mochiBtn");
const mochiDough = document.getElementById("mochiDough");
const popupLayer = document.getElementById("popupLayer");
const buildingListEl = document.getElementById("buildingList");

// ---------- 3) HELPERS ----------

// คำนวณราคา
function currentCost(building) {
  return Math.ceil(building.baseCost * Math.pow(1.05, building.owned));
}

// แสดงตัวเลข
function formatNumber(num) {
  return Math.floor(num).toLocaleString(); 
}

// คำนวณแรงนวดต่อวินาทีใหม่
function recalcCps() {
  state.totalCps = buildings.reduce((sum, b) => sum + b.cps * b.owned, 0);
}

// ---------- 4) RENDER ----------

function renderStats() {
  flourCountEl.textContent = formatNumber(state.flour);
  cpsDisplayEl.textContent = `${formatNumber(state.totalCps)} แรงนวด / วินาที`;
}

function renderShop() {
  buildingListEl.innerHTML = "";
  buildings.forEach(b => {
    const cost = currentCost(b);
    const btn = document.createElement("button");
    btn.className = "shop-item";
    btn.disabled = state.flour < cost;
    btn.innerHTML = `
      <span class="icon">${b.icon}</span>
      <span class="info">
        <span class="name">${b.name}<span class="owned">${b.owned > 0 ? "x" + b.owned : ""}</span></span>
        <span class="desc">${b.desc} • ${formatNumber(b.cps)} แรงนวด/วิ ต่อชิ้น</span>
      </span>
      <span class="cost">${formatNumber(cost)}</span>
    `;
    btn.addEventListener("click", () => buyBuilding(b));
    buildingListEl.appendChild(btn);
  });
}

function renderAll() {
  renderStats();
  renderShop();
}

// ---------- 5) ACTIONS ----------

function knead(e) {
  state.flour += state.clickPower;
  mochiDough.classList.remove("squish");
  void mochiDough.offsetWidth; // reflow
  mochiDough.classList.add("squish");
  spawnPopup(e, `+${formatNumber(state.clickPower)}`);
  renderStats();
  renderShop();
}

function spawnPopup(e, text) {
  const rect = mochiBtn.getBoundingClientRect();
  const parentRect = popupLayer.getBoundingClientRect();
  const x = (e.clientX || rect.left + rect.width / 2) - parentRect.left;
  const y = (e.clientY || rect.top + rect.height / 2) - parentRect.top;

  const pop = document.createElement("span");
  pop.className = "pop";
  pop.textContent = text;
  pop.style.left = `${x}px`;
  pop.style.top = `${y}px`;
  popupLayer.append(pop);
  setTimeout(() => pop.remove(), 900);
}

function buyBuilding(b) {
  const cost = currentCost(b);
  if (state.flour < cost) return;
  state.flour -= cost;
  b.owned += 1;
  recalcCps();
  renderAll();
}

// ---------- 6) GAME LOOP ----------

const TICK_MS = 1000;
setInterval(() => {
  if (state.totalCps > 0) {
    state.flour += state.totalCps * (TICK_MS / 1000);
    renderAll();
  }
}, TICK_MS);

// ---------- 7) INIT ----------

mochiBtn.addEventListener("click", knead);
renderAll();