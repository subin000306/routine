import React, { useState, useEffect } from "react"; // Import useEffect
import styled from "styled-components";
import axios from "axios";

function Review({ successRate }) {
  const [feedback, setFeedback] = useState({
    strengths: "",
    improvements: "",
  });

  const [localSuccessRate, setLocalSuccessRate] = useState(successRate || 0);

  useEffect(() => {
    axios
      .get("/api/successRate")
      .then((response) => setLocalSuccessRate(response.data.successRate))
      .catch((err) => console.error("Error fetching success rate:", err));
  }, []);

  const handleSubmit = () => {
    axios
      .post("/api/review", { successRate: localSuccessRate, ...feedback })
      .then(() => alert("Review has been submitted."))
      .catch((err) => console.error("Error saving review:", err));
  };

  return (
    <Container>
      <Header>Review Submission</Header>
      <SuccessRate>
        <Label>Success Rate:</Label>
        <Rate>{localSuccessRate}%</Rate>
      </SuccessRate>
      <FeedbackSection>
        <label>
          성취한 점:
          <TextArea
            value={feedback.strengths}
            onChange={(e) =>
              setFeedback({ ...feedback, strengths: e.target.value })
            }
          />
        </label>
        <label>
          개선할 점:
          <TextArea
            value={feedback.improvements}
            onChange={(e) =>
              setFeedback({ ...feedback, improvements: e.target.value })
            }
          />
        </label>
      </FeedbackSection>
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
    </Container>
  );
}

export default Review;


// Styled Components
const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
`;

const Header = styled.h3`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const SuccessRate = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Label = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  color: #555;
`;

const Rate = styled.span`
  font-size: 1.5rem;
  color: #333;
`;

const FeedbackSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  resize: none;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
