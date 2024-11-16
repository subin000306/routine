import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function TestResult() {
    const [results, setResults] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const savedResults = localStorage.getItem('personalityTestResults');
        if (savedResults) {
            setResults(JSON.parse(savedResults));
        }
    }, []);

    const handleResultClick = (typeName) => {
        // Navigate to the corresponding result page based on typeName
        const typePageMap = {
            'Balanced Type': '/typetest/result1',
            'Perfectionist': '/typetest/result2',
            'Spontaneous Type': '/typetest/result3',
            'Social Type': '/typetest/result4',
            'Emotional Type': '/typetest/result5',
            'Goal-Oriented Type': '/typetest/result6'
        };

        if (typePageMap[typeName]) {
            navigate(typePageMap[typeName]);
        }
    };

    const handleNewQuiz = () => {
        navigate('/typetest'); // Redirects to the quiz start page
    };

    const displayResults = () => {
        // Sort and display results based on counts
        const sortedResults = Object.entries(results)
            .sort(([, a], [, b]) => b - a)
            .map(([type, count]) => (
                <ResultItem key={type} onClick={() => handleResultClick(type)}>
                    {type}: {count} times selected 'a' (Click for details)
                </ResultItem>
            ));

        return sortedResults.length > 0 ? sortedResults : <p>No matching types found.</p>;
    };

    return (
        <Wrap>
            <Wrap_container>
                <h1>Test Results</h1>
                {Object.keys(results).length > 0 ? (
                    <div>{displayResults()}</div>
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

const ResultItem = styled.div`
    cursor: pointer;
    color: blue;
    text-decoration: underline;
    margin: 10px 0;

    &:hover {
        color: darkblue;
    }
`;
