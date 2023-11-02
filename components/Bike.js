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
    p1: 250,
    p2: 180,
    criticalPower: null,
    workCapacity: null,
  })

  // Handling changes to the select elements
  const handleP1Change = (e) => {
    setFormValues({
      ...formValues,
      p1: parseInt(e.target.value),
  })}

  const handleP2Change = (e) => {
    setFormValues({
      ...formValues,
      p2: parseInt(e.target.value),
  })}

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

        // Utility functions for cleaner more concise code
        const data = createTableData(descriptions, createZones(formValues.criticalPower, scaler));

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

  // useEffect to update the data table when criticalPower and workCapacity change
  useEffect(() => {
    if (formValues.criticalPower !== null && formValues.workCapacity !== null) {
      const data = createTableData(descriptions, createZones(formValues.criticalPower, scaler))
      setTableData(data)
    }
  }, [formValues.criticalPower, formValues.workCapacity])

  return (
    <div className='flex flex-col items-center justify-center mt-4'>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className='mt-4'>
          <label htmlFor='p1' className='capitalize'>3 minute average power:</label>
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
          <label htmlFor='p2' className='capitalize'>12 minute average power:</label>
          <input 
            id='p2'
            type='text'
            placeholder='180'
            onChange={handleP2Change}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <p className='text-lg md:text-2xl'>Your Critical Power is: {formValues.criticalPower}W</p>
            <p className='text-lg md:text-2xl'>Your Work Capacity is: {formValues.workCapacity}J</p>
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
    </div>
  )
}

export default Bike