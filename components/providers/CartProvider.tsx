"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/lib/storeData";

export type Currency = "KES" | "USD" | "EUR" | "GBP";
export type CartLine = { id: number; variant: string; qty: number };
export type Delivery = { name: string; price: number; eta: string };
export type Order = {
  number: string;
  lines: CartLine[];
  subtotal: number;
  discount: number;
  delivery: Delivery;
  details: Record<string, string>;
};

const currencies: Record<Currency, { rate: number; symbol: string }> = {
  KES: { rate: 1, symbol: "KSh" },
  USD: { rate: 0.0077, symbol: "$" },
  EUR: { rate: 0.0071, symbol: "€" },
  GBP: { rate: 0.006, symbol: "£" },
};

type CartContextValue = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  lines: CartLine[];
  count: number;
  subtotal: number;
  discount: number;
  promoMessage: string;
  order: Order | null;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  formatPrice: (amount: number) => string;
  addLine: (product: Product, variant?: string, qty?: number, open?: boolean) => void;
  update: (index: number, qty: number) => void;
  remove: (index: number) => void;
  applyPromo: (code: string) => void;
  completeOrder: (delivery: Delivery, details: Record<string, string>) => Order;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("KES");
  const [lines, setLines] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoMessage, setPromoMessage] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedLines = localStorage.getItem("penmax-cart");
      const savedOrder = localStorage.getItem("penmax-order");
      if (savedLines) setLines(JSON.parse(savedLines) as CartLine[]);
      if (savedOrder) setOrder(JSON.parse(savedOrder) as Order);
      setHydrated(true);
    } catch (error) {
      console.error("Unable to load saved Penmax store data.", error);
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("penmax-cart", JSON.stringify(lines));
  }, [hydrated, lines]);

  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = lines.reduce((sum, line) => {
    const product = productsById.get(line.id);
    const price = product?.variants.find((variant) => variant.name === line.variant)?.price ?? product?.price ?? 0;
    return sum + price * line.qty;
  }, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;

  const formatPrice = useCallback((amount: number) => {
    const selected = currencies[currency];
    const value = amount * selected.rate;
    return `${selected.symbol} ${currency === "KES" ? value.toLocaleString("en-KE") : value.toFixed(2)}`;
  }, [currency]);

  const addLine = useCallback((product: Product, variant = product.variants[0].name, qty = 1, open = true) => {
    setLines((current) => {
      const index = current.findIndex((line) => line.id === product.id && line.variant === variant);
      if (index < 0) return [...current, { id: product.id, variant, qty }];
      return current.map((line, lineIndex) =>
        lineIndex === index ? { ...line, qty: line.qty + qty } : line,
      );
    });
    if (open) setDrawerOpen(true);
  }, []);

  const update = useCallback((index: number, qty: number) => {
    setLines((current) => current.map((line, lineIndex) => lineIndex === index ? { ...line, qty } : line));
  }, []);

  const remove = useCallback((index: number) => {
    setLines((current) => current.filter((_, lineIndex) => lineIndex !== index));
  }, []);

  const applyPromo = useCallback((code: string) => {
    if (code.trim().toUpperCase() === "PENMAX10") {
      setPromoApplied(true);
      setPromoMessage("PENMAX10 applied — you saved 10%.");
    } else {
      setPromoMessage("That code isn’t recognised. Try PENMAX10.");
    }
  }, []);

  const completeOrder = useCallback((delivery: Delivery, details: Record<string, string>) => {
    const completed: Order = {
      number: `PNX-${Math.floor(10000 + Math.random() * 89999)}`,
      lines: [...lines],
      subtotal,
      discount,
      delivery,
      details,
    };
    setOrder(completed);
    localStorage.setItem("penmax-order", JSON.stringify(completed));
    setLines([]);
    setPromoApplied(false);
    setPromoMessage("");
    return completed;
  }, [discount, lines, subtotal]);

  const value = useMemo(() => ({
    currency,
    setCurrency,
    lines,
    count,
    subtotal,
    discount,
    promoApplied,
    promoMessage,
    order,
    drawerOpen,
    setDrawerOpen,
    formatPrice,
    addLine,
    update,
    remove,
    applyPromo,
    completeOrder,
  }), [
    currency, lines, count, subtotal, discount, promoApplied, promoMessage, order, drawerOpen,
    formatPrice, addLine, update, remove, applyPromo, completeOrder,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider.");
  return context;
}

const productsById = new Map(products.map((product) => [product.id, product]));
