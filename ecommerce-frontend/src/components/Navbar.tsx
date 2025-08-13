/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

import '../index.css'

const Navbar = () => {
 const navItems = [
  { label: 'Home', link: '/', className: 'nav-link text-gray-700 font-bold' },
  { label: 'Shop', link: '#shop', className: 'nav-link text-gray-700' },
  { label: 'Accessories & Bags', link: '#accessories-and-bags', className: 'nav-link text-gray-700' },
  { label: 'Health & Beauty', link: '#health-and-beauty', className: 'nav-link text-gray-700' },
  { label: 'Clothing', link: '#clothing', className: 'nav-link text-gray-700' },
  { label: 'Shoes & Accessories', link: '#shoes-and-accessories', className: 'nav-link text-gray-700' },
  { label: 'Mens Fashion', link: '#mens-fashion', className: 'nav-link text-gray-700' },
  { label: 'Sports And Fitness', link: '#sports-and-fitness', className: 'nav-link text-gray-700' },
  { label: 'Sales', link: '#sales', className: 'nav-link text-gray-700' }
];


  return (
    <nav className="w-full">
      <div className="container mx-auto flex items-center justify-between  px-20 pt-4 text-24">
    

        <div className="hidden md:flex space-x-6">
          {navItems.map(({ label, link, className }, idx) => (
            <a key={idx} href={link} className={`transition duration-300 ${className}`}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
