import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

//local storage needed so that when we leave the site and come back, items are still in the cart
const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal'};

//
const cartSlice = createSlice({
  name: "cart",
  initialState,
  //functions of the cart
  reducers: {
    //
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem =state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x) // x means keep current
      } else {
        state.cartItems = [...state.cartItems, item]; //state is immutable
      }

      return updateCart(state);

    }, //addToCart reducer
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    }, //removeFromCart reducer
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      //localStorage.setItem('cart', JSON.stringify(state));
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      //localStorage.setItem('cart', JSON.stringify(state));
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
      //localStorage.setItem('cart', JSON.stringify(state));
    },
    // NOTE: here we need to reset state for when a user logs out so the next
    // user doesn't inherit the previous users cart and shipping
    resetCart: (state) => (state = initialState),

  }, //reducers

});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;