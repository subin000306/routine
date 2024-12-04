import React from "react";
import styled from "styled-components";
import { primaryColor } from '../../styles/colors';
import balancedImage from '../../assets/img/Balanced.png';
import perfectionistImage from '../../assets/img/Perfectionist.png';
import spontaneousImage from '../../assets/img/Spontaneous.png';
import socialImage from '../../assets/img/Social.png';
import emotionalImage from '../../assets/img/Emotional.png';
import goalOrientedImage from '../../assets/img/GoalOriented.png';

const typeImages = {
  "Balanced Type": balancedImage,
  "Perfectionist Type": perfectionistImage,
  "Spontaneous Type": spontaneousImage,
  "Social Type": socialImage,
  "Emotional Type": emotionalImage,
  "Goal-Oriented Type": goalOrientedImage,
};

function ResultComponent({ title, characteristics, routineRecommendations, celebrityExample }) {
  if (!title || !characteristics || !routineRecommendations || !celebrityExample) {
    return <p>Data is missing or incorrect</p>;
  }

  const typeImage = typeImages[title] || null;

  return (
    <Wrap>
      <LeftBox>
        <Header>{title}</Header>
        {typeImage && <Image src={typeImage} alt={`${title} image`} />}
        <StyledSection>
          <SectionTitle>특징</SectionTitle>
          <Contents>
            {characteristics.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </Contents>
        </StyledSection>

        <StyledSection>
          <SectionTitle>루틴 추천</SectionTitle>
          <Contents>
            {routineRecommendations.map((rec, index) => (
              <li key={index}>
                <Bold>{rec.bold}</Bold>: {rec.content}
              </li>
            ))}
          </Contents>
        </StyledSection>
      </LeftBox>

      <RightBox>
        <StyledSection>
          <SectionTitle>유명인 예시</SectionTitle>
          <NameBox>{celebrityExample.name}</NameBox>
          <Contents>{celebrityExample.description}</Contents>
        </StyledSection>

        <StyledSection>
          <NameBox>루틴</NameBox>
          <Contents>
            {celebrityExample.routine.map((routine, index) => (
              <li key={index}>
                <Bold>{routine.bold}</Bold>: {routine.content}
              </li>
            ))}
          </Contents>
        </StyledSection>
      </RightBox>
    </Wrap>
  );
}

export default ResultComponent;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: auto;
  padding: 20px;
  gap: 20px;
`;

const LeftBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border: 1.5px solid ${primaryColor};
  border-radius: 10px;
  background-color: #ffffff;
`;

const RightBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border: 1.5px solid ${primaryColor};
  border-radius: 10px;
  background-color: #ffffff;
`;

const Header = styled.h1`
  width: 100%;
  font-size: 2.5em;
  font-weight: bold;
  text-align: center;
  background-color: ${primaryColor};
  color: white;
  padding: 10px 0;
  margin-top: 40px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  margin: 60px;
`;

const StyledSection = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  background-color: ${primaryColor};
  color: white;
  width: 130px;
  height: 40px;
  text-align: center;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center; /* Vertically centers text */
`;

const NameBox = styled.div`
  background-color: black;
  color: white;
  width: 680px;
  height: 35px;
  padding: 10px 10px;
  margin: 10px 0;
  border-radius: 2px;
  display: flex;
  font-size: 16px;
  align-items: center;
`;

const Contents = styled.div`
  background-color: #ffffff;
  color: black;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  text-align: left; /* Aligns text to the left */
  ul {
    padding-left: 20px; /* Adds some indentation to the list */
  }
  li {
    font-weight: 300;
  }
`;

const Bold = styled.span`
  font-weight: 500;
`;
