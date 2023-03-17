const initialState = {
    step: 1,
    activeQuestion: 0,
    time: 60
}

const quizReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case "QUIZ_START":
            return{
                ...state,
                step: 2,
            }
        case "QUIZ_NEXT":
            return{
                ...state,
                activeQuestion: state?.activeQuestion + 1
            }
        case "QUIZ_PRE":
            return{
                ...state,
                activeQuestion: state?.activeQuestion - 1
            }
        case "QUIZ_SUBMIT":
            return{
                ...state,
                step: 3,
                time: payload?.time
            }
        case "QUIZ_TIMEOUT":
            return{
                ...state,
                time: 0,
                step: 3,
            }
        case "QUIZ_RESET":
            return{
                ...state,
                step: 1,
                activeQuestion: 0,
                time: 60
            }
        case "QUIZ_REVIEW":
            return{
                ...state,
                step: 4,
                activeQuestion: 0
            }    
        default:
            return state;
    }
}

export default quizReducer
