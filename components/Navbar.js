"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";


const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)

    const scrolling = () => {
        if (window.scrollY >= 60) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrolling)
    
      return () => {
        window.removeEventListener('scroll', scrolling)
      }
    }, [])

  return (
    <nav className={`fixed z-50 h-20 w-full ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="flex flex-row justify-between w-full h-full">
            <div className="flex items-center h-full">
                <Image
                    src={scrolled ? '/logo_white.png' : '/logo_black.png'}
                    width={200}
                    height={64}
                    alt='DVolk Racing'
                    objectFit='contain'
                    className="ml-10"
                />
                {/* <h1 className={`ml-10 text-xl font-bold ${scrolled ? 'text-black' : ' text-white'}`}>DVolkRacing</h1> */}
            </div>
            <div className="flex items-center h-full">
                <h1 className={`mr-10 text-2xl font-bold ${scrolled ? 'text-black' : ' text-white'}`}>Coaching</h1>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
