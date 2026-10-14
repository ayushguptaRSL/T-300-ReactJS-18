import {useState} from "react";
import "./TodoInput.css";

interface TodoInputProps {
    addTask: (task: string) => void;
}

export default function TodoInput(props: TodoInputProps) {
    const [task, setTask] = useState("");

    const onClicked = () => {
        if (!task.trim()) return;

        props.addTask(task);
        setTask("");
    };

    return (
        <div className="todo-input-container">
            <input
                type="text"
                id="todoInput"
                name="todoInput"
                placeholder="New todo"
                className="todo-input-field"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onClicked()}
            />
            <button className="todo-input-button" onClick={onClicked}>
                Add new task
            </button>
        </div>
    );
}
