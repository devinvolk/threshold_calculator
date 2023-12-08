"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const scrolling = () => {
    if (window.scrollY >= 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrolling);

    return () => {
      window.removeEventListener("scroll", scrolling);
    };
  }, []);

  return (
    <nav
      className={`fixed z-50 h-14 md:h-20 w-full ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      {/* desktop nav */}
      <div className="hidden md:flex flex-row justify-between w-full h-full">
        <div className="flex items-center h-full">
          <Image
            src={scrolled ? "/logo_white.png" : "/logo_black.png"}
            width={200}
            height={64}
            alt="DVolk Racing"
            objectFit="cover"
            className="ml-10"
          />
        </div>
        <div className="flex items-center h-full">
          <h1
            className={`mr-10 text-2xl font-bold ${
              scrolled ? "text-black" : " text-white"
            }`}
          >
            Coaching
          </h1>
        </div>
      </div>

      {/* mobile nav */}
      <div className="md:hidden flex justify-between items-center h-full mx-4">
        <div className="flex items-center h-full">
          <Image
            src={scrolled ? "/logo_white.png" : "/logo_black.png"}
            width={100}
            height={64}
            alt="DVolk Racing"
            objectFit="cover"
          />
        </div>
        <GiHamburgerMenu color={scrolled ? "black" : "white"} size={30} />
      </div>
    </nav>
  );
};

export default Navbar;
