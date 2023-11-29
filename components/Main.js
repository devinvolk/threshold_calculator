import React from 'react'
import Hero from './Hero'
import Calculator from './Calculator'
import About from './About'

export const Main = () => {
  return (
    <div className='flex flex-col justify-center items-center mb-5'>
        <Hero />
        <About />
        <Calculator />
    </div>
  )
}
