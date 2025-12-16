import { NavLink } from 'react-router-dom';
import {
    Home,
    Plug,
    BarChart3,
    Bell,
    Users,
    Share2,
    Brain,
    Database,
    Shield,
    FileText,
    Settings,
    ChevronLeft,
    ChevronRight,
    X,
    LogOut,
    Moon,
    Sun,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard', priority: 9 },
    { name: 'Customers', icon: Users, path: '/dashboard/customers', priority: 1 },
    { name: 'Alerts', icon: Bell, path: '/dashboard/alerts', priority: 2 },
    { name: 'Integrations', icon: Plug, path: '/dashboard/integrations', priority: 3 },
    { name: 'Socials', icon: Share2, path: '/dashboard/socials', priority: 4 },
    { name: 'Analytics', icon: BarChart3, path: '/dashboard/analytics', priority: 5 },
    { name: 'AI Context', icon: Brain, path: '/dashboard/ai-context', priority: 6 },
    { name: 'Data Hub', icon: Database, path: '/dashboard/data-hub', priority: 7 },
    { name: 'Data Rights', icon: Shield, path: '/dashboard/data-rights', priority: 8 },
    { name: 'Compliance', icon: FileText, path: '/dashboard/compliance', priority: 10 },
];

const Sidebar = ({ collapsed = false, onToggleCollapse, onClose }) => {
    const [darkMode, setDarkMode] = useState(true); // Dark mode first as per brief

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved) {
            const isDark = saved === 'dark';
            setDarkMode(isDark);
            document.documentElement.classList.toggle('dark', isDark);
        } else {
            // Default to dark mode
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }, []);

    const toggleTheme = () => {
        const next = !darkMode;
        setDarkMode(next);
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    return (
        <aside
            className={`h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-200 ${
                collapsed ? 'w-20' : 'w-64'
            }`}
        >
            {/* Top brand + collapse */}
            <div className='flex items-center justify-between px-4 pt-6 mb-6'>
                {!collapsed && (
                    <div className='flex items-center gap-2'>
                        <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center'>
                            <span className='text-white font-bold text-sm'>PT</span>
                        </div>
                        <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
                            PulseTracker
                        </h1>
                    </div>
                )}
                {collapsed && (
                    <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center mx-auto'>
                        <span className='text-white font-bold text-sm'>PT</span>
                    </div>
                )}
                {onToggleCollapse && (
                    <button
                        onClick={onToggleCollapse}
                        className='hidden sm:block text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                )}
                {onClose && (
                    <button onClick={onClose} className='sm:hidden text-gray-600 dark:text-gray-400'>
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Scrollable nav container */}
            <div className='flex-1 overflow-y-auto px-4 pb-4'>
                <nav className='flex flex-col gap-1'>
                    {navItems.map(({ name, icon: Icon, path }) => (
                        <NavLink
                            key={name}
                            to={path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                    isActive
                                        ? 'bg-blue-100 text-blue-700 font-medium dark:bg-blue-900/30 dark:text-blue-400'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                } ${collapsed ? 'justify-center' : ''}`
                            }
                        >
                            <Icon size={20} />
                            {!collapsed && <span className='text-sm'>{name}</span>}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Fixed footer */}
            <div className='px-4 py-4 border-t border-gray-200 dark:border-gray-800 space-y-2'>
                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${
                        collapsed ? 'justify-center' : ''
                    }`}
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    {!collapsed && <span className='text-sm'>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
                </button>

                {/* Settings */}
                <NavLink
                    to='/dashboard/settings'
                    className={`flex items-center gap-3 px-3 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${
                        collapsed ? 'justify-center' : ''
                    }`}
                >
                    <Settings size={20} />
                    {!collapsed && <span className='text-sm'>Settings</span>}
                </NavLink>

                {/* Logout */}
                <NavLink
                    to='/logout'
                    className={`flex items-center gap-3 px-3 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors ${
                        collapsed ? 'justify-center' : ''
                    }`}
                >
                    <LogOut size={20} />
                    {!collapsed && <span className='text-sm'>Logout</span>}
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;