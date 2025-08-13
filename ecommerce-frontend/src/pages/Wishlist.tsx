/**
 * @license MIT
 * @copyright 2025 Bukola David
 */


import { useWishlist } from "../context/WishlistContext";
import { Heart, Trash2, CircleSlash } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();


  return (
    <section className="min-h-screen px-4 py-10 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <Heart className="w-6 h-6 text-pink-500" />
            Your Wishlist
          </h1>
          {wishlistItems.length > 0 && (
            <button
              className="text-sm text-red-500 hover:underline"
              onClick={clearWishlist}
            >
              <Trash2 className="inline-block mr-1 w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <p className="text-gray-600">

            <CircleSlash className="inline-block mr-2 w-4 h-4 text-red-600" />

            No items in your wishlist.</p>
          
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <li
                key={item.id}
                className="border rounded-2xl p-4 flex flex-col items-center text-center shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-32 object-contain mb-4"
                />
                <h3 className="text-lg font-medium mb-2">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-4">₦{item.price}</p>
                <div className="flex gap-2">
                  <Link
                    to={`/product/${item.id}`}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
// This code defines a Wishlist component that displays the user's wishlist items.
// It includes functionality to remove individual items or clear the entire wishlist.   