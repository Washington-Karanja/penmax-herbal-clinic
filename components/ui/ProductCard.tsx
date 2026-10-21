"use client";

import type { Product } from "@/lib/storeData";
import { Link } from "./Link";
import { Icon } from "./Icon";

export function ProductCard({
  product,
  formatPrice,
  add,
}: {
  product: Product;
  formatPrice: (amount: number) => string;
  add: (product: Product) => void;
}) {
  return (
    <article className="product-card">
      <div className="product-image">
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        {product.badge && (
          <span className={`badge ${product.badge === "New" ? "badge-new" : ""}`}>{product.badge}</span>
        )}
        <button className="quick-add" onClick={() => add(product)} aria-label={`Add ${product.name} to cart`}>
          <Icon name="plus" />
        </button>
      </div>
      <div className="product-info">
        <span>{product.category}</span>
        <Link to={`/product/${product.slug}`}><h3>{product.name}</h3></Link>
        <p>{product.description}</p>
        <div>
          <strong>{formatPrice(product.price)}</strong>
          <button onClick={() => add(product)}>Add to cart</button>
        </div>
      </div>
    </article>
  );
}
