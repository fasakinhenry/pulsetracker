import { useState, useEffect } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Activity,
    Filter,
    Download,
    Calendar,
    RefreshCw,
    ChevronDown,
    AlertCircle,
    Users,
    MessageSquare,
    Smile,
    Meh,
    Frown,
    Map,
    Clock,
    ArrowUpRight
} from 'lucide-react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const DashboardPage = () => {
    const [selectedTab, setSelectedTab] = useState('overview');
    const [dateRange, setDateRange] = useState('7d');
    const [isLoading, setIsLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const tabs = [
        { id: 'overview', name: 'Overview' },
        { id: 'social', name: 'Social Media Snapshot' },
        { id: 'quality', name: 'Data Quality Summary' },
        { id: 'timeline', name: 'Interactions Timeline' },
        { id: 'predictive', name: 'Predictive Alerts' }
    ];

    const dateRanges = [
        { value: '24h', label: 'Last 24 hours' },
        { value: '7d', label: 'Last 7 days' },
        { value: '30d', label: 'Last 30 days' },
        { value: '90d', label: 'Last 90 days' }
    ];

    // Real-time KPI data
    const kpiData = [
        {
            label: 'CSAT',
            value: '4.2',
            change: '+0.3',
            trend: 'up',
            total: '2,847 responses',
            icon: Smile,
            color: 'blue',
            target: 4.5
        },
        {
            label: 'NPS',
            value: '45',
            change: '+5',
            trend: 'up',
            total: '1,234 promoters',
            icon: TrendingUp,
            color: 'green',
            target: 50
        },
        {
            label: 'CES',
            value: '3.8',
            change: '-0.2',
            trend: 'down',
            total: '892 surveys',
            icon: Meh,
            color: 'orange',
            target: 4.0
        },
        {
            label: 'Total Feedback',
            value: '5,234',
            change: '+12%',
            trend: 'up',
            total: 'This period',
            icon: MessageSquare,
            color: 'purple',
            target: 6000
        }
    ];

    // Sentiment trend data
    const sentimentData = [
        { date: 'Mon', positive: 450, neutral: 200, negative: 150 },
        { date: 'Tue', positive: 520, neutral: 180, negative: 120 },
        { date: 'Wed', positive: 480, neutral: 220, negative: 180 },
        { date: 'Thu', positive: 600, neutral: 150, negative: 100 },
        { date: 'Fri', positive: 550, neutral: 190, negative: 140 },
        { date: 'Sat', positive: 420, neutral: 210, negative: 160 },
        { date: 'Sun', positive: 380, neutral: 240, negative: 190 }
    ];

    // CX Metrics over time
    const metricsOverTime = [
        { date: 'Week 1', csat: 4.0, nps: 40, ces: 3.9 },
        { date: 'Week 2', csat: 4.1, nps: 42, ces: 3.8 },
        { date: 'Week 3', csat: 4.0, nps: 43, ces: 3.7 },
        { date: 'Week 4', csat: 4.2, nps: 45, ces: 3.8 }
    ];

    // Friction points data (heatmap simulation)
    const frictionPoints = [
        { touchpoint: 'Login', issues: 234, severity: 'high', trend: 'up' },
        { touchpoint: 'Payment', issues: 456, severity: 'critical', trend: 'up' },
        { touchpoint: 'Account Setup', issues: 123, severity: 'medium', trend: 'down' },
        { touchpoint: 'Transfer', issues: 89, severity: 'low', trend: 'stable' },
        { touchpoint: 'Customer Support', issues: 267, severity: 'high', trend: 'down' }
    ];

    // Channel distribution
    const channelData = [
        { name: 'Mobile App', value: 2400, color: '#3B82F6' },
        { name: 'Website', value: 1800, color: '#10B981' },
        { name: 'Call Center', value: 800, color: '#F59E0B' },
        { name: 'Social Media', value: 234, color: '#8B5CF6' }
    ];

    // Emotion breakdown
    const emotionData = [
        { emotion: 'Happy', count: 1200, percentage: 45 },
        { emotion: 'Satisfied', count: 800, percentage: 30 },
        { emotion: 'Frustrated', count: 400, percentage: 15 },
        { emotion: 'Angry', count: 267, percentage: 10 }
    ];

    // Social media data
    const socialData = {
        totalMentions: 1847,
        sentimentScore: 72,
        trending: [
            { topic: '#CustomerService', mentions: 456, sentiment: 'positive' },
            { topic: '#PaymentIssue', mentions: 234, sentiment: 'negative' },
            { topic: '#NewFeature', mentions: 189, sentiment: 'positive' }
        ],
        topPosts: [
            { platform: 'Twitter', content: 'Amazing customer service!...', engagement: 1234, sentiment: 'positive' },
            { platform: 'Facebook', content: 'Having issues with payment...', engagement: 567, sentiment: 'negative' }
        ]
    };

    // Data quality metrics
    const dataQuality = {
        completeness: 94,
        accuracy: 97,
        consistency: 91,
        issues: [
            { type: 'Missing customer IDs', count: 34, severity: 'medium' },
            { type: 'Duplicate entries', count: 12, severity: 'low' },
            { type: 'Invalid timestamps', count: 8, severity: 'high' }
        ]
    };

    const handleRefresh = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setLastUpdated(new Date());
        }, 1000);
    };

    const handleExport = () => {
        // Implement export functionality
        console.log('Exporting dashboard data...');
    };

    const getSeverityColor = (severity) => {
        const colors = {
            critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
            high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
            medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
            low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
        };
        return colors[severity] || colors.medium;
    };

    return (
        <div className='p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen'>
            {/* Header */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Dashboard</h1>
                    <p className='text-gray-600 dark:text-gray-400 mt-1'>
                        Real-time customer experience insights
                        <span className='text-xs ml-2 text-gray-500'>
                            Last updated: {lastUpdated.toLocaleTimeString()}
                        </span>
                    </p>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='relative'>
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className='appearance-none px-4 py-2 pr-10 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            {dateRanges.map(range => (
                                <option key={range.value} value={range.value}>{range.label}</option>
                            ))}
                        </select>
                        <Calendar className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500' size={16} />
                    </div>
                    <button
                        onClick={handleRefresh}
                        disabled={isLoading}
                        className='px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 disabled:opacity-50'
                    >
                        <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                        <span className='hidden sm:inline'>Refresh</span>
                    </button>
                    <button
                        onClick={handleExport}
                        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2'
                    >
                        <Download size={16} />
                        <span className='hidden sm:inline'>Export</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className='border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-lg px-4'>
                <div className='flex gap-2 overflow-x-auto'>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id)}
                            className={`px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
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
                        {kpiData.map((kpi) => {
                            const Icon = kpi.icon;
                            const percentage = ((parseFloat(kpi.value) / kpi.target) * 100).toFixed(0);
                            return (
                                <div key={kpi.label} className='bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow'>
                                    <div className='flex items-start justify-between mb-4'>
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${kpi.color}-100 dark:bg-${kpi.color}-900/30`}>
                                            <Icon className={`text-${kpi.color}-600 dark:text-${kpi.color}-400`} size={20} />
                                        </div>
                                        {kpi.trend === 'up' ? (
                                            <TrendingUp className='text-green-500' size={20} />
                                        ) : (
                                            <TrendingDown className='text-red-500' size={20} />
                                        )}
                                    </div>
                                    <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>{kpi.label}</p>
                                    <div className='flex items-end justify-between mb-2'>
                                        <h3 className='text-3xl font-bold text-gray-900 dark:text-white'>{kpi.value}</h3>
                                        <span className={`text-sm font-medium ${
                                            kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                                        }`}>
                                            {kpi.change}
                                        </span>
                                    </div>
                                    <p className='text-xs text-gray-500 dark:text-gray-500 mb-2'>{kpi.total}</p>
                                    {/* Progress bar */}
                                    <div className='w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5'>
                                        <div
                                            className={`bg-${kpi.color}-600 h-1.5 rounded-full transition-all`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <p className='text-xs text-gray-500 dark:text-gray-500 mt-1'>
                                        Target: {kpi.target}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Charts Row 1 */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        {/* Sentiment Trend Chart */}
                        <div className='bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800'>
                            <div className='flex items-center justify-between mb-4'>
                                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Sentiment Trends</h3>
                                <button className='text-gray-400 hover:text-gray-600'>
                                    <Filter size={16} />
                                </button>
                            </div>
                            <ResponsiveContainer width='100%' height={300}>
                                <AreaChart data={sentimentData}>
                                    <CartesianGrid strokeDasharray='3 3' stroke='#374151' opacity={0.1} />
                                    <XAxis dataKey='date' stroke='#9CA3AF' fontSize={12} />
                                    <YAxis stroke='#9CA3AF' fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1F2937',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff'
                                        }}
                                    />
                                    <Legend />
                                    <Area type='monotone' dataKey='positive' stackId='1' stroke='#10B981' fill='#10B981' fillOpacity={0.6} />
                                    <Area type='monotone' dataKey='neutral' stackId='1' stroke='#F59E0B' fill='#F59E0B' fillOpacity={0.6} />
                                    <Area type='monotone' dataKey='negative' stackId='1' stroke='#EF4444' fill='#EF4444' fillOpacity={0.6} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* CX Metrics Over Time */}
                        <div className='bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800'>
                            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>CX Metrics Over Time</h3>
                            <ResponsiveContainer width='100%' height={300}>
                                <LineChart data={metricsOverTime}>
                                    <CartesianGrid strokeDasharray='3 3' stroke='#374151' opacity={0.1} />
                                    <XAxis dataKey='date' stroke='#9CA3AF' fontSize={12} />
                                    <YAxis stroke='#9CA3AF' fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1F2937',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff'
                                        }}
                                    />
                                    <Legend />
                                    <Line type='monotone' dataKey='csat' stroke='#3B82F6' strokeWidth={2} dot={{ r: 4 }} />
                                    <Line type='monotone' dataKey='nps' stroke='#10B981' strokeWidth={2} dot={{ r: 4 }} />
                                    <Line type='monotone' dataKey='ces' stroke='#F59E0B' strokeWidth={2} dot={{ r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Charts Row 2 */}
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                        {/* Channel Distribution */}
                        <div className='bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800'>
                            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Feedback by Channel</h3>
                            <ResponsiveContainer width='100%' height={250}>
                                <PieChart>
                                    <Pie
                                        data={channelData}
                                        cx='50%'
                                        cy='50%'
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill='#8884d8'
                                        dataKey='value'
                                    >
                                        {channelData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Emotion Breakdown */}
                        <div className='bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800'>
                            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Emotion Analysis</h3>
                            <div className='space-y-4'>
                                {emotionData.map((emotion) => (
                                    <div key={emotion.emotion}>
                                        <div className='flex items-center justify-between mb-1'>
                                            <span className='text-sm text-gray-600 dark:text-gray-400'>{emotion.emotion}</span>
                                            <span className='text-sm font-medium text-gray-900 dark:text-white'>{emotion.count}</span>
                                        </div>
                                        <div className='w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2'>
                                            <div
                                                className='bg-blue-600 h-2 rounded-full transition-all'
                                                style={{ width: `${emotion.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Friction Heatmap */}
                        <div className='bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800'>
                            <div className='flex items-center justify-between mb-4'>
                                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Friction Points</h3>
                                <Map size={20} className='text-gray-400' />
                            </div>
                            <div className='space-y-3'>
                                {frictionPoints.map((point) => (
                                    <div key={point.touchpoint} className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                                        <div className='flex-1'>
                                            <p className='text-sm font-medium text-gray-900 dark:text-white'>{point.touchpoint}</p>
                                            <p className='text-xs text-gray-500 dark:text-gray-400'>{point.issues} issues</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(point.severity)}`}>
                                            {point.severity}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Social Media Snapshot Tab */}
            {selectedTab === 'social' && (
                <div className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div className='bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800'>
                            <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>Total Mentions</p>
                            <h3 className='text-3xl font-bold text-gray-900 dark:text-white'>{socialData.totalMentions.toLocaleString()}</h3>
                            <p className='text-xs text-green-600 mt-2 flex items-center gap-1'>
                                <TrendingUp size={12} /> +15% vs last period
                            </p>
                        </div>
                        <div className='bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800'>
                            <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>Sentiment Score</p>
                            <h3 className='text-3xl font-bold text-gray-900 dark:text-white'>{socialData.sentimentScore}%</h3>
                            <div className='w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mt-3'>
                                <div className='bg-green-600 h-2 rounded-full' style={{ width: `${socialData.sentimentScore}%` }} />
                            </div>
                        </div>
                        <div className='bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800'>
                            <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>Response Rate</p>
                            <h3 className='text-3xl font-bold text-gray-900 dark:text-white'>87%</h3>
                            <p className='text-xs text-gray-500 mt-2'>Avg response time: 2.4h</p>
                        </div>
                    </div>

                    <div className='bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800'>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Trending Topics</h3>
                        <div className='space-y-3'>
                            {socialData.trending.map((topic, idx) => (
                                <div key={idx} className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                                    <div>
                                        <p className='font-medium text-gray-900 dark:text-white'>{topic.topic}</p>
                                        <p className='text-sm text-gray-500'>{topic.mentions} mentions</p>
                                    </div>
                                    <span className={`px-3 py-1 text-xs rounded-full ${
                                        topic.sentiment === 'positive'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                    }`}>
                                        {topic.sentiment}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Data Quality Summary Tab */}
            {selectedTab === 'quality' && (
                <div className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        {[
                            { label: 'Completeness', value: dataQuality.completeness, color: 'blue' },
                            { label: 'Accuracy', value: dataQuality.accuracy, color: 'green' },
                            { label: 'Consistency', value: dataQuality.consistency, color: 'purple' }
                        ].map((metric) => (
                            <div key={metric.label} className='bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800'>
                                <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>{metric.label}</p>
                                <h3 className='text-3xl font-bold text-gray-900 dark:text-white'>{metric.value}%</h3>
                                <div className='w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mt-3'>
                                    <div className={`bg-${metric.color}-600 h-2 rounded-full`} style={{ width: `${metric.value}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800'>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Data Quality Issues</h3>
                        <div className='space-y-3'>
                            {dataQuality.issues.map((issue, idx) => (
                                <div key={idx} className='flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg'>
                                    <div className='flex items-center gap-3'>
                                        <AlertCircle className={
                                            issue.severity === 'high' ? 'text-red-500' :
                                                issue.severity === 'medium' ? 'text-orange-500' :
                                                    'text-yellow-500'
                                        } size={20} />
                                        <div>
                                            <p className='font-medium text-gray-900 dark:text-white'>{issue.type}</p>
                                            <p className='text-sm text-gray-500'>{issue.count} occurrences</p>
                                        </div>
                                    </div>
                                    <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm'>
                                        Resolve
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;