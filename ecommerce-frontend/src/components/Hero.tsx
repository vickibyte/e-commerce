/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-10 lg:pt-18 pb-16 lg:pb-20  bg-white text-black">
      <div className="container mx-auto grid items-center lg:grid-cols-2 gap-10 px-4">

        {/* Left Column: Text */}
        <div className="space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
            Shop the latest clothing & apparel
          </h2>
          <p className="text-lg text-gray-600">
            Discover our new collection
          </p>
          <div>
            <a
              href="/"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Shop Now <ArrowRight className="w-4 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <figure className="rounded-[60px] overflow-hidden shadow-lg">
            <img
              src="images/hero-banner.png"
              alt="Hero banner"
              className="w-full h-auto object-cover"
              width={300}
              height={300}
            />
          </figure>
        </div>

      </div>
    </section>
  );
};

export default Hero;
