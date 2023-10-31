"use client"

import React from 'react'
import { useState } from 'react'
import Swim from './Swim'
import Bike from './Bike'
import Run from './Run'

export const Main = () => {
    const [isSwimChecked, setIsSwimChecked] = useState(true)
    const [isBikeChecked, setIsBikeChecked] = useState(false)
    const [isRunChecked, setIsRunChecked] = useState(false)

    const handleCheckboxChange = (e) => {
        const checkboxName = e.target.name
        
        setIsSwimChecked(checkboxName === 'swim')
        setIsBikeChecked(checkboxName === 'Bike')
        setIsRunChecked(checkboxName === 'run')
    };


  return (
    <div>
        <div className='mt-3 py-3 md:mx-10 md:mt-5 md:py-5 bg-neutral-900 md:rounded-lg'>
            <h1 className='font-bold text-center text-2xl md:text-6xl'>Welcome to the Threshold Calculator!</h1>
            <div>
                <form>
                    <fieldset className='mt-9'>
                        <legend className="text-xl md:text-3xl text-center leading-6">Select Sport:</legend>
                        <div className='flex space-x-9 justify-center my-5'>
                            <div>
                                <input
                                    id="swim"
                                    name="swim"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    checked={isSwimChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor='swim' className='ml-2'>Swim</label>
                            </div>
                            <div>
                                <input
                                    id="Bike"
                                    name="Bike"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    checked={isBikeChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor='Bike' className='ml-2'>Bike</label>
                            </div>
                            <div>
                                <input
                                    id="run"
                                    name="run"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    checked={isRunChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor='run' className='ml-2'>Run</label>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <div>
                    {isSwimChecked && <Swim />}
                    {isBikeChecked && <Bike />}
                    {isRunChecked && <Run />}
                </div>
            </div>
        </div>
    </div>
  )
}
