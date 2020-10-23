/* eslint-disable no-case-declarations */
export const initialState = {
  cart: [],
};

export const getCartTotal = cart => cart?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.item],
      };
    case 'REMOVE_FROM_CART':
      const index = state.cart.findIndex(
        cartItem => cartItem.id === action.id,
      );

      const newCart = [...state.cart];
      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(`Can't remove product (id: ${action.id}) as it's not in cart!`);
      }
      return {
        ...state,
        cart: newCart,
      };
    default: return state;
  }
};

export default reducer;
