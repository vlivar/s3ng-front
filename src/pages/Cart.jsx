import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartService } from "../services/cart.service";
import { removeFromCart, setCart, addToCart } from "../store/cart/cartSlice";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.cart);
  const userId = useSelector((state) => state.user.userData.email);
  const dispatch = useDispatch();

  useEffect(() => {
    CartService.onCartUpdate((receivedUserId, updatedCart) => {
      if (receivedUserId === userId) {
        if (JSON.stringify(updatedCart) !== JSON.stringify(cart)) {
          dispatch(setCart(updatedCart));
        }
      }
    });

    CartService.getCart(userId);

  }, [userId]);

  const handleIncreaseQuantity = (product) => {
    dispatch(addToCart({ product: {id: product.productId, description: product.description, price: product.price, name: product.productName}, userId }));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(removeFromCart({ id: productId, userId }));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Корзина</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Ваша корзина пуста</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.productId} className="border-b pb-4 mb-4">
              <h4 className="text-xl font-semibold">{item.productName}</h4>
              <p className="text-gray-700">Цена: {item.price} ₽</p>
              <p className="text-gray-700">Сумма: {item.price * item.quantity} ₽</p>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={() => handleDecreaseQuantity(item.productId)}
                  className="btn btn-red mx-1 py-1 rounded"
                >
                  -
                </button>
                <span className="text-lg">{item.count}</span>
                <button
                  onClick={() => handleIncreaseQuantity(item)}
                  className="btn btn-green mx-1 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <h3 className="text-xl font-semibold mt-4">Общая стоимость: {totalPrice} ₽</h3>
        </div>
      )}
    </div>
  );
};

export default CartPage;
