import { createSlice } from "@reduxjs/toolkit";
import { CartService } from "../../services/cart.service";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      const { id, description, price, name } = action.payload.product;
      const { userId } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ id, description, price, quantity: 1 });
      }

      const item = {
        productId: id,
        productName: name,
        price: price,
        quantity: 1
      };

      CartService.addToCart(userId, item);
    },
    removeFromCart: (state, action) => {
      const { id, userId } = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
      CartService.removeFromCart(userId, id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity, userId } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      CartService.addToCart(userId, { productId: id, count: quantity });
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { setCart, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;