import React from "react";
import styled from "styled-components";
import { primaryColor } from '../../styles/colors';
import balancedImage from '../../assets/img/Balanced.png';
import perfectionistImage from '../../assets/img/Perfectionist.png';
import spontaneousImage from '../../assets/img/Spontaneous.png';
import socialImage from '../../assets/img/Social.png';
import emotionalImage from '../../assets/img/Emotional.png';
import goalOrientedImage from '../../assets/img/GoalOriented.png';
import backgroundImage from "../../assets/img/testBackground.png";

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
    <Background>
      <ContentBox>
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
      </ContentBox>
    </Background>
  );
}

export default ResultComponent;

// 스타일 정의
const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center center;
`;

const ContentBox = styled.div`
  width: 1000px;
  height: 80%;
  background-color: white;
  border: 1.5px solid ${primaryColor};
  border-radius: 10px;
  padding: 30px;
  overflow: auto; /* 내용만 스크롤 */
  
  /* 스크롤바 스타일 */
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(220, 20, 60); /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(220, 20, 60, 0.1); /* 스크롤바 뒷 배경 색상 */
  }
`;

const Header = styled.h1`
  width: 100%;
  font-size: 2.5em;
  font-weight: bold;
  text-align: center;
  background-color: ${primaryColor};
  color: white;
  padding: 10px 0;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  margin: 20px auto;
  display: block;
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
  align-items: center;
`;

const NameBox = styled.div`
  background-color: black;
  color: white;
  width: 100%;
  height: auto;
  padding: 10px;
  margin: 10px 0;
  border-radius: 2px;
  font-size: 16px;
  text-align: center;
`;

const Contents = styled.div`
  background-color: #ffffff;
  color: black;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  ul {
    padding-left: 20px;
  }
  li {
    font-weight: 300;
  }
`;

const Bold = styled.span`
  font-weight: 500;
`;
