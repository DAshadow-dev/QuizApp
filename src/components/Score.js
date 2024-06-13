import React from "react";
import { Card, Button } from 'react-bootstrap';

const Score = ({ score, onReset, numQuestions }) => {
    return (
        <Card className="text-center">
            <Card.Body>
                <Card.Title>Your score is: <span className="text-success">{score}</span>/<span className="fw-bold text-info">{numQuestions}</span></Card.Title>
                <Button variant="primary" onClick={onReset}>Try again?</Button>
            </Card.Body>
        </Card>
    );
};

export default Score;
