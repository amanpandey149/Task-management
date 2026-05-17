import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { tasks } = useContext(TaskContext);
    const { user } = useContext(AuthContext);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    const pendingTasks = tasks.filter(task => task.status === 'Pending').length;
    const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
    
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const statCards = [
        { title: 'Total Tasks', value: totalTasks, icon: <TrendingUp className="text-blue-500" size={24} />, bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { title: 'Completed', value: completedTasks, icon: <CheckCircle2 className="text-green-500" size={24} />, bg: 'bg-green-50 dark:bg-green-900/20' },
        { title: 'In Progress', value: inProgressTasks, icon: <Clock className="text-yellow-500" size={24} />, bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
        { title: 'Pending', value: pendingTasks, icon: <AlertCircle className="text-red-500" size={24} />, bg: 'bg-red-50 dark:bg-red-900/20' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, {user?.name}</p>
                </div>
                <Link to="/tasks" className="btn-primary flex items-center gap-2">
                    <span>Manage Tasks</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-6 flex items-center justify-between"
                    >
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.title}</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                        </div>
                        <div className={`p-4 rounded-xl ${stat.bg}`}>
                            {stat.icon}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card p-8"
                >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Task Progress</h3>
                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-100 dark:bg-primary-900/30 dark:text-primary-400">
                                    Overall Completion
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-semibold inline-block text-primary-600 dark:text-primary-400">
                                    {progress}%
                                </span>
                            </div>
                        </div>
                        <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-primary-100 dark:bg-dark-700">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-primary-500 to-primary-600"
                            ></motion.div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card p-8"
                >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Tasks</h3>
                    <div className="space-y-4">
                        {tasks.slice(0, 3).map((task) => (
                            <div key={task._id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-dark-900/50">
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">{task.title}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(task.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    task.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                    task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                }`}>
                                    {task.status}
                                </span>
                            </div>
                        ))}
                        {tasks.length === 0 && (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No tasks yet. Create one to get started!</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
