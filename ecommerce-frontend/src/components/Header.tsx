

/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

import { ShoppingCart, User2, MenuIcon, Heart } from "lucide-react";
import Navbar from "./Navbar";


const Header = () => {

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // const selectedCurrency = event.target.value;
    console.log("Selected currency:", event.target.value);
  }

  return (
    <header className="bg-white shadow-md">

      {/* Top Header */}
      <div className="bg-gray-50 py-2 px-4 flex justify-between items-center space-x-4 text-sm">
        
          <form action=""
          method="post">

            <select 
            name="wjc-currency" 
            id="wjc-currency-select"
            onChange={handleCurrencyChange}
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-orange-300"
            defaultValue="NGN"
            >
      
            <option value="NGN">NGN (₦)</option>
            <option value="USD">USD ($)</option>
          </select>


          </form>


          
          <a href="/" className="flex items-center gap-1"><User2 className=" text-orange-300 w-4 h-4" />Login/Register</a>
        

      </div>

      {/* Main Header */}

      <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto">
        <MenuIcon className="lg:hidden" />
        <h1 className="text-2xl font-bold text-orange-500">
            ShopMate
        </h1>


        <div className="flex items-center space-x-4">
            
            <div className="icon-with-tooltip">
              <button 
              aria-label="Shopping Cart" className="icon-btn">
                <a href="/cart">
                  <ShoppingCart className="text-orange-300" />
                  <span className="tooltip">Cart</span>
                </a>
            </button>
            </div>

            <div className="icon-with-tooltip">
              <button 
              aria-label="Wishlist" 
              className="icon-btn">
                <a href="/wishlist">
                  <Heart className="text-orange-300" />
                  <span className="tooltip">Wishlist</span>
                </a>
              </button>
            </div>
        </div>
      </div>

      {/* hero section */}

      <div className="bg-orange-500 text-white text-center py-6">

        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-start md:flex-row md:items-center">
                <div className="">
                 <h2 className="text-4xl md:text-5xl font-bold">Clothing & Apparel</h2>


                <p className="mt-2 text-lg md:text-xl">
                Shop the latest trends 
                </p>

            </div>
            </div>
        </div>


{/* Navbar */}

<div className="relative hidden md:flex justify-center">
    <Navbar />
</div>
       

      </div>
    </header>
  )
}

export default Header
