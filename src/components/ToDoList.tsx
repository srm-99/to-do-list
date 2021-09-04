import React, { useState } from "react";

export default function ToDoList() {
    const [tasks, setTasks] = useState([0]);

    const handleAddTasks = (newTask: number) => {
        setTasks((prevTasks) => {
            const newTasks = [...prevTasks];
            newTasks.push(newTask);
            return newTasks;
        });
    };
    return (
        <>
            <button onClick={() => handleAddTasks(2)}>Add Task</button>
            {tasks.map((task) => (
                <li>{task}</li>
            ))}
        </>
    );
}
