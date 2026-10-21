import { ShopRoute } from "@/components/store/PageClients";

export default function ShopPage({ searchParams }: { searchParams: { category?: string } }) {
  return <ShopRoute initialCategory={searchParams.category ?? ""} />;
}
