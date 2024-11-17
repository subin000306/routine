import React, { useState } from "react";
import styled from "styled-components";
import SideContent from './SideContentComponent';
import { useNavigate } from 'react-router-dom';

function PurposeInput({ submitData }) {
    const [formData, setFormData] = useState({ mainGoal: '', achievedList: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        // Here you can call an API or handle data submission
        submitData([formData.mainGoal, formData.achievedList]); // Pass data to the parent
        navigate('/purpose'); // Navigate back to the purpose page
    };

    return (
        <Wrap>
            <RightSide>
                <Form>
                    <Label>수정 페이지</Label>
                    <Input
                        type="text"
                        name="mainGoal"
                        value={formData.mainGoal}
                        onChange={handleChange}
                        placeholder="Main Goal"
                    />
                    <Input
                        type="text"
                        name="achievedList"
                        value={formData.achievedList}
                        onChange={handleChange}
                        placeholder="Achieved List"
                    />
                    <SubmitButton onClick={handleSubmit}>제출</SubmitButton>
                </Form>
            </RightSide>
            <LeftSide>
                <SideContent text="안녕하세요. 저는 메인 목적을 이루기 위해..." />
            </LeftSide>
        </Wrap>
    );
}

export default PurposeInput;

const Wrap = styled.div`
    display: flex;
    height: 100vh;
`;

const LeftSide = styled.div`
    flex: 1;
    padding: 20px;
`;

const RightSide = styled.div`
    flex: 2;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Label = styled.div`
    font-size: 20px;
    margin-bottom: 10px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
`;