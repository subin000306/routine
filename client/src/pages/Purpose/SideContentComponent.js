// SideContent.js
import React from "react";
import styled from "styled-components";
import { textColor } from '../../styles/colors';

const SideContent = ({ text }) => {
    return (
        <SideContentWrapper>
            <SideText>{text}</SideText>
        </SideContentWrapper>
    );
};

export default SideContent;

const SideContentWrapper = styled.div`
    flex: 1;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    border: 2px solid #FBE0D1;
    margin-left: 20px;
`;

const SideText = styled.div`
    color: ${textColor || '#333'}; /* Use text color from your theme */
`;
