import React from 'react'
import Hero from './Hero'
import Calculator from './Calculator'
import About from './About'
import Footer from './Footer'

export const Main = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <Hero />
        <About />
        <Calculator />
        <Footer />
    </div>
  )
}
