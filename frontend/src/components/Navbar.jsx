import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Moon, Sun, LayoutDashboard, CheckSquare, User, LogOut } from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode }) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-dark-700 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            T
                        </div>
                        <span className="font-bold text-xl text-gray-900 dark:text-white">
                            TaskFlow
                        </span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-600 dark:text-gray-300 transition-colors"
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {user ? (
                            <>
                                <Link to="/" className="hidden md:flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium">
                                    <LayoutDashboard size={18} />
                                    <span>Dashboard</span>
                                </Link>
                                <Link to="/tasks" className="hidden md:flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium">
                                    <CheckSquare size={18} />
                                    <span>Tasks</span>
                                </Link>
                                <Link to="/profile" className="hidden md:flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium">
                                    <User size={18} />
                                    <span>Profile</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 text-red-500 hover:text-red-600 font-medium ml-4"
                                >
                                    <LogOut size={18} />
                                    <span className="hidden md:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <div className="space-x-4">
                                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 font-medium">
                                    Login
                                </Link>
                                <Link to="/register" className="btn-primary">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
