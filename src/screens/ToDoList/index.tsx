import React, { useState, ChangeEvent, MouseEvent } from "react";

// Utils
import { parseDate, handleEnter } from "./utils";

// Types
import { ToDoListStateType } from "./types";

//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const ToDoList = () => {
    // ----------------------------------------- Use States

    const [tasks, setTasks] = useState<ToDoListStateType[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    // ----------------------------------------- Functions

    const handleInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        const task = event.target.value;
        setInputValue(task);
    };

    const addTask = () => {
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
        /*
        1. crear un nuevo array a partir del anterior
        2. acceder al objeto del nuevo Array usando el index
        3. cambiar el estado de la propiedad
        4. hacer el setTasks con el nuevo array 
        */
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    const deleteTask = (
        event: MouseEvent<HTMLButtonElement>,
        indexDelete: number
    ) => {
        /*
        1.crear un nuevo array a partir del anterior
        2. almacenar un filter al array
        3. dentro del filter validar si el index es igual al param de la funcion retorna false y sino retorna true
        4. hacer el setTasks del nuevo array 
        */
        event.stopPropagation();
        setTasks(
            tasks.filter((_, indexFilter) => {
                // console.log({
                //     indexFilter,
                //     indexDelete,
                //     BooleanValue: indexFilter !== indexDelete,
                // });
                return indexFilter !== indexDelete;
            })
        );
    };

    const handleDeleteTasksCompleted = () => {
        /*
        - Como voy a actualizar una variable de estado (es un array) debo tener
        presente que se debe retorna un nuevo array.

        1. Crear un nuevo array.
        2. Recorrer el array filtrando los elementos que tienen {completed: true}
        3. realizer el setTasks con el nuevo array
        al usar Array.filter() el primer 1 & 2 se unen. al utilizarlo en el setTask que melo
        */
        setTasks(tasks.filter((task) => !task.completed));
    };

    // -----------------------------------------
    return (
        <>
            <header>
                <h1>To do List!</h1>
            </header>
            <main>
                <div className="container">
                    <div className="input-section">
                        <input
                            type="text"
                            placeholder="Type your taks here!"
                            value={inputValue}
                            onChange={handleInputValue}
                            onKeyDown={handleEnter(() => addTask())}
                        />
                        <button className="add-button" onClick={addTask}>
                            <FontAwesomeIcon icon={faPlus} size="xs" />
                        </button>
                        <button
                            className="delete-button"
                            onClick={handleDeleteTasksCompleted}
                        >
                            <FontAwesomeIcon icon={faTrash} size="xs" />
                        </button>
                    </div>
                </div>
                <hr
                    style={{
                        display: tasks.length ? "block" : "none",
                    }}
                />
                <div
                    className="container"
                    style={{
                        display: tasks.length ? "block" : "none",
                    }}
                >
                    <ul className="to-do-list">
                        {tasks.map((task, index) => (
                            <li
                                key={task.id}
                                onClick={() => handleCompletedTask(index)}
                                tabIndex={0}
                                onKeyDown={handleEnter(() =>
                                    handleCompletedTask(index)
                                )}
                            >
                                <p
                                    style={{
                                        textDecoration: task.completed
                                            ? "line-through"
                                            : "none",
                                        color: task.completed
                                            ? "var(--second-font-color)"
                                            : "var(--font-color)",
                                    }}
                                >
                                    {task.task}
                                </p>
                                <span>
                                    Created on {parseDate(task.dateCreated)}
                                </span>
                                <button
                                    onClick={(event) =>
                                        deleteTask(event, index)
                                    }
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <hr
                    style={{
                        display: tasks.length ? "block" : "none",
                    }}
                />
            </main>
        </>
    );
};

export default ToDoList;
