import { Product } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ProductWithQuantity = Product & { quantity: number };

interface SellerState {
  selectedProduct: Product | null;
  formData: Product | null;
}

const initialState: SellerState = {
  selectedProduct: null,
  formData: null,
};

export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    setFormData: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setSelectedProduct, setFormData } = sellerSlice.actions;
export default sellerSlice.reducer;
