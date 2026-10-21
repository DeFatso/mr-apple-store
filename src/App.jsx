import { useEffect, useMemo, useState } from "react";
import {
  Apple, Search, ShoppingBag, X, Plus, Minus, ArrowUpRight,
  Check, Menu, ArrowRight, ShieldCheck, Truck, Headphones
} from "lucide-react";
import { products } from "./data/products";

const categories = ["All", "iPhone", "Mac", "iPad", "Watch", "Audio"];
const WHATSAPP_NUMBER = "263776892294"; // Add your WhatsApp number with country code, digits only. Example: 27821234567

const money = (value) => new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 0
}).format(value);

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("apple-store-cart") || "{}"); }
    catch { return {}; }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem("apple-store-cart", JSON.stringify(cart));
  }, [cart]);

  const visibleProducts = useMemo(() => products.filter((p) => {
    const categoryMatch = activeCategory === "All" || p.category === activeCategory;
    const searchMatch = `${p.name} ${p.category} ${p.tagline}`.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch;
  }), [activeCategory, search]);

  const cartItems = products.filter((p) => cart[p.id] > 0).map((p) => ({ ...p, quantity: cart[p.id] }));
  const cartCount = cartItems.reduce((sum, p) => sum + p.quantity, 0);
  const subtotal = cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const addToCart = (product) => {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 }));
    setNotice(`${product.name} added to your bag`);
    window.setTimeout(() => setNotice(""), 2400);
  };

  const changeQuantity = (id, delta) => setCart((current) => {
    const next = { ...current, [id]: Math.max(0, (current[id] || 0) + delta) };
    if (next[id] === 0) delete next[id];
    return next;
  });

  const checkout = () => {
    if (!cartItems.length) return;
    const lines = cartItems.map((p) => `• ${p.name} × ${p.quantity} — ${money(p.price * p.quantity)}`).join("\n");
    const message = `Hello! I'd like to place an order:\n\n${lines}\n\nSubtotal: ${money(subtotal)}\n\nPlease confirm availability and delivery details.`;
    if (!WHATSAPP_NUMBER) {
      setNotice("Add your WhatsApp number in src/App.jsx to enable order checkout.");
      window.setTimeout(() => setNotice(""), 4200);
      return;
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="app-shell">
      <div className="announcement">A little something for your everyday. <span>Discover the collection <ArrowUpRight size={13} /></span></div>
      <header className="nav">
        <a className="brand" href="#" aria-label="Apple Store home"><Apple size={24} fill="currentColor" strokeWidth={1.4} /><span>store</span></a>
        <nav className={mobileMenu ? "nav-links open" : "nav-links"}>
          <a href="#shop" onClick={() => setMobileMenu(false)}>Shop</a>
          <a href="#why-us" onClick={() => setMobileMenu(false)}>Why us</a>
          <a href="#footer" onClick={() => setMobileMenu(false)}>Contact</a>
        </nav>
        <div className="nav-actions">
          <label className="nav-search"><Search size={17} /><input value={search} onChange={(e) => { setSearch(e.target.value); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} placeholder="Search" aria-label="Search products" /></label>
          <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Open shopping bag, ${cartCount} items`}><ShoppingBag size={20} />{cartCount > 0 && <span className="bag-count">{cartCount}</span>}</button>
          <button className="mobile-menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle navigation">{mobileMenu ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> THE APPLE COLLECTION</p>
            <h1>Good things<br />come in <em>Apple.</em></h1>
            <p className="hero-description">The devices you love. The details that matter. Find your next favourite right here.</p>
            <div className="hero-actions"><a className="button button-dark" href="#shop">Shop the collection <ArrowRight size={16} /></a><a className="text-link" href="#why-us">The store, reimagined</a></div>
            <div className="hero-proof"><div className="proof-avatars"><span>A</span><span>✦</span><span>●</span></div><p><strong>Made for your everyday.</strong><br />Thoughtfully selected tech.</p></div>
          </div>
          <div className="hero-visual">
            <div className="hero-orbit orbit-one"></div><div className="hero-orbit orbit-two"></div>
            <div className="hero-image-wrap"><img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1100&q=90" alt="Premium smartphone" /></div>
            <div className="floating-note note-top"><span className="note-icon"><Apple size={16} fill="currentColor" /></span><span><b>Thoughtful tech.</b><small>Made to fit your life.</small></span></div>
            <div className="floating-note note-bottom"><span className="note-stars">✳</span><span><b>Find your next favourite</b><small>Explore the collection <ArrowUpRight size={12} /></small></span></div>
            <div className="hero-stamp">A better<br />everyday<span>®</span></div>
          </div>
          <div className="hero-bottom-label"><span>01 / 03</span><span>DESIGNED FOR EVERYDAY LIFE</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <section className="category-section" aria-label="Shop by category">
          <div className="section-kicker">A GOOD PLACE TO START</div>
          <div className="category-row">
            {[
              ["All", "Everything", "✳"], ["iPhone", "iPhone", "▯"], ["Mac", "Mac", "▱"],
              ["iPad", "iPad", "▭"], ["Watch", "Watch", "◷"], ["Audio", "Audio", "◖"]
            ].map(([key, label, glyph]) => <button key={key} className={`category-pill ${activeCategory === key ? "selected" : ""}`} onClick={() => { setActiveCategory(key); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}><span>{glyph}</span>{label}</button>)}
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading"><div><p className="eyebrow">THE LINEUP</p><h2>{activeCategory === "All" ? "A few things you'll love." : `${activeCategory}, thoughtfully chosen.`}</h2><p className="muted">Good design. Brilliant details. Everyday magic.</p></div><span className="product-total">{visibleProducts.length.toString().padStart(2, "0")} PRODUCTS</span></div>
          {visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product, index) => <article className="product-card" key={product.id}>
            <div className={`product-image product-image-${index % 4}`}>
              {product.badge && <span className="product-badge">{product.badge}</span>}
              <button className="quick-add" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to bag`}><Plus size={19} /></button>
              <img src={product.image} alt={product.name} loading="lazy" />
              <span className="image-index">0{index + 1}</span>
            </div>
            <div className="product-info"><div><p className="product-category">{product.category.toUpperCase()}</p><h3>{product.name}</h3><p className="product-tagline">{product.tagline}</p></div><div className="product-price">{money(product.price)}<span> USD</span></div></div>
            <button className="add-button" onClick={() => addToCart(product)}>Add to bag <Plus size={15} /></button>
          </article>)}</div> : <div className="empty-search"><Search size={28} /><h3>No products found</h3><p>Try another search or category.</p><button className="button button-dark" onClick={() => { setSearch(""); setActiveCategory("All"); }}>Clear filters</button></div>}
        </section>

        <section className="manifesto" id="why-us"><div className="manifesto-mark"><Apple size={30} fill="currentColor" strokeWidth={1.3} /></div><p className="eyebrow">A LITTLE LESS COMPLICATED</p><h2>Good tech should<br />just <em>feel right.</em></h2><p className="manifesto-copy">From the first unboxing to your thousandth photo, the right device makes everyday things feel a little more effortless.</p><a className="text-link" href="#shop">Find your something <ArrowRight size={15} /></a><div className="manifesto-decoration">GOOD<br />THINGS<br />INSIDE.</div></section>

        <section className="service-strip"><div><Truck size={23} /><span><b>Delivery options</b><small>Ask us about delivery</small></span></div><div><ShieldCheck size={23} /><span><b>Carefully selected</b><small>Quality you can feel</small></span></div><div><Headphones size={23} /><span><b>Here to help</b><small>Personal support</small></span></div></section>
      </main>

      <footer id="footer"><div className="footer-main"><a className="brand footer-brand" href="#"><Apple size={24} fill="currentColor" strokeWidth={1.4} /><span>store</span></a><p>Good things for your everyday.</p><a href="#shop" className="footer-shop">Explore the collection <ArrowUpRight size={14} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Apple Store Concept</span><span>Independent retail concept. Not affiliated with Apple Inc.</span><a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>BACK TO TOP ↑</a></div></footer>

      {notice && <div className="toast" role="status"><Check size={17} />{notice}</div>}

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(e) => e.stopPropagation()} aria-label="Shopping bag">
        <div className="drawer-header"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({cartCount})</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close bag"><X /></button></div>
        {cartItems.length ? <><div className="cart-list">{cartItems.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div className="cart-item-info"><h3>{item.name}</h3><p>{money(item.price)} each</p><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`Decrease ${item.name} quantity`}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label={`Increase ${item.name} quantity`}><Plus size={13} /></button></div></div><strong>{money(item.price * item.quantity)}</strong></div>)}</div><div className="cart-summary"><div className="subtotal"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Shipping and taxes, if applicable, are confirmed when you place your order.</p><button className="button button-dark checkout-button" onClick={checkout}>Order via WhatsApp <ArrowUpRight size={16} /></button><button className="continue-button" onClick={() => setCartOpen(false)}>Continue shopping</button></div></> : <div className="empty-cart"><div className="empty-bag"><ShoppingBag size={27} /></div><h3>Your bag is taking a little break.</h3><p>Find something that makes your day.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>Explore products</button></div>}
      </aside></div>}
    </div>
  );
}

export default App;
