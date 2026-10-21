import { notFound } from "next/navigation";
import { ProductRoute } from "@/components/store/PageClients";
import { products } from "@/lib/storeData";

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  return <ProductRoute product={product} />;
}
