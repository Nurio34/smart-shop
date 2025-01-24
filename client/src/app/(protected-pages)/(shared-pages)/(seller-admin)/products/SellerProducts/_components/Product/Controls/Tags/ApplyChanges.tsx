import { updateProduct } from "@/actions/updateProduct";
import { Product } from "@prisma/client";
import { SetStateAction, Dispatch, useState } from "react";

function ApplyChanges({
  productControls,
  setProductControls,
  anyChangeMade,
}: {
  productControls: Product;
  setProductControls: Dispatch<SetStateAction<Product>>;
  anyChangeMade: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyChanges = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await updateProduct(productControls);
      if (response.status === "error") {
        setError("Try Again !");
        return;
      }
      setProductControls(response.product!);
    } catch (err) {
      setError("Try Again !");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={`btn text-secondary-content
        ${error ? "btn-error" : "btn-success"}    
    `}
      onClick={applyChanges}
      disabled={anyChangeMade || isLoading}
    >
      {isLoading ? (
        <div className=" flex items-center gap-x-[0.5vw]">
          <p>Appling Changes</p>
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
        error || "Apply Changes"
      )}
    </button>
  );
}
export default ApplyChanges;
