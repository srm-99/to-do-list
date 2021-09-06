import React, { useState, ChangeEvent, KeyboardEvent, MouseEvent } from "react";

// Utils
import { parseDate, handleEnter } from "./utils";

// Types
import { ToDoListStateType } from "./types";

const ToDoList = () => {
    const [tasks, setTasks] = useState<ToDoListStateType[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        const task = event.target.value;
        setInputValue(task);
    };

    const addTask = () => {
        console.log({ inputValue });
        if (!inputValue) {
            alert("the input is empty");
            return;
        }
        const task: ToDoListStateType = {
            id: new Date().getTime().toString(),
            dateCreated: new Date().getTime(),
            task: inputValue,
            completed: false,
        };
        const newTasks = [...tasks, task];
        setTasks(newTasks);
        setInputValue("");
    };
    const handleCompletedTask = (index: number) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
        /*
        1. crear un nuevo array a partir del anterior
        2. acceder al objeto del nuevo Array usando el index
        3. cambiar el estado de la propiedad
        4. hacer el setTasks con el nuevo array 
        */
    };

    const deleteTask = (indexDelete: number) => {
        /*
        1.crear un nuevo array a partir del anterior
        2. almacenar un filter al array
        3. dentro del filter validar si el index es igual al param de la funcion retorna false y sino retorna true
        4. hacer el setTasks del nuevo array 
        */
        const filterTasks = tasks.filter(
            (_, indexFilter) => indexFilter !== indexDelete
        );
        setTasks(filterTasks);
    };

    return (
        <div className="container">
            <header>
                <h1>To do List!</h1>
            </header>
            <main>
                <div className="input-section">
                    <input
                        type="text"
                        placeholder="Type your taks here!"
                        value={inputValue}
                        onChange={handleInputValue}
                        onKeyDown={handleEnter(() => addTask())}
                    />
                    <button onClick={addTask}>➕</button>
                </div>
                <div className="list-section">
                    <ul>
                        {tasks.map((task, index) => (
                            <li
                                key={task.id}
                                onClick={() => handleCompletedTask(index)}
                                tabIndex={0}
                                onKeyDown={handleEnter(() =>
                                    handleCompletedTask(index)
                                )}
                            >
                                <div
                                    style={{
                                        textDecoration: task.completed
                                            ? "line-through"
                                            : "none",
                                    }}
                                >
                                    <p>{task.task}</p>
                                    <div>
                                        <strong className="li-strong">
                                            {parseDate(task.dateCreated)}
                                        </strong>
                                        <button
                                            onClick={() => deleteTask(index)}
                                            onKeyDown={handleEnter(() =>
                                                deleteTask(index)
                                            )}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default ToDoList;
