import React from 'react'
import { useState } from 'react';
import { formatTime, calculateCSS, createPaces, createTableData } from '@/utils/utils';

const Swim = () => {
  // Data table variables defined
  const descriptions = ['Easy', 'Steady', 'Moderately Hard', 'Hard', 'Very Hard']
  const scaler = [1.3, 1.15, 1.14, 1.05, 1.04, 1.03, 1.02, 0.97, 0.96, 0.9]

  const [selectedTwoHundredTime, setSelectedTwoHundredTime] = useState('');
  const [selectedFourHundredTime, setSelectedFourHundredTime] = useState('');
  const [result, setResult] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);


  // Logic for generating select option for the form
  const generateTimeOption = (min, max) => {
    const options = []
    for (let i = min; i <= max; i++) {
      const minutes = String(Math.floor(i/60)).padStart(2, '0')
      const seconds = String(i % 60).padStart(2, '0')
      options.push(`${minutes}:${seconds}`)
    }
    return options
  }

  const twoHundredTimeOptions = generateTimeOption(100, 300)
  const fourHundredTimeOptions = generateTimeOption(240, 600)

  // Handling changes to the select elements
  const handleTwoHundredChange = (e) => {
    setSelectedTwoHundredTime(e.target.value)
  }

  const handleFourHundredChange = (e) => {
    setSelectedFourHundredTime(e.target.value)
  }

  // Handle submit logic, data table creation, and error handling
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedTwoHundredTime && selectedFourHundredTime) {
      try {

        // Utility functions for cleaner more concise code
        const calculatedCSS = calculateCSS(selectedTwoHundredTime, selectedFourHundredTime);
        const data = createTableData(descriptions, createPaces(calculatedCSS, scaler));
        
        setResult(formatTime(calculatedCSS));
        setTableData(data);
        setShowAlert(false);

      } catch (error) {
        setShowAlert(true);
      }
    } else {
      setShowAlert(true);
    }
  }

  // Alert onClick logic
  const closeAlert = () => {
    setShowAlert(false)
  }

  return (
    <div className='flex flex-col items-center justify-center'>

      {/* Form */}
      <form onSubmit={handleSubmit} className='w-11/12 md:w-full'>
          <div className='grid grid-cols-1'>
            <label htmlFor='200Time' className="capitalize text-lg justify-self-center md:text-2xl">200 Time</label>
              <select
                id='200Time'
                name='200Time'
                value={selectedTwoHundredTime}
                onChange={handleTwoHundredChange}
                className="w-11/12 justify-self-center md:w-full md:mx-0 rounded-md border-0 py-2 px-2 md:py-3 md:px-3 text-gray-900 shadow-sm md:shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm md:text-lg sm:leading-6"
              >
                {twoHundredTimeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
          </div>
          <div className='mt-4 grid grid-cols-1'>
            <label htmlFor='400Time' className="capitalize text-lg justify-self-center md:text-2xl">400 Time</label>
              <select
                id='400Time'
                name='400Time'
                value={selectedFourHundredTime}
                onChange={handleFourHundredChange}
                className="w-11/12 justify-self-center md:w-full md:mx-0 rounded-md border-0 py-2 px-2 md:py-3 md:px-3 text-gray-900 shadow-sm md:shadow-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm md:text-lg sm:leading-6"
              >
                {fourHundredTimeOptions.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
          </div>
        <div className='mt-6 flex justify-center'>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Calculate
          </button>
        </div>
      </form>

      {/* Alert message */}
      {showAlert && (
        <div className='flex justify-center'>
          <div className="w-1/2 flex justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-4 rounded">
            <span>Please input both 200 Time and 400 Time before submitting the form</span>
            <button onClick={closeAlert} className="float-right text-red-700 font-semibold ml-2">
              X
            </button>
          </div>
        </div>
      )}

      {/* CSS result and data table for training paces */}
      {result !== null && (
        <div className='flex flex-col'>
          <div className="mt-9 mx-auto">
            <p className='text-lg md:text-2xl'>Your CSS swim pace is <span className='font-bold'>{result} per 100</span></p>
          </div>
          <div className='mt-9 col-span-12 mx-auto'>
            <table className="table-auto text-lg md:text-2xl text-gray-400 border-separate space-y-6">
              <thead className='bg-gray-800 text-gray-500'>
                <tr>
                  <th className='p-3'>Zone</th>
                  <th className='p-3'>Description</th>
                  <th className='p-3'>Pace</th>
                </tr>
              </thead>
              <tbody>
              {tableData.map((item, index) => {
                    return (
                <tr key={index} className='bg-gray-800'>
                      <td className='p-3 text-center'>{item.zone}</td>
                      <td className='p-3 text-left'>{item.description}</td>
                      <td className='p-3 text-center'>{item.pace}</td>
                </tr>
              )})}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className='mx-5 mt-10'>
        <h2 className='text-center font-bold text-3xl md:text-4xl'>How to test your Critical Swim Speed:</h2>
        <p className='text-center text-lg md:text-2xl mt-2'>
        To conduct a <span className='font-bold'>Critical Swim Speed (CSS)</span> test, begin with a thorough warm-up to ensure your body is prepared for the test. 
        The CSS test involves swimming a series of timed distances, a 400 and a 200, 
        with a rest interval in between. The objective is to swim these distances at a consistent pace, 
        pushing yourself to maintain the fastest sustainable speed. Record the time it takes to complete each distance, 
        and use these times in the calculator above. Your CSS pace represents the pace you should be able to sustain 
        for about a 1500 all out.
        </p>
        <div className='flex flex-col justify-center items-center mt-7'>
          <h3 className='text-xl md:text-3xl font-bold'>Example set:</h3>
          <h4 className='text-lg md:text-2xl font-bold mt-4'>Warm Up:</h4>
          <p className='text-xl mt-2'>500 easy swim</p>
          <p className='text-lg md:text-xl'>4x50 drill on 15 seconds rest</p>
          <p className='text-lg md:text-xl'>4x50 build on 15 seconds rest</p>
          <p className='text-lg md:text-xl text-center'>4x25 400 race pace on 15 seconds rest</p>
          <h4 className='text-xl md:text-2xl font-bold mt-4'>Main Set:</h4>
          <p className='text-lg md:text-xl mt-2'>400 all out</p>
          <p className='text-lg md:text-xl text-center'>5 minutes rest, can include easy swimming</p>
          <p className='text-lg md:text-xl'>200 all out</p>
          <h4 className='text-xl md:text-2xl font-bold mt-4'>Cool Down:</h4>
          <p className='text-lg md:text-xl mt-2'>200-500 choice</p>
        </div>
      </div>
    </div>
  );
};

export default Swim