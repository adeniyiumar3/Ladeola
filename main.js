/* ============================================================
   LAYERS LAGOS — front-end demo
   Vanilla JS, single file. No frameworks, no build step.
   Replace WHATSAPP_NUMBER before deploying.
============================================================ */
(function(){
  "use strict";

  const WHATSAPP_NUMBER = "2349018603218"; // La'deola Cakes_n_Confectionery — 09018603218 in international format

  /* ---------- Small helper: SVG placeholder "photos" as data URIs ----------
     Keeps the file self-contained (no external image hosting), while still
     using real <img> elements with loading="lazy" so images are truly lazy-loaded. */
  function placeholderImg(bg, accent, shape){
    const shapes = {
      package: `<rect x="18" y="68" width="118" height="42" rx="10" fill="${accent}"/><rect x="30" y="40" width="94" height="34" rx="10" fill="${bg}"/><rect x="46" y="16" width="62" height="30" rx="8" fill="#fff" opacity=".85"/><circle cx="77" cy="12" r="5" fill="${accent}"/><rect x="148" y="62" width="42" height="42" rx="8" fill="${bg}"/><rect x="148" y="62" width="42" height="10" fill="${accent}"/><rect x="165" y="62" width="8" height="42" fill="${accent}"/>`,
      cupcake: `<path d="M45 60 L155 60 L140 115 Q100 130 60 115 Z" fill="${accent}"/><path d="M55 60 Q100 15 145 60 Z" fill="${bg}"/><circle cx="100" cy="18" r="6" fill="#fff"/>`,
      bread: `<path d="M28 100 Q28 55 100 55 Q172 55 172 100 Z" fill="${accent}"/><path d="M45 100 Q45 70 100 70 Q155 70 155 100 Z" fill="${bg}"/><path d="M60 78 Q70 68 80 78" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/><path d="M95 78 Q105 68 115 78" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/><path d="M130 78 Q140 68 150 78" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/>`,
      savoury: `<path d="M40 105 Q40 40 100 40 Q160 40 160 105 Z" fill="${accent}"/><path d="M55 100 Q55 55 100 55 Q145 55 145 100 Z" fill="${bg}"/><path d="M100 40 L100 100" stroke="${bg}" stroke-width="3" opacity=".6"/>`,
      drink: `<path d="M70 30 L130 30 L122 118 Q100 128 78 118 Z" fill="${bg}"/><rect x="70" y="30" width="60" height="18" rx="6" fill="${accent}"/><rect x="112" y="10" width="8" height="30" rx="4" fill="${accent}"/>`
    };
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 140'><rect width='200' height='140' fill='${bg}' opacity="0.35"/>${shapes[shape]||shapes.cupcake}</svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  const PALETTE = { blush:"#FDE6F2", plum:"#E6178C", caramel:"#C9971F", cream:"#FCEEF6" };

  /* ---------- Product catalogue — La'deola Cakes_n_Confectionery's real menu ---------- */
  const PRODUCTS = [
    { id:"cupcake-vanilla", name:"Vanilla Cupcakes (Pack of 6)", cat:"cupcakes", price:2000,
      desc:"Soft, buttery vanilla sponge, individually frosted.",
      img:"vanilla6.jpg" },
    { id:"cupcake-redvelvet", name:"Red Velvet Cupcakes (Pack of 6)", cat:"cupcakes", price:3000,
      desc:"Classic red velvet with cream cheese frosting.",
      img:"redvelvet6.jpg" },
    { id:"cupcake-chocolate", name:"Chocolate Cupcakes (Pack of 6)", cat:"cupcakes", price:3000,
      desc:"Rich chocolate sponge, finished with chocolate buttercream.",
      img:"chocolate6.jpg" },
    { id:"bread-chocochunk", name:"Choco Chunk Banana Bread", cat:"bread", price:1700,
      desc:"Classic banana bread studded with chocolate chunks.",
      img:"chocochunk.jpg", tag:"Fan favourite" },

    /* ---------- Plain Cakes category items ---------- */
    { id:"cake-vanilla", name:"Plain Vanilla Cake", cat:"plain-cakes", price:7000,
      desc:"Classic vanilla sponge finished with smooth vanilla buttercream.",
      img:"vanillaplain.jpg", hasInscription:true },
    { id:"cake-banana-bread", name:"Plain Banana Bread", cat:"plain-cakes", price:1500,
      desc:"Moist, homestyle banana bread — offered under Plain Cakes.",
      img:"bananabreadplain.jpg" },
    
    { id:"cake-chocolate", name:"Chocolate Cake", cat:"plain-cakes", price:7500,
      desc:"Rich chocolate sponge with chocolate buttercream.",
      img:"chocolateplain.jpg", hasInscription:true },
    { id:"cake-redvelvet", name:"Red Velvet Cake", cat:"plain-cakes", price:7500,
      desc:"Classic red velvet with cream cheese frosting.",
      img:"redvelvetplain.jpg", hasInscription:true },

    { id:"small-chops", name:"Small Chops Pack", cat:"savoury", price:0,
      desc:"Choose how many samosas, puff puffs, spring rolls and peppered meat you want.",
      img:"smallchops.jpg",
      items:[
        { id:"samosa", label:"Samosa", unit:150 },
        { id:"puffpuff", label:"Puff Puff", unit:120 },
        { id:"springRoll", label:"Spring Roll", unit:180 },
        { id:"pepperedMeat", label:"Peppered Meat", unit:250 }
      ],
      hasInscription:true },
    { id:"doughnut", name:"Doughnut", cat:"savoury", price:300,
      desc:"Light, fried doughnut finished with sugar.",
      img:"doughnut.jpg" },
    { id:"meatpie", name:"Meat Pie", cat:"savoury", price:1200,
      desc:"Flaky, buttery pastry with a well-seasoned filling.",
      img:"meatpie.jpeg" },
    { id:"drink-plain", name:"Yoghurt Drink (Plain Sweetened)", cat:"drinks", price:1500,
      desc:"Smooth, lightly sweetened yoghurt drink.",
      img:"yoghurtdrink.jpg" },
    { id:"drink-strawberry", name:"Yoghurt Drink (Strawberry)", cat:"drinks", price:1700,
      desc:"Our yoghurt drink blended with real strawberry.",
      img:"yoghurtdrink_strawberry.jpg" }
  ];

  const CATEGORIES = [
    { id:"all", label:"All" },
    { id:"packages", label:"Celebration Packages" },
    { id:"cupcakes", label:"Cupcakes" },
    { id:"bread", label:"Banana Bread" },
    { id:"savoury", label:"Savoury" },
    { id:"drinks", label:"Drinks" },
    { id:"plain-cakes", label:"Plain Cakes" }
  ];

  /* ---------- State ---------- */
  let state = {
    query:"",
    category:"all",
    showAllProducts:false,
    cart:[]           // {lineId, productId, name, price, qty, flavour, inscription}
  };

  const fmt = n => "₦" + Number(n).toLocaleString("en-NG");

  /* ---------- Optional persistence via artifact storage with localStorage fallback ---------- */
  const platformStorage = (function(){
    try{
      if(window.storage && typeof window.storage.get === 'function' && typeof window.storage.set === 'function'){
        return window.storage;
      }
    }catch(e){}
    return {
      async get(k){ try{ return { value: localStorage.getItem(k) }; }catch(e){ return { value: null }; } },
      async set(k,v){ try{ localStorage.setItem(k, String(v)); }catch(e){} }
    };
  })();

  async function saveState(){
    try{
      await platformStorage.set("layers-lagos:cart", JSON.stringify(state.cart));
    }catch(e){ console.warn("Storage save skipped:", e); }
  }
  async function loadState(){
    try{
      const c = await platformStorage.get("layers-lagos:cart");
      if(c && c.value) state.cart = JSON.parse(c.value);
    }catch(e){ /* no saved cart yet */ }
  }
  async function loadDarkMode(){
    try{
      const d = await platformStorage.get("layers-lagos:dark");
      // If user explicitly chose dark mode, enable it. If explicitly set to "0", ensure light mode.
      if(d && d.value === "1"){ document.documentElement.classList.add("dark"); return; }
      if(d && d.value === "0"){ document.documentElement.classList.remove("dark"); return; }
    }catch(e){}
    // Default to light mode: do not enable dark automatically.
  }
  async function saveDarkMode(on){
    try{ await platformStorage.set("layers-lagos:dark", on ? "1" : "0"); }catch(e){}
  }

  /* ---------- Rendering: filter chips ---------- */
  const filterChips = document.getElementById("filterChips");
  CATEGORIES.forEach(cat=>{
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (cat.id==="all" ? " active" : "");
    b.textContent = cat.label;
    b.dataset.cat = cat.id;
    b.addEventListener("click", ()=>{
      state.category = cat.id;
      state.showAllProducts = false;
      [...filterChips.children].forEach(c=>c.classList.remove("active"));
      b.classList.add("active");
      renderProducts();
    });
    filterChips.appendChild(b);
  });

  // Footer category list
  const footerCats = document.getElementById("footerCats");
  CATEGORIES.filter(c=>c.id!=="all").forEach(c=>{
    const li = document.createElement("li");
    li.innerHTML = `<a href="#shop">${c.label}</a>`;
    footerCats.appendChild(li);
  });

  /* ---------- Search ---------- */
  let searchTimer;
  document.getElementById("searchInput").addEventListener("input", e=>{
    clearTimeout(searchTimer);
    const val = e.target.value;
    searchTimer = setTimeout(()=>{ state.query = val.trim().toLowerCase(); state.showAllProducts = false; renderProducts(); }, 180);
  });

  /* ---------- Product grid ---------- */
  const grid = document.getElementById("productGrid");
  function getFiltered(){
    return PRODUCTS.filter(p=>{
      const matchesCat = state.category==="all" || p.cat===state.category;
      const matchesQuery = !state.query || (p.name.toLowerCase().includes(state.query) || p.desc.toLowerCase().includes(state.query));
      return matchesCat && matchesQuery;
    });
  }

  function renderProducts(){
    const items = getFiltered();
    const moreAction = document.getElementById("moreProductsAction");
    grid.innerHTML = "";
    if(items.length===0){
      grid.innerHTML = `<div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <p>Nothing matches "${escapeHtml(state.query)}" yet. Try another search or category.</p>
      </div>`;
      if(moreAction) moreAction.innerHTML = "";
      return;
    }
    const visibleItems = state.showAllProducts ? items : items.slice(0,6);
    visibleItems.forEach(p=>{
      const card = document.createElement("div");
      card.className = "card reveal";
      card.innerHTML = `
        <div class="card-media">
          ${p.tag ? `<span class="card-tag">${p.tag}</span>` : ""}
          <img src="${p.img}" alt="${p.name}" loading="lazy" width="200" height="164">
        </div>
        <div class="card-body">
          <h3>${p.name}</h3>
          <p class="desc">${p.desc}</p>
          <div class="card-foot">
            <span class="price">${fmt(p.price)}</span>
            <button type="button" class="add-btn" aria-label="Add ${p.name} to order" data-id="${p.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>
        </div>`;
      card.addEventListener("click", (e)=>{
        if(e.target.closest(".add-btn")) return; // handled separately
        openProductModal(p.id);
      });
      card.querySelector(".add-btn").addEventListener("click", ()=> openProductModal(p.id));
      grid.appendChild(card);
      observer.observe(card);
    });
    if(moreAction){
      if(items.length > 6){
        moreAction.innerHTML = `<button type="button" class="btn btn-outline" id="showMoreBtn">${state.showAllProducts ? `Show less` : `Show more`}</button>`;
        document.getElementById("showMoreBtn").addEventListener("click", ()=>{
          state.showAllProducts = !state.showAllProducts;
          renderProducts();
        });
      }else{
        moreAction.innerHTML = "";
      }
    }
  }

  function escapeHtml(s){
    return s.replace(/[&<>"']/g, c=>({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[c]));
  }

  /* ---------- Scroll reveal ---------- */
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); observer.unobserve(en.target); } });
  }, { threshold:0.12 });
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

  function getSmallChopsTotal(counts){
    const prices = { samosa:150, puffpuff:120, springRoll:180, pepperedMeat:250 };
    return Object.keys(counts).reduce((total,key)=>{
      if(key === "other") return total;
      return total + (counts[key] || 0) * prices[key];
    }, 0);
  }
  function buildSmallChopsMeta(counts, other){
    const parts = [];
    if(counts.samosa) parts.push(`${counts.samosa}x samosa`);
    if(counts.puffpuff) parts.push(`${counts.puffpuff}x puff puff`);
    if(counts.springRoll) parts.push(`${counts.springRoll}x spring roll`);
    if(counts.pepperedMeat) parts.push(`${counts.pepperedMeat}x peppered meat`);
    if(other) parts.push(other);
    return parts.join(" · ");
  }
  /* ---------- Product modal (choose flavour / qty / inscription) ---------- */
  const productOverlay = document.getElementById("productOverlay");
  const productModal = document.getElementById("productModal");

  /* ---------- Modal focus management (trap focus, restore on close) ---------- */
  let _lastFocused = null;
  let _activeModal = null;
  function _trapKey(e){
    if(!_activeModal) return;
    if(e.key === 'Escape'){
      e.preventDefault();
      closeActiveModal();
      return;
    }
    if(e.key !== 'Tab') return;
    const focusable = _activeModal.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
    const nodes = Array.prototype.slice.call(focusable).filter(n=> n.offsetParent !== null);
    if(nodes.length === 0){ e.preventDefault(); return; }
    const idx = nodes.indexOf(document.activeElement);
    if(e.shiftKey){ // backward
      if(idx === 0 || document.activeElement === _activeModal){ nodes[nodes.length-1].focus(); e.preventDefault(); }
    }else{ // forward
      if(idx === nodes.length -1){ nodes[0].focus(); e.preventDefault(); }
    }
  }
  function openModal(overlay, modal){
    _lastFocused = document.activeElement;
    _activeModal = modal;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    modal.setAttribute('tabindex','-1');
    modal.focus();
    document.addEventListener('keydown', _trapKey);
  }
  function closeModal(overlay, modal){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    document.removeEventListener('keydown', _trapKey);
    _activeModal = null;
    if(_lastFocused && typeof _lastFocused.focus === 'function') _lastFocused.focus();
  }
  function closeActiveModal(){ if(!_activeModal) return; const overlay = _activeModal.closest('.overlay'); closeModal(overlay, _activeModal); }
  let modalDraft = null;

  function openProductModal(id){
    const p = PRODUCTS.find(x=>x.id===id);
    if(!p) return;
    if(p.id === "small-chops"){
      modalDraft = { productId:p.id, qty:1, flavour:null, inscription:"", smallChops:{samosa:0,puffpuff:0,springRoll:0,pepperedMeat:0,other:""} };
    } else {
      modalDraft = { productId:p.id, qty:1, flavour: p.flavours ? p.flavours[0] : null, inscription:"" };
    }
    renderProductModal(p);
    openModal(productOverlay, productModal);
  }
  function renderProductModal(p){
    const isSmallChops = p.id === "small-chops";
    productModal.innerHTML = `
      <button type="button" class="modal-close" id="pmClose" aria-label="Close">✕</button>
      <img src="${p.img}" alt="${p.name}" style="border-radius:14px; margin-bottom:14px;" loading="lazy">
      <h3>${p.name}</h3>
      <div class="m-price">${isSmallChops ? fmt(getSmallChopsTotal(modalDraft.smallChops)) : fmt(p.price)}</div>
      <div style="font-size:15px; opacity:.9; margin-bottom:10px;">${isSmallChops ? `<strong>Price will be negotiated based on quantity.</strong>` : ""}</div>
      <p style="font-size:13.5px; opacity:.75; line-height:1.5; margin-bottom:16px;">${p.desc}</p>
      ${isSmallChops ? `
      <div class="field-group">
        <label>Small Chops counts</label>
        ${p.items.map(item=>`
          <div class="qty-row" style="justify-content:space-between; margin-bottom:10px;">
            <span>${item.label} (${fmt(item.unit)})</span>
            <div class="qty-stepper">
              <button type="button" class="item-minus" data-item="${item.id}">−</button>
              <span class="qty-val" id="${item.id}Val">${modalDraft.smallChops[item.id]}</span>
              <button type="button" class="item-plus" data-item="${item.id}">+</button>
            </div>
          </div>`).join("")}
      </div>
      <div class="field-group">
        <label>Other items (optional)</label>
        <input type="text" id="inscriptionInput" placeholder="e.g. plantain, chicken..." maxlength="80">
      </div>` : ""}
      ${!isSmallChops && p.flavours ? `
      <div class="field-group">
        <label>Flavour</label>
        <div class="option-row" id="flavourRow">
          ${p.flavours.map((f,i)=>`<button type="button" class="opt${i===0?" active":""}" data-flavour="${f}">${f}</button>`).join("")}
        </div>
      </div>` : ""}
      ${!isSmallChops && p.hasInscription ? `
      <div class="field-group">
        <label>Cake inscription (optional)</label>
        <input type="text" id="inscriptionInput" placeholder="e.g. Happy Birthday, Tolu!" maxlength="60">
      </div>` : ""}
      ${!isSmallChops ? `
      <div class="field-group">
        <label>Quantity</label>
        <div class="qty-row">
          <div class="qty-stepper">
            <button type="button" id="qtyMinus">−</button>
            <span class="qty-val" id="qtyVal">1</span>
            <button type="button" id="qtyPlus">+</button>
          </div>
        </div>
      </div>` : ""}
      <button type="button" class="btn btn-primary" id="addToOrderBtn" style="width:100%; justify-content:center;">Add to order — <span id="lineTotal">${fmt(isSmallChops ? getSmallChopsTotal(modalDraft.smallChops) : p.price)}</span></button>
    `;
    document.getElementById("pmClose").addEventListener("click", closeProductModal);
    if(p.flavours){
      productModal.querySelectorAll("#flavourRow .opt").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          productModal.querySelectorAll("#flavourRow .opt").forEach(b=>b.classList.remove("active"));
          btn.classList.add("active");
          modalDraft.flavour = btn.dataset.flavour;
        });
      });
    }
    if(p.hasInscription){
      productModal.querySelector("#inscriptionInput").addEventListener("input", e=>{
        modalDraft.inscription = e.target.value;
      });
    }
    const lineTotal = productModal.querySelector("#lineTotal");
    function getModalTotal(){
      return p.id === "small-chops" ? getSmallChopsTotal(modalDraft.smallChops) : p.price * modalDraft.qty;
    }
    function updateLineTotal(){
      const total = getModalTotal();
      lineTotal.textContent = total ? fmt(total) : "Select items";
    }
    if(p.id !== "small-chops"){
      const qtyVal = productModal.querySelector("#qtyVal");
      productModal.querySelector("#qtyMinus").addEventListener("click", ()=>{
        modalDraft.qty = Math.max(1, modalDraft.qty-1); qtyVal.textContent = modalDraft.qty; updateLineTotal();
      });
      productModal.querySelector("#qtyPlus").addEventListener("click", ()=>{
        modalDraft.qty = Math.min(20, modalDraft.qty+1); qtyVal.textContent = modalDraft.qty; updateLineTotal();
      });
    }
    if(p.id === "small-chops"){
      p.items.forEach(item=>{
        const valEl = productModal.querySelector(`#${item.id}Val`);
        const updateCount = (delta)=>{
          modalDraft.smallChops[item.id] = Math.max(0, modalDraft.smallChops[item.id] + delta);
          valEl.textContent = modalDraft.smallChops[item.id];
          updateLineTotal();
        };
        productModal.querySelector(`.item-minus[data-item="${item.id}"]`).addEventListener("click", ()=> updateCount(-1));
        productModal.querySelector(`.item-plus[data-item="${item.id}"]`).addEventListener("click", ()=> updateCount(1));
      });
      productModal.querySelector("#inscriptionInput").addEventListener("input", e=>{
        modalDraft.inscription = e.target.value;
      });
    }
    if(p.flavours && p.id !== "small-chops"){
      productModal.querySelectorAll("#flavourRow .opt").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          productModal.querySelectorAll("#flavourRow .opt").forEach(b=>b.classList.remove("active"));
          btn.classList.add("active");
          modalDraft.flavour = btn.dataset.flavour;
        });
      });
    }
    if(p.hasInscription && p.id !== "small-chops"){
      productModal.querySelector("#inscriptionInput").addEventListener("input", e=>{
        modalDraft.inscription = e.target.value;
      });
    }
    productModal.querySelector("#addToOrderBtn").addEventListener("click", ()=>{
      if(p.id === "small-chops" && getModalTotal() <= 0){
        alert("Please choose at least one small chops item before adding to your order.");
        return;
      }
      addToCart(p, modalDraft);
      closeProductModal();
      pulseCart();
    });
  }
  function closeProductModal(){ closeModal(productOverlay, productModal); }
  productOverlay.addEventListener("click", e=>{ if(e.target===productOverlay) closeProductModal(); });

  function pulseCart(){
    const pill = document.getElementById("openCartBtn");
    pill.style.transform = "scale(1.08)";
    setTimeout(()=> pill.style.transform = "", 220);
  }

  /* ---------- Cart logic ---------- */
  function addToCart(p, draft){
    const isSmallChops = p.id === "small-chops";
    const packTotal = isSmallChops ? getSmallChopsTotal(draft.smallChops) : p.price;
    if(isSmallChops && packTotal <= 0){
      return;
    }
    const lineId = isSmallChops
      ? `${p.id}|${draft.smallChops.samosa}|${draft.smallChops.puffpuff}|${draft.smallChops.springRoll}|${draft.smallChops.pepperedMeat}|${draft.inscription||""}`
      : p.id + "|" + (draft.flavour||"") + "|" + (draft.inscription||"");
    const existing = state.cart.find(l=>l.lineId===lineId);
    if(existing){
      existing.qty += isSmallChops ? 1 : draft.qty;
    }else{
      state.cart.push({
        lineId,
        productId:p.id,
        name:p.name,
        price:packTotal,
        qty:isSmallChops ? 1 : draft.qty,
        flavour:draft.flavour,
        inscription:isSmallChops ? buildSmallChopsMeta(draft.smallChops, draft.inscription) : draft.inscription
      });
    }
    saveState();
    renderCart();
  }
  function updateQty(lineId, delta){
    const line = state.cart.find(l=>l.lineId===lineId);
    if(!line) return;
    line.qty += delta;
    if(line.qty<=0) state.cart = state.cart.filter(l=>l.lineId!==lineId);
    saveState();
    renderCart();
  }
  function removeLine(lineId){
    state.cart = state.cart.filter(l=>l.lineId!==lineId);
    saveState();
    renderCart();
  }
  function cartTotal(){ return state.cart.reduce((sum,l)=> sum + l.price*l.qty, 0); }
  function cartCount(){ return state.cart.reduce((sum,l)=> sum + l.qty, 0); }

  function renderCart(){
    // Desktop sticky panel
    const list = document.getElementById("orderItemsList");
    const totalEl = document.getElementById("orderTotal");
    const checkoutBtn = document.getElementById("checkoutBtn");
    if(state.cart.length===0){
      list.innerHTML = `<div class="order-empty">Nothing added yet — pick a treat to get started.</div>`;
      checkoutBtn.disabled = true;
    }else{
      list.innerHTML = state.cart.map(l=>cartLineHtml(l)).join("");
      checkoutBtn.disabled = false;
      attachLineHandlers(list);
    }
    totalEl.textContent = fmt(cartTotal());
    document.getElementById("cartCount").textContent = cartCount();

    // Mobile bar
    document.getElementById("mCount").textContent = cartCount();
    document.getElementById("mTotal").textContent = fmt(cartTotal());
    document.getElementById("mobileOrderBar").style.display = state.cart.length ? "flex" : "none";

    // Cart modal (if open, refresh contents live)
    if(cartOverlay.classList.contains("open")) renderCartModal();
  }
  function cartLineHtml(l){
    const isSmallChops = l.productId === "small-chops";
    const meta = [l.flavour, l.inscription ? `“${escapeHtml(l.inscription)}”` : null].filter(Boolean).join(" · ");
    return `
      <div class="order-item" data-line="${l.lineId}">
        <div style="flex:1;">
          <div class="oi-name">${l.qty} × ${l.name}</div>
          ${meta ? `<div class="oi-meta">${meta}</div>` : ""}
          <div class="oi-meta">${isSmallChops ? `Estimated ${fmt(l.price)}` : `${fmt(l.price)} each`}</div>
        </div>
        <div class="qty-stepper">
          <button type="button" class="oi-minus" data-line="${l.lineId}">−</button>
          <span style="font-size:12px; min-width:14px; text-align:center;">${l.qty}</span>
          <button type="button" class="oi-plus" data-line="${l.lineId}">+</button>
        </div>
        <button type="button" class="oi-remove" data-line="${l.lineId}" aria-label="Remove item">✕</button>
      </div>`;
  }
  function attachLineHandlers(container){
    container.querySelectorAll(".oi-plus").forEach(b=>b.addEventListener("click", ()=>updateQty(b.dataset.line,1)));
    container.querySelectorAll(".oi-minus").forEach(b=>b.addEventListener("click", ()=>updateQty(b.dataset.line,-1)));
    container.querySelectorAll(".oi-remove").forEach(b=>b.addEventListener("click", ()=>removeLine(b.dataset.line)));
  }

  /* ---------- Cart modal (mobile trigger + "Your order" button) ---------- */
  const cartOverlay = document.getElementById("cartOverlay");
  const cartModal = document.getElementById("cartModal");
  function renderCartModal(){
    cartModal.innerHTML = `
      <button type="button" class="modal-close" id="cmClose" aria-label="Close">✕</button>
      <h3>Your order</h3>
      <div class="order-items" style="max-height:340px;">
        ${state.cart.length ? state.cart.map(l=>cartLineHtml(l)).join("") : `<div class="order-empty">Nothing added yet — pick a treat to get started.</div>`}
      </div>
      <div class="order-total-row"><span>Estimated total</span><span>${fmt(cartTotal())}</span></div>
      <button type="button" class="btn btn-wa" id="cmCheckoutBtn" style="width:100%; justify-content:center;" ${state.cart.length?"":"disabled"}>
        Complete order on WhatsApp
      </button>
    `;
    document.getElementById("cmClose").addEventListener("click", ()=>closeModal(cartOverlay, cartModal));
    attachLineHandlers(cartModal);
    const btn = document.getElementById("cmCheckoutBtn");
    if(btn) btn.addEventListener("click", ()=>{ closeModal(cartOverlay, cartModal); openCheckoutModal(); });
  }
  document.getElementById("openCartBtn").addEventListener("click", ()=>{ renderCartModal(); openModal(cartOverlay, cartModal); });
  document.getElementById("mobileOrderBar").addEventListener("click", ()=>{ renderCartModal(); openModal(cartOverlay, cartModal); });
  cartOverlay.addEventListener("click", e=>{ if(e.target===cartOverlay) closeModal(cartOverlay, cartModal); });
  document.getElementById("checkoutBtn").addEventListener("click", openCheckoutModal);

  /* ---------- Checkout modal → WhatsApp message ---------- */
  const checkoutOverlay = document.getElementById("checkoutOverlay");
  const checkoutModal = document.getElementById("checkoutModal");

  function openCheckoutModal(){
    if(state.cart.length===0) return;
    checkoutModal.innerHTML = `
      <button type="button" class="modal-close" id="ckClose" aria-label="Close">✕</button>
      <h3>Complete your order</h3>
      <p style="font-size:13px; opacity:.7; margin-bottom:18px;">Fill this in and we'll turn it into a message for WhatsApp — nothing is sent until you tap send in the chat.</p>
      <div class="checkout-grid">
        <div class="field-group full"><label>Your phone number</label><input type="tel" id="ckPhone" placeholder="080XXXXXXXX"></div>
        <div class="field-group"><label>Delivery method</label>
          <select id="ckMethod"><option value="Delivery">Delivery</option><option value="Pickup">Pickup</option></select>
        </div>
        <div class="field-group"><label>Event date</label><input type="date" id="ckDate"></div>
        <div class="field-group full" id="ckAddressGroup"><label>Delivery address</label><input type="text" id="ckAddress" placeholder="e.g. Oshodi, Lagos"></div>
        <div class="field-group full"><label>Special instructions</label><textarea id="ckNotes" rows="2" placeholder="e.g. Less sugar, extra icing…"></textarea></div>
      </div>
      <div class="receipt-preview" id="ckPreview"></div>
      <button type="button" class="btn btn-wa" id="ckSendBtn" style="width:100%; justify-content:center; margin-top:16px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.9-1.4A10 10 0 1012 2z"/></svg>
        Send order on WhatsApp
      </button>
    `;
    document.getElementById("ckClose").addEventListener("click", ()=>closeModal(checkoutOverlay, checkoutModal));
    const methodSelect = document.getElementById("ckMethod");
    const addressGroup = document.getElementById("ckAddressGroup");
    function toggleAddress(){ addressGroup.style.display = methodSelect.value==="Delivery" ? "block" : "none"; }
    methodSelect.addEventListener("change", ()=>{ toggleAddress(); updatePreview(); });
    toggleAddress();

    ["ckPhone","ckDate","ckAddress","ckNotes"].forEach(id=>{
      document.getElementById(id).addEventListener("input", updatePreview);
    });
    updatePreview();
    document.getElementById("ckSendBtn").addEventListener("click", sendToWhatsApp);
    openModal(checkoutOverlay, checkoutModal);
  }
  checkoutOverlay.addEventListener("click", e=>{ if(e.target===checkoutOverlay) closeModal(checkoutOverlay, checkoutModal); });

  function buildMessage(){
    const phone = document.getElementById("ckPhone").value.trim() || "—";
    const method = document.getElementById("ckMethod").value;
    const address = document.getElementById("ckAddress") ? document.getElementById("ckAddress").value.trim() : "";
    const date = document.getElementById("ckDate").value;
    const notes = document.getElementById("ckNotes").value.trim();

    const dateFormatted = date ? new Date(date+"T00:00:00").toLocaleDateString("en-GB",{ day:"numeric", month:"long", year:"numeric" }) : "—";

    let lines = [];
    lines.push("*New Order - La'deola Cakes_n_Confectionery*");
    lines.push("");
    lines.push(`Phone: ${phone}`);
    lines.push(`Delivery Method: ${method}`);
    if(method==="Delivery") lines.push(`Delivery Address: ${address || "—"}`);
    lines.push(`Event Date: ${dateFormatted}`);
    lines.push("");
    lines.push("*Items Ordered*");
    lines.push("");
    state.cart.forEach(l=>{
      const isSmallChops = l.productId === "small-chops";
      lines.push(`${l.qty} × ${l.name}`);
      if(l.flavour) lines.push(`- Flavour: ${l.flavour}`);
      if(l.inscription) lines.push(`- ${isSmallChops ? "Details" : "Inscription"}: ${l.inscription}`);
      lines.push(`- ${isSmallChops ? "Estimated Price" : "Price"}: ${fmt(l.price)}`);
      lines.push("");
    });
    lines.push("*Special Instructions:*");
    lines.push(notes || "None");
    lines.push("");
    lines.push(`*Estimated Total:* ${fmt(cartTotal())}`);
    return lines.join("\n");
  }
  function updatePreview(){
    document.getElementById("ckPreview").textContent = buildMessage();
  }
  function sendToWhatsApp(){
    const message = buildMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");
  }

  /* ---------- Generic floating WhatsApp (no cart needed) ---------- */
  function openGeneralWhatsApp(){
    const msg = "Hi La'deola! I'd like to ask about your cakes, packages and pastries.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  }
  document.getElementById("floatWaBtn").addEventListener("click", openGeneralWhatsApp);
  document.getElementById("heroWaBtn").addEventListener("click", openGeneralWhatsApp);
  document.getElementById("footerWaLink").addEventListener("click", e=>{ e.preventDefault(); openGeneralWhatsApp(); });

  /* ---------- Mobile nav toggle ---------- */
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavClose = document.getElementById("mobileNavClose");
  if(mobileMenuBtn && mobileNav){
    mobileMenuBtn.addEventListener("click", ()=>{
      const open = mobileNav.classList.toggle("open");
      mobileNav.setAttribute("aria-hidden", String(!open));
      mobileMenuBtn.setAttribute("aria-expanded", String(open));
    });
    mobileNavClose && mobileNavClose.addEventListener("click", ()=>{ mobileNav.classList.remove("open"); mobileNav.setAttribute("aria-hidden","true"); mobileMenuBtn.setAttribute("aria-expanded","false"); });
    // close when clicking a link
    mobileNav.querySelectorAll(".mobile-links a").forEach(a=> a.addEventListener("click", ()=>{ mobileNav.classList.remove("open"); mobileNav.setAttribute("aria-hidden","true"); mobileMenuBtn.setAttribute("aria-expanded","false"); }));
  }

  /* ---------- Header scroll shadow + back-to-top ---------- */
  const header = document.getElementById("siteHeader");
  const backTop = document.getElementById("backTop");
  window.addEventListener("scroll", ()=>{
    header.classList.toggle("scrolled", window.scrollY > 8);
    backTop.classList.toggle("show", window.scrollY > 500);
  }, { passive:true });
  backTop.addEventListener("click", ()=> window.scrollTo({ top:0, behavior:"smooth" }));

  /* ---------- Dark mode ---------- */
  const darkToggle = document.getElementById("darkToggle");
  const darkIcon = document.getElementById("darkIcon");
  function setIcon(){
    const isDark = document.documentElement.classList.contains("dark");
    darkIcon.innerHTML = isDark
      ? `<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>`
      : `<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>`;
  }
  darkToggle.addEventListener("click", ()=>{
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    setIcon();
    saveDarkMode(isDark);
  });

  /* ---------- Service worker registration (PWA) ---------- */
  if("serviceWorker" in navigator){
    window.addEventListener("load", ()=>{
      navigator.serviceWorker.register("sw.js").catch(()=>{ /* fine if unavailable in this preview */ });
    });
  }

  /* ---------- Boot ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  async function boot(){
    // Always start fresh on reload: clear persisted cart and scroll to top
    try{ await platformStorage.set("layers-lagos:cart", JSON.stringify([])); }catch(e){}
    window.scrollTo({ top: 0 });
    await loadDarkMode();
    setIcon();
    await loadState();
    renderProducts();
    renderCart();
    setTimeout(()=>{ document.getElementById("loader").classList.add("hide"); }, 550);
  }
  boot();
})();
