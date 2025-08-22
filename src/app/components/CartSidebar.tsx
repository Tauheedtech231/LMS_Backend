"use client";
import { FC, useState } from "react";
import Image from "next/image";
import { confirmPayment } from "../(dashboard)/actions/paymentActions";

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
  const [modalOpen, setModalOpen] = useState(false);

  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);
  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => setModalOpen(true);
  const handleConfirmPayment = async () => {
  try {
    await confirmPayment("Test Student", "student@example.com", getTotalPrice());
    alert("Payment submitted! Check your email.");
    setModalOpen(false);
    removeFromCart(-1);
  } catch (error) {
    alert("Error sending emails.");
  }
};

  if (!visible) return null;

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 shadow-xl z-50 transform transition-transform duration-300 ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-l-2xl shadow-lg">
          <div className="p-4 border-b border-blue-100 dark:border-blue-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
           Courses Cart ({getTotalItems()})
            </h2>
            <button onClick={onClose} className="text-gray-500 dark:text-gray-300 hover:text-gray-800 font-bold">X</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-10">Your cart is empty</p>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-2xl shadow-md bg-white dark:bg-gray-700"
                >
                  <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-xl object-cover"/>
                  <div className="flex-1 ml-3">
                    <h3 className="font-medium text-blue-700 dark:text-blue-300">{item.acronym}</h3>
                    <p className="text-sm text-blue-500 dark:text-blue-200">Qty: {item.quantity}</p>
                    <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 dark:text-red-400 text-sm">
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-4 border-t border-blue-100 dark:border-blue-700">
              <div className="flex justify-between font-semibold text-lg text-blue-700 dark:text-blue-400 mb-3">
                <span>Total:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-11/12 max-w-md shadow-lg">
            <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">Manual Payment Instructions</h3>
            <p className="text-blue-500 dark:text-blue-200 mb-4">
              Please transfer <span className="font-semibold text-blue-700 dark:text-blue-300">${getTotalPrice().toFixed(2)}</span> 
              to the following account: <br />
              <span className="font-semibold text-blue-700 dark:text-blue-300">Account: ABC123</span>
            </p>
            <p className="text-blue-500 dark:text-blue-200 mb-4">
              After payment, click below to confirm your order.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold transition"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartSidebar;
