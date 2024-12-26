import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import { CgProfile } from "react-icons/cg";

function Header() {
  const { isAuthenticated,user, logout, loading } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  async function handleLogout() {
    await logout();
  }

  function handleDropdown() {
    setIsOpen((prev) => !prev);
  }

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex justify-between items-center px-8 bg-zinc-700 text-white py-4 z-10">
      <h1 className="font-bold text-3xl">
        <Link to="/">E-Commerce</Link>
      </h1>

      <ul className="flex items-center gap-6">
        <li>
          <Link to="/contact" className="hover:text-gray-300">
            Contact Us
          </Link>
        </li>
        <li>
          <Link to="/register-seller" className="hover:text-gray-300">
            Register as a Seller
          </Link>
        </li>

        {!isAuthenticated ? (
          <li>
            <Link to="/login" className="hover:text-gray-300">
              Sign In
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/add-product" className="hover:text-gray-300">
                Add Product
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-gray-300">
                Cart
              </Link>
            </li>
            <li className="relative" ref={dropdownRef}>
              
              <button
                onClick={handleDropdown}
                className="hover:text-gray-300 focus:outline-none"
              >
                <CgProfile className="text-2xl" />
              </button>

              {isOpen && (
                <ul className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-lg flex flex-col py-2">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/profile" className="text-gray-700 hover:text-blue-500">
                      My Profile
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <button
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-red-500 w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
