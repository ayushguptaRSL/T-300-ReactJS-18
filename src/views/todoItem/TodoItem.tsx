import {useState} from "react";
import {FaPencilAlt, FaTrash, FaCheck} from "react-icons/fa";
import {TodoItemModel} from "../../models/TodoItemModel";
import "./TodoItem.css";

interface TodoItemProps {
    task: TodoItemModel;
    onToggleComplete: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string) => void;
}

export default function TodoItem({
                                     task,
                                     onToggleComplete,
                                     onDelete,
                                     onEdit,
                                 }: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.task);

    const handleSave = () => {
        if (editText.trim()) {
            onEdit(task.id, editText.trim());
        }
        setIsEditing(false);
    };

    return (
        <div className="todo-item-container">
            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    autoFocus
                    className="todo-item-edit-input"
                />
            ) : (
                <p
                    className={`todo-item-text ${
                        task.isMarkedCompleted ? "completed" : ""
                    }`}
                >
                    {task.task}
                </p>
            )}

            <div className="todo-item-actions">
                <input
                    className="todo-item-checkbox"
                    type="checkbox"
                    checked={task.isMarkedCompleted}
                    onChange={() => onToggleComplete(task.id)}
                />

                {isEditing ? (
                    <button
                        className="todo-item-icon-button"
                        title="Save"
                        onClick={handleSave}
                    >
                        <FaCheck className="todo-item-icon-save"/>
                    </button>
                ) : (
                    <button
                        className="todo-item-icon-button"
                        title="Edit"
                        onClick={() => {
                            if (task.isMarkedCompleted === true) return;

                            setEditText(task.task);
                            setIsEditing(true);
                        }}
                    >
                        <FaPencilAlt className="todo-item-icon-edit"/>
                    </button>
                )}

                <button
                    className="todo-item-icon-button"
                    title="Delete"
                    onClick={() => {
                        if (task.isMarkedCompleted === false) return;

                        onDelete(task.id)
                    }}
                >
                    <FaTrash className="todo-item-icon-delete"/>
                </button>
            </div>
        </div>
    );
}
