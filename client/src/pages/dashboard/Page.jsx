import { useState } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Users,
    MessageSquare,
    AlertTriangle,
    Activity,
    Filter,
    Download,
    Calendar,
    Search,
    Eye,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Clock,
    Key,
    Code,
    Zap,
    Settings as SettingsIcon,
    FileText,
    Shield,
    Link2,
    BarChart3,
    Share2,
    Brain,
    Database,
    Upload,
    Map,
    UserX
} from 'lucide-react';

// ============= DASHBOARD PAGE =============
export const DashboardPage = () => {
    const [selectedTab, setSelectedTab] = useState('overview');

    const tabs = [
        { id: 'overview', name: 'Overview' },
        { id: 'social', name: 'Social Media Snapshot' },
        { id: 'quality', name: 'Data Quality Summary' },
    ];

    // Mock data
    const kpiData = [
        { label: 'CSAT', value: '4.2', change: '+0.3', trend: 'up', color: 'blue' },
        { label: 'NPS', value: '45', change: '+5', trend: 'up', color: 'green' },
        { label: 'CES', value: '3.8', change: '-0.2', trend: 'down', color: 'orange' },
        { label: 'Total Feedback', value: '1,234', change: '+12%', trend: 'up', color: 'purple' },
    ];

    return (
        <div className='p-6 space-y-6'>
            {/* Header */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Dashboard</h1>
                    <p className='text-gray-600 dark:text-gray-400 mt-1'>Real-time customer experience insights</p>
                </div>
                <div className='flex items-center gap-2'>
                    <button className='px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2'>
                        <Calendar size={16} />
                        Last 7 days
                    </button>
                    <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2'>
                        <Download size={16} />
                        Export
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className='border-b border-gray-200 dark:border-gray-800'>
                <div className='flex gap-4'>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id)}
                            className={`px-4 py-2 border-b-2 transition-colors ${
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

            {/* Overview Tab Content */}
            {selectedTab === 'overview' && (
                <>
                    {/* KPI Cards */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {kpiData.map((kpi) => (
                            <div key={kpi.label} className='bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800'>
                                <div className='flex items-center justify-between mb-2'>
                                    <p className='text-sm text-gray-600 dark:text-gray-400'>{kpi.label}</p>
                                    {kpi.trend === 'up' ? (
                                        <TrendingUp className='text-green-500' size={16} />
                                    ) : (
                                        <TrendingDown className='text-red-500' size={16} />
                                    )}
                                </div>
                                <div className='flex items-end justify-between'>
                                    <h3 className='text-3xl font-bold text-gray-900 dark:text-white'>{kpi.value}</h3>
                                    <span className={`text-sm font-medium ${
                                        kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                                    }`}>
                    {kpi.change}
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Charts Row */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        {/* Sentiment Trend Chart */}
                        <div className='bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800'>
                            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Sentiment Trends</h3>
                            <div className='h-64 flex items-center justify-center text-gray-400'>
                                <Activity size={48} />
                                <span className='ml-2'>Chart visualization here</span>
                            </div>
                        </div>

                        {/* Friction Heatmap */}
                        <div className='bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800'>
                            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Friction Points</h3>
                            <div className='h-64 flex items-center justify-center text-gray-400'>
                                <Map size={48} />
                                <span className='ml-2'>Heatmap visualization here</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

// ============= CUSTOMERS PAGE =============
export const CustomersPage = () => {
    const [selectedTab, setSelectedTab] = useState('search');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = [
        { id: 'search', name: 'Search' },
        { id: 'profiles', name: 'Customer Profiles' },
        { id: 'actions', name: 'Action Log' },
    ];

    const customers = [
        { id: 'CUST-001', name: 'John Doe', email: 'john@example.com', lastFeedback: '2h ago', sentiment: 'positive', csat: 4.5 },
        { id: 'CUST-002', name: 'Jane Smith', email: 'jane@example.com', lastFeedback: '5h ago', sentiment: 'negative', csat: 2.0 },
        { id: 'CUST-003', name: 'Bob Johnson', email: 'bob@example.com', lastFeedback: '1d ago', sentiment: 'neutral', csat: 3.5 },
    ];

    return (
        <div className='p-6 space-y-6'>
            <div>
                <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Customers</h1>
                <p className='text-gray-600 dark:text-gray-400 mt-1'>View and manage customer feedback</p>
            </div>

            {/* Tabs */}
            <div className='border-b border-gray-200 dark:border-gray-800'>
                <div className='flex gap-4'>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id)}
                            className={`px-4 py-2 border-b-2 transition-colors ${
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
                    {/* Search Bar */}
                    <div className='flex gap-2'>
                        <div className='flex-1 relative'>
                            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                            <input
                                type='text'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='Search customers by name, email, or ID...'
                                className='w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100'
                            />
                        </div>
                        <button className='px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2'>
                            <Filter size={16} />
                            Filters
                        </button>
                    </div>

                    {/* Customer List */}
                    <div className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden'>
                        <table className='w-full'>
                            <thead className='bg-gray-50 dark:bg-gray-800'>
                            <tr>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase'>Customer</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase'>Last Feedback</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase'>Sentiment</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase'>CSAT</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase'>Actions</th>
                            </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200 dark:divide-gray-800'>
                            {customers.map((customer) => (
                                <tr key={customer.id} className='hover:bg-gray-50 dark:hover:bg-gray-800/50'>
                                    <td className='px-6 py-4'>
                                        <div>
                                            <p className='font-medium text-gray-900 dark:text-white'>{customer.name}</p>
                                            <p className='text-sm text-gray-500 dark:text-gray-400'>{customer.email}</p>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 text-sm text-gray-600 dark:text-gray-400'>{customer.lastFeedback}</td>
                                    <td className='px-6 py-4'>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                          customer.sentiment === 'positive' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                              customer.sentiment === 'negative' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                  'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {customer.sentiment}
                      </span>
                                    </td>
                                    <td className='px-6 py-4 text-sm text-gray-900 dark:text-white'>{customer.csat}</td>
                                    <td className='px-6 py-4'>
                                        <button className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'>
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

// ============= ALERTS PAGE =============
export const AlertsPage = () => {
    const [selectedTab, setSelectedTab] = useState('all');

    const tabs = [
        { id: 'all', name: 'All Alerts' },
        { id: 'feedback', name: 'Feedback Alerts' },
    ];

    const alerts = [
        { id: 1, type: 'critical', title: 'Low CSAT Score Detected', message: 'CSAT dropped below 3.0 for mobile app', time: '10m ago', status: 'open' },
        { id: 2, type: 'warning', title: 'High Volume Negative Feedback', message: 'Spike in negative feedback on payment flow', time: '1h ago', status: 'open' },
        { id: 3, type: 'info', title: 'NPS Survey Milestone', message: '1000 NPS responses collected', time: '3h ago', status: 'resolved' },
    ];

    return (
        <div className='p-6 space-y-6'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Alerts</h1>
                    <p className='text-gray-600 dark:text-gray-400 mt-1'>Monitor critical feedback and system alerts</p>
                </div>
                <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
                    Configure Alerts
                </button>
            </div>

            {/* Tabs */}
            <div className='border-b border-gray-200 dark:border-gray-800'>
                <div className='flex gap-4'>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id)}
                            className={`px-4 py-2 border-b-2 transition-colors ${
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

            {/* Alerts List */}
            <div className='space-y-3'>
                {alerts.map((alert) => (
                    <div key={alert.id} className='bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800'>
                        <div className='flex items-start justify-between'>
                            <div className='flex gap-4'>
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    alert.type === 'critical' ? 'bg-red-100 dark:bg-red-900/30' :
                                        alert.type === 'warning' ? 'bg-orange-100 dark:bg-orange-900/30' :
                                            'bg-blue-100 dark:bg-blue-900/30'
                                }`}>
                                    <AlertTriangle className={
                                        alert.type === 'critical' ? 'text-red-600 dark:text-red-400' :
                                            alert.type === 'warning' ? 'text-orange-600 dark:text-orange-400' :
                                                'text-blue-600 dark:text-blue-400'
                                    } size={20} />
                                </div>
                                <div>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-semibold text-gray-900 dark:text-white'>{alert.title}</h3>
                                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                                            alert.status === 'open'
                                                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                        }`}>
                      {alert.status}
                    </span>
                                    </div>
                                    <p className='text-gray-600 dark:text-gray-400 mt-1'>{alert.message}</p>
                                    <p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>{alert.time}</p>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <button className='px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700'>
                                    Resolve
                                </button>
                                <button className='p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'>
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ============= INTEGRATIONS PAGE =============
export const IntegrationsPage = () => {
    const [selectedTab, setSelectedTab] = useState('api-keys');

    const tabs = [
        { id: 'api-keys', name: 'API Keys', icon: Key },
        { id: 'sdk', name: 'PulseTrack SDK', icon: Code },
        { id: 'widget', name: 'Widget Styling', icon: Zap },
        { id: 'consent', name: 'Consent Management', icon: Shield },
    ];

    return (
        <div className='p-6 space-y-6'>
            <div>
                <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Integrations</h1>
                <p className='text-gray-600 dark:text-gray-400 mt-1'>Manage API keys, SDK, and widget configurations</p>
            </div>

            {/* Tabs */}
            <div className='border-b border-gray-200 dark:border-gray-800'>
                <div className='flex gap-4'>
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`px-4 py-2 border-b-2 transition-colors flex items-center gap-2 ${
                                    selectedTab === tab.id
                                        ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-medium'
                                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                            >
                                <Icon size={16} />
                                {tab.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* API Keys Tab */}
            {selectedTab === 'api-keys' && (
                <div className='space-y-4'>
                    <div className='flex justify-between items-center'>
                        <p className='text-gray-600 dark:text-gray-400'>Generate and manage API keys for SDK integration</p>
                        <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2'>
                            <Key size={16} />
                            Generate New Key
                        </button>
                    </div>

                    <div className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
                        <div className='flex items-center justify-between mb-4'>
                            <div>
                                <h3 className='font-semibold text-gray-900 dark:text-white'>Production Key</h3>
                                <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Created on Dec 1, 2025</p>
                            </div>
                            <button className='text-red-600 hover:text-red-700 text-sm font-medium'>Revoke</button>
                        </div>
                        <div className='bg-gray-50 dark:bg-gray-800 rounded p-3 font-mono text-sm'>
                            pk_live_••••••••••••••••1234
                        </div>
                    </div>
                </div>
            )}

            {/* SDK Tab */}
            {selectedTab === 'sdk' && (
                <div className='space-y-4'>
                    <div className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
                        <h3 className='font-semibold text-gray-900 dark:text-white mb-4'>Installation</h3>
                        <div className='bg-gray-900 rounded-lg p-4 overflow-x-auto'>
                            <code className='text-green-400 text-sm'>npm install @pulsetracker/sdk</code>
                        </div>
                    </div>

                    <div className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
                        <h3 className='font-semibold text-gray-900 dark:text-white mb-4'>Quick Start</h3>
                        <div className='bg-gray-900 rounded-lg p-4 overflow-x-auto'>
              <pre className='text-green-400 text-sm'>
{`import PulseTracker from '@pulsetracker/sdk';

PulseTracker.init({
  apiKey: 'your_api_key_here',
  environment: 'production'
});`}
              </pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Export placeholder pages for remaining sections
export const AnalyticsPage = () => <PagePlaceholder title='Analytics' icon={BarChart3} />;
export const SocialsPage = () => <PagePlaceholder title='Socials' icon={Share2} />;
export const AIContextPage = () => <PagePlaceholder title='AI Context' icon={Brain} />;
export const DataHubPage = () => <PagePlaceholder title='Data Hub' icon={Database} />;
export const DataRightsPage = () => <PagePlaceholder title='Data Rights' icon={UserX} />;
export const CompliancePage = () => <PagePlaceholder title='Compliance' icon={FileText} />;
export const SettingsPage = () => <PagePlaceholder title='Settings' icon={SettingsIcon} />;

// Reusable placeholder component
const PagePlaceholder = ({ title, icon: Icon }) => (
    <div className='p-6'>
        <div className='flex flex-col items-center justify-center h-[60vh] text-center'>
            <div className='w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4'>
                <Icon className='text-blue-600 dark:text-blue-400' size={32} />
            </div>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>{title}</h2>
            <p className='text-gray-600 dark:text-gray-400 max-w-md'>
                This page is under development. Check back soon for more features.
            </p>
        </div>
    </div>
);