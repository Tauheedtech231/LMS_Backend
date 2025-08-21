"use client";
import { FC } from "react";
interface Course {
  id: number;
  acronym: string;
  name: string;
  price: number;
  image: string;
  description: string;
  features: string[];
}


export interface CartItem extends Course {
  quantity: number;
}


interface CartSidebarProps {
  cart: CartItem[];
  visible: boolean;
  onClose: () => void;
  removeFromCart: (id: number) => void;
}

const CartSidebar: FC<CartSidebarProps> = ({ cart, visible, onClose, removeFromCart }) => {
  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);
  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl border-l border-gray-200 z-50 transform transition-transform duration-300 ${
        visible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-5 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Cart ({getTotalItems()})</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 font-bold">X</button>
      </div>

      <div className="max-h-[80vh] overflow-y-auto p-5 space-y-4">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-10">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-medium">{item.acronym}</h3>
                <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm hover:text-red-700 mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-5 border-t">
          <div className="flex justify-between font-semibold text-lg mb-4">
            <span>Total:</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
