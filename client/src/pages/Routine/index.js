import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

function Routine() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedType, setSelectedType] = useState("1"); // Default to "고정일정"

  const handleAddTask = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newTask = {
        id: Date.now(),
        type: selectedType,
        content: inputValue,
        completed: false,
      };
      setTasks((prev) => [...prev, newTask]);
      setInputValue(""); // Clear input field
    }
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const resetTasks = () => {
    setTasks([]);
  };

  const submitTasks = () => {
    const filteredTasks = tasks.filter((task) => task.type !== "4");
    const successRate = filteredTasks.length
      ? (filteredTasks.filter((task) => task.completed).length /
          filteredTasks.length) *
        100
      : 0;

    axios
      .post("/api/review", { successRate, taskCount: filteredTasks.length })
      .then(() => alert("Submitted successfully!"))
      .catch((err) => console.error("Submission failed:", err));
  };

  return (
    <Container>
      <Header>
        <h3>메인 목적</h3>
        <InputContainer>
          <Input placeholder="1" />
          <Input placeholder="2" />
          <Input placeholder="3" />
        </InputContainer>
      </Header>
      <TimeBoxContainer>
        <TimeBoxHeader>
          <Button>Time-box</Button>
          <Button onClick={resetTasks}>리셋</Button>
          <Button onClick={submitTasks}>제출</Button>
        </TimeBoxHeader>
        <TaskList>
          {tasks.map((task) => (
            <Task
              key={task.id}
              completed={task.completed}
              onClick={() => toggleTask(task.id)}
            >
              {task.content}
              <DeleteButton onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}>🗑️</DeleteButton>
            </Task>
          ))}
        </TaskList>
        <AddTaskContainer>
          <TaskTypeButton
            selected={selectedType === "1"}
            onClick={() => setSelectedType("1")}
          >
            +고정일정
          </TaskTypeButton>
          <TaskTypeButton
            selected={selectedType === "2"}
            onClick={() => setSelectedType("2")}
          >
            +main일정
          </TaskTypeButton>
          <TaskTypeButton
            selected={selectedType === "3"}
            onClick={() => setSelectedType("3")}
          >
            +여유시간
          </TaskTypeButton>
          <TaskTypeButton
            selected={selectedType === "4"}
            onClick={() => setSelectedType("4")}
          >
            +시간
          </TaskTypeButton>
          <TaskInput
            placeholder="영역 클릭, 입력 후 엔터..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddTask}
          />
        </AddTaskContainer>
      </TimeBoxContainer>
    </Container>
  );
}

export default Routine;

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  background-color: #ffebe8;
  padding: 10px;
  border-radius: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TimeBoxContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TimeBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #ff6f61;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #e65c51;
  }
`;

const TaskList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Task = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: calc(50% - 10px);
  background-color: ${(props) => (props.completed ? "#c8e6c9" : "#ffcdd2")};
  border: 1px solid ${(props) => (props.completed ? "#81c784" : "#e57373")};
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const AddTaskContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const TaskTypeButton = styled.button`
  padding: 5px 10px;
  background-color: ${(props) => (props.selected ? "#ff6f61" : "#fff")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
`;

const TaskInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;
