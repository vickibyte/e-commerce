/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

import { ShoppingCart, Star, ShoppingBag, Shirt, Users  } from "lucide-react";
import { useEffect, useState, type JSX } from "react";
import { ProductType } from "@/types/types";



const icons: Record <string, JSX.Element> = {
    Men: <Shirt className="w-4 h-4 text-orange-500" />,
    Women: <ShoppingBag className="w-4 h-4 text-orange-500" />,
    Unisex: <Users className="w-4 h-4 text-orange-500" />,
    All: <Star className="w-4 h-4 text-orange-500" />
};

const FeaturedProducts = () =>{

    const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

useEffect(() => {
  fetch("/data/products.json")
    .then((res) => res.json())
    .then((data: ProductType[]) => {
      setProducts(data);
      const unique = ["All", ...Array.from(new Set(data.map((p) => p.category)))];
      setUniqueCategories(unique);
    })
    .catch((err) => console.error("Error loading products:", err));
}, []);


    const [products, setProducts] = useState<ProductType[]>([]);
    const [category, setCategory] = useState<string>("All");

    // Filter products based on selected category



    const filtered = category === "All"
    ? products
    : products.filter(item => item.category === category);
    // const categories = ["All", ...new Set(products.map(p => p.category))];


    return(
        <section className="py-16 bg-gray-50 text-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-2">
                        Featured Products
                    </h2>
                    <p className="text-gray-600">
                        Checkout our best-selling Items
                    </p>
                </div>

                {/* category button */}

                <div className="flex flex-wrap gap-2 mb-8 justify-center transition-all duration-300">
                    {uniqueCategories.map((cat) => (
                        <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                            cat === category ? "bg-orange-500 text-white" : "bg-white text-black"
                        }`}
                        >
                            {icons[cat] || null}{cat}
                        </button>
                    ))}
                </div>
                {/* product grid */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filtered.map((product) =>(
                        <div 
                        key ={product.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-1">
                                    {product.name}
                                </h3>
                                <p className="text-sm">{product.category}</p>
                                <p className="text-gray-600 mb-4">₦{product.price}</p>

                                <p className="flex items-center gap-1 mb-2">
                                  {Array.from({ length: 5}).map((_, i) => (
                                    <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < product.rating ? "text-yellow-500" : "text-gray-300"}`}
                                    />
                                  ))}  
                                <span>{product.rating}</span></p>

                                <button className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-orange-500 transition">
                                    <ShoppingCart size={18}/>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts;