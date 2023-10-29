"use client"

import React from 'react'
import { useState } from 'react'

const Bike = () => {
  const [p1, setP1] = useState(250)
  const [p2, setP2] = useState(180)
  const [criticalPower, setCriticalPower] = useState(null)
  const [workCapacity, setWorkCapacity] = useState(null)

  const handleP1Change = (e) => {
    setP1(parseInt(e.target.value))
  }

  const handleP2Change = (e) => {
    setP2(parseInt(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const power = (((p2*12)-(p1*3))/9).toFixed(1)
    const work = (0.24*(p1-p2)).toFixed(2)
    setCriticalPower(power)
    setWorkCapacity(work)
  }

  return (
    <div className='flex flex-col items-center justify-center mt-4'>
      <form onSubmit={handleSubmit}>
        <div className='mt-4'>
          <label htmlFor='p1' className='capitalize'>3 minute average power (w):</label>
          <input 
            id='p1'
            type='text'
            placeholder='250'
            onChange={handleP1Change}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
          </input>
        </div>
        <div className='mt-4'>
          <label htmlFor='p2' className='capitalize'>12 minute average power (w):</label>
          <input 
            id='p2'
            type='text'
            placeholder='180'
            onChange={handleP2Change}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
          </input>
        </div>
        <div className='mt-4'>
          <button
            type='submit'
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Calculate
          </button>
        </div>
      </form>
      {criticalPower !== null && workCapacity !== null && (
        <div className='mt-4'>
          <p>Your Critical Power is: {criticalPower}W</p>
          <p>Your W' is: {workCapacity}J</p>
        </div>
      )}
    </div>
  )
}

export default Bike