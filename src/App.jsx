import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Start from './components/start-screen/Start';
import Question from './components/game/Question';
import End from './components/end-screen/End';
import ReviewGame from './components/end-screen/ReviewGame';
import quizData from './components/data/quizData'

function App() {
  const dispatch = useDispatch();
  const {step} = useSelector((state) => state?.quizReducer)
  let interval;
  
  useEffect(() => {
    if (step === 3) {
      clearInterval(interval);
    }
  }, [step])

  return (
    <div className='min-h-screen'>
      {step === 1 && <Start />}
      {step === 2 && <Question />}
      {step === 3 && 
      <End 
      data={quizData}
      />
      }
      {step === 4 && 
      <ReviewGame
        data={quizData}
      />
      }
    </div>
  )
}

export default App
