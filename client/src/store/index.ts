import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart";
import sellerReducer from "./slices/seller";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    seller: sellerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "cart/add",
          "cart/remove",
          "cart/addOne",
          "cart/removeOne",
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["cart.cart"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
