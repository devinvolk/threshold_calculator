"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { createTableData, createZones } from '@/utils/utils'

const Bike = () => {
  // Data table variables defined
  const descriptions = ['Recovery', 'Endurance', 'Tempo', 'Threshold', 'VO2max', 'Anaerobic Capacity']
  const scaler = [0.4, 0.55, 0.56, 0.75, 0.76, 0.92, 0.95, 1.02, 1.05, 1.2, 1.2, 2]

  const [tableData, setTableData] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [formValues, setFormValues] = useState({
    p1: null,
    p2: null,
    criticalPower: null,
    workCapacity: null,
  })

  // Handling changes to the select elements
  const handleP1Change = (e) => {
    setFormValues({
      ...formValues,
      p1: parseInt(e.target.value),
    })
  }

  const handleP2Change = (e) => {
    setFormValues({
      ...formValues,
      p2: parseInt(e.target.value),
    })
  }

    // Handle submit logic, data table creation, and error handling
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValues.p1 && formValues.p2) {
      try {

        const power = (((formValues.p2*12)-(formValues.p1*3))/9).toFixed(1);
        const work = (0.24*(formValues.p1-formValues.p2)).toFixed(2);
        setFormValues({
          ...formValues,
          criticalPower: power,
          workCapacity: work,
        });
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

  // useEffect to update the data table when criticalPower and workCapacity change
  useEffect(() => {
    if (formValues.criticalPower !== null && formValues.workCapacity !== null) {
      const data = createTableData(descriptions, createZones(formValues.criticalPower, scaler))
      setTableData(data)
    }
  }, [formValues.criticalPower, formValues.workCapacity])

  return (
    <div className='flex flex-col items-center justify-center'>

      {/* Form */}
      <form onSubmit={handleSubmit} className='w-11/12 md:w-1/3'>
        <div className='grid grid-cols-1'>
          <label htmlFor='p1' className='capitalize text-lg justify-self-center md:justify-self-start md:text-2xl'>3 minute average power:</label>
          <input 
            id='p1'
            type='text'
            placeholder='375'
            onChange={handleP1Change}
            className="w-11/12 justify-self-center shadow md:shadow-lg appearance-none border rounded md:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
          </input>
        </div>
        <div className='mt-4 grid grid-cols-1'>
          <label htmlFor='p2' className='capitalize text-lg justify-self-center md:justify-self-start md:text-2xl'>12 minute average power:</label>
          <input 
            id='p2'
            type='text'
            placeholder='300'
            onChange={handleP2Change}
            className="w-11/12 justify-self-center shadow md:shadow-lg appearance-none border rounded md:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
          </input>
        </div>
        <div className='mt-4 flex justify-center'>
          <button
            type='submit'
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
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

      {/* CP and W' results and data table for training paces */}
      {formValues.criticalPower !== null && formValues.workCapacity !== null && tableData !== null && (
        <div className='flex flex-col'>
          <div className="mt-9 mx-auto">
            <p className='text-lg md:text-2xl'>Your Critical Power is: <span className='font-bold'>{formValues.criticalPower}W</span></p>
            <p className='text-lg md:text-2xl'>Your Work Capacity is: <span className='font-bold'>{formValues.workCapacity}J</span></p>
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
        <h2 className='text-center font-bold text-3xl md:text-4xl'>Why Critical Power?</h2>
        <p className='text-center text-lg md:text-2xl mt-2'>
        Why opt for <span className='font-bold'>Critical Power (CP)</span> over <span className='font-bold'>Functional Threshold Power (FTP)</span>? 
        While FTP has a longer history, CP is a newer model for estimating a cyclist's threshold, offering advantages in the testing process. 
        CP is typically measured with 3-minute and 12-minute all-out efforts, or an unpaced 4-minute test. 
        The shorter testing duration allows for more frequent assessments within a training block without 
        requiring a significant taper or precise pacing, as with the standard 20-minute FTP test. This flexibility 
        enables athletes to regularly evaluate changes to their CP, allowing for more specific and tailored training adjustments.
        </p>
        <h2 className='text-center font-bold text-3xl md:text-4xl mt-7'>How to test your Critical Power:</h2>
        <p className='text-center text-lg md:text-2xl mt-2'>
        To conduct a cycling CP test, it is best to use a smart trainer or a climb with a consistent gradient. 
        After a thorough warm-up, do a 3-minute all-out effort, try to consistently maintain your highest possible power. 
        Take a long easy break of at least 10-15 minutes, then do a 12-minute all-out effort. 
        This can be broken up into two consecutive days. Take your average power for each test and input them into the calculator above.
        </p>
        <div className='flex flex-col justify-center items-center mt-7'>
          <h3 className='text-xl md:text-3xl font-bold'>Example set:</h3>
          <h4 className='text-lg md:text-2xl font-bold mt-4'>Warm Up:</h4>
          <p className='text-lg md:text-xl mt-2'>20 minutes easy spinning</p>
          <p className='text-lg md:text-xl'>3 minutes zone 3 (Moderate intensity)</p>
          <p className='text-lg md:text-xl'>3 minutes zone 4 (Threshold)</p>
          <p className='text-lg md:text-xl'>1 minutes zone 5 (Hard)</p>
          <p className='text-lg md:text-xl'>2 minutes easy reset</p>
          <h4 className='text-xl md:text-2xl font-bold mt-4'>Main Set:</h4>
          <p className='text-xl mt-2'>3 minutes all out</p>
          <p className='text-xl'>15 minutes easy recovery</p>
          <p className='text-xl'>12 minutes all out</p>
          <h4 className='text-xl md:text-2xl font-bold mt-4'>Cool Down:</h4>
          <p className='text-lg md:text-xl mt-2'>10-15 minutes very easy spinning</p>
        </div>
      </div>
    </div>
  )
}

export default Bike