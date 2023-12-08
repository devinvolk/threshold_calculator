import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='relative flex justify-center items-center'>
        <div className='w-full relative'>
            <Image
                src='/images/hero-image.jpg'
                width={1500}
                height={500}
                alt='swim, bike, run cover photo'
                objectFit='cover'
            />
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center'>
                <h1 className='font-bold drop-shadow-sm text-white text-center text-4xl md:text-8xl'>Welcome to the Threshold Calculator!</h1>
            </div>
        </div>
    </div>
  )
}

export default Hero