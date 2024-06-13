import React, { useReducer, createContext,useEffect,useState, useRef} from 'react';
import { Container, Row, Col, Button, Form, Alert, ProgressBar } from 'react-bootstrap';
import { QuizData } from './QuizData';
import Question from './Question';
import Score from './Score';
//import actions 
import { setQuestions,setCurrentQuestion,setEndQuiz,setNumQuestions,setQuizStarted,setScore,setSelectedAnswer,setShowResult } from './actions';
//import init
import { initState } from './quizReducer';
//import Reducer
import quizReducer from './quizReducer';

export const QuizContext = createContext(); 

const QuizApp = () => {
    const [state, dispatch] = useReducer(quizReducer,initState);
    const [timeLeft, setTimeLeft] = useState(15);
    // const audioRef = useRef(null);
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
    // Handle timer for each question
    useEffect(() => {
        if (quizStarted && !endQuiz && !showResult) {
            const timer = setTimeout(() => {
                if (timeLeft > 0) {
                    setTimeLeft(timeLeft - 1);
                } else {
                    handleNextQuestion();
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [quizStarted, endQuiz, showResult, timeLeft]);
     // Reset timer when question changes
     useEffect(() => {
        if (quizStarted && !endQuiz && currentQuestion < numQuestions) {
            setTimeLeft(15);
        }
    }, [currentQuestion, quizStarted, endQuiz, numQuestions]);
    // Handle audio playback
    /*useEffect(() => {
        if (quizStarted && !endQuiz && !showResult && timeLeft > 0) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [quizStarted, endQuiz, showResult, timeLeft]);*/
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
        setTimeLeft(15);
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
        setTimeLeft(15);
    };
    // handle on change input of number of question
    const handleNumQuestionsChange = (event) => {
        dispatch(setNumQuestions(event.target.value));
    };
    // handle action click start quiz
    const startQuiz = () => {
        dispatch(setQuizStarted(true));
    };
    // Quiz App
    return (
        <QuizContext.Provider value={{ selectedAnswer, handleAnswerSelected }}>
            <Container className="quizApp mt-5">
                <Row className="justify-content-md-center">
                    <Col md="8">
                        {!quizStarted? (
                            <Form>
                                <Form.Group controlId="formNumQuestions">
                                    <Form.Label className='fw-bold'>Enter number of questions:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={numQuestions}
                                        onChange={handleNumQuestionsChange}
                                    />
                                </Form.Group>
                                <Button className="mt-3" onClick={startQuiz} disabled={numQuestions <= 0 || numQuestions > QuizData.length}>
                                    Start Quiz
                                </Button>
                            </Form>
                        ) : endQuiz? (
                            <Score score={score} onReset={resetQuiz} numQuestions={numQuestions} />
                        ) : (
                            <div>
                                <Alert variant='info' className='text-center fs-3 fw-bold'>
                                    Welcome to quiz App!!!
                                </Alert>
                                <ProgressBar striped variant="info" now={(currentQuestion / questions.length) * 100} />
                                {questions[currentQuestion] && (
                                    <Question
                                        question={questions[currentQuestion]}
                                        currentQuestion={currentQuestion}
                                        showResult={showResult}
                                    />
                                )}
                                <div className='text-center'>
                                    {
                                        timeLeft > 5 ? (
                                            <Alert variant='info' className='fs-4'>
                                            Time Left: {timeLeft} seconds
                                            </Alert>
                                        ): timeLeft > 0 ?
                                        (
                                            <Alert variant='warning' className='fs-4'>
                                            Time Left: {timeLeft} seconds
                                            </Alert>
                                        ):
                                        (
                                            <Alert variant='danger' className='fs-4'>
                                            Time out!!
                                            </Alert>
                                        )
                                    }
                                    {showResult? (
                                        <Button className="mt-3 fs-4" onClick={handleNextQuestion}>
                                            Next Question
                                        </Button>
                                    ) : (
                                        <Button className="mt-3 fs-4" onClick={handleSubmitAnswer} disabled={!selectedAnswer}>
                                            Submit Answer
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
            {/* <audio ref={audioRef} src="E:/Semester 5/FER202/Lab/lab_4/src/assets/coundown audio.mp3" loop /> */}
        </QuizContext.Provider>
    );
};

export default QuizApp;