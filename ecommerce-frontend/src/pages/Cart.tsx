/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

import { useCart } from "../context/CartContext";
import { ShoppingBasketIcon } from "lucide-react";


const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex items-center justify-center gap-2 text-xl my-6">

        <h2 className="text-3xl font-bold mb-6">
        
        Your Cart <ShoppingBasketIcon className="w-100 h-10 text-orange-400 "/></h2> 
       
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white shadow rounded"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="font-semibold ">{item.name}</h3>
                  <p className="text-base leading-tight text-gray-600 pt-10 font-mono">Quantity: {item.quantity}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="mb-2">₦{item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right font-bold text-xl">
            Total Price: ₦{totalPrice}
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
