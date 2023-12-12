"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from 'react-icons/ai';
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrolling = () => {
    if (window.scrollY >= 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  useEffect(() => {
    window.addEventListener("scroll", scrolling);

    return () => {
      window.removeEventListener("scroll", scrolling);
    };
  }, []);

  return (
    <nav className={`fixed z-50 h-14 py-2 md:h-20 w-full ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
      
      {/* desktop nav */}
      <div className="hidden md:flex flex-row justify-between w-full h-full">
        <div className="flex items-center h-full">
          <Image
            src={scrolled ? "/images/logo_white.png" : "/images/logo_black.png"}
            width={120}
            height={60}
            alt="DVolk Racing"
            className="ml-10"
            style='contain'
          />
        </div>
        <div className="flex items-center h-full">
          <Link href='/Coaching' className={`mr-10 text-2xl font-bold ${
              scrolled ? "text-black hover:text-gray-700" : " text-white hover:text-gray-400"
            }`}>
            Coaching
          </Link>
        </div>
      </div>

      {/* mobile nav */}
      <div className="md:hidden flex justify-between items-center h-full mx-4">
        <div className="flex items-center h-full">
          <Image
            src={scrolled ? "/images/logo_white.png" : "/images/logo_black.png"}
            width={80}
            height={64}
            alt="DVolk Racing"
            style="contain"
          />
        </div>
        {menuOpen ?  (
            <AiOutlineClose
                color={scrolled ? 'black' : 'white'}
                size={30}
                onClick={toggleMenu}
            />
        ) : (
            <GiHamburgerMenu
                color={scrolled ? "black" : "white"}
                size={30}
                onClick={toggleMenu}
            />
        )}
      </div>

      {/* mobile drop down */}
      {menuOpen && (
        <div className={`absolute flex justify-center items-center h-20 right-0 w-36 ${scrolled ? 'bg-white' : 'bg-black'}`}>
            <Link href='/Coaching' className={`text-2xl font-bold ${
              scrolled ? "text-black hover:text-gray-700" : " text-white hover:text-gray-400"
            }`}>
              Coaching
            </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
