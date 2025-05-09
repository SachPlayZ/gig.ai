import { ChevronDown, Languages, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="w-full flex justify-between items-center pt-6 px-6 md:px-12 lg:px-20 relative z-50">
      <div className="max-w-3xl px-6 mx-auto backdrop-blur-lg bg-black/20 border border-astra-green/20 rounded-lg py-2.5 flex items-center justify-center shadow-glow-sm relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-astra-green/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-astra-green/10 rounded-full blur-xl"></div>

        <div className="flex items-center space-x-1">
          <Link
            to="/"
            className={`${
              currentPath === "/"
                ? "text-astra-white bg-astra-green bg-opacity-20 border border-astra-green/30"
                : "text-astra-white hover:text-astra-light-green hover:bg-astra-green/10"
            } px-5 py-2 rounded-lg flex items-center gap-1 transition-all duration-300`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1"
            >
              <path
                d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
                stroke="#2BFFF8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Home
          </Link>
          <Link
            to="/gig-bidding"
            className={`${
              currentPath === "/gig-bidding"
                ? "text-astra-white bg-astra-green bg-opacity-20 border border-astra-green/30"
                : "text-astra-white hover:text-astra-light-green hover:bg-astra-green/10"
            } px-5 py-2 rounded-lg transition-colors duration-300`}
          >
            Gigs
          </Link>
          <Link
            to="/about"
            className={`${
              currentPath === "/about"
                ? "text-astra-white bg-astra-green bg-opacity-20 border border-astra-green/30"
                : "text-astra-white hover:text-astra-light-green hover:bg-astra-green/10"
            } px-5 py-2 rounded-lg transition-colors duration-300`}
          >
            About
          </Link>
          <div className="relative flex items-center">
            <Link
              to="/services"
              className={`${
                currentPath.startsWith("/services")
                  ? "text-astra-white bg-astra-green bg-opacity-20 border border-astra-green/30"
                  : "text-astra-white hover:text-astra-light-green hover:bg-astra-green/10"
              } px-5 py-2 rounded-lg flex items-center gap-1 transition-colors duration-300`}
            >
              Services <ChevronDown size={16} />
            </Link>
          </div>
          <Link
            to="/pricing"
            className={`${
              currentPath === "/pricing"
                ? "text-astra-white bg-astra-green bg-opacity-20 border border-astra-green/30"
                : "text-astra-white hover:text-astra-light-green hover:bg-astra-green/10"
            } px-5 py-2 rounded-lg transition-colors duration-300`}
          >
            Pricing
          </Link>
          <Link
            to="/solution"
            className={`${
              currentPath === "/solution"
                ? "text-astra-white bg-astra-green bg-opacity-20 border border-astra-green/30"
                : "text-astra-white hover:text-astra-light-green hover:bg-astra-green/10"
            } px-5 py-2 rounded-lg transition-colors duration-300`}
          >
            Solution
          </Link>
          <div className="hidden md:flex items-center border border-astra-green/30 bg-astra-green/10 rounded-lg pr-3 pl-2 py-1.5 hover:shadow-glow-green-sm transition-shadow">
            <Languages size={18} className="text-astra-white mr-1" />
            <span className="text-astra-white text-sm">English</span>
            <ChevronDown size={14} className="text-astra-white ml-1" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Button className="bg-[#064119] border-gray-300 border-2 text-white px-8 py-5 rounded-md font-medium text-lg">
          <Wallet className="ml-2" size={18} /> Connect Wallet
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
