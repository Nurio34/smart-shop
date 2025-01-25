import Link from "next/link";
import { ProductWithImages } from "../../PageContainer";

function Tags({ product }: { product: ProductWithImages }) {
  return (
    <div className="flex gap-2 mt-2">
      {product.tags.map((tag) => (
        <Link
          key={tag}
          href={`/explore?tag=${tag}`}
          className="text-xs btn btn-xs bg-gradient-to-r from-secondary/30 to-accent/30"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
export default Tags;
