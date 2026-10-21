"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { products, testimonials, type Product } from "@/lib/storeData";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { QuantityControl } from "@/components/ui/QuantityControl";
import { ProductCard } from "@/components/ui/ProductCard";
import { Link } from "@/components/ui/Link";
import type { CartLine, Currency, Delivery, Order } from "@/components/providers/CartProvider";

const images = {
  hero: "https://images.unsplash.com/photo-1530049478161-0780526964f4?auto=format&fit=crop&w=2200&q=90",
  herbs: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=1400&q=85",
  beauty: "https://images.unsplash.com/photo-1748543668751-902d6461890d?auto=format&fit=crop&w=1400&q=85",
  story: "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?auto=format&fit=crop&w=1400&q=85",
};

function Logo({ light = false }: { light?: boolean }) {
  return <Link className={`logo ${light ? "logo-light" : ""}`} to="/" ><span className="logo-mark"><Icon name="leaf" size={24} /></span><span><strong>PENMAX</strong><small>Herbal Medical Centre</small></span></Link>;
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}


export function HomePage({ formatPrice, add }: { formatPrice: (amount: number) => string; add: (product: Product) => void }) {
  const [testimonial, setTestimonial] = useState(0);
  const [signedUp, setSignedUp] = useState(false);
  useEffect(() => { const timer = window.setInterval(() => setTestimonial((v) => (v + 1) % testimonials.length), 6500); return () => clearInterval(timer); }, []);
  useEffect(() => { if (window.location.hash) setTimeout(() => document.querySelector(window.location.hash)?.scrollIntoView(), 20); }, []);
  return <main className="page-enter">
    <section className="hero" id="home" style={{ backgroundImage: `url(${images.hero})` }}><div className="hero-content"><span className="hero-kicker"><span /> Born from African botanicals</span><h1>Nature’s healing,<br /><em>crafted with care.</em></h1><p>Thoughtful herbal remedies and natural beauty essentials, prepared in Kenya and delivered to your door, wherever you are.</p><div className="hero-buttons"><Link className="button button-gold" to="/shop">Shop now <span>↗</span></Link><Link className="button button-ghost" to="/shop?category=Herbal%20Remedies">Explore remedies</Link></div></div><div className="hero-note"><span>01</span><p>Natural rituals<br />for modern living</p></div><a className="scroll-cue" href="#trust">Scroll to discover <span>↓</span></a></section>
    <section className="trust-bar" id="trust">{[["leaf", "100% Natural", "Pure plant ingredients"], ["truck", "Worldwide Shipping", "From Kenya to your door"], ["shield", "Secure Payments", "M-Pesa & major cards"], ["sparkles", "Herbal Expertise", "Made with deep care"]].map(([icon, title, text]) => <div className="trust-item" key={title}><Icon name={icon as IconName} size={25} /><div><strong>{title}</strong><small>{text}</small></div></div>)}</section>
    <section className="categories section"><SectionHeading eyebrow="Find your ritual" title="Shop by category" copy="Everyday essentials, made slowly and intentionally with ingredients you can understand." /><div className="category-grid"><Link className="category-card" to="/shop?category=Herbal%20Remedies"><img src={images.herbs} alt="Natural herbs and spices" /><div className="category-overlay"><span>01 — Natural wellness</span><h3>Herbal<br />Remedies</h3><p>Explore the collection <b>→</b></p></div></Link><Link className="category-card" to="/shop?category=Beauty%20%26%20Skincare"><img src={images.beauty} alt="Natural skincare with leaves" /><div className="category-overlay"><span>02 — Botanical care</span><h3>Beauty &<br />Skincare</h3><p>Explore the collection <b>→</b></p></div></Link></div></section>
    <section className="products-section section"><div className="products-heading"><SectionHeading eyebrow="Penmax favourites" title="Nature’s finest, chosen for you" /><Link to="/shop">View all products <span>→</span></Link></div><div className="product-grid">{products.map((p) => <ProductCard product={p} formatPrice={formatPrice} add={add} key={p.id} />)}</div></section>
    <section className="story section" id="about"><div className="story-image"><img src={images.story} alt="Natural herbs in glass jars" /><div className="story-seal"><Icon name="leaf" size={30} /><span>Grown by nature<br />Made in Kenya</span></div></div><div className="story-content"><span className="eyebrow">Our roots, your ritual</span><h2>Wellness wisdom,<br /><em>rooted in Kenya.</em></h2><p className="lead">At Penmax, we believe nature offers the most thoughtful path to everyday wellbeing.</p><p>Our blends begin with time-honoured herbal knowledge and carefully selected botanicals. Each product is prepared in small batches, with close attention to purity and quality.</p><p>From Nairobi, we’re proud to share a distinctly Kenyan approach to natural care with families around the world.</p><a className="text-link" href="#contact">Discover our story <span>→</span></a></div></section>
    <section className="why section"><SectionHeading eyebrow="The Penmax promise" title="Wellness, without compromise" /><div className="why-grid">{[["01", "leaf", "Natural & Pure", "Thoughtfully sourced botanicals, with no unnecessary fillers or harsh additives."], ["02", "sparkles", "Carefully Prepared", "Made in considered small batches to honour each ingredient and its natural character."], ["03", "globe", "Delivered Worldwide", "Securely packed in Nairobi and sent with care to customers across the globe."]].map(([n, i, title, text]) => <article className="why-card" key={title}><span>{n}</span><div className="why-icon"><Icon name={i as IconName} size={27} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="testimonials section"><span className="eyebrow">Notes from our community</span><div className="quote-mark">“</div><div className="testimonial-stage"><p>“{testimonials[testimonial].quote}”</p><Stars /><strong>{testimonials[testimonial].name}</strong><small>{testimonials[testimonial].country}</small></div><div className="testimonial-controls">{testimonials.map((t, i) => <button className={i === testimonial ? "active" : ""} onClick={() => setTestimonial(i)} key={t.name} />)}</div></section>
    <section className="newsletter section"><div><span className="eyebrow">A little goodness, delivered</span><h2>Join the Penmax family.</h2><p>Natural wellness notes, new rituals, and 10% off your first order.</p></div><form onSubmit={(e: FormEvent) => { e.preventDefault(); setSignedUp(true); }}><input type="email" required placeholder="Your email address" /><button>{signedUp ? "You’re on the list" : "Join us"} <span>→</span></button></form></section>
  </main>;
}

function Stars() {
  return <div className="stars">{[1, 2, 3, 4, 5].map((n) => <Icon name="star" size={15} key={n} />)}</div>;
}

export function ShopPage({ formatPrice, add, initialCategory = "" }: { formatPrice: (n: number) => string; add: (p: Product) => void; initialCategory?: string }) {
  const [category, setCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(4000);
  const [stock, setStock] = useState(false);
  const [sort, setSort] = useState("featured");
  const [filters, setFilters] = useState(false);
  useEffect(() => setCategory(initialCategory), [initialCategory]);
  const shown = useMemo(() => {
    const list = products.filter((p) => (!category || p.category === category) && p.price <= maxPrice && (!stock || p.inStock));
    if (sort === "low") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...list].sort((a, b) => b.price - a.price);
    if (sort === "new") return [...list].sort((a, b) => Number(b.badge === "New") - Number(a.badge === "New"));
    return list;
  }, [category, maxPrice, stock, sort]);
  const filterContent = <><div className="filter-block"><h3>Category</h3><label><input type="radio" name="category" checked={!category} onChange={() => setCategory("")} /> All products</label>{["Herbal Remedies", "Beauty & Skincare"].map((c) => <label key={c}><input type="radio" name="category" checked={category === c} onChange={() => setCategory(c)} /> {c}</label>)}</div><div className="filter-block"><h3>Price range</h3><input className="range" type="range" min="1000" max="4000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} /><div className="range-label"><span>KSh 1,000</span><span>KSh {maxPrice.toLocaleString()}</span></div></div><div className="filter-block filter-toggle"><span>In stock only</span><button className={stock ? "on" : ""} onClick={() => setStock(!stock)}><i /></button></div></>;
  return <main className="page-enter store-page">
    <section className="page-hero"><Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Shop" }]} /><h1>Natural rituals,<br /><em>made for you.</em></h1><p>Explore considered herbal wellness and botanical care, thoughtfully prepared in Kenya.</p></section>
    <section className="shop-layout">
      <aside className="filters"><div className="filters-title"><h2>Filter by</h2><button onClick={() => { setCategory(""); setMaxPrice(4000); setStock(false); }}>Reset</button></div>{filterContent}</aside>
      <div className="shop-results"><div className="shop-tools"><p><strong>{shown.length}</strong> products</p><button className="filter-mobile" onClick={() => setFilters(true)}>Filters <span>({category ? 1 : 0})</span></button><label>Sort by <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="new">Newest</option><option value="low">Price low–high</option><option value="high">Price high–low</option></select></label></div>
        {shown.length ? <div className="product-grid shop-grid">{shown.map((p) => <ProductCard product={p} formatPrice={formatPrice} add={add} key={p.id} />)}</div> : <div className="no-results"><Icon name="leaf" size={34} /><h2>No rituals found</h2><p>Try broadening your filters to discover more botanical care.</p><button onClick={() => { setCategory(""); setMaxPrice(4000); setStock(false); }}>Clear filters</button></div>}
      </div>
    </section>
    <div className={`filter-drawer ${filters ? "open" : ""}`}><div><h2>Filter products</h2><button onClick={() => setFilters(false)}><Icon name="close" /></button></div>{filterContent}<button className="apply-filter" onClick={() => setFilters(false)}>Show {shown.length} products</button></div>{filters && <div className="drawer-backdrop open" onClick={() => setFilters(false)} />}
  </main>;
}

export function ProductPage({ product, addLine, buyNow }: { product: Product; addLine: (p: Product, variant: string, qty: number) => void; buyNow: (p: Product, variant: string, qty: number) => void }) {
  const [image, setImage] = useState(product.gallery[0]);
  const [variant, setVariant] = useState(product.variants[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("Description");
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const formatKes = (amount: number) => `KSh ${amount.toLocaleString("en-KE")}`;
  const tabContent: Record<string, string> = { Description: product.longDescription, Ingredients: product.ingredients, "How to Use": product.usage, "Shipping & Returns": "Orders are prepared in 1–2 working days. Kenya deliveries typically arrive in 1–4 days; international delivery takes approximately 7–14 days. Unopened items may be returned within 14 days." };
  return <main className="page-enter product-page">
    <div className="product-breadcrumb"><Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Shop", to: "/shop" }, { label: product.category, to: `/shop?category=${encodeURIComponent(product.category)}` }, { label: product.name }]} /></div>
    <section className="product-detail">
      <div className="gallery"><div className="thumbnails">{product.gallery.map((src, i) => <button className={src === image ? "active" : ""} onClick={() => setImage(src)} key={src}><img src={src} alt={`${product.name} view ${i + 1}`} /></button>)}</div><div className="main-image"><img src={image} alt={product.name} />{product.badge && <span className="badge">{product.badge}</span>}<small>Hover to explore</small></div></div>
      <div className="detail-info"><span className="eyebrow">{product.category}</span><h1>{product.name}</h1><div className="rating"><Stars /><a href="#reviews">{product.rating} · {product.reviews} reviews</a></div><strong className="detail-price">{formatKes(variant.price)}</strong><p className="detail-description">{product.description} {product.longDescription}</p><div className="option-label"><strong>Choose size</strong><span>{variant.name}</span></div><div className="variants">{product.variants.map((v) => <button className={v.name === variant.name ? "active" : ""} onClick={() => setVariant(v)} key={v.name}>{v.name}<small>{formatKes(v.price)}</small></button>)}</div><div className="purchase-row"><QuantityControl value={qty} onChange={setQty} /><button className="primary-action" onClick={() => addLine(product, variant.name, qty)}>Add to cart</button></div><button className="buy-action" onClick={() => buyNow(product, variant.name, qty)}>Buy now</button><a className="product-whatsapp" href={`https://wa.me/254700000000?text=${encodeURIComponent(`Hello Penmax, I would like to order ${qty} × ${product.name} (${variant.name}).`)}`} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> Order on WhatsApp</a><div className="detail-trust"><span><Icon name="leaf" /> Natural ingredients</span><span><Icon name="truck" /> Worldwide shipping</span><span><Icon name="shield" /> Secure payment</span></div></div>
    </section>
    <section className="product-tabs"><div className="tab-list">{Object.keys(tabContent).map((name) => <button className={tab === name ? "active" : ""} onClick={() => setTab(name)} key={name}>{name}</button>)}</div><p>{tabContent[tab]}</p></section>
    <section className="reviews-section section" id="reviews"><div className="reviews-head"><div><span className="eyebrow">Shared experiences</span><h2>Customer reviews</h2></div><div className="rating-summary"><strong>{product.rating}</strong><div><Stars /><span>Based on {product.reviews} reviews</span></div></div></div><div className="review-grid">{[["A beautiful daily ritual", "I noticed how carefully this was prepared from the moment I opened the parcel. It feels natural, considered, and easy to use every day.", "Grace W.", "Kenya"], ["Simple, pure and beautifully packed", "The texture and botanical scent are lovely. My routine feels more intentional, and international delivery was smooth.", "Maya K.", "United Kingdom"], ["Already reordered", "Penmax has become part of my morning routine. I appreciate the clear ingredients and thoughtful quality.", "Nia D.", "Canada"]].map(([title, copy, name, place]) => <article key={name}><Stars /><h3>{title}</h3><p>{copy}</p><strong>{name}</strong><small>Verified buyer · {place}</small></article>)}</div></section>
    <section className="related section"><SectionHeading eyebrow="Continue your ritual" title="You may also like" /><div className="product-grid">{related.map((p) => <ProductCard product={p} formatPrice={formatKes} add={(item) => addLine(item, item.variants[0].name, 1)} key={p.id} />)}</div></section>
  </main>;
}

export function CartPage({ lines, formatPrice, update, remove, subtotal, discount, applyPromo, promoMessage }: { lines: CartLine[]; formatPrice: (n: number) => string; update: (i: number, q: number) => void; remove: (i: number) => void; subtotal: number; discount: number; applyPromo: (code: string) => void; promoMessage: string }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  if (!lines.length) return <main className="page-enter empty-page"><div className="empty-cart"><div><Icon name="bag" size={34} /></div><span className="eyebrow">Your shopping bag</span><h1>Your bag is waiting</h1><p>Discover botanical care, made thoughtfully in Kenya.</p><Link className="primary-action" to="/shop">Continue shopping</Link></div></main>;
  return <main className="page-enter cart-page"><div className="cart-title"><Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Cart" }]} /><h1>Your shopping bag</h1><p>{lines.reduce((s, l) => s + l.qty, 0)} items, selected with care.</p></div><div className="cart-layout"><div className="cart-lines">{lines.map((line, i) => { const p = products.find((item) => item.id === line.id)!; const price = p.variants.find((v) => v.name === line.variant)?.price || p.price; return <article className="cart-page-item" key={`${line.id}-${line.variant}`}><img src={p.image} alt={p.name} /><div><span>{p.category}</span><Link to={`/product/${p.slug}`}><h2>{p.name}</h2></Link><p>{line.variant}</p><strong>{formatPrice(price)}</strong><button onClick={() => remove(i)}>Remove</button></div><div><QuantityControl value={line.qty} onChange={(q) => update(i, q)} /><strong>{formatPrice(price * line.qty)}</strong></div></article>; })}</div><aside className="order-summary"><h2>Order summary</h2><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>{discount > 0 && <div className="discount-line"><span>Penmax family discount</span><strong>−{formatPrice(discount)}</strong></div>}<div><span>Shipping</span><small>Calculated at checkout</small></div><div className="summary-total"><span>Total</span><strong>{formatPrice(subtotal - discount)}</strong></div><form onSubmit={(e) => { e.preventDefault(); applyPromo(code); }}><label>Have a promo code?</label><div><input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code" /><button>Apply</button></div>{promoMessage && <p>{promoMessage}</p>}</form><button className="primary-action" onClick={() => router.push("/checkout")}>Proceed to checkout <span>→</span></button><small className="secure-note"><Icon name="shield" size={14} /> Secure checkout · M-Pesa accepted</small></aside></div></main>;
}

export function CheckoutPage({ lines, currency, formatPrice, subtotal, discount, finish }: { lines: CartLine[]; currency: Currency; formatPrice: (n: number) => string; subtotal: number; discount: number; finish: (delivery: Delivery, details: Record<string, string>) => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "Kenya", city: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deliveryIndex, setDeliveryIndex] = useState(0);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [modal, setModal] = useState<"idle" | "loading" | "success">("idle");
  const deliveries: Delivery[] = form.country === "Kenya" ? [{ name: "Nairobi delivery", price: 350, eta: "1–2 working days" }, { name: "Countrywide courier", price: 550, eta: "2–4 working days" }, { name: "Pick up in Nairobi", price: 0, eta: "Ready next working day" }] : [{ name: "International shipping", price: 2800, eta: "Estimated 7–14 days" }];
  const delivery = deliveries[Math.min(deliveryIndex, deliveries.length - 1)];
  const total = subtotal - discount + delivery.price;
  useEffect(() => setDeliveryIndex(0), [form.country]);
  if (!lines.length) return <main className="empty-page"><div className="empty-cart"><h1>Your bag is empty</h1><p>Add something to your ritual before checking out.</p><Link className="primary-action" to="/shop">Visit the shop</Link></div></main>;
  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please tell us your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (form.phone.replace(/\D/g, "").length < 7) next.phone = "Enter a valid phone number.";
    if (!form.city.trim()) next.city = "Please enter your city.";
    if (!form.address.trim()) next.address = "Please enter your delivery address.";
    setErrors(next); return !Object.keys(next).length;
  };
  const pay = () => {
    if (form.phone.replace(/\D/g, "").length < 7) { setErrors({ phone: "Enter the M-Pesa phone number." }); return; }
    setModal("loading");
    window.setTimeout(() => { setModal("success"); window.setTimeout(() => finish(delivery, form), 1200); }, 2600);
  };
  const field = (key: keyof typeof form, label: string, type = "text") => <label className={`form-field ${errors[key] ? "error" : ""}`}><span>{label}</span><input type={type} value={form[key]} onChange={(e) => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: "" }); }} />{errors[key] && <small>{errors[key]}</small>}</label>;
  return <main className="checkout-page page-enter">
    <button className="mobile-summary-toggle" onClick={() => setSummaryOpen(!summaryOpen)}>Your order · {lines.reduce((s, l) => s + l.qty, 0)} items <strong>{formatPrice(total)}</strong></button>
    <div className="checkout-layout"><div className="checkout-form"><Link className="back-shop" to="/cart">← Return to bag</Link><div className="checkout-steps">{["Contact & Shipping", "Delivery", "Payment"].map((name, i) => <div className={step >= i + 1 ? "active" : ""} key={name}><span>{step > i + 1 ? "✓" : i + 1}</span><small>{name}</small></div>)}</div>
      {step === 1 && <section><span className="eyebrow">Step one</span><h1>Where should we send it?</h1><p>We’ll use these details for delivery updates and your receipt.</p><div className="form-grid">{field("name", "Full name")}{field("email", "Email address", "email")}<label className={`form-field ${errors.phone ? "error" : ""}`}><span>Phone number</span><div className="phone-field"><select><option>+254</option><option>+44</option><option>+1</option><option>+27</option></select><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>{errors.phone && <small>{errors.phone}</small>}</label><label className="form-field"><span>Country</span><select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}><option>Kenya</option><option>United Kingdom</option><option>United States</option><option>Canada</option><option>South Africa</option><option>Germany</option><option>Other</option></select></label>{field("city", "City / Town")}{field("address", "Street address")}<label className="form-field full"><span>Order notes <i>Optional</i></span><textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Delivery instructions or a note for our team" /></label></div><button className="primary-action checkout-next" onClick={() => validate() && setStep(2)}>Continue to delivery <span>→</span></button></section>}
      {step === 2 && <section><span className="eyebrow">Step two</span><h1>Choose your delivery.</h1><p>Delivery options are tailored to {form.country}.</p><div className="delivery-list">{deliveries.map((option, i) => <button className={deliveryIndex === i ? "active" : ""} onClick={() => setDeliveryIndex(i)} key={option.name}><i /><div><strong>{option.name}</strong><small>{option.eta}</small></div><b>{option.price ? formatPrice(option.price) : "Free"}</b></button>)}</div><div className="step-actions"><button onClick={() => setStep(1)}>Back</button><button className="primary-action" onClick={() => setStep(3)}>Continue to payment <span>→</span></button></div></section>}
      {step === 3 && <section><span className="eyebrow">Final step</span><h1>Complete your order.</h1><p>All transactions are encrypted and securely processed.</p><div className="payment-options"><div className="payment-option active"><div><i /><strong>M-PESA</strong><span>Pay securely from your phone</span></div>{form.country !== "Kenya" && <small>Payment is processed in KES</small>}</div><div className="payment-option disabled"><div><i /><strong>Visa / Mastercard</strong></div><small>Coming soon</small></div><div className="payment-option disabled"><div><i /><strong>PayPal</strong></div><small>Coming soon</small></div></div><label className={`form-field mpesa-phone ${errors.phone ? "error" : ""}`}><span>M-Pesa phone number</span><div className="phone-field"><select><option>+254</option></select><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="7XX XXX XXX" /></div>{errors.phone && <small>{errors.phone}</small>}</label><div className="kes-equivalent"><span>Amount charged by M-Pesa</span><strong>KSh {total.toLocaleString()}</strong>{currency !== "KES" && <small>Equivalent to {formatPrice(total)}</small>}</div><div className="step-actions"><button onClick={() => setStep(2)}>Back</button><button className="primary-action" onClick={pay}>Pay with M-Pesa <Icon name="lock" size={15} /></button></div></section>}
    </div><CheckoutSummary open={summaryOpen} lines={lines} formatPrice={formatPrice} subtotal={subtotal} discount={discount} delivery={delivery} total={total} /></div>
    {modal !== "idle" && <div className="payment-modal-wrap"><div className="payment-modal">{modal === "loading" ? <><div className="spinner" /><span className="eyebrow">STK request sent</span><h2>Check your phone</h2><p>Enter your M-Pesa PIN to complete payment of</p><strong>KSh {total.toLocaleString()}</strong><small>Please keep this window open while we confirm your payment.</small></> : <><div className="success-check"><Icon name="check" size={34} /></div><h2>Payment confirmed</h2><p>Your Penmax ritual is being prepared.</p></>}</div></div>}
  </main>;
}

function CheckoutSummary({ open, lines, formatPrice, subtotal, discount, delivery, total }: { open: boolean; lines: CartLine[]; formatPrice: (n: number) => string; subtotal: number; discount: number; delivery: Delivery; total: number }) {
  return <aside className={`checkout-summary ${open ? "open" : ""}`}><h2>Your order</h2><div className="checkout-items">{lines.map((line) => { const p = products.find((x) => x.id === line.id)!; const price = p.variants.find((v) => v.name === line.variant)?.price || p.price; return <div key={`${line.id}-${line.variant}`}><div><img src={p.image} alt="" /><span>{line.qty}</span></div><p><strong>{p.name}</strong><small>{line.variant}</small></p><b>{formatPrice(price * line.qty)}</b></div>; })}</div><div className="checkout-totals"><p><span>Subtotal</span><b>{formatPrice(subtotal)}</b></p>{discount > 0 && <p className="discount-line"><span>Discount</span><b>−{formatPrice(discount)}</b></p>}<p><span>{delivery.name}</span><b>{delivery.price ? formatPrice(delivery.price) : "Free"}</b></p><p className="summary-total"><span>Total</span><b>{formatPrice(total)}</b></p></div><small className="secure-note"><Icon name="shield" size={15} /> Your information is protected with secure encryption.</small></aside>;
}

export function ConfirmationPage({ order, formatPrice }: { order: Order | null; formatPrice: (n: number) => string }) {
  if (!order) return <main className="empty-page"><div className="empty-cart"><h1>No recent order</h1><p>When you complete an order, its details will appear here.</p><Link className="primary-action" to="/shop">Continue shopping</Link></div></main>;
  const total = order.subtotal - order.discount + order.delivery.price;
  return <main className="confirmation page-enter"><div className="confirmation-hero"><div className="success-check animated"><Icon name="check" size={38} /></div><span className="eyebrow">Order {order.number}</span><h1>Thank you for your order.</h1><p>We’ve received your payment and are carefully preparing your Penmax ritual. A confirmation has been sent to <strong>{order.details.email}</strong>.</p></div><div className="confirmation-grid"><section><div className="confirmation-title"><h2>Order summary</h2><span>{order.lines.reduce((s, l) => s + l.qty, 0)} items</span></div>{order.lines.map((line) => { const p = products.find((x) => x.id === line.id)!; const price = p.variants.find((v) => v.name === line.variant)?.price || p.price; return <div className="confirmation-item" key={`${line.id}-${line.variant}`}><img src={p.image} alt="" /><div><h3>{p.name}</h3><p>{line.variant} · Qty {line.qty}</p></div><strong>{formatPrice(price * line.qty)}</strong></div>; })}<div className="confirmation-total"><span>Total paid</span><strong>{formatPrice(total)}</strong></div></section><aside><span className="eyebrow">On its way soon</span><h2>{order.delivery.eta}</h2><div><strong>Delivery method</strong><p>{order.delivery.name}</p></div><div><strong>Delivering to</strong><p>{order.details.name}<br />{order.details.address}<br />{order.details.city}, {order.details.country}<br />{order.details.phone}</p></div></aside></div><div className="confirmation-actions"><Link className="primary-action" to="/shop">Continue shopping</Link><a className="outline-action" href={`https://wa.me/254700000000?text=${encodeURIComponent(`Hello Penmax, I would like an update on order ${order.number}.`)}`} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> Track via WhatsApp</a></div></main>;
}
