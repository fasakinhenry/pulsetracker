import { useState } from 'react';
import {
    Search,
    Download,
    Eye,
    MessageSquare,
    Mail,
    Phone,
    MapPin,
    Activity,
    ChevronRight,
    ChevronLeft,
    Star,
    Clock,
    User
} from 'lucide-react';

const CustomersPage = () => {
    const [selectedTab, setSelectedTab] = useState('search');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [filterSentiment, setFilterSentiment] = useState('all');
    const [filterDateRange, setFilterDateRange] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const tabs = [
        { id: 'search', name: 'Search' },
        { id: 'profiles', name: 'Customer Profiles' },
        { id: 'actions', name: 'Action Log' }
    ];

    const sentimentOptions = [
        { value: 'all', label: 'All Sentiments' },
        { value: 'positive', label: 'Positive' },
        { value: 'neutral', label: 'Neutral' },
        { value: 'negative', label: 'Negative' }
    ];

    const dateRangeOptions = [
        { value: 'all', label: 'All Time' },
        { value: 'today', label: 'Today' },
        { value: '7d', label: 'Last 7 days' },
        { value: '30d', label: 'Last 30 days' },
        { value: '90d', label: 'Last 90 days' }
    ];

    // Mock customers data
    const customers = [
        {
            id: 'CUST-001',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1 234 567 8900',
            location: 'New York, USA',
            avatar: null,
            lastFeedback: new Date(Date.now() - 2 * 60 * 60 * 1000),
            sentiment: 'positive',
            csat: 4.5,
            nps: 9,
            ces: 4.2,
            totalFeedback: 12,
            status: 'active',
            tags: ['premium', 'frequent'],
            feedbackHistory: [
                { date: new Date(), rating: 5, comment: 'Excellent service!', channel: 'mobile' },
                { date: new Date(Date.now() - 24 * 60 * 60 * 1000), rating: 4, comment: 'Good experience', channel: 'web' },
                { date: new Date(Date.now() - 48 * 60 * 60 * 1000), rating: 5, comment: 'Very satisfied', channel: 'mobile' }
            ],
            activityTimeline: [
                { type: 'feedback', action: 'Submitted positive feedback', time: new Date() },
                { type: 'transaction', action: 'Completed transaction', time: new Date(Date.now() - 1 * 60 * 60 * 1000) }
            ],
            metadata: {
                accountAge: '2 years',
                totalTransactions: 156,
                avgTransactionValue: '$234'
            }
        },
        {
            id: 'CUST-002',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1 234 567 8901',
            location: 'Los Angeles, USA',
            avatar: null,
            lastFeedback: new Date(Date.now() - 5 * 60 * 60 * 1000),
            sentiment: 'negative',
            csat: 2.0,
            nps: 3,
            ces: 2.5,
            totalFeedback: 8,
            status: 'needs_attention',
            tags: ['at-risk'],
            feedbackHistory: [
                { date: new Date(), rating: 2, comment: 'Payment issues', channel: 'mobile' },
                { date: new Date(Date.now() - 24 * 60 * 60 * 1000), rating: 1, comment: 'Poor experience', channel: 'call' }
            ],
            activityTimeline: [
                { type: 'complaint', action: 'Filed complaint about payment', time: new Date() },
                { type: 'support', action: 'Contacted support', time: new Date(Date.now() - 2 * 60 * 60 * 1000) }
            ],
            metadata: {
                accountAge: '6 months',
                totalTransactions: 23,
                avgTransactionValue: '$89'
            }
        },
        {
            id: 'CUST-003',
            name: 'Bob Johnson',
            email: 'bob.johnson@example.com',
            phone: '+1 234 567 8902',
            location: 'Chicago, USA',
            avatar: null,
            lastFeedback: new Date(Date.now() - 24 * 60 * 60 * 1000),
            sentiment: 'neutral',
            csat: 3.5,
            nps: 6,
            ces: 3.8,
            totalFeedback: 5,
            status: 'active',
            tags: ['new'],
            feedbackHistory: [
                { date: new Date(Date.now() - 24 * 60 * 60 * 1000), rating: 3, comment: 'Average experience', channel: 'web' }
            ],
            activityTimeline: [
                { type: 'feedback', action: 'Submitted neutral feedback', time: new Date(Date.now() - 24 * 60 * 60 * 1000) }
            ],
            metadata: {
                accountAge: '3 months',
                totalTransactions: 8,
                avgTransactionValue: '$156'
            }
        }
    ];

    // Action log data
    const actionLog = [
        { id: 1, customer: 'John Doe', action: 'Resolved complaint', agent: 'Sarah Chen', time: new Date(), status: 'completed' },
        { id: 2, customer: 'Jane Smith', action: 'Escalated to manager', agent: 'Mike Johnson', time: new Date(Date.now() - 1 * 60 * 60 * 1000), status: 'in_progress' },
        { id: 3, customer: 'Bob Johnson', action: 'Sent follow-up email', agent: 'Sarah Chen', time: new Date(Date.now() - 2 * 60 * 60 * 1000), status: 'completed' }
    ];

    const getSentimentColor = (sentiment) => {
        const colors = {
            positive: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            neutral: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
            negative: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
        };
        return colors[sentiment] || colors.neutral;
    };

    const getStatusColor = (status) => {
        const colors = {
            active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            needs_attention: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
            inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
        };
        return colors[status] || colors.active;
    };

    const getTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    const filteredCustomers = customers.filter(customer => {
        if (searchQuery && !customer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !customer.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !customer.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (filterSentiment !== 'all' && customer.sentiment !== filterSentiment) return false;
        return true;
    });

    const paginatedCustomers = filteredCustomers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    return (
        <div className='p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen'>
            {/* Header */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Customers</h1>
                    <p className='text-gray-600 dark:text-gray-400 mt-1'>View and manage customer feedback and profiles</p>
                </div>
                <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2'>
                    <Download size={16} />
                    Export Data
                </button>
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
                {[
                    { label: 'Total Customers', value: customers.length, icon: User, color: 'blue' },
                    { label: 'Active Today', value: customers.filter(c => c.status === 'active').length, icon: Activity, color: 'green' },
                    { label: 'Needs Attention', value: customers.filter(c => c.status === 'needs_attention').length, icon: MessageSquare, color: 'red' },
                    { label: 'Avg CSAT', value: (customers.reduce((acc, c) => acc + c.csat, 0) / customers.length).toFixed(1), icon: Star, color: 'yellow' }
                ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className='bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800'>
                            <div className='flex items-center gap-3'>
                                <div className={`w-10 h-10 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg flex items-center justify-center`}>
                                    <Icon className={`text-${stat.color}-600 dark:text-${stat.color}-400`} size={20} />
                                </div>
                                <div>
                                    <p className='text-sm text-gray-600 dark:text-gray-400'>{stat.label}</p>
                                    <p className='text-2xl font-bold text-gray-900 dark:text-white'>{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tabs */}
            <div className='border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-lg px-4'>
                <div className='flex gap-4'>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id)}
                            className={`px-4 py-3 border-b-2 transition-colors ${
                                selectedTab === tab.id
                                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-medium'
                                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Tab */}
            {selectedTab === 'search' && (
                <div className='space-y-4'>
                    {/* Search and Filters */}
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <div className='flex-1 relative'>
                            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                            <input
                                type='text'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='Search by name, email, or customer ID...'
                                className='w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <select
                            value={filterSentiment}
                            onChange={(e) => setFilterSentiment(e.target.value)}
                            className='px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            {sentimentOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <select
                            value={filterDateRange}
                            onChange={(e) => setFilterDateRange(e.target.value)}
                            className='px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            {dateRangeOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Customer List */}
                    <div className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden'>
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gray-50 dark:bg-gray-800'>
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Customer</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Last Feedback</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Sentiment</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>CSAT</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>NPS</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Status</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>Actions</th>
                                </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200 dark:divide-gray-800'>
                                {paginatedCustomers.map((customer) => (
                                    <tr key={customer.id} className='hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer'>
                                        <td className='px-6 py-4'>
                                            <div className='flex items-center gap-3'>
                                                <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center'>
                                                    <span className='text-white font-semibold text-sm'>{customer.name.charAt(0)}</span>
                                                </div>
                                                <div>
                                                    <p className='font-medium text-gray-900 dark:text-white'>{customer.name}</p>
                                                    <p className='text-sm text-gray-500 dark:text-gray-400'>{customer.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div className='flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400'>
                                                <Clock size={14} />
                                                {getTimeAgo(customer.lastFeedback)}
                                            </div>
                                        </td>
                                        <td className='px-6 py-4'>
                                                <span className={`px-2 py-1 text-xs rounded-full ${getSentimentColor(customer.sentiment)}`}>
                                                    {customer.sentiment}
                                                </span>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div className='flex items-center gap-1'>
                                                <Star size={14} className='text-yellow-500' />
                                                <span className='text-sm font-medium text-gray-900 dark:text-white'>{customer.csat}</span>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <span className='text-sm font-medium text-gray-900 dark:text-white'>{customer.nps}</span>
                                        </td>
                                        <td className='px-6 py-4'>
                                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(customer.status)}`}>
                                                    {customer.status.replace('_', ' ')}
                                                </span>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <button
                                                onClick={() => setSelectedCustomer(customer)}
                                                className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1'
                                            >
                                                <Eye size={16} />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className='px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between'>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>
                                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} customers
                            </p>
                            <div className='flex gap-2'>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className='px-3 py-1 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <span className='px-4 py-1 text-sm text-gray-700 dark:text-gray-300'>
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    className='px-3 py-1 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Customer Profiles Tab */}
            {selectedTab === 'profiles' && selectedCustomer && (
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {/* Customer Info */}
                    <div className='lg:col-span-1 space-y-6'>
                        <div className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
                            <div className='flex items-center justify-center mb-4'>
                                <div className='w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center'>
                                    <span className='text-white font-bold text-2xl'>{selectedCustomer.name.charAt(0)}</span>
                                </div>
                            </div>
                            <h3 className='text-xl font-bold text-gray-900 dark:text-white text-center mb-1'>{selectedCustomer.name}</h3>
                            <p className='text-sm text-gray-500 dark:text-gray-400 text-center mb-4'>{selectedCustomer.id}</p>

                            <div className='space-y-3'>
                                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                                    <Mail size={16} />
                                    {selectedCustomer.email}
                                </div>
                                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                                    <Phone size={16} />
                                    {selectedCustomer.phone}
                                </div>
                                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                                    <MapPin size={16} />
                                    {selectedCustomer.location}
                                </div>
                            </div>

                            <div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-800'>
                                <div className='flex gap-2 flex-wrap'>
                                    {selectedCustomer.tags.map(tag => (
                                        <span key={tag} className='px-2 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded'>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Metadata */}
                        <div className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
                            <h4 className='font-semibold text-gray-900 dark:text-white mb-4'>Account Details</h4>
                            <div className='space-y-3'>
                                <div className='flex justify-between'>
                                    <span className='text-sm text-gray-600 dark:text-gray-400'>Account Age</span>
                                    <span className='text-sm font-medium text-gray-900 dark:text-white'>{selectedCustomer.metadata.accountAge}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-sm text-gray-600 dark:text-gray-400'>Total Transactions</span>
                                    <span className='text-sm font-medium text-gray-900 dark:text-white'>{selectedCustomer.metadata.totalTransactions}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-sm text-gray-600 dark:text-gray-400'>Avg Transaction</span>
                                    <span className='text-sm font-medium text-gray-900 dark:text-white'>{selectedCustomer.metadata.avgTransactionValue}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feedback History */}
                    <div className='lg:col-span-2 space-y-6'>
                        <div className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
                            <h4 className='font-semibold text-gray-900 dark:text-white mb-4'>Feedback History</h4>
                            <div className='space-y-4'>
                                {selectedCustomer.feedbackHistory.map((feedback, idx) => (
                                    <div key={idx} className='border border-gray-200 dark:border-gray-800 rounded-lg p-4'>
                                        <div className='flex items-start justify-between mb-2'>
                                            <div className='flex items-center gap-2'>
                                                <div className='flex'>
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={14}
                                                            className={i < feedback.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                                                        />
                                                    ))}
                                                </div>
                                                <span className='text-sm font-medium text-gray-900 dark:text-white'>{feedback.rating}/5</span>
                                            </div>
                                            <span className='text-xs text-gray-500'>{getTimeAgo(feedback.date)}</span>
                                        </div>
                                        <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>{feedback.comment}</p>
                                        <span className='text-xs text-gray-500'>Via {feedback.channel}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Activity Timeline */}
                        <div className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
                            <h4 className='font-semibold text-gray-900 dark:text-white mb-4'>Activity Timeline</h4>
                            <div className='space-y-4'>
                                {selectedCustomer.activityTimeline.map((activity, idx) => (
                                    <div key={idx} className='flex gap-4'>
                                        <div className='w-2 h-2 mt-2 rounded-full bg-blue-600 flex-shrink-0'></div>
                                        <div className='flex-1'>
                                            <p className='text-sm text-gray-900 dark:text-white'>{activity.action}</p>
                                            <p className='text-xs text-gray-500'>{getTimeAgo(activity.time)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Log Tab */}
            {selectedTab === 'actions' && (
                <div className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden'>
                    <table className='w-full'>
                        <thead className='bg-gray-50 dark:bg-gray-800'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase'>Customer</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase'>Action</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase'>Agent</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase'>Time</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase'>Status</th>
                        </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200 dark:divide-gray-800'>
                        {actionLog.map((log) => (
                            <tr key={log.id} className='hover:bg-gray-50 dark:hover:bg-gray-800/50'>
                                <td className='px-6 py-4 text-sm text-gray-900 dark:text-white'>{log.customer}</td>
                                <td className='px-6 py-4 text-sm text-gray-600 dark:text-gray-400'>{log.action}</td>
                                <td className='px-6 py-4 text-sm text-gray-600 dark:text-gray-400'>{log.agent}</td>
                                <td className='px-6 py-4 text-sm text-gray-600 dark:text-gray-400'>{getTimeAgo(log.time)}</td>
                                <td className='px-6 py-4'>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        log.status === 'completed'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : log.status === 'in_progress'
                                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                    }`}>{log.status.replace('_', ' ')}</span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CustomersPage;

