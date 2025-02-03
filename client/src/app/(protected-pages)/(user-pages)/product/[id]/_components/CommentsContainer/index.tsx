import { ProductWithImages } from "../../PageContainer";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";

function CommentsContainer({ product }: { product: ProductWithImages }) {
  return (
    <section className="py-[2vh] space-y-[2vh]">
      <CommentForm productId={product.id} />
      <CommentsList product={product} />
    </section>
  );
}
export default CommentsContainer;
