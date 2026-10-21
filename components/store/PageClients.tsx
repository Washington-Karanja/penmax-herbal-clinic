"use client";

import { useRouter } from "next/navigation";
import type { Product } from "@/lib/storeData";
import { useCart } from "@/components/providers/CartProvider";
import {
  CartPage,
  CheckoutPage,
  ConfirmationPage,
  HomePage,
  ProductPage,
  ShopPage,
} from "@/components/store/StorePages";

export function HomeRoute() {
  const { formatPrice, addLine } = useCart();
  return <HomePage formatPrice={formatPrice} add={addLine} />;
}

export function ShopRoute({ initialCategory }: { initialCategory: string }) {
  const { formatPrice, addLine } = useCart();
  return <ShopPage formatPrice={formatPrice} add={addLine} initialCategory={initialCategory} />;
}

export function ProductRoute({ product }: { product: Product }) {
  const router = useRouter();
  const { formatPrice, addLine } = useCart();
  return (
    <ProductPage
      product={product}
      addLine={addLine}
      buyNow={(item, variant, quantity) => {
        addLine(item, variant, quantity, false);
        router.push("/checkout");
      }}
    />
  );
}

export function CartRoute() {
  const { lines, formatPrice, update, remove, subtotal, discount, applyPromo, promoMessage } = useCart();
  return (
    <CartPage
      lines={lines}
      formatPrice={formatPrice}
      update={update}
      remove={remove}
      subtotal={subtotal}
      discount={discount}
      applyPromo={applyPromo}
      promoMessage={promoMessage}
    />
  );
}

export function CheckoutRoute() {
  const router = useRouter();
  const { lines, currency, formatPrice, subtotal, discount, completeOrder } = useCart();
  return (
    <CheckoutPage
      lines={lines}
      currency={currency}
      formatPrice={formatPrice}
      subtotal={subtotal}
      discount={discount}
      finish={(delivery, details) => {
        completeOrder(delivery, details);
        router.push("/order-confirmation");
      }}
    />
  );
}

export function ConfirmationRoute() {
  const { order, formatPrice } = useCart();
  return <ConfirmationPage order={order} formatPrice={formatPrice} />;
}
