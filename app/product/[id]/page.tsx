import { getProductById } from "@/services/productService";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}
function calculateFinalPrice(price: number, sale: number): number {
  return price - (price * sale) / 100;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) {
    notFound();
  }

  const finalPrice = calculateFinalPrice(product.price, product.sale);
  return (
    <main>
      <h1>{product.name}</h1>

      <p>Price: {product.price.toLocaleString()} تومان</p>

      <p>Sale: {product.sale}%</p>
      {product.sale > 0 && (
        <p>Final Price: {finalPrice.toLocaleString()} تومان</p>
      )}
      <p>
        Category: {product.category ? product.category.name : "بدون دسته‌بندی"}
      </p>

      <p>Brand: {product.brand ? product.brand.name : "بدون برند"}</p>
      <div>
        <h2>Images</h2>

        {product.media.map((image) => (
          <img key={image._id} src={image.url} alt={product.name} width={200} />
        ))}
      </div>
    </main>
  );
}
