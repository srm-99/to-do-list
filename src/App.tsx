import React from "react";
import ToDoList from "./components/ToDoList";

export default function App() {
    return (
        <div className="container">
            <header>
                <h1>To do List!</h1>
            </header>
            <main>
                <div className="input-section">
                    <input type="text" placeholder="Type your taks here!" />
                    <button>➕</button>
                </div>

                <div className="list-section">
                    <ul>
                        <li>
                            <p>wake up</p>
                        </li>
                        <li>
                            <p>have breakfast</p>
                        </li>
                        <li>
                            <p>brush my teeth</p>
                        </li>
                        <li>
                            <p>take a shower</p>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    );
}
