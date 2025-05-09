import React from "react";
import { Instagram, Facebook, Twitter, ArrowDown } from "lucide-react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Home page footer with social links and scroll indicator
  if (isHomePage) {
    return (
      <div className="fixed bottom-8 left-0 w-full px-8 flex justify-between items-end z-10">
        <div>
          <div className="text-astra-white opacity-70 mb-3">Follow Us</div>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-astra-green flex items-center justify-center text-astra-light-green hover:bg-astra-green hover:bg-opacity-20 transition-all hover:shadow-glow-sm"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-astra-green flex items-center justify-center text-astra-light-green hover:bg-astra-green hover:bg-opacity-20 transition-all hover:shadow-glow-sm"
            >
              <Facebook size={16} />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-astra-green flex items-center justify-center text-astra-light-green hover:bg-astra-green hover:bg-opacity-20 transition-all hover:shadow-glow-sm"
            >
              <Twitter size={16} />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center mb-4">
          <div className="text-astra-white opacity-70 mb-2">
            Scroll to explore
          </div>
          <div className="animate-bounce">
            <ArrowDown className="text-astra-light-green" size={16} />
          </div>
        </div>
      </div>
    );
  }

  // Empty footer for other pages
  return null;
};

export default Footer;
