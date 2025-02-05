import { updateProduct } from "@/actions/updateProduct";
import { ProductWithImages } from "@/app/(protected-pages)/(user-pages)/product/[id]/PageContainer";
import { useState } from "react";
import "./index.css";

function ApplyChanges({
  productControls,
  anyChangeMade,
}: {
  productControls: ProductWithImages;
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
    } catch (error) {
      setError("Try Again !");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      className={`btn text-secondary-content 
        ${anyChangeMade && !isLoading ? "Highlight" : ""}
        ${error ? "btn-error" : "btn-success"}    
    `}
      onClick={applyChanges}
      disabled={!anyChangeMade || isLoading}
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
