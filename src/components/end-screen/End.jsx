import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import ReviewModal from './ReviewModal';

function End({data}) {
    const dispatch = useDispatch();
    const [correctAnswer, setCorrectAnswer] = useState(0);
    // console.log(data);
    // const [modal, setModal] = useState(false);

    useEffect(() => {
        let score = 0;
        data.forEach((element, index) => {
            element.answers.forEach((item, index2) => {
                if (item.correct === true && item.isSelected === true) {
                    score++;
                }
            })
        });
        setCorrectAnswer(score)
    }, [])


    const handleReset = () => {
        dispatch({
            type: "QUIZ_RESET"
        })
        window.location.reload();
    }
    
    const handleReview = () => {
        dispatch({
            type: "QUIZ_REVIEW"
        })
    }

  return (
    <div className='pt-16'>
      <h1 className='text-3xl text-white text-center'>
        Your score is: <span className='font-bold'>{correctAnswer} of {data.length}</span>
      </h1>
      <div className='flex justify-center items-center gap-x-10'>
        <button
        onClick={handleReset}
        className='flex items-center justify-center py-3 px-6 text-lg font-bold rounded-lg shadow-md bg-[#10b981] hover:text-white mt-5'>
            Try again
        </button>
        <button
        onClick={handleReview} 
        className='flex items-center justify-center py-3 px-6 text-lg font-bold  rounded-lg shadow-md bg-red-500 hover:bg-red-400 text-white mt-5'>
            Review
        </button>
      </div>
    </div>
  )
}

export default End
