import Images from "../_components/Images";
import Details from "../_components/Details";
import ReturnPolicy from "../_components/ReturnPolicy";
import Tags from "../_components/Tags";
import ActionButtons from "../_components/ActionButtons";
import { ProductWithImages } from ".";
import CommentsContainer from "../_components/CommentsContainer";

function PageContainerClient({ product }: { product: ProductWithImages }) {
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
      <CommentsContainer product={product} />
    </main>
  );
}
export default PageContainerClient;
