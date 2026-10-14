import "./TodoListActionButtons.css";

interface TodoListProps {
    onTapAll: () => void;
    onTapDone: () => void;
    onTapTodo: () => void;
}

export default function TodoListActionButtons(props: TodoListProps) {
    return (
        <div className="action-buttons-container">
            <button className="action-button" onClick={() => props.onTapAll()}>
                All
            </button>
            <button className="action-button" onClick={() => props.onTapDone()}>
                Done
            </button>
            <button className="action-button" onClick={() => props.onTapTodo()}>
                Todo
            </button>
        </div>
    );
}
