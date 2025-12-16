import { useState, useEffect } from 'react';
import {
    AlertTriangle,
    AlertCircle,
    Info,
    CheckCircle2,
    XCircle,
    Clock,
    Filter,
    Search,
    MoreVertical,
    Bell,
    BellOff,
    Archive,
    Trash2,
    Eye,
    MessageSquare,
    TrendingDown,
    Users,
    Zap,
    RefreshCw,
    Settings,
    ChevronRight
} from 'lucide-react';

const AlertsPage = () => {
    const [selectedTab, setSelectedTab] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAlerts, setSelectedAlerts] = useState([]);
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    const tabs = [
        { id: 'all', name: 'All Alerts', count: 12 },
        { id: 'feedback', name: 'Feedback Alerts', count: 8 },
        { id: 'compliance', name: 'Compliance Alerts', count: 2 },
        { id: 'social', name: 'Social Media', count: 2 }
    ];

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'open', label: 'Open' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'resolved', label: 'Resolved' },
        { value: 'dismissed', label: 'Dismissed' }
    ];

    const typeOptions = [
        { value: 'all', label: 'All Types' },
        { value: 'critical', label: 'Critical' },
        { value: 'warning', label: 'Warning' },
        { value: 'info', label: 'Info' }
    ];

    // Mock alerts data
    const [alerts, setAlerts] = useState([
        {
            id: 1,
            type: 'critical',
            category: 'feedback',
            title: 'CSAT Score Critical Drop',
            message: 'CSAT score dropped below 3.0 for mobile app payment flow. Immediate attention required.',
            time: new Date(Date.now() - 10 * 60 * 1000),
            status: 'open',
            affectedUsers: 234,
            priority: 'urgent',
            assignee: null,
            tags: ['payment', 'mobile', 'csat']
        },
        {
            id: 2,
            type: 'critical',
            category: 'feedback',
            title: 'High Volume Negative Feedback',
            message: 'Spike in negative feedback detected on login process. 156 complaints in last hour.',
            time: new Date(Date.now() - 45 * 60 * 1000),
            status: 'in_progress',
            affectedUsers: 156,
            priority: 'high',
            assignee: 'Sarah Chen',
            tags: ['login', 'authentication']
        },
        {
            id: 3,
            type: 'warning',
            category: 'feedback',
            title: 'NPS Score Declining',
            message: 'NPS score showing downward trend over past 3 days. Current: 42 (was 48)',
            time: new Date(Date.now() - 2 * 60 * 60 * 1000),
            status: 'open',
            affectedUsers: 892,
            priority: 'medium',
            assignee: null,
            tags: ['nps', 'trend']
        },
        {
            id: 4,
            type: 'warning',
            category: 'social',
            title: 'Trending Negative Hashtag',
            message: '#PaymentFail trending on Twitter with 234 mentions in last 2 hours',
            time: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
            status: 'open',
            affectedUsers: 234,
            priority: 'high',
            assignee: 'Mike Johnson',
            tags: ['twitter', 'payment', 'social']
        },
        {
            id: 5,
            type: 'info',
            category: 'feedback',
            title: 'Survey Milestone Reached',
            message: '10,000 customer feedback responses collected this month',
            time: new Date(Date.now() - 3 * 60 * 60 * 1000),
            status: 'resolved',
            affectedUsers: 10000,
            priority: 'low',
            assignee: null,
            tags: ['milestone']
        },
        {
            id: 6,
            type: 'critical',
            category: 'compliance',
            title: 'Pending Data Subject Requests',
            message: '5 DSRs require immediate attention. 2 approaching deadline in 24 hours.',
            time: new Date(Date.now() - 4 * 60 * 60 * 1000),
            status: 'open',
            affectedUsers: 5,
            priority: 'urgent',
            assignee: 'Legal Team',
            tags: ['gdpr', 'compliance', 'dsr']
        },
        {
            id: 7,
            type: 'warning',
            category: 'compliance',
            title: 'Consent Rate Below Threshold',
            message: 'User consent rate dropped to 87% (threshold: 90%)',
            time: new Date(Date.now() - 5 * 60 * 60 * 1000),
            status: 'in_progress',
            affectedUsers: 1200,
            priority: 'medium',
            assignee: 'Compliance Team',
            tags: ['consent', 'gdpr']
        },
        {
            id: 8,
            type: 'info',
            category: 'social',
            title: 'Positive Social Media Spike',
            message: 'Positive sentiment increased by 25% on Facebook following new feature launch',
            time: new Date(Date.now() - 6 * 60 * 60 * 1000),
            status: 'resolved',
            affectedUsers: 567,
            priority: 'low',
            assignee: null,
            tags: ['facebook', 'positive']
        }
    ]);

    const getTypeIcon = (type) => {
        switch (type) {
            case 'critical': return AlertTriangle;
            case 'warning': return AlertCircle;
            case 'info': return Info;
            default: return Bell;
        }
    };

    const getTypeColor = (type) => {
        const colors = {
            critical: {
                bg: 'bg-red-100 dark:bg-red-900/30',
                text: 'text-red-600 dark:text-red-400',
                border: 'border-red-200 dark:border-red-800'
            },
            warning: {
                bg: 'bg-orange-100 dark:bg-orange-900/30',
                text: 'text-orange-600 dark:text-orange-400',
                border: 'border-orange-200 dark:border-orange-800'
            },
            info: {
                bg: 'bg-blue-100 dark:bg-blue-900/30',
                text: 'text-blue-600 dark:text-blue-400',
                border: 'border-blue-200 dark:border-blue-800'
            }
        };
        return colors[type] || colors.info;
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            open: { label: 'Open', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
            in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
            resolved: { label: 'Resolved', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
            dismissed: { label: 'Dismissed', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' }
        };
        return statusConfig[status] || statusConfig.open;
    };

    const getPriorityBadge = (priority) => {
        const priorityConfig = {
            urgent: { label: 'Urgent', color: 'bg-red-500 text-white' },
            high: { label: 'High', color: 'bg-orange-500 text-white' },
            medium: { label: 'Medium', color: 'bg-yellow-500 text-white' },
            low: { label: 'Low', color: 'bg-gray-500 text-white' }
        };
        return priorityConfig[priority] || priorityConfig.medium;
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

    const filteredAlerts = alerts.filter(alert => {
        if (selectedTab !== 'all' && alert.category !== selectedTab) return false;
        if (filterStatus !== 'all' && alert.status !== filterStatus) return false;
        if (filterType !== 'all' && alert.type !== filterType) return false;
        if (searchQuery && !alert.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !alert.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const handleResolve = (alertId) => {
        setAlerts(alerts.map(alert =>
            alert.id === alertId ? { ...alert, status: 'resolved' } : alert
        ));
    };

    const handleDismiss = (alertId) => {
        setAlerts(alerts.map(alert =>
            alert.id === alertId ? { ...alert, status: 'dismissed' } : alert
        ));
    };

    const handleAssign = (alertId, assignee) => {
        setAlerts(alerts.map(alert =>
            alert.id === alertId ? { ...alert, assignee, status: 'in_progress' } : alert
        ));
    };

    const handleBulkAction = (action) => {
        setAlerts(alerts.map(alert =>
            selectedAlerts.includes(alert.id) ? { ...alert, status: action } : alert
        ));
        setSelectedAlerts([]);
    };

    const toggleSelectAlert = (alertId) => {
        setSelectedAlerts(prev =>
            prev.includes(alertId) ? prev.filter(id => id !== alertId) : [...prev, alertId]
        );
    };

    const stats = {
        total: alerts.length,
        critical: alerts.filter(a => a.type === 'critical' && a.status === 'open').length,
        open: alerts.filter(a => a.status === 'open').length,
        avgResponseTime: '2.4h'
    };

    return (
        <div className='p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen'>
            {/* Header */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Alerts</h1>
                    <p className='text-gray-600 dark:text-gray-400 mt-1'>Monitor and manage critical customer experience alerts</p>
                </div>
                <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2'>
                    <Settings size={16} />
                    Configure Alerts
                </button>
            </div>

            {/* Stats Overview */}
            <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
                <div className='bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center'>
                            <Bell className='text-blue-600 dark:text-blue-400' size={20} />
                        </div>
                        <div>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>Total Alerts</p>
                            <p className='text-2xl font-bold text-gray-900 dark:text-white'>{stats.total}</p>
                        </div>
                    </div>
                </div>
                <div className='bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center'>
                            <AlertTriangle className='text-red-600 dark:text-red-400' size={20} />
                        </div>
                        <div>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>Critical Open</p>
                            <p className='text-2xl font-bold text-gray-900 dark:text-white'>{stats.critical}</p>
                        </div>
                    </div>
                </div>
                <div className='bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center'>
                            <Clock className='text-yellow-600 dark:text-yellow-400' size={20} />
                        </div>
                        <div>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>Open</p>
                            <p className='text-2xl font-bold text-gray-900 dark:text-white'>{stats.open}</p>
                        </div>
                    </div>
                </div>
                <div className='bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center'>
                            <Zap className='text-green-600 dark:text-green-400' size={20} />
                        </div>
                        <div>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>Avg Response</p>
                            <p className='text-2xl font-bold text-gray-900 dark:text-white'>{stats.avgResponseTime}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className='border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-lg px-4'>
                <div className='flex gap-2 overflow-x-auto'>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id)}
                            className={`px-4 py-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                                selectedTab === tab.id
                                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-medium'
                                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                            {tab.name}
                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                                selectedTab === tab.id
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Filters and Actions */}
            <div className='flex flex-col sm:flex-row gap-4'>
                {/* Search */}
                <div className='flex-1 relative'>
                    <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                    <input
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Search alerts...'
                        className='w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                {/* Filters */}
                <div className='flex gap-2'>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className='px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className='px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        {typeOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedAlerts.length > 0 && (
                <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-center justify-between'>
                    <p className='text-sm text-blue-900 dark:text-blue-100'>
                        {selectedAlerts.length} alert{selectedAlerts.length > 1 ? 's' : ''} selected
                    </p>
                    <div className='flex gap-2'>
                        <button
                            onClick={() => handleBulkAction('resolved')}
                            className='px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-sm'
                        >
                            Resolve All
                        </button>
                        <button
                            onClick={() => handleBulkAction('dismissed')}
                            className='px-3 py-1.5 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm'
                        >
                            Dismiss All
                        </button>
                        <button
                            onClick={() => setSelectedAlerts([])}
                            className='px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-sm'
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}

            {/* Alerts List */}
            <div className='space-y-3'>
                {filteredAlerts.length === 0 ? (
                    <div className='bg-white dark:bg-gray-900 rounded-lg p-12 border border-gray-200 dark:border-gray-800 text-center'>
                        <BellOff className='mx-auto text-gray-400 mb-4' size={48} />
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>No alerts found</h3>
                        <p className='text-gray-600 dark:text-gray-400'>Try adjusting your filters or check back later</p>
                    </div>
                ) : (
                    filteredAlerts.map((alert) => {
                        const TypeIcon = getTypeIcon(alert.type);
                        const typeColor = getTypeColor(alert.type);
                        const statusBadge = getStatusBadge(alert.status);
                        const priorityBadge = getPriorityBadge(alert.priority);

                        return (
                            <div
                                key={alert.id}
                                className={`bg-white dark:bg-gray-900 rounded-lg p-6 border-l-4 ${typeColor.border} border-r border-t border-b border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow`}
                            >
                                <div className='flex items-start gap-4'>
                                    {/* Checkbox */}
                                    <input
                                        type='checkbox'
                                        checked={selectedAlerts.includes(alert.id)}
                                        onChange={() => toggleSelectAlert(alert.id)}
                                        className='mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500'
                                    />

                                    {/* Icon */}
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${typeColor.bg} flex-shrink-0`}>
                                        <TypeIcon className={typeColor.text} size={24} />
                                    </div>

                                    {/* Content */}
                                    <div className='flex-1 min-w-0'>
                                        <div className='flex items-start justify-between gap-4 mb-2'>
                                            <div className='flex-1'>
                                                <div className='flex items-center gap-2 mb-1 flex-wrap'>
                                                    <h3 className='font-semibold text-gray-900 dark:text-white'>{alert.title}</h3>
                                                    <span className={`px-2 py-0.5 text-xs rounded-full ${priorityBadge.color}`}>
                                                        {priorityBadge.label}
                                                    </span>
                                                    <span className={`px-2 py-0.5 text-xs rounded-full ${statusBadge.color}`}>
                                                        {statusBadge.label}
                                                    </span>
                                                </div>
                                                <p className='text-gray-600 dark:text-gray-400 text-sm mb-3'>{alert.message}</p>
                                                <div className='flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500 flex-wrap'>
                                                    <span className='flex items-center gap-1'>
                                                        <Clock size={12} />
                                                        {getTimeAgo(alert.time)}
                                                    </span>
                                                    <span className='flex items-center gap-1'>
                                                        <Users size={12} />
                                                        {alert.affectedUsers} affected
                                                    </span>
                                                    {alert.assignee && (
                                                        <span className='flex items-center gap-1'>
                                                            <Users size={12} />
                                                            Assigned to {alert.assignee}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className='flex gap-2 mt-2'>
                                                    {alert.tags.map(tag => (
                                                        <span key={tag} className='px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded'>
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className='flex gap-2 mt-4'>
                                            {alert.status !== 'resolved' && (
                                                <button
                                                    onClick={() => handleResolve(alert.id)}
                                                    className='px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 flex items-center gap-1'
                                                >
                                                    <CheckCircle2 size={14} />
                                                    Resolve
                                                </button>
                                            )}
                                            {alert.status === 'open' && !alert.assignee && (
                                                <button
                                                    onClick={() => handleAssign(alert.id, 'Me')}
                                                    className='px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700'
                                                >
                                                    Assign to Me
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDismiss(alert.id)}
                                                className='px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-1'
                                            >
                                                <XCircle size={14} />
                                                Dismiss
                                            </button>
                                            <button className='px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-1'>
                                                <Eye size={14} />
                                                View Details
                                            </button>
                                            <button className='p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'>
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default AlertsPage;