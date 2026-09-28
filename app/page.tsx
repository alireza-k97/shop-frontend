import { getProducts , getProductById } from "@/services/productService";

export default async function Home() {
  const products = await getProducts();
  console.log(products);

  const firstProduct = products[0];

  const product = await getProductById(firstProduct._id);

  console.log(product);

  return (
    <main>
      <h1>Shop Project</h1>

      <p>تعداد محصولات: {products.length}</p>

      {products.map((product) => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>{product.price}</p>
        </div>
      ))}
    </main>
  );
}
