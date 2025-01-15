import { Product } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ProductWithQuantity = Product & { quantity: number };

interface CartState {
  cart: ProductWithQuantity[];
  total: number;
}

const initialState: CartState = {
  cart: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      const product = { ...action.payload, quantity: 1 };
      state.cart.push(product);
    },
    remove: (state, action: PayloadAction<Product>) => {
      state.cart = state.cart.filter((p) => p.id !== action.payload.id);
    },
    clear: (state) => {
      state.cart = [];
    },
    total: (state) => {
      state.total = state.cart.reduce(
        (acc, p) => acc + p.price * p.quantity,
        0
      );
    },
  },
});

export const { add, remove, clear, total } = cartSlice.actions;
export default cartSlice.reducer;
