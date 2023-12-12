import Image from 'next/image'
import React from 'react'
import heroImage from '../public/images/hero-image.jpg'

const Hero = () => {
  return (
    <div className='relative flex justify-center items-center'>
        <div className='w-full relative'>
            <Image
                src={heroImage}
                alt='swim, bike, run cover photo'
                priority={true}
            />
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center'>
                <h1 className='font-bold drop-shadow-sm text-white text-center text-4xl md:text-8xl'>Welcome to the Threshold Calculator!</h1>
            </div>
        </div>
    </div>
  )
}

export default Hero