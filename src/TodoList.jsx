import React, {useEffect} from 'react';

function TodoList() {
    useEffect(() => {
        document.title = "To-Do List App";
    }, []);
    const [tasks, setTasks] = React.useState([]);
    const [newTask, setNewTask] = React.useState("");

    function handleInput(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks((tasks) => [...tasks, { text: newTask, done: false }]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function editTask(index) {
        const updatedTask = prompt("Edit the task:", tasks[index].text);
        if (updatedTask !== null && updatedTask.trim() !== "") {
            const updatedTasks = [...tasks];
            updatedTasks[index].text = updatedTask;
            setTasks(updatedTasks);
        }
    }

    function markAsDone(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].done = true;
        setTasks(updatedTasks);
    }

    function undoTask(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].done = false;
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div className="todo-list">
            <h1>To-Do List App</h1>
            <div>
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={newTask}
                    onChange={handleInput}
                />
                <button className="add-button" onClick={addTask}>
                    Add
                </button>
            </div>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span className={`text ${task.done ? "done" : ""}`}>{task.text}</span>
                        <button className="edit-button" onClick={() => editTask(index)}>
                            Edit
                        </button>
                        <button className="delete-button" onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                        <button className="move-button" onClick={() => moveTaskUp(index)}>
                            &#8679;
                        </button>
                        <button className="move-button" onClick={() => moveTaskDown(index)}>
                            &#8681;
                        </button>

                        {!task.done ? (
                            <button className="done-button" onClick={() => markAsDone(index)}>
                                Done
                            </button>
                        ) : (
                            <button className="undo-button" onClick={() => undoTask(index)}>
                                Undo
                            </button>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default TodoList;
