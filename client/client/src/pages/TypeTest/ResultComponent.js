import React from "react";
import styled from "styled-components";

function ResultComponent({ title, characteristics, routineRecommendations, celebrityExample }) {
  if (!title || !characteristics || !routineRecommendations || !celebrityExample) {
    return <p>Data is missing or incorrect</p>;
  }

  return (
    <Wrap>
      <WrapContainer>
        <Title>{title}</Title>
        
        <Subtitle>특징</Subtitle>
        <Contents>
            {characteristics.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
        </Contents>

        <Subtitle>루틴추천</Subtitle>
            {routineRecommendations.map((rec, index) => (
              <li key={index}>
                <Bold>{rec.bold}</Bold><Contents>: {rec.content}</Contents>
              </li>
            ))}

        <Subtitle>유명인 예시 </Subtitle>
        <Subtitle2>{celebrityExample.name}</Subtitle2>
        <Contents>{celebrityExample.description}</Contents>

          <Subtitle2>루틴</Subtitle2>
            {celebrityExample.routine.map((routine, index) => (
              <li key={index}>
                <Bold>{routine.bold}</Bold><Contents>: {routine.content}</Contents>
              </li>
            ))}
      </WrapContainer>
    </Wrap>
  );
}

export default ResultComponent;

const Wrap = styled.div`
  width: 100%;
`;

const WrapContainer = styled.div`
  flex-wrap: wrap;
  width: 570px;
  height: 100%;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 0.5em;
`;

const Subtitle = styled.h2`
  font-size: 1.5em;
  margin-top: 1em;
`;

const Subtitle2 = styled.h3`
  font-size: 1.2em;
  margin-top: 0.5em;
`;

const Contents = styled.div`
  margin-bottom: 1.5em;
  font-weight: 300;
  ul {
    padding-left: 20px;
  }
  li {
    font-weight: inherit;
  }
`;

const Bold = styled.div`
    font-weight: 500;
`