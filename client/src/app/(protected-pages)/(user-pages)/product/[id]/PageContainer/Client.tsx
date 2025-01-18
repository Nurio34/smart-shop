import { Product } from "@prisma/client";
import Images from "../_components/Images";
import Details from "../_components/Details";
import ReturnPolicy from "../_components/ReturnPolicy";
import Tags from "../_components/Tags";
import ActionButtons from "../_components/ActionButtons";

function PageContainerClient({ product }: { product: Product }) {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Images product={product} />
        <div className="space-y-4">
          <Details product={product} />
          <Tags product={product} />
          <ReturnPolicy product={product} />
          <ActionButtons product={product} />
        </div>
      </div>
    </main>
  );
}
export default PageContainerClient;
