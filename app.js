const state = { all: [], category: "", query: "", photoOnly: false };
const $ = (id) => document.getElementById(id);
const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

async function init() {
  try {
    const res = await fetch("products.json");
    const data = await res.json();
    state.all = data.products || [];
    const b = data.business || {};
    $("address").textContent = b.address || "";
    $("phone").textContent = (b.phones || []).join("  |  ");
    $("email").textContent = b.email || "";
    $("categoryFilter").insertAdjacentHTML("beforeend", (data.categories || []).map(c => `<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join(""));
    const waText = encodeURIComponent(`Hello Shubh Enterprises, I need help finding a printer product. Please share availability and compatibility details.`);
    const phone = (b.phones || [""])[0].replace(/\D/g, "");
    $("whatsappLink").href = `https://wa.me/91${phone}?text=${waText}`;
    renderChips(data.categories || []);
    render();
  } catch (e) {
    $("resultCount").textContent = "Could not load products.json. Keep all website files in the same folder.";
  }
}
function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
function renderChips(categories) {
  const top = categories.slice(0, 8);
  $("categoryChips").innerHTML = `<button class="chip active" data-category="">All products</button>` + top.map(c => `<button class="chip" data-category="${escapeHTML(c)}">${escapeHTML(c)}</button>`).join("");
  $("categoryChips").addEventListener("click", e => {
    const btn = e.target.closest("[data-category]");
    if (!btn) return;
    state.category = btn.dataset.category;
    $("categoryFilter").value = state.category;
    document.querySelectorAll(".chip").forEach(ch => ch.classList.toggle("active", ch.dataset.category === state.category));
    render();
  });
}
function filtered() {
  const q = norm(state.query);
  return state.all.filter(p => {
    const matchesText = !q || norm(p.name + " " + p.category).includes(q);
    const matchesCategory = !state.category || p.category === state.category;
    const matchesPhoto = !state.photoOnly || !!p.image;
    return matchesText && matchesCategory && matchesPhoto;
  });
}
function card(p, i) {
  const photo = p.image
    ? `<img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy">`
    : `<div class="photo-placeholder"><div class="plus">＋</div><strong>ADD PRODUCT PHOTO</strong><small>Replace with your real item photo</small></div>`;
  return `<article class="product-card">
    <button class="photo-slot" type="button" data-open="${i}" aria-label="View ${escapeHTML(p.name)} photo placeholder">${photo}</button>
    <div class="card-content">
      <p class="category-label">${escapeHTML(p.category)}</p>
      <h3>${escapeHTML(p.name)}</h3>
      <div class="card-actions"><button class="text-btn" type="button" data-enquire="${escapeHTML(p.name)}">Ask about this item ↗</button></div>
    </div>
  </article>`;
}
function render() {
  const items = filtered();
  $("resultCount").textContent = `${items.length.toLocaleString()} products shown`;
  $("productGrid").innerHTML = items.map((p, i) => card(p, i)).join("");
  $("emptyState").hidden = items.length > 0;
  $("categoryFilter").value = state.category;
  document.querySelectorAll(".chip").forEach(ch => ch.classList.toggle("active", ch.dataset.category === state.category));
  $("productGrid").querySelectorAll("[data-open]").forEach(btn => btn.addEventListener("click", () => {
    const p = items[Number(btn.dataset.open)];
    const dialog = $("photoDialog");
    $("dialogName").textContent = p.name;
    $("dialogCategory").textContent = p.category;
    $("dialogImage").src = p.image || placeholderSvg(p.name);
    $("dialogImage").alt = p.name;
    dialog.showModal();
  }));
  $("productGrid").querySelectorAll("[data-enquire]").forEach(btn => btn.addEventListener("click", () => {
    const name = btn.dataset.enquire;
    const phone = "919665897878";
    const msg = encodeURIComponent(`Hello Shubh Enterprises, I am enquiring about: ${name}. Please confirm compatibility and availability.`);
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank", "noopener");
  }));
}
function placeholderSvg(name) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="#e9f8f6"/><circle cx="400" cy="235" r="70" fill="#fff" stroke="#008f86" stroke-width="4"/><path d="M370 235h60M400 205v60" stroke="#f28c28" stroke-width="8" stroke-linecap="round"/><text x="400" y="370" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="#142b4a">ADD PRODUCT PHOTO</text><text x="400" y="415" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#647580">${escapeHTML(name).slice(0,45)}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
$("search").addEventListener("input", e => { state.query = e.target.value; render(); });
$("clearSearch").addEventListener("click", () => { $("search").value = ""; state.query = ""; render(); $("search").focus(); });
$("categoryFilter").addEventListener("change", e => { state.category = e.target.value; render(); });
$("photoOnly").addEventListener("change", e => { state.photoOnly = e.target.checked; render(); });
init();
