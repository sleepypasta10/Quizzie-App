import React from 'react'
import { useDispatch } from 'react-redux'

function Start() {
    const dispatch = useDispatch();
    
    const handleQuizStart = () => {
        dispatch({
            type: "QUIZ_START"
        })
    }

  return (
      <div className='container mx-auto pt-16 text-center'>
        <div className='grid grid-cols-12'>
            <div className='col-span-12'>
                <h1 className='text-5xl text-white font-bold mb-6'>
                    Welcome to React Quiz Game!
                </h1>
            </div>
            <div className='col-span-12'>
                <button className='flex items-center justify-center px-16 py-3 text-lg font-bold rounded-lg shadow-md bg-[#10b981] hover:bg-[#6ed5b7] hover:text-white mx-auto'
                onClick={handleQuizStart}>
                    Start
                </button>
            </div>
        </div>
      </div>
  )
}

export default Start
