import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import { motion } from 'framer-motion';
import { User, Mail, Calendar } from 'lucide-react';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const { tasks } = useContext(TaskContext);

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card overflow-hidden"
            >
                <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-600"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="w-24 h-24 bg-white dark:bg-dark-800 rounded-full flex items-center justify-center border-4 border-white dark:border-dark-800 shadow-lg">
                            <span className="text-4xl font-bold text-primary-500">
                                {user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
                            <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                                <Mail size={16} />
                                {user?.email}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100 dark:border-dark-700">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-900/50">
                                <div className="p-3 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
                                    <User size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Type</p>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">Standard User</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-900/50">
                                <div className="p-3 bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 rounded-lg">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Tasks</p>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{tasks.length} Created</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
