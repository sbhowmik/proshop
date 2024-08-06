//
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

//
export const updateCart = (state) => {

  //calculate items price
  const itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  state.itemsPrice = addDecimals(itemsPrice);

  //calculate shipping price
  //if order is over 100$ then free else 10$
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice); 

  //calculate tax price (15% tax)
  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  //calculate total price
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  // Calculate the total price
  state.totalPrice = addDecimals(totalPrice);

  // Save the cart to localStorage
  localStorage.setItem('cart', JSON.stringify(state));

  return state;

};