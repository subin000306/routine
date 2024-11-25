import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { primaryColor, secondaryColor, textColor } from "../../styles/colors";

function MyPage() {
  const [userName, setUserName] = useState(""); // User's name
  const [userType, setUserType] = useState(""); // User's test result type
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching user info and test result from the server
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/userInfo");
        const { name, testResult } = response.data; // Expect name and testResult in the response
        setUserName(name);
        setUserType(testResult); // testResult is the type or empty if not taken
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleTakeTest = () => {
    navigate("/typetest");
  };

  return (
    <Wrap>
      <Container>
        <Title>My Page</Title>
        <UserInfo>
          <InfoItem>
            <Label>Name:</Label>
            <Value>{userName || "Fetching..."}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Test Result:</Label>
            {userType ? (
              <Value>{userType}</Value>
            ) : (
              <Button onClick={handleTakeTest}>Take the Test</Button>
            )}
          </InfoItem>
        </UserInfo>
      </Container>
    </Wrap>
  );
}

export default MyPage;

// Styled Components
const Wrap = styled.div`
  width: 100%;
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 600px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  color: ${primaryColor};
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  text-align: left;
`;

const InfoItem = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.span`
  font-weight: bold;
  font-size: 1.6rem;
  color: ${textColor};
`;

const Value = styled.span`
  font-size: 1.6rem;
  color: ${textColor};
  margin-left: 10px;
`;

const Button = styled.button`
  background-color: ${secondaryColor};
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.4rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${primaryColor};
  }
`;
