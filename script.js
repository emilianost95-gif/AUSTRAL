/* ==========================================================================
   AUSTRAL — script.js
   Catálogo · Carrito persistente · Buscador · Modal · Animaciones GSAP
   ========================================================================== */

"use strict";

/* ---------- Datos ---------- */
// Los tonos son placeholders editoriales. Para producción: reemplazar
// tone por rutas de imagen y renderizar <img loading="lazy"> en cardMedia().
const PRODUCTS = [
  { id: "abrigo-cordillera", name: "Abrigo Cordillera", cat: "abrigo", price: 189900, oldPrice: null, tag: "Nuevo", tone: "carbon", toneAlt: "humo", material: "Lana merino 100%", desc: "Abrigo recto de lana merino con entretela térmica y botones de corozo. Corte relajado que abriga sin abultar.", sizes: ["XS","S","M","L","XL"], colors: ["#2b2a28","#a9a49b"], stock: 6, featured: 10 },
  { id: "parka-austral", name: "Parka Austral", cat: "abrigo", price: 219900, oldPrice: null, tag: "Edición Limitada", tone: "oliva", toneAlt: "carbon", material: "Algodón encerado", desc: "Parka de algodón encerado repelente al agua, forro desmontable de franela y capucha estructurada.", sizes: ["S","M","L","XL"], colors: ["#6a6a58","#2b2a28"], stock: 3, featured: 9 },
  { id: "blazer-piedra", name: "Blazer Piedra", cat: "abrigo", price: 159900, oldPrice: 189900, tag: "Oferta", tone: "piedra", toneAlt: "arena", material: "Lana fría", desc: "Blazer desestructurado de lana fría, hombro natural y forro parcial. Pensado para usarse todos los días.", sizes: ["XS","S","M","L"], colors: ["#a9a49b","#2b2a28"], stock: 8, featured: 8 },
  { id: "chaqueton-humo", name: "Chaquetón Humo", cat: "abrigo", price: 199900, oldPrice: null, tag: null, tone: "humo", toneAlt: "carbon", material: "Mezcla lana-cashmere", desc: "Chaquetón cruzado con 10% cashmere y bolsillos internos. El peso justo para el invierno del sur.", sizes: ["S","M","L","XL"], colors: ["#6f6d68"], stock: 5, featured: 7 },
  { id: "sweater-merino", name: "Sweater Merino", cat: "capa-media", price: 79900, oldPrice: null, tag: "Best Seller", tone: "arena", toneAlt: "piedra", material: "Merino extrafino 18.5μ", desc: "Cuello redondo de merino extrafino de 18.5 micrones. No pica, regula temperatura, se lava en casa.", sizes: ["XS","S","M","L","XL"], colors: ["#d9d2c4","#2b2a28","#6f6d68"], stock: 14, featured: 10 },
  { id: "medio-cierre-carbon", name: "Medio Cierre Carbón", cat: "capa-media", price: 89900, oldPrice: null, tag: "Nuevo", tone: "carbon", toneAlt: "piedra", material: "Punto doble de lana", desc: "Polerón de punto doble con medio cierre metálico mate y cuello alto. Estructura sin rigidez.", sizes: ["S","M","L","XL"], colors: ["#2b2a28","#a9a49b"], stock: 9, featured: 8 },
  { id: "cardigan-oliva", name: "Cardigan Oliva", cat: "capa-media", price: 94900, oldPrice: 109900, tag: "Oferta", tone: "oliva", toneAlt: "arena", material: "Lana + alpaca", desc: "Cardigan de lana y alpaca con botones de cuerno. Tejido en telar plano, cae como debe caer.", sizes: ["S","M","L"], colors: ["#6a6a58","#d9d2c4"], stock: 4, featured: 6 },
  { id: "polar-liviano", name: "Polar Liviano", cat: "capa-media", price: 64900, oldPrice: null, tag: null, tone: "humo", toneAlt: "arena", material: "Felpa reciclada", desc: "Segunda piel de felpa reciclada de secado rápido. Para la montaña o para la casa, sin distinción.", sizes: ["XS","S","M","L","XL"], colors: ["#6f6d68","#d9d2c4"], stock: 11, featured: 5 },
  { id: "camisa-oxford", name: "Camisa Oxford", cat: "base", price: 54900, oldPrice: null, tag: "Best Seller", tone: "arena", toneAlt: "humo", material: "Algodón orgánico GOTS", desc: "Oxford de algodón orgánico con cuello abotonado y costura francesa. Mejora con cada lavado.", sizes: ["XS","S","M","L","XL"], colors: ["#eae4d8","#93908a"], stock: 18, featured: 9 },
  { id: "camiseta-esencial", name: "Camiseta Esencial", cat: "base", price: 29900, oldPrice: null, tag: null, tone: "piedra", toneAlt: "carbon", material: "Algodón pima 220g", desc: "Camiseta pesada de algodón pima peinado de 220 gramos. Cuello que no se deforma, largo justo.", sizes: ["XS","S","M","L","XL"], colors: ["#c6c1b8","#2b2a28","#eae4d8"], stock: 26, featured: 7 },
  { id: "pantalon-sastre", name: "Pantalón Sastre", cat: "base", price: 84900, oldPrice: null, tag: "Nuevo", tone: "carbon", toneAlt: "oliva", material: "Lana fría stretch", desc: "Pantalón de sastrería con 2% de elastano, pinza única y ruedo sin terminar para ajuste a medida.", sizes: ["S","M","L","XL"], colors: ["#2b2a28","#6a6a58"], stock: 7, featured: 8 },
  { id: "gorro-merino", name: "Gorro Merino", cat: "accesorio", price: 24900, oldPrice: null, tag: null, tone: "humo", toneAlt: "oliva", material: "Merino doble capa", desc: "Gorro de merino tejido en doble capa. Abriga de verdad y no genera electricidad estática.", sizes: ["Único"], colors: ["#6f6d68","#6a6a58","#2b2a28"], stock: 20, featured: 6 },
];

/* ---------- Ilustraciones de prendas (SVG de línea) ---------- */
const TYPE = {
  "abrigo-cordillera": "coat",
  "parka-austral": "parka",
  "blazer-piedra": "blazer",
  "chaqueton-humo": "overcoat",
  "sweater-merino": "sweater",
  "medio-cierre-carbon": "halfzip",
  "cardigan-oliva": "cardigan",
  "polar-liviano": "fleece",
  "camisa-oxford": "shirt",
  "camiseta-esencial": "tee",
  "pantalon-sastre": "pants",
  "gorro-merino": "beanie",
};

const GARMENTS = {
  coat: (i) => `
    <path d="M78 40 L100 50 L122 40 L148 52 L168 82 L152 142 L140 134 L140 240 L60 240 L60 134 L48 142 L32 82 L52 52 Z"/>
    <path d="M86 42 L100 84 L114 42" fill="none"/>
    <path d="M86 42 L72 72 L100 84 M114 42 L128 72 L100 84" fill="none"/>
    <path d="M100 84 V240" fill="none"/>
    <path d="M70 172 H92 M108 172 H130" fill="none" stroke-width="1.8"/>
    <circle cx="110" cy="112" r="3" fill="${i}"/>
    <circle cx="110" cy="142" r="3" fill="${i}"/>
    <circle cx="110" cy="172" r="3" fill="${i}"/>`,
  parka: (i) => `
    <path d="M72 62 Q72 22 100 22 Q128 22 128 62 L156 84 L148 150 L136 142 L136 234 L64 234 L64 142 L52 150 L44 84 Z"/>
    <path d="M80 62 Q80 32 100 32 Q120 32 120 62" fill="none"/>
    <path d="M100 62 V234" fill="none" stroke-dasharray="6 4"/>
    <rect x="70" y="176" width="22" height="28" rx="3" fill="none" stroke-width="1.8"/>
    <rect x="108" y="176" width="22" height="28" rx="3" fill="none" stroke-width="1.8"/>
    <circle cx="92" cy="70" r="2" fill="${i}"/><circle cx="108" cy="70" r="2" fill="${i}"/>`,
  blazer: (i) => `
    <path d="M78 42 L100 52 L122 42 L146 54 L164 84 L150 138 L138 130 L138 210 L62 210 L62 130 L50 138 L36 84 L54 54 Z"/>
    <path d="M86 44 L100 120 L114 44" fill="none"/>
    <path d="M86 44 L70 84 L100 120 M114 44 L130 84 L100 120" fill="none"/>
    <path d="M100 120 V210" fill="none"/>
    <path d="M68 164 H90 M110 164 H132 M118 96 H134" fill="none" stroke-width="1.8"/>
    <circle cx="106" cy="136" r="3" fill="${i}"/>`,
  overcoat: (i) => `
    <path d="M76 40 L100 50 L124 40 L150 52 L168 82 L152 146 L140 138 L140 244 L60 244 L60 138 L48 146 L32 82 L50 52 Z"/>
    <path d="M84 42 L100 98 L116 42" fill="none"/>
    <path d="M84 42 L64 78 L100 98 M116 42 L136 78 L100 98" fill="none"/>
    <path d="M100 98 L88 244" fill="none"/>
    <circle cx="90" cy="124" r="3" fill="${i}"/><circle cx="114" cy="124" r="3" fill="${i}"/>
    <circle cx="88" cy="156" r="3" fill="${i}"/><circle cx="116" cy="156" r="3" fill="${i}"/>
    <circle cx="86" cy="188" r="3" fill="${i}"/><circle cx="118" cy="188" r="3" fill="${i}"/>`,
  sweater: (i) => `
    <path d="M76 46 L100 58 L124 46 L152 62 L168 142 L146 150 L138 106 L138 232 L62 232 L62 106 L54 150 L32 142 L48 62 Z"/>
    <path d="M84 48 Q100 68 116 48 M86 43 Q100 60 114 43" fill="none"/>
    <path d="M62 218 H138 M62 225 H138" fill="none" stroke-width="1.6"/>
    <path d="M34 136 L54 144 M166 136 L146 144" fill="none" stroke-width="1.6"/>`,
  halfzip: (i) => `
    <path d="M82 50 L82 32 Q100 24 118 32 L118 50 L152 64 L168 142 L146 150 L138 108 L138 232 L62 232 L62 108 L54 150 L32 142 L48 64 Z"/>
    <path d="M82 50 Q100 58 118 50" fill="none"/>
    <path d="M100 30 V118" fill="none" stroke-dasharray="5 4"/>
    <circle cx="100" cy="124" r="3" fill="${i}"/>
    <path d="M62 220 H138" fill="none" stroke-width="1.6"/>`,
  cardigan: (i) => `
    <path d="M76 46 L100 58 L124 46 L152 62 L168 142 L146 150 L138 106 L138 232 L62 232 L62 106 L54 150 L32 142 L48 62 Z"/>
    <path d="M84 48 L100 132 L116 48" fill="none"/>
    <path d="M100 132 V232" fill="none"/>
    <circle cx="100" cy="148" r="2.5" fill="${i}"/><circle cx="100" cy="170" r="2.5" fill="${i}"/>
    <circle cx="100" cy="192" r="2.5" fill="${i}"/><circle cx="100" cy="214" r="2.5" fill="${i}"/>`,
  fleece: (i) => `
    <path d="M82 50 L82 34 Q100 27 118 34 L118 50 L152 64 L168 142 L146 150 L138 108 L138 232 L62 232 L62 108 L54 150 L32 142 L48 64 Z"/>
    <path d="M100 32 V232" fill="none" stroke-dasharray="5 4"/>
    <path d="M112 130 L132 148" fill="none" stroke-dasharray="4 3"/>
    <path d="M62 152 H138" fill="none" stroke-width="1.4" opacity="0.6"/>`,
  shirt: (i) => `
    <path d="M78 44 L64 50 L38 74 L50 128 L62 120 L62 226 L138 226 L138 120 L150 128 L162 74 L136 50 L122 44 Z"/>
    <path d="M86 42 L100 64 L114 42 L106 33 L100 41 L94 33 Z" fill-opacity="0.12"/>
    <path d="M96 64 V226 M104 64 V226" fill="none" stroke-width="1.6"/>
    <circle cx="100" cy="86" r="2" fill="${i}"/><circle cx="100" cy="112" r="2" fill="${i}"/>
    <circle cx="100" cy="138" r="2" fill="${i}"/><circle cx="100" cy="164" r="2" fill="${i}"/>
    <circle cx="100" cy="190" r="2" fill="${i}"/>
    <path d="M116 98 H134 V120 H116 Z" fill="none" stroke-width="1.6"/>`,
  tee: (i) => `
    <path d="M76 48 L100 60 L124 48 L160 70 L146 106 L130 98 L130 218 L70 218 L70 98 L54 106 L40 70 Z"/>
    <path d="M84 50 Q100 68 116 50" fill="none"/>
    <path d="M70 206 H130" fill="none" stroke-width="1.6"/>
    <path d="M70 98 L78 62 M130 98 L122 62" fill="none" stroke-width="1.6" opacity="0.6"/>`,
  pants: (i) => `
    <path d="M68 36 H132 L142 238 H108 L100 122 L92 238 H58 Z"/>
    <path d="M68 52 H132" fill="none"/>
    <path d="M100 52 V80" fill="none" stroke-width="1.6"/>
    <circle cx="100" cy="44" r="2.5" fill="${i}"/>
    <path d="M82 92 L76 230 M118 92 L124 230" fill="none" stroke-width="1.4" opacity="0.5"/>`,
  beanie: (i) => `
    <path d="M52 152 Q52 56 100 56 Q148 56 148 152 Z"/>
    <path d="M46 152 H154 V188 H46 Z"/>
    <path d="M60 152 V188 M74 152 V188 M88 152 V188 M102 152 V188 M116 152 V188 M130 152 V188 M144 152 V188" fill="none" stroke-width="1.4" opacity="0.55"/>
    <path d="M100 56 V152 M74 62 V152 M126 62 V152" fill="none" stroke-width="1.4" opacity="0.45"/>`,
};

// Tinta según luminosidad del fondo
function inkFor(tone) {
  return tone === "arena" || tone === "piedra" ? "#38342d" : "#f7f5f1";
}

function drawGarment(type, tone) {
  const ink = inkFor(tone);
  return `<svg class="garment" viewBox="0 0 200 260" aria-hidden="true">
    <g fill="${ink}" fill-opacity="0.06" stroke="${ink}" stroke-width="2.4"
       stroke-linecap="round" stroke-linejoin="round">
      ${GARMENTS[type](ink)}
    </g>
  </svg>`;
}

function garmentSvg(p, tone) { return drawGarment(TYPE[p.id], tone); }

function mediaLabel(text, tone) {
  return `<span class="card__silhouette" style="color:${inkFor(tone)}">${text}</span>`;
}

/* ---------- Fotografías (Unsplash, licencia libre para uso comercial) ----------
   Cards del catálogo: prenda sola (consistencia de grid).
   Colecciones / lookbook / hero: modelo real (emoción editorial).
   Si una foto falla, el <img> se elimina y queda la ilustración SVG de respaldo. */
const UIMG = (id, w = 900) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const PHOTOS = {
  "abrigo-cordillera":   { main: "photo-1591047139829-d91aecb6caea", alt: "photo-1539533113208-f6df8cc8b543" },
  "parka-austral":       { main: "photo-1698133468659-5ff0a0b02dda", alt: "photo-1617391258031-f8d80b22fb35" },
  "blazer-piedra":       { main: "photo-1592343516109-362f7bd871aa", alt: "photo-1629922948950-08e61289569b" },
  "chaqueton-humo":      { main: "photo-1619603364904-c0498317e145", alt: "photo-1619603364937-8d7af41ef206" },
  "sweater-merino":      { main: "photo-1620799140408-edc6dcb6d633", alt: "photo-1601379327928-bedfaf9da2d0" },
  "medio-cierre-carbon": { main: "photo-1631541909061-71e349d1f203", alt: "photo-1611911813383-67769b37a149" },
  "cardigan-oliva":      { main: "photo-1516762689617-e1cffcef479d", alt: "photo-1581497396202-5645e76a3a8e" },
  "polar-liviano":       { main: "photo-1643015862949-5c8d15a4242e", alt: "photo-1574201635302-388dd92a4c3f" },
  "camisa-oxford":       { main: "photo-1579664531470-ac357f8f8e2b", alt: "photo-1624222244232-5f1ae13bbd53" },
  "camiseta-esencial":   { main: "photo-1558769132-cb1aea458c5e",    alt: "photo-1517502166878-35c93a0072f0" },
  "pantalon-sastre":     { main: "photo-1718252540617-6ecda2b56b57", alt: "photo-1718252540511-e958742e4165" },
  "gorro-merino":        { main: "photo-1618354691792-d1d42acfd860", alt: "photo-1664289321749-07316ab5e374" },
};

const SCENES = {
  "abrigo":     "photo-1539533018447-63fcce2678e3",
  "capa-media": "photo-1610901157620-340856d0a50f",
  "base":       "photo-1627130697816-4d71dbfe6a5b",
  "lookbook":   "photo-1613728455120-d00493b5e77e",
};

function photoTag(id, alt, w = 900) {
  return `<img class="media-photo" loading="lazy" decoding="async"
    src="${UIMG(id, w)}" alt="${alt}" onerror="this.remove()">`;
}

const COUPONS = { AUSTRAL10: 0.10, SUR15: 0.15 };
const FREE_SHIPPING = 60000;

/* ---------- Helpers ---------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const money = (n) => "$" + n.toLocaleString("es-CL");
const byId = (id) => PRODUCTS.find((p) => p.id === id);

const storage = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Estado ---------- */
let cart = storage.get("austral_cart", []); // [{id, size, color, qty}]
let coupon = storage.get("austral_coupon", null);
let currentCat = "todo";
let currentSort = "destacado";

/* ==========================================================================
   CATÁLOGO
   ========================================================================== */
const grid = $("#productGrid");

function cardMedia(p) {
  return `
    <div class="card__img tone--${p.tone}">
      ${garmentSvg(p, p.tone)}
      ${photoTag(PHOTOS[p.id].main, p.name)}
    </div>
    <div class="card__img-alt tone--${p.toneAlt}">
      ${garmentSvg(p, p.toneAlt)}
      ${photoTag(PHOTOS[p.id].alt, `${p.name} — vista alternativa`)}
      ${mediaLabel("Vista alternativa", p.toneAlt)}
    </div>`;
}

function tagHtml(tag) {
  if (!tag) return "";
  const gold = tag === "Edición Limitada" ? " card__tag--gold" : "";
  return `<span class="card__tag${gold}">${tag}</span>`;
}

function priceHtml(p) {
  return p.oldPrice
    ? `<s>${money(p.oldPrice)}</s>${money(p.price)}`
    : money(p.price);
}

function renderGrid() {
  let items = PRODUCTS.filter((p) => currentCat === "todo" || p.cat === currentCat);

  const sorters = {
    "precio-asc": (a, b) => a.price - b.price,
    "precio-desc": (a, b) => b.price - a.price,
    "nuevo": (a, b) => (b.tag === "Nuevo") - (a.tag === "Nuevo"),
    "destacado": (a, b) => b.featured - a.featured,
  };
  items.sort(sorters[currentSort]);

  $("#gridEmpty").hidden = items.length > 0;

  grid.innerHTML = items
    .map(
      (p, i) => `
    <article class="card" style="animation-delay:${i * 0.05}s">
      <div class="card__media" data-open="${p.id}" role="button" tabindex="0"
           aria-label="Ver ${p.name}">
        ${tagHtml(p.tag)}
        ${cardMedia(p)}
        <button class="card__add" data-add="${p.id}">Agregar al carrito</button>
      </div>
      <div class="card__info">
        <div>
          <p class="card__name">${p.name}</p>
          <p class="card__material">${p.material}</p>
        </div>
        <p class="card__price">${priceHtml(p)}</p>
      </div>
    </article>`
    )
    .join("");
}

/* Filtros */
$("#filterCat").addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  $$(".chip", $("#filterCat")).forEach((c) => c.classList.remove("is-active"));
  btn.classList.add("is-active");
  currentCat = btn.dataset.cat;
  renderGrid();
});

$("#sortSelect").addEventListener("change", (e) => {
  currentSort = e.target.value;
  renderGrid();
});

/* Colecciones → filtran el catálogo */
$$(".collection").forEach((c) =>
  c.addEventListener("click", () => {
    const cat = c.dataset.filter;
    const chip = $(`.chip[data-cat="${cat}"]`);
    if (chip) chip.click();
  })
);

/* Delegación: agregar / abrir modal */
document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  if (add) {
    e.stopPropagation();
    const p = byId(add.dataset.add);
    addToCart(p.id, p.sizes[Math.min(2, p.sizes.length - 1)], p.colors[0]);
    return;
  }
  const open = e.target.closest("[data-open]");
  if (open) openProduct(open.dataset.open);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const open = e.target.closest?.("[data-open]");
    if (open) openProduct(open.dataset.open);
  }
});

/* ==========================================================================
   CARRITO
   ========================================================================== */
const cartEl = $("#cart");
const overlay = $("#overlay");

function cartKey(item) { return `${item.id}|${item.size}|${item.color}`; }

function addToCart(id, size, color, qty = 1) {
  const existing = cart.find((i) => cartKey(i) === cartKey({ id, size, color }));
  if (existing) existing.qty += qty;
  else cart.push({ id, size, color, qty });
  saveCart();
  toast(`${byId(id).name} agregado al carrito`);
  openCart();
}

function saveCart() {
  storage.set("austral_cart", cart);
  storage.set("austral_coupon", coupon);
  renderCart();
}

function cartTotals() {
  const subtotal = cart.reduce((s, i) => s + byId(i.id).price * i.qty, 0);
  const discount = coupon ? Math.round(subtotal * COUPONS[coupon]) : 0;
  return { subtotal, discount, total: subtotal - discount };
}

function renderCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const badge = $("#cartCount");
  badge.hidden = count === 0;
  badge.textContent = count;
  $("#cartHeadCount").textContent = count ? `(${count})` : "";
  $("#cartEmpty").style.display = cart.length ? "none" : "grid";
  $("#cartFoot").hidden = cart.length === 0;

  $("#cartItems").innerHTML = cart
    .map((item, idx) => {
      const p = byId(item.id);
      return `
      <div class="cart-item">
        <div class="cart-item__thumb tone--${p.tone}">${garmentSvg(p, p.tone)}${photoTag(PHOTOS[p.id].main, p.name, 200)}</div>
        <div>
          <p class="cart-item__name">${p.name}</p>
          <p class="cart-item__meta">Talle ${item.size}</p>
          <div class="cart-item__qty">
            <button data-qty="${idx}|-1" aria-label="Restar uno">−</button>
            <span>${item.qty}</span>
            <button data-qty="${idx}|1" aria-label="Sumar uno">+</button>
          </div>
        </div>
        <div class="cart-item__right">
          <p class="cart-item__price">${money(p.price * item.qty)}</p>
          <button class="cart-item__remove" data-remove="${idx}">Quitar</button>
        </div>
      </div>`;
    })
    .join("");

  const { subtotal, discount, total } = cartTotals();
  $("#discountRow").hidden = !discount;
  $("#cartDiscount").textContent = "−" + money(discount);
  $("#cartShipping").textContent =
    total >= FREE_SHIPPING || total === 0 ? "Gratis" : money(4990);
  $("#cartTotal").textContent = money(total);
}

$("#cartItems").addEventListener("click", (e) => {
  const qtyBtn = e.target.closest("[data-qty]");
  if (qtyBtn) {
    const [idx, delta] = qtyBtn.dataset.qty.split("|").map(Number);
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    saveCart();
    return;
  }
  const rm = e.target.closest("[data-remove]");
  if (rm) {
    cart.splice(Number(rm.dataset.remove), 1);
    saveCart();
  }
});

$("#couponBtn").addEventListener("click", () => {
  const code = $("#couponInput").value.trim().toUpperCase();
  if (COUPONS[code]) {
    coupon = code;
    saveCart();
    toast(`Cupón ${code} aplicado: −${COUPONS[code] * 100}%`);
  } else {
    toast("Ese cupón no existe");
  }
});

$("#checkoutBtn").addEventListener("click", () => {
  toast("Demo: acá conectás tu pasarela de pago (Webpay / MercadoPago)");
});

/* Abrir / cerrar drawer */
function openCart() {
  cartEl.hidden = false;
  overlay.hidden = false;
  requestAnimationFrame(() => {
    cartEl.classList.add("is-open");
    overlay.classList.add("is-open");
  });
  document.body.classList.add("is-locked");
}
function closeCart() {
  cartEl.classList.remove("is-open");
  overlay.classList.remove("is-open");
  document.body.classList.remove("is-locked");
  setTimeout(() => {
    cartEl.hidden = true;
    overlay.hidden = true;
  }, 550);
}
$("#cartOpen").addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

/* ==========================================================================
   BUSCADOR
   ========================================================================== */
const search = $("#search");
const searchInput = $("#searchInput");
let recentSearches = storage.get("austral_recent", []);

function openSearch() {
  search.hidden = false;
  requestAnimationFrame(() => search.classList.add("is-open"));
  document.body.classList.add("is-locked");
  setTimeout(() => searchInput.focus(), 120);
  renderSearch("");
}
function closeSearch() {
  search.classList.remove("is-open");
  document.body.classList.remove("is-locked");
  setTimeout(() => { search.hidden = true; searchInput.value = ""; }, 450);
}
$("#searchOpen").addEventListener("click", openSearch);
$("#searchClose").addEventListener("click", closeSearch);

function renderSearch(q) {
  const query = q.trim().toLowerCase();
  let items;
  if (!query) {
    $("#searchHint").textContent = recentSearches.length
      ? "Recientes: " + recentSearches.join(", ")
      : "Populares: abrigo, merino, gorro, camisa";
    items = PRODUCTS.filter((p) => p.featured >= 9); // populares
  } else {
    $("#searchHint").textContent = "";
    items = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.material.toLowerCase().includes(query) ||
        p.cat.includes(query)
    );
  }
  $("#searchResults").innerHTML = items.length
    ? items
        .map(
          (p) => `
      <button class="search__result" data-open="${p.id}">
        <span class="search__result-name">${p.name}</span>
        <span class="search__result-meta">${p.material} · ${money(p.price)}</span>
      </button>`
        )
        .join("")
    : `<p class="search__hint">Nada por acá. Probá con “merino” o “abrigo”.</p>`;
}

searchInput.addEventListener("input", (e) => renderSearch(e.target.value));
searchInput.addEventListener("change", (e) => {
  const q = e.target.value.trim();
  if (q && !recentSearches.includes(q)) {
    recentSearches = [q, ...recentSearches].slice(0, 4);
    storage.set("austral_recent", recentSearches);
  }
});

/* ==========================================================================
   MODAL DE PRODUCTO
   ========================================================================== */
const modal = $("#productModal");
let selectedSize = null;
let selectedColor = null;

function openProduct(id) {
  const p = byId(id);
  if (!p) return;
  closeSearch();
  selectedSize = p.sizes[Math.min(2, p.sizes.length - 1)];
  selectedColor = p.colors[0];

  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id)
    .concat(PRODUCTS.filter((x) => x.cat !== p.cat))
    .slice(0, 4);

  $("#modalInner").innerHTML = `
    <div class="pm__gallery">
      <div class="pm__main tone--${p.tone}" id="pmMain">
        ${garmentSvg(p, p.tone)}
        ${photoTag(PHOTOS[p.id].main, p.name, 1200)}
        ${mediaLabel(p.name, p.tone)}
      </div>
      <div class="pm__thumbs">
        <button class="pm__thumb tone--${p.tone} is-active" data-img="${PHOTOS[p.id].main}" data-label="${p.name}" aria-label="Vista principal">${photoTag(PHOTOS[p.id].main, "", 200)}</button>
        <button class="pm__thumb tone--${p.toneAlt}" data-img="${PHOTOS[p.id].alt}" data-label="Vista alternativa" aria-label="Vista alternativa">${photoTag(PHOTOS[p.id].alt, "", 200)}</button>
      </div>
    </div>

    <div class="pm__info">
      <p class="pm__cat">${p.cat.replace("-", " ")}${p.tag ? " · " + p.tag : ""}</p>
      <h2 class="pm__name">${p.name}</h2>
      <p class="pm__price">${priceHtml(p)}</p>
      <p class="pm__desc">${p.desc}</p>

      <div class="pm__label"><span>Talle</span><a href="#" onclick="return false">Guía de talles</a></div>
      <div class="pm__sizes" id="pmSizes">
        ${p.sizes.map((s) => `<button class="pm__size${s === selectedSize ? " is-active" : ""}" data-size="${s}">${s}</button>`).join("")}
      </div>

      <div class="pm__label"><span>Color</span></div>
      <div class="pm__colors" id="pmColors">
        ${p.colors.map((c, i) => `<button class="pm__color${i === 0 ? " is-active" : ""}" style="background:${c}" data-color="${c}" aria-label="Color ${i + 1}"></button>`).join("")}
      </div>

      <p class="pm__stock">${p.stock <= 5 ? `Quedan ${p.stock} unidades` : "En stock · Despacho en 48 h"}</p>
      <button class="btn btn--primary btn--full" id="pmAdd" data-magnetic>
        <span>Agregar al carrito — ${money(p.price)}</span>
      </button>

      <div class="pm__materials">
        <h4>Materiales y cuidado</h4>
        <p>${p.material}. Lavar a mano o ciclo delicado en frío. Secar en plano, a la sombra. Confeccionado en talleres del sur de Chile y Argentina.</p>
      </div>
    </div>

    <div class="pm__related">
      <h3>También te puede interesar</h3>
      <div class="grid">
        ${related
          .map(
            (r) => `
          <article class="card">
            <div class="card__media" data-open="${r.id}" role="button" tabindex="0" aria-label="Ver ${r.name}">
              ${cardMedia(r)}
            </div>
            <div class="card__info">
              <div><p class="card__name">${r.name}</p></div>
              <p class="card__price">${money(r.price)}</p>
            </div>
          </article>`
          )
          .join("")}
      </div>
    </div>`;

  // Interacciones internas del modal
  $("#pmSizes").addEventListener("click", (e) => {
    const b = e.target.closest(".pm__size");
    if (!b) return;
    $$(".pm__size").forEach((x) => x.classList.remove("is-active"));
    b.classList.add("is-active");
    selectedSize = b.dataset.size;
  });
  $("#pmColors").addEventListener("click", (e) => {
    const b = e.target.closest(".pm__color");
    if (!b) return;
    $$(".pm__color").forEach((x) => x.classList.remove("is-active"));
    b.classList.add("is-active");
    selectedColor = b.dataset.color;
  });
  $$(".pm__thumb").forEach((t) =>
    t.addEventListener("click", () => {
      $$(".pm__thumb").forEach((x) => x.classList.remove("is-active"));
      t.classList.add("is-active");
      $("#pmMain").innerHTML =
        garmentSvg(p, p.tone) +
        photoTag(t.dataset.img, p.name, 1200) +
        mediaLabel(t.dataset.label, p.tone);
    })
  );
  $("#pmAdd").addEventListener("click", () => {
    addToCart(p.id, selectedSize, selectedColor);
    closeProduct();
  });

  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add("is-open"));
  modal.scrollTop = 0;
  document.body.classList.add("is-locked");
}

function closeProduct() {
  modal.classList.remove("is-open");
  document.body.classList.remove("is-locked");
  setTimeout(() => (modal.hidden = true), 450);
}
$("#modalClose").addEventListener("click", closeProduct);

/* Escape cierra todo */
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (!modal.hidden) closeProduct();
  else if (!search.hidden) closeSearch();
  else if (!cartEl.hidden) closeCart();
});

/* ==========================================================================
   NEWSLETTER · TOAST · MENÚ MÓVIL
   ========================================================================== */
$("#newsBtn").addEventListener("click", () => {
  const input = $("#newsEmail");
  if (!input.value.includes("@")) { toast("Escribí un correo válido"); return; }
  $("#newsOk").hidden = false;
  input.value = "";
});

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("is-visible"), 2600);
}

const burger = $("#burger");
const menu = $("#menu");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", open);
});
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    menu.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  }
});

/* ==========================================================================
   HEADER INTELIGENTE · CURSOR · MAGNETIC
   ========================================================================== */
const header = $("#header");
const toTop = $("#toTop");
let lastY = 0;
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  header.classList.toggle("is-scrolled", y > 40);
  header.classList.toggle("is-hidden", y > 400 && y > lastY);
  toTop.classList.toggle("is-visible", y > 600);
  lastY = y;
}, { passive: true });

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});

/* Cursor personalizado */
const cursor = $("#cursor");
if (!reduceMotion && matchMedia("(hover: hover)").matches) {
  let cx = 0, cy = 0, tx = 0, ty = 0;
  document.addEventListener("mousemove", (e) => {
    tx = e.clientX; ty = e.clientY;
    document.body.classList.add("has-cursor");
  });
  (function loop() {
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener("mouseover", (e) => {
    cursor.classList.toggle(
      "is-hover",
      !!e.target.closest("a, button, [data-open]")
    );
  });
}

/* Botones magnéticos */
function initMagnetic(scope = document) {
  if (reduceMotion || !matchMedia("(hover: hover)").matches) return;
  $$("[data-magnetic]", scope).forEach((el) => {
    if (el.dataset.magInit) return;
    el.dataset.magInit = "1";
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.35;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener("mouseleave", () => (el.style.transform = ""));
  });
}
initMagnetic();

/* ==========================================================================
   ANIMACIONES GSAP
   ========================================================================== */
window.addEventListener("load", () => {
  if (reduceMotion || typeof gsap === "undefined") {
    $$(".reveal, .hero__title .line > span").forEach((el) => {
      el.style.opacity = 1; el.style.transform = "none";
    });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* Entrada del hero */
  gsap.timeline({ defaults: { ease: "power4.out" } })
    .from(".hero__title .line > span", {
      yPercent: 110, duration: 1.3, stagger: 0.12,
    })
    .to(".hero .reveal", {
      opacity: 1, y: 0, duration: 1, stagger: 0.12,
    }, "-=0.7");

  /* Parallax sutil de los paneles del hero */
  gsap.to(".hero__panel--b", {
    yPercent: -14,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 },
  });
  gsap.to(".hero__content", {
    yPercent: 10, opacity: 0.4,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 },
  });

  /* Movimiento con el mouse (profundidad) */
  const heroMedia = $("#heroMedia");
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / innerWidth - 0.5);
    const y = (e.clientY / innerHeight - 0.5);
    gsap.to(".hero__panel--b", { x: x * -18, y: y * -12, duration: 1.4, ease: "power2.out", overwrite: "auto" });
  });

  /* Reveals al scrollear */
  $$(".reveal").forEach((el) => {
    if (el.closest(".hero")) return;
    gsap.to(el, {
      opacity: 1, y: 0,
      duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 86%" },
    });
  });

  /* Parallax del lookbook */
  gsap.fromTo("#lookbookMedia", { yPercent: 6 }, {
    yPercent: -6, ease: "none",
    scrollTrigger: { trigger: ".lookbook", start: "top bottom", end: "bottom top", scrub: 1 },
  });
});

/* ==========================================================================
   INIT
   ========================================================================== */
renderGrid();
renderCart();
if (coupon) $("#couponInput").value = coupon;

/* Fotos editoriales en colecciones y lookbook (SVG queda como respaldo) */
const COLLECTION_TYPES = { "abrigo": "coat", "capa-media": "sweater", "base": "shirt" };
const COLLECTION_ALTS = {
  "abrigo": "Modelo con abrigo de lana — colección Abrigo",
  "capa-media": "Modelo con sweater de punto — colección Capa media",
  "base": "Modelo con camisa y pantalón claros — colección Base",
};
$$(".collection").forEach((c) => {
  const media = $(".collection__media", c);
  const tone = [...media.classList].find((x) => x.startsWith("tone--"))?.slice(6);
  const key = c.dataset.filter;
  if (!tone || !COLLECTION_TYPES[key]) return;
  media.insertAdjacentHTML(
    "afterbegin",
    drawGarment(COLLECTION_TYPES[key], tone) + photoTag(SCENES[key], COLLECTION_ALTS[key])
  );
});
$("#lookbookMedia")?.insertAdjacentHTML(
  "afterbegin",
  drawGarment("overcoat", "humo") + photoTag(SCENES.lookbook, "Modelo con abrigo negro — lookbook 01", 1200)
);
