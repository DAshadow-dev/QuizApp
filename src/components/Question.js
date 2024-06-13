import React, { useContext } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { QuizContext } from './QuizApp';

const Question = ({ question, currentQuestion, showResult }) => {
    const { selectedAnswer, handleAnswerSelected } = useContext(QuizContext);

    const handleSelected = (option) => {
        if (!showResult) {
            handleAnswerSelected(option);
        }
    };

    const getOptionVariant = (option) => {
        if (!showResult) {
            return selectedAnswer === option ? 'primary' : '';
        }
        if (showResult) {
            if (option === question.answer) {
                return 'success';
            }
            if (option === selectedAnswer && selectedAnswer !== question.answer) {
                return 'danger';
            }
        }
        return '';
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>Question {currentQuestion + 1}: {question.question}</Card.Title>
                <ListGroup>
                    {question.options.map((option) => (
                        <ListGroupItem
                            key={option}
                            action
                            variant={getOptionVariant(option)}
                            onClick={() => handleSelected(option)}
                            style={{ cursor: 'pointer' }}
                        >
                            {option}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default Question;
