import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function ReviewGame({ data }) {

    const dispatch = useDispatch();
    const { activeQuestion } = useSelector((state) => state?.quizReducer)

    const handlePrevious = () => {
        if (activeQuestion > 0) {
            dispatch({
                type: "QUIZ_PRE"
            })
        }
    }
    const handleNext = () => {
        if (activeQuestion < data.length - 1) {
            dispatch({
                type: "QUIZ_NEXT"
            })
        }
    }


    return (
        <>
        <div className='max-w-[724px] mx-auto pt-[48px]'>
            <div className='flex justify-center items-center gap-4'>
                <button
                    onClick={handlePrevious}
                    className={`flex items-center justify-center py-3 px-6 text-lg font-bold rounded-lg shadow-md w-32 
        ${activeQuestion === 0 ? "bg-gray-200 hover:bg-gray-200 text-gray-300" : "bg-gray-500 hover:bg-gray-300 text-white w-32"}`}>
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className={`flex items-center justify-center py-3 px-6 text-lg font-bold rounded-lg shadow-md
        ${activeQuestion === data.length - 1 ? "bg-gray-200 hover:bg-gray-200 text-gray-300 w-32" : "bg-green-300 hover:bg-green-500 hover:text-white w-32"}`}>
                    Next
                </button>
                <button
                    onClick={() => window.location.reload()}
                    className={`flex items-center justify-center py-3 px-6 text-lg font-bold  rounded-lg shadow-md bg-yellow-500 hover:bg-yellow-400 text-white w-32`}>
                    Reset
                </button>
            </div>
            <div className='relative bg-white pt-16 px-4 rounded-lg mt-16 pb-16'>
                <div className='absolute font-bold top-0 left-2/4 border transform -translate-y-2/4 -translate-x-2/4  timer rounded-full bg-white w-[100px] h-[100px] flex items-center justify-center text-red-500'>
                    End!
                </div>
                <h2 className='text-center w-full font-semibold text-blue-500 text-xl mb-8'>
                    Question <span>{activeQuestion + 1}</span>/<span>5</span>
                </h2>
                <p className='text-center font-bold text-2xl text-black'>
                    {data[activeQuestion]?.question_content}
                </p>
            </div>
            <ul className='rounded-lg py-10 px-16'>
                {data[activeQuestion].answers.map((item, index) => (
                    <li
                        data-index={index}
                        key={index}
                        className={`rounded-md flex items-center shadow-md my-3 py-4 px-4 cursor-pointer duration-50 bg-white mx-auto border-2 text-xl
            ${item.isSelected && item.correct ? "bg-green-600 text-white border-2" : ""} 
            ${item.isSelected && item.correct === false 
                ? "bg-red-700 text-white border-2" 
                : ""}
            ${item.correct ? "bg-green-600 text-white border-2" : ""}`}>
                        {item.answer_content}
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

export default ReviewGame
