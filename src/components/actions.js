//2. Actions
import { ACTIONS } from "./constants"

export const setQuestions = payload =>{
    return {
        type: ACTIONS.SET_QUESTIONS,
        payload
    }
}

export const setCurrentQuestion = payload =>{
    return {
        type: ACTIONS.SET_CURRENT_QUESTION,
        payload
    }
}

export const setScore = payload =>{
    return {
        type: ACTIONS.SET_SCORE,
        payload
    }
}

export const setEndQuiz = payload =>{
    return {
        type: ACTIONS.SET_END_QUIZ,
        payload
    }
}

export const setSelectedAnswer = payload =>{
    return {
        type: ACTIONS.SET_SELECTED_ANSWER,
        payload
    }
}

export const setShowResult = payload => {
    return {
        type : ACTIONS.SET_SHOW_RESULT
    }
}

export const setNumQuestions = payload =>{
    return {
        type: ACTIONS.SET_NUM_QUESTIONS,
        payload
    }
}

export const setQuizStarted = payload =>{
    return {
        type: ACTIONS.SET_QUIZ_STARTED,
        payload
    }
}