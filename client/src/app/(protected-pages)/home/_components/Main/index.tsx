import Client from "./Client";
import { fetchProductsByCategory } from "@/actions/fetchFiveProductsPerCategory";

async function Main() {
  const categories = await fetchProductsByCategory();

  const delayedPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("Resolved after 10 seconds");
    }, 100000); // 10000 ms = 10 seconds
  });

  delayedPromise.then((message) => {
    console.log(message); // Output will be: "Resolved after 10 seconds"
  });

  return (
    <main className="py-[2vh] px-[2vw]">
      <Client categories={categories} />
    </main>
  );
}
export default Main;
