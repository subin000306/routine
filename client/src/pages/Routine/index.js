import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { secondaryColor, primaryColor, tertiaryColor } from "../../styles/colors";

function Routine() {
  const [tasks, setTasks] = useState(Array(10).fill(null)); // Maximum of 10 tasks
  const [inputValue, setInputValue] = useState("");
  const [selectedType, setSelectedType] = useState("1"); // Default: Fixed Schedule
  const [mainGoals, setMainGoals] = useState(["", "", ""]); // Main Goals

  useEffect(() => {
    // Fetch main goals from the server
    axios
      .get("/api/purpose")
      .then((response) => {
        if (response.data) {
          const { mainGoal } = response.data;
          setMainGoals(mainGoal.split(",").slice(0, 3).concat(Array(3).fill("")).slice(0, 3));
        }
      })
      .catch((error) => console.error("Error fetching main goals:", error));
  }, []);

  // Task addition
  const handleAddTask = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const emptyIndex = tasks.findIndex((task) => task === null);
      if (emptyIndex !== -1) {
        const newTask = {
          id: Date.now(),
          type: selectedType,
          content: selectedType === "4" ? `${inputValue} ${"-".repeat(15)}` : inputValue,
          completed: false,
        };
        const updatedTasks = [...tasks];
        updatedTasks[emptyIndex] = newTask;
        setTasks(updatedTasks);
        setInputValue("");

        // Save to server
        axios.post("/api/routine", newTask).catch((err) => console.error("Error saving task:", err));
      } else {
        alert("최대 10개의 일정만 추가할 수 있습니다.");
      }
    }
  };

  // Toggle main일정 tasks
  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    if (updatedTasks[index]?.type === "2") {
      updatedTasks[index].completed = !updatedTasks[index].completed;
      setTasks(updatedTasks);

      // Update task status on the server
      axios
        .put(`/api/routine/${updatedTasks[index].id}`, { completed: updatedTasks[index].completed })
        .catch((err) => console.error("Error updating task:", err));
    }
  };

  // Delete tasks
  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    const taskToDelete = updatedTasks[index];
    updatedTasks[index] = null;
    setTasks(updatedTasks);

    // Delete from server
    if (taskToDelete) {
      axios.delete(`/api/routine/${taskToDelete.id}`).catch((err) => console.error("Error deleting task:", err));
    }
  };

  // Calculate and send success rate to the server
  const submitSuccessRate = () => {
    const mainTasks = tasks.filter((task) => task?.type === "2");
    const completedTasks = mainTasks.filter((task) => task.completed);
    const successRate =
      mainTasks.length > 0 ? Math.round((completedTasks.length / mainTasks.length) * 100) : 0;

    // Send success rate to the server
    axios
      .post("/api/successRate", { successRate })
      .then(() => alert("Success rate has been submitted."))
      .catch((err) => console.error("Error submitting success rate:", err));
  };

  const getTaskColor = (type, completed) => {
    if (type === "1") return "#e0e0e0"; // Fixed Schedule (always light gray)
    if (type === "3") return tertiaryColor; // Leisure Time (always tertiaryColor)
    if (type === "4") return "#ffffff"; // Time (always white)
    if (type === "2") return completed ? primaryColor : "#ffffff"; // Main (toggle)
    return "#ffffff"; // Default white
  };
  
  // Determine text color for each task type and state
  const getTextColor = (type, completed) => {
    if (type === "1" || type === "3") return "#ffffff"; // Fixed Schedule & Leisure Time (white text)
    if (type === "4") return "#555555"; // Time (gray text)
    if (type === "2") return completed ? "#ffffff" : primaryColor; // Main (toggle)
    return "#000000"; // Default black
  };

  return (
    <Container>
      <Header>
        <Title>메인 목적</Title>
        <InputContainer>
          {mainGoals.map((goal, index) => (
            <Input key={index} value={goal} readOnly />
          ))}
        </InputContainer>
      </Header>
      <TimeBox>
        <ButtonRow>
          <Button>Time-box</Button>
          <Button onClick={() => setTasks(Array(10).fill(null))}>리셋</Button>
          <Button onClick={submitSuccessRate}>제출</Button>
        </ButtonRow>
        {/* Task Addition */}
        <AddTaskContainer>
          <TaskTypeButton
            selected={selectedType === "1"}
            color="#e0e0e0"
            onClick={() => setSelectedType("1")}
          >
            +고정일정
          </TaskTypeButton>
          <TaskTypeButton
            selected={selectedType === "2"}
            color={primaryColor}
            onClick={() => setSelectedType("2")}
          >
            +main일정
          </TaskTypeButton>
          <TaskTypeButton
            selected={selectedType === "3"}
            color={tertiaryColor}
            onClick={() => setSelectedType("3")}
          >
            +여유시간
          </TaskTypeButton>
          <TaskTypeButton
            selected={selectedType === "4"}
            color="#555555"
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
        <br />
        <TaskList>
          {tasks.map((task, index) => (
            <Task
            key={index}
            onClick={() => toggleTask(index)}
            completed={task?.completed}
            color={getTaskColor(task?.type, task?.completed)} // Use getTaskColor
            textColor={getTextColor(task?.type, task?.completed)} // Use getTextColor
            type={task?.type}
          >
            {task && (
              <>
                {task.content}
                <DeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(index);
                  }}
                >
                  🗑️
                </DeleteButton>
              </>
            )}
          </Task>
          ))}
        </TaskList>
      </TimeBox>
    </Container>
  );
}

export default Routine;

// Styled Components
const Container = styled.div`
  font-family: Arial, sans-serif;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${secondaryColor};
  border-radius: 10px;
`;

const Header = styled.div`
  background-color: ${primaryColor};
  padding: 20px;
  border-radius: 10px;
`;

const Title = styled.h3`
  color: #000;
  margin: 0;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
`;

const TimeBox = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;

  &:hover {
    background-color: #555;
  }
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Task = styled.div`
  background-color: ${(props) => props.color  };
  color: ${(props) => props.textColor};
  border: 1px solid ${(props) =>
    props.completed ? props.color : "#ccc"}; /* Border matches type color if completed */
  height: 40px;
  cursor: ${(props) => (props.type === "4" ? "default" : "pointer")}; /* 시간 is not clickable */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border-radius: 5px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const AddTaskContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const TaskTypeButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => (props.selected ? "#fff" : props.color)};
  background-color: ${(props) => (props.selected ? props.color : "#fff")};
  border: ${(props) =>
    props.selected ? `2px solid ${props.color}` : "2px solid #cccccc"};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.color};
    color: #fff;
  }
`;

const TaskInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

