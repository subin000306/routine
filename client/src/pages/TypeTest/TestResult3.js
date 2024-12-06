import React from "react";
import styled from "styled-components";
import ResultComponent from "./ResultComponent";
import typeData from "../../assets/data/typeData.json"; // Ensure correct file path

function Result3() {
  // Extract the data with id of 1 (assuming Balanced Type has id 1)
  const balancedType = typeData.types.find(type => type.id === 3);

  return (
    <Wrap>
      {balancedType && (
        <ResultComponent
          title={balancedType.type}
          characteristics={balancedType.characteristics}
          routineRecommendations={balancedType.routine_recommendations}
          celebrityExample={balancedType.celebrity_example}
        />
      )}
    </Wrap>
  );
}

export default Result3;

const Wrap = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
