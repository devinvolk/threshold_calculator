import React from 'react'
import Hero from './Hero'
import Calculator from './Calculator'

export const Main = () => {
  return (
    <div className='flex flex-col justify-center items-center mb-5'>
        <Hero />
        <Calculator />
    </div>
  )
}
