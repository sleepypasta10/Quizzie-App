import { createStore, combineReducers } from "redux";
import quizReducer from "./reducer/quizReducer";

const reducers = combineReducers({
    quizReducer,
})

export const store = createStore(reducers)