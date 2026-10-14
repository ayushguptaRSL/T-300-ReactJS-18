import "./styles.css";
import {useTodos} from "./hooks/useTodos";
import TodoInput from "./views/todoInput/TodoInput";
import TodoItemView from "./views/todoItem/TodoItem";
import ListActionButtons from "./views/todoListActionButtons/TodoListActionButtons";
import {FaCheck, FaPencilAlt} from "react-icons/fa";

export default function App() {
    const {
        visibleTasks,
        addTask,
        toggleComplete,
        deleteTask,
        editTask,
        setFilterType,
    } = useTodos();

    return (
        <div className="App">
            <h1>TodoInput</h1>
            <TodoInput addTask={addTask}/>

            <h1>TodoList</h1>
            <ListActionButtons
                onTapAll={() => setFilterType("all")}
                onTapDone={() => setFilterType("done")}
                onTapTodo={() => setFilterType("todo")}
            />

            {visibleTasks.length > 0 ? (
                visibleTasks.map((item) => (
                    <TodoItemView
                        key={item.id}
                        task={item}
                        onToggleComplete={toggleComplete}
                        onDelete={deleteTask}
                        onEdit={editTask}
                    />
                ))
            ) : (
                <h2>List is Empty. Add some task to see</h2>
            )}

        </div>
    );
}
