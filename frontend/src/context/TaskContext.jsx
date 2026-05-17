import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from './AuthContext';
import toast from 'react-hot-toast';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/tasks');
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchTasks();
        } else {
            setTasks([]);
        }
    }, [user]);

    const addTask = async (taskData) => {
        try {
            const { data } = await api.post('/tasks', taskData);
            setTasks([data, ...tasks]);
            toast.success('Task created successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create task');
        }
    };

    const updateTask = async (id, taskData) => {
        try {
            const { data } = await api.put(`/tasks/${id}`, taskData);
            setTasks(tasks.map((task) => (task._id === id ? data : task)));
            toast.success('Task updated successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update task');
        }
    };

    const deleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter((task) => task._id !== id));
            toast.success('Task deleted successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete task');
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, fetchTasks }}>
            {children}
        </TaskContext.Provider>
    );
};
