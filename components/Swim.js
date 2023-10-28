import React from 'react'
import { useState } from 'react';

const Swim = () => {
  const [selectedTwoHundredTime, setSelectedTwoHundredTime] = useState('01:40');
  const [selectedFourHundredTime, setSelectedFourHundredTime] = useState('04:00');
  const [result, setResult] = useState(null);

  const generateTimeOption = (min, max) => {
    const options = []
    for (let i = min; i <= max; i++) {
      const minutes = String(Math.floor(i/60)).padStart(2, '0')
      const seconds = String(i % 60).padStart(2, '0')
      options.push(`${minutes}:${seconds}`)
    }
    return options
  }

  const handleTwoHundredChange = (event) => {
    setSelectedTwoHundredTime(event.target.value)
  }

  const handleFourHundredChange = (event) => {
    setSelectedFourHundredTime(event.target.value)
  }

  const twoHundredTimeOptions = generateTimeOption(100, 300)
  const fourHundredTimeOptions = generateTimeOption(240, 600)

  const handleSubmit = (event) => {
    event.preventDefault();
    const twoHundredConversion = selectedTwoHundredTime.split(':').reduce((min, sec) => min * 60 + +sec, 0)
    const fourHundredConversion = selectedFourHundredTime.split(':').reduce((min, sec) => min * 60 + +sec, 0)
    const calculatedCSS = ((fourHundredConversion - twoHundredConversion) / 2)

    const minutes = String(Math.floor(calculatedCSS/60)).padStart(2, 0)
    const seconds = String(calculatedCSS % 60).padStart(2, 0)
    const formattedCSS = `${minutes}:${seconds}`
    
    setResult(formattedCSS)
  }

  return (
    <div className='flex flex-col items-center justify-center mt-4'>
      <form onSubmit={handleSubmit}>
        <div className='w-full mb-4'>
          <label htmlFor='200Time' className="block text-sm font-medium">200 Time</label>
          <div>
            <select
              id='200Time'
              name='200Time'
              value={selectedTwoHundredTime}
              onChange={handleTwoHundredChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {twoHundredTimeOptions.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='w-full mb-4'>
          <label htmlFor='400Time' className="block text-sm font-medium">400 Time</label>
          <div>
            <select
              id='400Time'
              name='400Time'
              value={selectedFourHundredTime}
              onChange={handleFourHundredChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {fourHundredTimeOptions.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='mt-6'>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Calculate
          </button>
        </div>
      </form>
      {result !== null && (
        <div className="mt-4">
          <p>Your CSS is {result} per 100</p>
        </div>
      )}
    </div>
  );
};

export default Swim