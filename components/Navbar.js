"use client";

import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from 'react-icons/ai';
import Link from "next/link";
import Image from "next/image";
import blackImage from '../public/images/logo_black.png';
import whiteImage from '../public/images/logo_white.png';

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

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen]);

  return (
    <nav className={`fixed z-50 h-14 py-2 md:h-20 w-full ${ menuOpen ? "bg-white shadow-md" : (scrolled ? "bg-white shadow-md" : "bg-transparent")}`}>
      
      {/* desktop nav */}
      <div className="hidden md:flex flex-row justify-between w-full h-full">
        <div className="flex items-center h-full">
          <Image
            src={scrolled ? whiteImage : blackImage}
            alt="DVolk Racing"
            className="object-contain object-left ml-10 max-w-full max-h-full"
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
            src={menuOpen? whiteImage : (scrolled ? whiteImage : blackImage)}
            alt="DVolk Racing"
            className="object-contain object-left max-w-full max-h-full"
          />
        </div>
        {menuOpen ?  (
            <AiOutlineClose
                color={menuOpen ? 'black' : (scrolled ? 'black' : 'white')}
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
        <div className={`${menuOpen ? 'mr-0' : 'mr-[-240px]'} transition-[margin-right] ease-in-out duration-500 fixed flex justify-center bottom-0 top-12 right-0 w-60 z-40 bg-white`}>
            <Link href='/Coaching' className="text-2xl mt-12 font-bold text-black">
              Coaching
            </Link>
        </div>
    </nav>
  );
};

export default Navbar;
