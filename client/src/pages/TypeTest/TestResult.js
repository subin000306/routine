import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

function TestResult() {
  const [highestType, setHighestType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the calculated result from the server
    axios
      .get("http://localhost:3000/api/Usertype")
      .then((response) => {
        const { type } = response.data; // Expecting `type` in the response
        setHighestType(type);
      })
      .catch((error) => console.error("Error fetching results:", error));
  }, []);

  const handleResultClick = () => {
    const typePageMap = {
      "Balanced Type": "/typetest/result1",
      "Perfectionist": "/typetest/result2",
      "Spontaneous Type": "/typetest/result3",
      "Social Type": "/typetest/result4",
      "Emotional Type": "/typetest/result5",
      "Goal-Oriented Type": "/typetest/result6",
    };

    if (typePageMap[highestType]) {
      navigate(typePageMap[highestType]);
    }
  };

  const handleNewQuiz = () => {
    navigate("/typetest"); // Redirects to the quiz start page
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
            <p>Loading result...</p>
            <button onClick={handleNewQuiz}>Start a New Quiz</button>
          </div>
        )}
      </Wrap_container>
    </Wrap>
  );
}

export default TestResult;

// Styled Components
const Wrap = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
`;

const Wrap_container = styled.div``;
