import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import userTypeData from '../../assets/data/userType.json';
import styled from 'styled-components';

function TypeTest() {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleAnswer = (typeName, answer) => {
        const newAnswers = { ...answers };
        if (!newAnswers[typeName]) {
            newAnswers[typeName] = 0;
        }
        if (answer === 'a') {
            newAnswers[typeName] += 1; // Increment score for type if 'a' is selected
        }
        setAnswers(newAnswers);

        // Move to next question or type
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < userTypeData.types[currentTypeIndex].questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            const nextTypeIndex = currentTypeIndex + 1;
            if (nextTypeIndex < userTypeData.types.length) {
                setCurrentTypeIndex(nextTypeIndex);
                setCurrentQuestionIndex(0);
            } else {
                localStorage.setItem('personalityTestResults', JSON.stringify(newAnswers));
                navigate('/typetest/result');
            }
        }
    };

    const currentType = userTypeData.types[currentTypeIndex];
    const currentQuestion = currentType.questions[currentQuestionIndex];

    return (
        <Wrap>
            <Wrap_container>
                <h1>Personality Test - {currentType.name}</h1>
                {currentQuestion && (
                    <div>
                        <button onClick={() => handleAnswer(currentType.name, 'a')}>{currentQuestion.a}</button>
                        <button onClick={() => handleAnswer(currentType.name, 'b')}>{currentQuestion.b}</button>
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
