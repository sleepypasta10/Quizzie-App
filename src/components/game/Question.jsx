import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import quizData from '../data/quizData';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function Question() {
    const dispatch = useDispatch();
    const { activeQuestion, time } = useSelector((state) => state?.quizReducer);
    const [data, setData] = useState(quizData[activeQuestion]);
    const [timer, setTimer] = useState(time);


    const renderTime = ({ remainingTime }) => {
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;
        if (remainingTime < 10) {
            return <div className='text-blue-800 font-semibold text-base'>{`0${minutes}:0${seconds}`}</div>
        }
        return <div className="text-blue-800 font-bold text-base">{`0${minutes}:${seconds}`}</div>;
    }

    useEffect(() => {
        if (timer > 0) {
            setTimeout(() => setTimer(timer - 1), 1000);
        } else {
            dispatch({
                type: "QUIZ_TIMEOUT",
                payload: null
            });
        }
    }, [timer]);


    const handlePrevious = () => {
        if (activeQuestion > 0) {
            dispatch({
                type: "QUIZ_PRE"
            })
        }
    }

    const handleNext = () => {
        dispatch({
            type: "QUIZ_NEXT"
        })
    }

    const SelectedHandler = (indexData, e) => {
        const newData = [...quizData];
        newData[activeQuestion].answers.forEach((item, index) => {
            item.isSelected = false;
        });
        if (indexData === Number(e.target.dataset.index)) {
            newData[activeQuestion].answers[indexData].isSelected = true;
        }
        setData(newData);
    }


    const handleSubmit = (e) => {
        if (confirm('Do you want to submit')) {
            dispatch({
                type: "QUIZ_SUBMIT"
            })
        }

    }


    return (
        <div className='max-w-[724px] mx-auto pt-[48px]'>
            <div className='flex justify-center items-center gap-4'>
                <button
                    onClick={handlePrevious}
                    className={`flex items-center justify-center py-3 px-6 text-lg font-bold rounded-lg shadow-md w-32
                    ${activeQuestion === 0 ? "bg-gray-200 hover:bg-gray-200 text-gray-300" : "bg-gray-500 hover:bg-gray-300 text-white w-32"}`}>
                    Previous
                </button>

                {activeQuestion + 1 >= quizData.length ? (
                    <button
                        onClick={(e) => handleSubmit(e)}
                        className="flex items-center justify-center py-3 px-6 text-lg font-bold  rounded-lg shadow-md bg-yellow-500 hover:bg-yellow-400 text-white w-32">
                        Submit
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className={`flex items-center justify-center py-3 px-6 text-lg font-bold  rounded-lg shadow-md 
                        ${activeQuestion === quizData.length - 1 ? "bg-gray-200 hover:bg-gray-200 text-gray-300 w-32" : "bg-green-300 hover:bg-green-500 hover:text-white w-32"}`}>
                        Next
                    </button>
                )}
            </div>
            <div className='relative bg-white pt-16 px-4 rounded-lg mt-14 pb-16'>
                <div className='absolute mt-1 top-0 left-2/4 transform -translate-y-2/4 -translate-x-2/4 rounded-full w-[90px] h-[90px] flex items-center justify-center text-[#rgb(79, 70, 229)] bg-white'>
                    <CountdownCircleTimer
                        isPlaying
                        duration={time}
                        colorsTime={[10, 5, 2, 0]}
                        rotation="counterclockwise"
                        colors={["#4F46E5", "#F7B801", "#A30000", "#A30000"]}
                        size={100}
                    >
                        {renderTime}
                    </CountdownCircleTimer>

                </div>
                <h2 className='text-center w-full font-semibold text-blue-500 text-xl mb-6'>
                    Question <span>{activeQuestion + 1}</span>/<span>5</span>
                </h2>
                <p className='text-center font-bold text-2xl text-black'>
                    {quizData[activeQuestion]?.question_content}
                </p>

            </div>
            <ul className='rounded-lg py-10 px-16'>
                {quizData[activeQuestion].answers.map((item, index) => (
                    <li
                        onClick={(e) => SelectedHandler(index, e)}
                        key={index}
                        data-index={index}
                        className={`rounded-md flex items-center shadow-md my-3 py-4 px-4 cursor-pointer duration-50 bg-white mx-auto border-2 hover:bg-[#1c1977] hover:text-white text-xl 
                        ${item.isSelected ? "primary-color" : ""}`}>
                        {item.answer_content}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Question