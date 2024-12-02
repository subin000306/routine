import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

function TestResult() {
    const [results, setResults] = useState({});
    const [highestType, setHighestType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Fetch stored test results from localStorage
        const savedResults = localStorage.getItem('personalityTestResults');
        if (savedResults) {
            const parsedResults = JSON.parse(savedResults);
            const calculatedResults = calculateResults(parsedResults);
            setResults(calculatedResults);

            // Determine the type with the highest score
            const determinedType = determineHighestType(calculatedResults);
            setHighestType(determinedType);

            // Send the result to backend
            axios.post('http://localhost:3000/api/Usertype', { type: determinedType })
                .then(response => console.log('Results saved:', response.data))
                .catch(error => console.error('Error saving results:', error));
        } 
    }, []);

    const calculateResults = (scores) => {
        const aggregatedScores = {};
        for (const [type, scoresList] of Object.entries(scores)) {
            const totalScore = scoresList.reduce((sum, score) => sum + score, 0);
            aggregatedScores[type] = {
                total: totalScore,
                count5: scoresList.filter(score => score === 5).length,
                count4: scoresList.filter(score => score === 4).length
            };
        }
        return aggregatedScores;
    };

    const determineHighestType = (results) => {
        // Sort by total score, then by count of 5s, then by count of 4s
        const sortedTypes = Object.entries(results).sort(([, a], [, b]) => {
            if (b.total !== a.total) return b.total - a.total;
            if (b.count5 !== a.count5) return b.count5 - a.count5;
            return b.count4 - a.count4;
        });
        return sortedTypes.length > 0 ? sortedTypes[0][0] : 'No matching type';
    };

    const handleResultClick = () => {
        const typePageMap = {
            'Balanced Type': '/typetest/result1',
            'Perfectionist': '/typetest/result2',
            'Spontaneous Type': '/typetest/result3',
            'Social Type': '/typetest/result4',
            'Emotional Type': '/typetest/result5',
            'Goal-Oriented Type': '/typetest/result6'
        };

        if (typePageMap[highestType]) {
            navigate(typePageMap[highestType]);
        }
    };

    const handleNewQuiz = () => {
        navigate('/typetest'); // Redirects to the quiz start page
    };

    return (
        <Wrap>
            <Wrap_container>
                <h1>Test Results</h1>
                {highestType ? (
                    <div>
                        <button onClick={handleResultClick}>{highestType}</button>
                    </div>
                ) : (
                    <div>
                        <p>No results found.</p>
                        <button onClick={handleNewQuiz}>Start a New Quiz</button>
                    </div>
                )}
            </Wrap_container>
        </Wrap>
    );
}

export default TestResult;

const Wrap = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center center;
`;

const Wrap_container = styled.div``;