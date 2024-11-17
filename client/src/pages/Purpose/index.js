// Purpose/index.js
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { secondaryColor } from '../../styles/colors';
import Content from './ContentComponent';
import SideContent from './SideContentComponent';

function Purpose() {
    const navigate = useNavigate();
    const [contentData, setContentData] = useState(["", "", ""]); // State to hold data for ContentComponent

    const handleEdit = () => {
        navigate('/purpose/input'); // Navigate to input page
    };

   

    return (
        <Intro>
            <Wrap>
                <MainContent>
                    <Content
                        header="메인 목적"
                        items={[1, 2, 3]}
                        onEdit={handleEdit}
                        data={contentData} // Pass data to ContentComponent
                    />
                    <Content
                        header="달성 리스트"
                        items={[1, 2, 3]}
                        onEdit={handleEdit}
                        data={contentData} // Pass data to ContentComponent
                    />
                </MainContent>
                <SideContent text="안녕하세요. 저는 메인 목적을 이루기 위해..." />
            </Wrap>
        </Intro>
    );
}

export default Purpose;

const Intro = styled.div`
    width: 100%;
    height: 650px;
    background-color: ${secondaryColor};
`;

const Wrap = styled.div`
    display: flex;
    width: 1280px;
    height: 100%;
    margin: 0 auto;
`;

const MainContent = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;