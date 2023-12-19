import React from 'react'
import Hero from '@/components/Hero'
import Calculator from '@/components/Calculator'
import About from '@/components/About'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main className='max-w-[1536px] mx-auto'>
      <Navbar />
      <Hero />
      <About />
      <Calculator />
      <Footer />
    </main>
  );
}
