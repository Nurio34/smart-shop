import { useState } from "react";
import AddProductButton from "./AddProductButton";
import FormModal from "./FormModal";

function AddProductContainer() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  return (
    <div>
      <AddProductButton setIsFormModalOpen={setIsFormModalOpen} />
      <FormModal
        isFormModalOpen={isFormModalOpen}
        setIsFormModalOpen={setIsFormModalOpen}
      />
    </div>
  );
}
export default AddProductContainer;
