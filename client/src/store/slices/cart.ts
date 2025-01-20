import { OrderErrorsType } from "@/actions/checkStocksAndMinOrderQuantityAction";
import { Product } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ProductWithQuantity = Product & { quantity: number };

interface CartState {
  cart: ProductWithQuantity[];
  total: number;
  orderErrors: OrderErrorsType[];
}

const initialState: CartState = {
  cart: [],
  total: 0,
  orderErrors: [],
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
    addOne: (state, action: PayloadAction<Product>) => {
      const productId = action.payload.id;
      const productInCart = state.cart.find(
        (product) => product.id === productId
      );

      if (productInCart) {
        productInCart.quantity++;
        state.total = +state.cart
          .reduce((acc, p) => acc + p.price * p.quantity, 0)
          .toFixed(2);
      }
    },
    removeOne: (state, action: PayloadAction<Product>) => {
      const productId = action.payload.id;
      const productInCart = state.cart.find(
        (product) => product.id === productId
      );

      if (productInCart) {
        if (productInCart.quantity > 1) {
          productInCart.quantity--;
        } else {
          state.cart = state.cart.filter((p) => p.id !== productId);
        }

        state.total = +state.cart
          .reduce((acc, p) => acc + p.price * p.quantity, 0)
          .toFixed(2);
      }
    },
    setOrderErrors: (state, action: PayloadAction<OrderErrorsType[]>) => {
      state.orderErrors = action.payload;
    },
  },
});

export const { add, remove, clear, addOne, removeOne, setOrderErrors } =
  cartSlice.actions;
export default cartSlice.reducer;
