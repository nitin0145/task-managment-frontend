import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = ({ projectId }) => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState({ name: '', description: '', priority: '', dueDate: '' });

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks/${projectId}`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    const handleCreateTask = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, { ...taskInput, projectId });
            setTaskInput({ name: '', description: '', priority: '', dueDate: '' });
            fetchTasks();
        } catch (error) {
            console.error('Error creating task', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    useEffect(() => {
        if (projectId) fetchTasks();
    }, [projectId]);

    return (
        <div>
            <h2>Task Manager</h2>
            <div>
                <input
                    type="text"
                    placeholder="Task Name"
                    value={taskInput.name}
                    onChange={(e) => setTaskInput({ ...taskInput, name: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={taskInput.description}
                    onChange={(e) => setTaskInput({ ...taskInput, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Priority"
                    value={taskInput.priority}
                    onChange={(e) => setTaskInput({ ...taskInput, priority: e.target.value })}
                />
                <input
                    type="date"
                    value={taskInput.dueDate}
                    onChange={(e) => setTaskInput({ ...taskInput, dueDate: e.target.value })}
                />
                <button onClick={handleCreateTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {task.name} - {task.description}{' '}
                        <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;
