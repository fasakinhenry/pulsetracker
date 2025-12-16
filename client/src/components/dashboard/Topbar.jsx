import { useState } from 'react';
import { Search, Bell, Menu, User, ChevronDown } from 'lucide-react';

const Topbar = ({ onOpenMobileSidebar }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    // Mock data - replace with actual API calls
    const unreadCount = 3;
    const notifications = [
        { id: 1, type: 'alert', message: 'Critical feedback alert: Low CSAT detected', time: '5m ago' },
        { id: 2, type: 'feedback', message: 'New feedback received from Customer #1234', time: '15m ago' },
        { id: 3, type: 'compliance', message: 'Data Subject Request pending review', time: '1h ago' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        // TODO: Implement intelligent search
        console.log('Searching for:', searchQuery);
    };

    return (
        <header className='bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 py-3 sticky top-0 z-40'>
            <div className='flex items-center justify-between gap-4'>
                {/* Mobile menu button */}
                <button
                    onClick={onOpenMobileSidebar}
                    className='sm:hidden text-gray-700 dark:text-gray-300'
                >
                    <Menu size={24} />
                </button>

                {/* Intelligent Search */}
                <form onSubmit={handleSearch} className='flex-1 max-w-2xl'>
                    <div className='relative'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Search customers, feedback, alerts... (e.g., "show negative feedback today")'
                            className='w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all'
                        />
                    </div>
                </form>

                {/* Right side actions */}
                <div className='flex items-center gap-2'>
                    {/* Notifications */}
                    <div className='relative'>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className='relative p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
                        >
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <span className='absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center'>
                  {unreadCount}
                </span>
                            )}
                        </button>

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className='absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg overflow-hidden'>
                                <div className='px-4 py-3 border-b border-gray-200 dark:border-gray-800'>
                                    <h3 className='text-sm font-semibold text-gray-900 dark:text-white'>
                                        Notifications
                                    </h3>
                                </div>
                                <div className='max-h-96 overflow-y-auto'>
                                    {notifications.map((notif) => (
                                        <div
                                            key={notif.id}
                                            className='px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-800 last:border-b-0 cursor-pointer'
                                        >
                                            <p className='text-sm text-gray-900 dark:text-gray-100'>
                                                {notif.message}
                                            </p>
                                            <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                                                {notif.time}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className='px-4 py-3 border-t border-gray-200 dark:border-gray-800 text-center'>
                                    <a
                                        href='/dashboard/alerts'
                                        className='text-sm text-blue-600 dark:text-blue-400 hover:underline'
                                    >
                                        View all alerts
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    <div className='relative'>
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className='flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
                        >
                            <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center'>
                                <User size={16} className='text-white' />
                            </div>
                            <ChevronDown size={16} className='text-gray-700 dark:text-gray-300 hidden sm:block' />
                        </button>

                        {/* Profile Dropdown */}
                        {showProfileMenu && (
                            <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg overflow-hidden'>
                                <div className='px-4 py-3 border-b border-gray-200 dark:border-gray-800'>
                                    <p className='text-sm font-medium text-gray-900 dark:text-white'>
                                        Admin User
                                    </p>
                                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                                        admin@company.com
                                    </p>
                                </div>
                                <a
                                    href='/dashboard/settings'
                                    className='block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                >
                                    Settings
                                </a>
                                <a
                                    href='/logout'
                                    className='block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                                >
                                    Logout
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;