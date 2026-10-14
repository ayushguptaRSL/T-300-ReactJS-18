import {useState} from "react";
import {TodoItemModel} from "../models/TodoItemModel";

export type FilterType = "all" | "done" | "todo";

export function useTodos() {
    const [tasks, setTasks] = useState<TodoItemModel[]>([]);
    const [filterType, setFilterType] = useState<FilterType>("all");

    const addTask = (task: string) => {
        setTasks((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                task,
                isMarkedCompleted: false,
                isDeleted: false,
            },
        ]);

        setFilterType("all");
    };

    const toggleComplete = (id: string) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === id ? {...t, isMarkedCompleted: !t.isMarkedCompleted} : t
            )
        );
    };

    const deleteTask = (id: string) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? {...t, isDeleted: true} : t))
        );
    };

    const editTask = (id: string, newText: string) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? {...t, task: newText} : t))
        );
    };

    const visibleTasks = tasks.filter((t) => {
        if (t.isDeleted) return false;
        if (filterType === "done") return t.isMarkedCompleted;
        if (filterType === "todo") return !t.isMarkedCompleted;
        return true;
    }).sort((a, b) => {
        if (a.isMarkedCompleted === b.isMarkedCompleted) return 0;
        return a.isMarkedCompleted ? -1 : 1;
    });

    return {
        visibleTasks,
        filterType,
        addTask,
        toggleComplete,
        deleteTask,
        editTask,
        setFilterType,
    };
}
