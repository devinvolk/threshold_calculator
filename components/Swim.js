import React from 'react'
import { useState } from 'react';

const Swim = () => {
  const descriptions = ['Recovery', 'Endurance', 'Tempo', 'Threshold', 'VO2max']

  const [selectedTwoHundredTime, setSelectedTwoHundredTime] = useState('');
  const [selectedFourHundredTime, setSelectedFourHundredTime] = useState('');
  const [result, setResult] = useState(null);
  const [rawCSS, setRawCSS] = useState(null);
  const [tableData, setTableData] = useState(Array(descriptions.length).fill({ zone: 0, description: '', pace: '0:00' }));
  const [showAlert, setShowAlert] = useState(false);

  const generateTimeOption = (min, max) => {
    const options = []
    for (let i = min; i <= max; i++) {
      const minutes = String(Math.floor(i/60)).padStart(2, '0')
      const seconds = String(i % 60).padStart(2, '0')
      options.push(`${minutes}:${seconds}`)
    }
    return options
  }

  const handleTwoHundredChange = (e) => {
    setSelectedTwoHundredTime(e.target.value)
  }

  const handleFourHundredChange = (e) => {
    setSelectedFourHundredTime(e.target.value)
  }

  const twoHundredTimeOptions = generateTimeOption(100, 300)
  const fourHundredTimeOptions = generateTimeOption(240, 600)

  const formatTime = (time) => {
    const minutes = String(Math.floor(time/60)).padStart(1, '0')
    const seconds = String(Math.floor(time % 60)).padStart(2, '0')
    const formattedTime = `${minutes}:${seconds}`
    return formattedTime
  }

  const createPaces = (rawCSS) => {
    const paces = []
    const scaler = [1.3, 1.15, 1.14, 1.05, 1.04, 1.03, 1.01, 0.97, 0.95, 0.9]
    for (let i=0; i<9; i+=2) {
      const paceMin = rawCSS*scaler[i]
      const paceMax = rawCSS*scaler[i+1]
      paces.push(`${formatTime(paceMin)}-${formatTime(paceMax)}`)
    }
    return paces
  }

  const createTableData = (descriptions, paces) => {
    const tableData = []
    for (let i=0; i< descriptions.length; i++) {
      tableData.push({
        zone: i+1,
        description: descriptions[i],
        pace: paces[i],
      })
    }
    return tableData
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedTwoHundredTime && selectedFourHundredTime) {
      try {
        const twoHundredConversion = selectedTwoHundredTime.split(':').reduce((min, sec) => min * 60 + +sec, 0);
        const fourHundredConversion = selectedFourHundredTime.split(':').reduce((min, sec) => min * 60 + +sec, 0);
        const calculatedCSS = ((fourHundredConversion - twoHundredConversion) / 2);

        setRawCSS(calculatedCSS);
        setResult(formatTime(calculatedCSS));

        const paces = createPaces(calculatedCSS);
        const data = createTableData(descriptions, paces);
        setTableData(data);

        setShowAlert(false);
      } catch (error) {
        setShowAlert(true);
      }
    } else {
      setShowAlert(true);
    }
  }

  const closeAlert = () => {
    setShowAlert(false)
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

      {/* Alert message with a close button */}
      {showAlert && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-4 rounded">
          <span>Please input both 200 Time and 400 Time before submitting the form</span>
          <button onClick={closeAlert} className="float-right text-red-700 font-semibold ml-2">
            X
          </button>
        </div>
      )}

      {result !== null && (
        <div>
          <div className="mt-4">
            <p>Your CSS swim pace is {result} per 100</p>
          </div>
          <div className='mt-9 col-span-12'>
            <table className="table-auto text-lx md:text-3xl text-gray-400 border-separate space-y-6">
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
    </div>
  );
};

export default Swim