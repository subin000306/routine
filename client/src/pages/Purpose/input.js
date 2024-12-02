// input.js
import React, { useState } from "react";
import styled from "styled-components";
import SideContent from "./SideContentComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PurposeInput() {
    const [selectedNumber, setSelectedNumber] = useState(1); // Track the selected number
    const [formData, setFormData] = useState({ mainGoal: "", achievedList: "" });
    const [userId, setUserId] = useState(null); // userId를 저장하는 상태 추가
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            console.log("formData 값 확인:", formData);
            // Fetch the current session to get user_id
            const sessionResponse = await axios.get("http://localhost:3000/api/session");
            const user_id = sessionResponse.data.user_id;

            if (!user_id) {
                alert("로그인이 안되었어요!");
                return;
            }
            // Check and call the API for mainGoal
            if (formData.mainGoal) {
                await axios.post("http://localhost:3000/api/purposeupdate", {
                    user_id, // dynamic user_id from session
                    selectedNumber, // the selected number from the dropdown
                    content: formData.mainGoal, // the content of the main goal
                });
                console.log("Main Goal updated successfully");
            }
    
            // Check and call the API for achievedList
            if (formData.achievedList) {
                await axios.post("http://localhost:3000/api/achieveupdate", {
                    user_id, // dynamic user_id from session
                    selectedNumber, // the selected number from the dropdown
                    content: formData.achievedList, // the content of the achieved list
                });
                console.log("Achieved List updated successfully");
            }
    
            // Navigate to another page after successful submission
            navigate("/purpose");
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("데이터 전송 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
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
