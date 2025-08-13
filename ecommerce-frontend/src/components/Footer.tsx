/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-orange-500 text-white text-sm mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Company Info */}
        <div>
          <a
          href="/"
          className="text-xl font-bold mb-4">ShopMate</a>
          <p className="flex items-start gap-2 mb-2">
            <MapPin size={16} /> Wukari, Taraba, Nigeria
          </p>
          <p className="flex items-center gap-2 mb-1">
            <Phone size={16} /> +234-12345678 (Calls only)
          </p>

          <p className="flex items-center gap-2 mb-1">
            <Phone size={16} /> +234-12345678 (WhatsApp only)
          </p>
          <p className="flex items-center gap-2 mt-2">
            <Mail size={16} /> shopmate@fisher9ine.com
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold mb-3">Company Info</h3>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>FAQs</li>
            <li>Customer Selfies/Feedback</li>
            <li>Customer Reviews</li>
            <li>Size Guide</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Customer Care</h3>
          <ul className="space-y-1">
            <li>Pay on Delivery Notice</li>
            <li>Delivery Information</li>
            <li>Refund & Returns Policy</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Hours of Operation */}
        <div>
          <h3 className="font-semibold mb-3">Hours of Operation (GMT+1)</h3>
          <ul className="space-y-1">
            <li><strong>Call-in:</strong> Mon–Fri, 9:00am – 5:30pm</li>
            <li><strong>Pick-up:</strong> Mon–Fri, 12:00pm – 5:30pm</li>
            <li><strong>Chat:</strong> Mon–Fri, 9:30am – 9:00pm</li>
            <li>Sat & Sun – Flexible (slow responses)</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-6">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 Bukola David - All Right reserved!</p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="WhatsApp"><Phone size={18} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
