import Client from "./Client";
import { fetchProductsByCategory } from "@/actions/fetchFiveProductsPerCategory";

async function Main() {
  const categories = await fetchProductsByCategory();

  return (
    <main className="py-[2vh] px-[2vw]">
      <Client categories={categories} />
    </main>
  );
}
export default Main;
