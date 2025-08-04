/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

const Navbar = () => {
  const navItems = [
    { label: 'Home', link: '#home', className: 'text-orange-500 font-bold' },
    { label: 'Shop', link: '#shop', className: 'text-gray-700 hover:text-orange-500' },
    { label: 'Categories', link: '#categories', className: 'text-gray-700 hover:text-orange-500' },
    { label: 'Deals', link: '#deals', className: 'text-gray-700 hover:text-orange-500' },
    { label: 'Contact', link: '#contact', className: 'text-gray-700 hover:text-orange-500 md:hidden' }
  ];

  return (
    <nav className="w-full">
      <div className="container mx-auto flex items-center justify-between  px-0 pt-5">
    

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
