import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, { payload }) => {
      if (!(state.cartItems.filter((x) => x.id === payload.id).length > 0)) {
        state.cartItems.push({ ...payload, quantity: 1 });
        window.localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
    localStorageCart: (state, { payload }) => {
      state.cartItems = payload || [];
    },
    cleanCart: (state) => {
      state.cartItems = initialState.cartItems;
      window.localStorage.setItem("cart", JSON.stringify([]));
    },
    cleanItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((x) => x.id !== payload);
      window.localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    changeQuantity: (state, { payload }) => {
      if (payload.quantity > 0) state.cartItems[state.cartItems.map((x) => x.id).indexOf(payload.id)].quantity = payload.quantity;
      else state.cartItems[state.cartItems.map((x) => x.id).indexOf(payload.id)].quantity = 1;
      window.localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const { addItemToCart, localStorageCart, cleanCart, cleanItem, changeQuantity } = cartSlice.actions;
export default cartSlice.reducer;
