"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { products } from "@/lib/storeData";
import { useCart } from "@/components/providers/CartProvider";
import { Icon } from "@/components/ui/Icon";
import { Link } from "@/components/ui/Link";
import { QuantityControl } from "@/components/ui/QuantityControl";

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link className={`logo ${light ? "logo-light" : ""}`} to="/">
      <span className="logo-mark"><Icon name="leaf" size={24} /></span>
      <span><strong>PENMAX</strong><small>Herbal Medical Centre</small></span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const { currency, setCurrency, count, setDrawerOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchResults = searchTerm.trim()
    ? products.filter((product) =>
        `${product.name} ${product.category} ${product.description} ${product.ingredients}`
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase()),
      ).slice(0, 5)
    : [];

  if (pathname === "/checkout") {
    return <header className="checkout-header"><Logo /><span><Icon name="lock" size={17} /> Secure checkout</span></header>;
  }

  const links = [
    ["Home", "/"],
    ["Shop", "/shop"],
    ["Herbal Remedies", "/shop?category=Herbal%20Remedies"],
    ["Beauty", "/shop?category=Beauty%20%26%20Skincare"],
    ["About", "/#about"],
    ["Contact", "/#contact"],
  ];

  return (
    <>
      <div className="announcement">
        Complimentary worldwide shipping on orders over KSh 8,000
        <span>Rooted in Kenya, shared with the world</span>
      </div>
      <header className="header">
        <Logo />
        <nav className="desktop-nav">
          {links.map(([label, to]) => <Link to={to} key={label}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <label className="currency">
            <Icon name="globe" size={16} />
            <select value={currency} onChange={(event) => setCurrency(event.target.value as typeof currency)}>
              {(["KES", "USD", "EUR", "GBP"] as const).map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          <button className="icon-button search-button" onClick={() => setSearch(!search)} aria-label="Search">
            <Icon name="search" />
          </button>
          <button className="icon-button cart-button" onClick={() => setDrawerOpen(true)} aria-label={`Open cart with ${count} items`}>
            <Icon name="bag" /><span>{count}</span>
          </button>
          <button className="icon-button menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu}>
            <Icon name={menu ? "close" : "menu"} />
          </button>
        </div>
        {search && (
          <div className="search-panel">
            <Icon name="search" />
            <input
              autoFocus
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search remedies, skincare and ingredients…"
              aria-label="Search products"
            />
            <button onClick={() => setSearch(false)} aria-label="Close search"><Icon name="close" /></button>
            {!!searchResults.length && (
              <div className="search-results">
                {searchResults.map((product) => (
                  <Link
                    to={`/product/${product.slug}`}
                    key={product.id}
                    onClick={() => { setSearch(false); setSearchTerm(""); }}
                  >
                    <img src={product.image} alt="" />
                    <span><strong>{product.name}</strong><small>{product.category}</small></span>
                    <b>KSh {product.price.toLocaleString("en-KE")}</b>
                  </Link>
                ))}
              </div>
            )}
            {searchTerm.trim() && !searchResults.length && <p className="search-empty">No products found.</p>}
          </div>
        )}
        {menu && (
          <nav className="mobile-nav">
            {links.map(([label, to]) => (
              <Link to={to} onClick={() => setMenu(false)} key={label}>{label}<span>↗</span></Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer id="contact">
      <div className="footer-main">
        <div className="footer-brand">
          <Logo light />
          <p>Natural care, thoughtfully made in Kenya and shared with the world.</p>
          <div className="socials">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">ig</a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">f</a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer">tk</a>
          </div>
        </div>
        <div className="footer-column">
          <h3>Explore</h3>
          <Link to="/shop">Shop all</Link>
          <Link to="/shop?category=Herbal%20Remedies">Herbal remedies</Link>
          <Link to="/shop?category=Beauty%20%26%20Skincare">Beauty & skincare</Link>
          <Link to="/#about">Our story</Link>
        </div>
        <div className="footer-column">
          <h3>Help</h3>
          <a href="mailto:hello@penmax.co.ke?subject=Shipping%20and%20delivery">Shipping & delivery</a>
          <a href="mailto:hello@penmax.co.ke?subject=Returns">Returns</a>
          <a href="mailto:hello@penmax.co.ke?subject=Frequently%20asked%20questions">FAQs</a>
          <a href="mailto:hello@penmax.co.ke?subject=Privacy">Privacy</a>
        </div>
        <div className="footer-column contact">
          <h3>Visit & connect</h3>
          <p>Nairobi, Kenya</p>
          <a href="tel:+254700000000">+254 700 000 000</a>
          <a href="mailto:hello@penmax.co.ke">hello@penmax.co.ke</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Penmax Herbal Medical Centre. All rights reserved. Built by DNZL</p>
        <div className="payments"><span>M-PESA</span><span>VISA</span><span>mastercard</span><span>PayPal</span></div>
      </div>
    </footer>
  );
}

export function CartDrawer() {
  const { lines, formatPrice, update, remove, subtotal, drawerOpen, setDrawerOpen } = useCart();
  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const close = () => setDrawerOpen(false);

  return (
    <>
      <div className={`drawer-backdrop ${drawerOpen ? "open" : ""}`} onClick={close} />
      <aside className={`cart-drawer ${drawerOpen ? "open" : ""}`} aria-label="Shopping bag" aria-hidden={!drawerOpen}>
        <div className="drawer-head">
          <div><span>Your ritual</span><h2>Shopping bag <small>{count}</small></h2></div>
          <button onClick={close} aria-label="Close shopping bag"><Icon name="close" /></button>
        </div>
        <div className="drawer-body">
          {!lines.length ? (
            <div className="empty-cart">
              <div><Icon name="bag" size={30} /></div>
              <h3>Your bag is waiting</h3>
              <p>Discover botanical care, made thoughtfully in Kenya.</p>
              <Link className="drawer-empty-link" to="/shop" onClick={close}>Explore the collection</Link>
            </div>
          ) : lines.map((line, index) => {
            const product = products.find((item) => item.id === line.id);
            if (!product) return null;
            const price = product.variants.find((variant) => variant.name === line.variant)?.price ?? product.price;
            return (
              <div className="cart-item" key={`${line.id}-${line.variant}`}>
                <img src={product.image} alt="" />
                <div>
                  <span>{line.variant}</span>
                  <Link className="cart-item-product" to={`/product/${product.slug}`} onClick={close}><h3>{product.name}</h3></Link>
                  <strong>{formatPrice(price)}</strong>
                  <QuantityControl value={line.qty} onChange={(quantity) => update(index, quantity)} />
                </div>
                <button className="remove" onClick={() => remove(index)} aria-label={`Remove ${product.name}`}>
                  <Icon name="close" size={16} />
                </button>
              </div>
            );
          })}
        </div>
        {!!lines.length && (
          <div className="drawer-footer">
            <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <p>Shipping calculated at checkout</p>
            <Link className="drawer-checkout" to="/checkout" onClick={close}>Continue to checkout <span>→</span></Link>
            <Link to="/cart" onClick={close}>View shopping bag</Link>
            <small><Icon name="shield" size={14} /> Secure checkout · M-Pesa & card accepted</small>
          </div>
        )}
      </aside>
    </>
  );
}

export function FloatingWhatsApp() {
  if (usePathname() === "/checkout") return null;
  return (
    <a className="whatsapp" href="https://wa.me/254700000000?text=Hello%20Penmax%2C%20I%20would%20like%20help%20with%20an%20order." target="_blank" rel="noreferrer">
      <Icon name="whatsapp" size={22} /><span>Order on WhatsApp</span>
    </a>
  );
}
