import { useState } from "react";
import DeleteButton from "./DeleteButton";
import DeleteModal from "./DeleteModal";
import { Product } from "@prisma/client";

function DeleteProductContainer({
  productControls,
}: {
  productControls: Product;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <DeleteButton setIsModalOpen={setIsModalOpen} />
      <DeleteModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        productControls={productControls}
      />
    </div>
  );
}
export default DeleteProductContainer;
