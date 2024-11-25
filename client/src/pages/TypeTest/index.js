import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import userTypeData from '../../assets/data/userType.json';
import styled from 'styled-components';
import axios from 'axios';
import { primaryColor } from '../../styles/colors';

function TypeTest() {
    const navigate = useNavigate();
    const [scores, setScores] = useState({});
    const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleAnswer = (typeName, score) => {
        const newScores = { ...scores };
        if (!newScores[typeName]) {
            newScores[typeName] = [];
        }
        newScores[typeName].push(score); // Save the score for the answer
        setScores(newScores);

        // Move to the next question or type
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < userTypeData.types[currentTypeIndex].questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            const nextTypeIndex = currentTypeIndex + 1;
            if (nextTypeIndex < userTypeData.types.length) {
                setCurrentTypeIndex(nextTypeIndex);
                setCurrentQuestionIndex(0);
            } else {
                // Save results and navigate to result page
                localStorage.setItem('personalityTestResults', JSON.stringify(newScores));
                navigate('/typetest/result');
            }
        }
    };

    const currentType = userTypeData.types[currentTypeIndex];
    const currentQuestion = currentType.questions[currentQuestionIndex];

    const renderScoreButtons = () => {
        const scores = [1, 2, 3, 4, 5]; // Scores from 1 to 5
        return scores.map(score => (
            <StyledButton key={score} onClick={() => handleAnswer(currentType.name, score)}>
                {score}
            </StyledButton>
        ));
    };

    return (
        <Wrap>
            <Wrap_container>
                <h1>Personality Test</h1>
                {currentQuestion && (
                    <div>
                        <p>{currentQuestion.a}</p>
                        {renderScoreButtons()}
                    </div>
                )}
            </Wrap_container>
        </Wrap>
    );
}

export default TypeTest;

const Wrap = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center center;
`;

const Wrap_container = styled.div``;

const StyledButton = styled.button`
    background-color: ${primaryColor};
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 15px;
    margin: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
        background-color: #ed776d;
        transform: scale(1.05);
    }

    &:active {
        background-color: #910b00;
        transform: scale(0.98);
    }

`;
