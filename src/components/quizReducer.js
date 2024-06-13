import { ACTIONS } from './constants';

//1. Init state 
export const initState =  {
    questions: [],
    currentQuestion: 0,
    score: 0,
    endQuiz: false,
    selectedAnswer: null,
    showResult: false,
    numQuestions: 0,
    quizStarted: false,
}

//3.Reducer 
const quizReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_QUESTIONS:
            return {...state, questions: action.payload };
        case ACTIONS.SET_CURRENT_QUESTION:
            return {...state, currentQuestion: action.payload };
        case ACTIONS.SET_SCORE:
            return {...state, score: action.payload };
        case ACTIONS.SET_END_QUIZ:
            return {...state, endQuiz: action.payload };
        case ACTIONS.SET_SELECTED_ANSWER:
            return {...state, selectedAnswer: action.payload };
        case ACTIONS.SET_SHOW_RESULT:
            return {...state, showResult: action.payload };
        case ACTIONS.SET_NUM_QUESTIONS:
            return {...state, numQuestions: action.payload };
        case ACTIONS.SET_QUIZ_STARTED:
            return {...state, quizStarted: action.payload };
        default:
            return state;
    }
};

export default quizReducer;
