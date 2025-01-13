import Client from "./Client";

async function Main() {
  const response = await fetch("https://dummyjson.com/products?limit=194", {
    method: "GET",
    next: {
      tags: ["products"],
    },
  });
  const { products } = await response.json();

  return (
    <main className=" py-[2vh] px-[2vw]">
      <Client products={products} />
    </main>
  );
}
export default Main;
