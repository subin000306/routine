import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

function MyPage() {
  const [userData, setUserData] = useState({ name: "", type: "" });
  const [reviews, setReviews] = useState([]);

  // Fetch user data and reviews
  useEffect(() => {
    const fetchUserData = async () => {
      try {
          const response = await axios.get("http://localhost:3000/api/userdata");
          setUserData({
              name: response.data.userName,
              type: response.data.userType,
          });
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
  };

    const fetchReviews = async () => {
      try {
        const response = await axios.get("/api/reviews");
        setReviews(response.data); // Expect an array of reviews
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchUserData();
    fetchReviews();
  }, []);

  return (
    <Container>
      <Header>My Page</Header>
      <UserInfo>
        <UserField>
          <Label>Name:</Label>
          <Value>{userData.name || "Loading..."}</Value>
        </UserField>
        <UserField>
          <Label>Type:</Label>
          <Value>{userData.type || "No type assigned"}</Value>
        </UserField>
      </UserInfo>

      <ReviewSection>
        <SectionHeader>Reviews</SectionHeader>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard key={index}>
              <ReviewHeader>
                <DayLabel>{`${index + 1}일차`}</DayLabel>
                <SuccessRate>{review.successRate}%</SuccessRate>
              </ReviewHeader>
              <ReviewBody>
                <Feedback>
                  <FeedbackLabel>Strengths:</FeedbackLabel>
                  <FeedbackText>{review.strengths}</FeedbackText>
                </Feedback>
                <Feedback>
                  <FeedbackLabel>Areas for Improvement:</FeedbackLabel>
                  <FeedbackText>{review.improvements}</FeedbackText>
                </Feedback>
              </ReviewBody>
            </ReviewCard>
          ))
        ) : (
          <NoReviews>No reviews available</NoReviews>
        )}
      </ReviewSection>
    </Container>
  );
}

export default MyPage;

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

const UserInfo = styled.div`
  margin-bottom: 30px;
`;

const UserField = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
  color: #555;
`;

const Value = styled.span`
  color: #333;
`;

const ReviewSection = styled.div`
  margin-top: 20px;
`;

const SectionHeader = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const ReviewCard = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DayLabel = styled.span`
  font-weight: bold;
  color: #ff6f61;
`;

const SuccessRate = styled.span`
  font-size: 1.2rem;
  color: #333;
`;

const ReviewBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Feedback = styled.div``;

const FeedbackLabel = styled.span`
  font-weight: bold;
  color: #555;
`;

const FeedbackText = styled.p`
  margin: 0;
  color: #333;
`;

const NoReviews = styled.p`
  text-align: center;
  color: #999;
`;
