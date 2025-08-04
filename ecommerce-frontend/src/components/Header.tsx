

/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

import { ShoppingCart, User2, MenuIcon } from "lucide-react";
import Navbar from "./Navbar";


const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-orange-500">
            ShopMate
        </h1>


        <div className="flex items-center space-x-4">
            <button className="flex text-black space-x-2">
                <User2 className="h-6 w-6" />
                <ShoppingCart className="h-6 w-6" />
                <MenuIcon className="h-6 w-6" />
            </button>
        </div>
      </div>

      {/* hero section */}

      <div className="bg-orange-500 text-white text-center py-10">

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
