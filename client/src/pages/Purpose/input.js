// input.js
import React, { useState } from "react";
import styled from "styled-components";
import SideContent from "./SideContentComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PurposeInput() {
    const [selectedNumber, setSelectedNumber] = useState(1); // Track the selected number
    const [formData, setFormData] = useState({ mainGoal: "", achievedList: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        // Submit data to the server
        axios.post("/api/purpose/update", { selectedNumber, ...formData })
            .then(() => {
                navigate("/purpose"); // Navigate back to the purpose page
            })
            .catch((error) => console.error("Error submitting purpose data:", error));
    };

    return (
        <Wrap>
            <RightSide>
                <Form>
                    <Label>수정 페이지</Label>
                    <SelectNumber>
                        <label>번호 선택: </label>
                        <select value={selectedNumber} onChange={(e) => setSelectedNumber(Number(e.target.value))}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </select>
                    </SelectNumber>
                    <Input
                        type="text"
                        name="mainGoal"
                        value={formData.mainGoal}
                        onChange={handleChange}
                        placeholder="Main Goal"
                    />
                    <Textarea
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

const SelectNumber = styled.div`
    margin-bottom: 10px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Textarea = styled.textarea`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 150px; /* 5x the height of a normal input */
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
`;
