import React, { useReducer, createContext,useEffect } from 'react';
//import actions 
import { setQuestions,setCurrentQuestion,setEndQuiz,setNumQuestions,setQuizStarted,setScore,setSelectedAnswer,setShowResult } from './actions';
//import init
import { initState } from './quizReducer';
//import Reducer
import quizReducer from './quizReducer';
import { QuizData } from './QuizData';

const QuizContext = createContext(); 

function QuizProvider({children}){
    const [state, dispatch] = useReducer(quizReducer,initState);
    // Destructuring to take state
    const {
        questions,
        currentQuestion,
        score,
        endQuiz,
        selectedAnswer,
        showResult,
        numQuestions,
        quizStarted,
    } = state;
    //Start quiz
    useEffect(() => {
        if (quizStarted) {
            const shuffledQuestions = QuizData.sort(() => 0.5 - Math.random());
            const selectedQuestions = shuffledQuestions.slice(0, numQuestions);
            dispatch(setQuestions(selectedQuestions));
            dispatch(setCurrentQuestion(0));
            dispatch(setScore(0));
            dispatch(setEndQuiz(false));
            dispatch(setSelectedAnswer(null));
            dispatch(setShowResult(false));
        }
    }, [quizStarted, numQuestions]);
    //handle Answer Selected
    const handleAnswerSelected = (selectedAnswer) => {
        dispatch(setSelectedAnswer(selectedAnswer));
    };
    //handle submit ans action
    const handleSubmitAnswer = () => {
        const correctAnswer = questions[currentQuestion].correctAnswer;
        if (selectedAnswer === correctAnswer) {
            dispatch(setScore(score +1));
        }
        dispatch(setShowResult(true));
    };
    // handle action click next question
    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            dispatch(setCurrentQuestion(currentQuestion +1));
            dispatch(setSelectedAnswer(null));
            dispatch(setShowResult(false));
        } else {
            dispatch(setEndQuiz(true));
        }
    };
    // handle action reset Quiz
    const resetQuiz = () => {
        dispatch(setCurrentQuestion(0));
        dispatch(setScore(0));
        dispatch(setEndQuiz(false));
        dispatch(setSelectedAnswer(null));
        dispatch(setShowResult(false));
        dispatch(setNumQuestions(0));
        dispatch(setQuizStarted(false));
    };
    // handle on change input of number of question
    const handleNumQuestionsChange = (event) => {
        dispatch(setNumQuestions(event.target.value));
    };
    // handle action click start quiz
    const startQuiz = () => {
        dispatch(setQuizStarted(true));
    };
}

export {QuizContext,QuizProvider}