import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Trash2, Edit2 } from 'lucide-react';

const TaskManagement = () => {
    const { tasks, addTask, updateTask, deleteTask } = useContext(TaskContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Medium',
        dueDate: ''
    });
    const [editingId, setEditingId] = useState(null);

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              task.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await updateTask(editingId, formData);
        } else {
            await addTask(formData);
        }
        closeModal();
    };

    const openModal = (task = null) => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description || '',
                status: task.status,
                priority: task.priority,
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
            });
            setEditingId(task._id);
        } else {
            setFormData({ title: '', description: '', status: 'Pending', priority: 'Medium', dueDate: '' });
            setEditingId(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Task Management</h1>
                <button onClick={() => openModal()} className="btn-primary flex items-center gap-2">
                    <Plus size={20} />
                    <span>New Task</span>
                </button>
            </div>

            <div className="glass-card p-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input-field pl-10"
                    />
                </div>
                <div className="relative min-w-[200px]">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="input-field pl-10 appearance-none"
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredTasks.map((task, index) => (
                        <motion.div
                            key={task._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="glass-card p-6 flex flex-col h-full hover:shadow-2xl transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">{task.title}</h3>
                                <div className="flex space-x-2">
                                    <button onClick={() => openModal(task)} className="text-blue-500 hover:text-blue-600 transition-colors">
                                        <Edit2 size={18} />
                                    </button>
                                    <button onClick={() => deleteTask(task._id)} className="text-red-500 hover:text-red-600 transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                                {task.description || 'No description provided.'}
                            </p>

                            <div className="space-y-3 mt-auto">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Status</span>
                                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                        task.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                        task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                    }`}>
                                        {task.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Priority</span>
                                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                        task.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                        task.priority === 'Medium' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                        'bg-gray-100 text-gray-700 dark:bg-dark-700 dark:text-gray-300'
                                    }`}>
                                        {task.priority}
                                    </span>
                                </div>
                                {task.dueDate && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Due Date</span>
                                        <span className="text-gray-900 dark:text-gray-200 font-medium">
                                            {new Date(task.dueDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredTasks.length === 0 && (
                <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 dark:bg-dark-800 mb-4">
                        <Search size={40} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No tasks found</h3>
                    <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-dark-700">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {editingId ? 'Edit Task' : 'Create Task'}
                                </h2>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
                                    <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="input-field" placeholder="Task title" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                    <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="input-field min-h-[100px]" placeholder="Task description..." />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                        <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="input-field">
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                                        <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})} className="input-field">
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                                    <input type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="input-field" />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={closeModal} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-dark-700 dark:hover:bg-dark-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" className="flex-1 btn-primary">
                                        {editingId ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TaskManagement;
