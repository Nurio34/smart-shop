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
      state.total = +state.cart
        .reduce((acc, p) => acc + p.price * p.quantity, 0)
        .toFixed(2);
    },
    remove: (state, action: PayloadAction<Product>) => {
      state.cart = state.cart.filter((p) => p.id !== action.payload.id);
      state.total = +state.cart
        .reduce((acc, p) => acc + p.price * p.quantity, 0)
        .toFixed(2);
    },
    clear: (state) => {
      state.cart = [];
    },
  },
});

export const { add, remove, clear } = cartSlice.actions;
export default cartSlice.reducer;
