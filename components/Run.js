"use client"

import React from 'react'
import { useState } from 'react'

const Run = () => {
  const [p1, setP1] = useState(null)
  const [p2, setP2] = useState(null)
  const [criticalPower, setCriticalPower] = useState(null)

  const handleP1Change = (e) => {
    setP1(parseInt(e.target.value))
  }

  const handleP2Change = (e) => {
    setP2(parseInt(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const power = (((p2*8)-(p1*3))/5).toFixed(1)
    setCriticalPower(power)
  }

  return (
    <div className='flex flex-col items-center justify-center mt-4'>
      <form onSubmit={handleSubmit}>
        <div className='mt-4'>
          <label htmlFor='threemin' className='capitalize'>3 minute average power:</label>
          <input
            id='threemin'
            type='text'
            placeholder='450'
            onChange={handleP1Change}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
          </input>
        </div>
        <div className='mt-4'>
          <label htmlFor='eightMin' className='capitalize'>8 minute average power:</label>
          <input
            id='eightMin'
            type='text'
            placeholder='300'
            onChange={handleP2Change}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>
        </div>
        <div className='mt-4 flex justify-center'>
          <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'>
            Calculate
          </button>
        </div>
      </form>
      {criticalPower !== null && (
        <div className='mt-4'>
          <p>Your Critical Run Power is: {criticalPower}W</p>
        </div>
      )}
    </div>
  )
}

export default Run