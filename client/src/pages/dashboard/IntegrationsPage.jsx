import { useState } from 'react';
import {
    Key,
    Code,
    Zap,
    Shield,
    Copy,
    Eye,
    EyeOff,
    Trash2,
    Plus,
    Check,
    Download,
    ExternalLink,
    Settings,
    Palette,
    Award,
    Link2,
    FileText,
    Activity,
    RefreshCw,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';

const IntegrationsPage = () => {
    const [selectedTab, setSelectedTab] = useState('api-keys');
    const [showKey, setShowKey] = useState({});
    const [copiedKey, setCopiedKey] = useState(null);
    const [showNewKeyModal, setShowNewKeyModal] = useState(false);

    // Widget preview state
    const [widgetConfig, setWidgetConfig] = useState({
        position: 'bottom-right',
        primaryColor: '#3B82F6',
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937',
        borderRadius: '12',
        showEmojis: true,
        autoTrigger: true,
        triggerDelay: 3000
    });

    const tabs = [
        { id: 'api-keys', name: 'API Keys', icon: Key },
        { id: 'sdk', name: 'PulseTrack SDK', icon: Code },
        { id: 'widget', name: 'Widget Styling', icon: Zap },
        { id: 'rewards', name: 'Rewards Config', icon: Award },
        { id: 'consent', name: 'Consent Management', icon: Shield },
        { id: 'reconciliation', name: 'Reconciliation', icon: Link2 },
        { id: 'documentation', name: 'Documentation', icon: FileText }
    ];

    // Mock API Keys
    const [apiKeys, setApiKeys] = useState([
        {
            id: 1,
            name: 'Production Key',
            key: 'pk_live_1234567890abcdefghijklmnopqrstuvwxyz',
            environment: 'production',
            created: new Date('2024-12-01'),
            lastUsed: new Date(),
            requests: 45678,
            status: 'active'
        },
        {
            id: 2,
            name: 'Development Key',
            key: 'pk_test_abcdefghijklmnopqrstuvwxyz1234567890',
            environment: 'test',
            created: new Date('2024-11-15'),
            lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000),
            requests: 12345,
            status: 'active'
        },
        {
            id: 3,
            name: 'Staging Key',
            key: 'pk_stage_xyz123abc456def789ghi012jkl345mno',
            environment: 'staging',
            created: new Date('2024-11-01'),
            lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000),
            requests: 5432,
            status: 'active'
        }
    ]);

    const copyToClipboard = (text, keyId) => {
        navigator.clipboard.writeText(text);
        setCopiedKey(keyId);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    const toggleKeyVisibility = (keyId) => {
        setShowKey(prev => ({ ...prev, [keyId]: !prev[keyId] }));
    };

    const maskKey = (key) => {
        return key.substring(0, 12) + '••••••••••••••••' + key.substring(key.length - 4);
    };

    const getEnvironmentBadge = (env) => {
        const badges = {
            production: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            test: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
            staging: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
        };
        return badges[env] || badges.test;
    };

    const sdkExamples = {
        javascript: `import PulseTracker from '@pulsetracker/sdk';

// Initialize the SDK
PulseTracker.init({
  apiKey: 'your_api_key_here',
  environment: 'production',
  autoCapture: true
});

// Track custom event
PulseTracker.trackEvent('button_click', {
  buttonId: 'checkout',
  context: 'payment_flow'
});

// Collect feedback
PulseTracker.showFeedback({
  type: 'emoji',
  trigger: 'transaction_complete'
});`,
        react: `import { PulseTrackerProvider, usePulseTracker } from '@pulsetracker/react';

function App() {
  return (
    <PulseTrackerProvider apiKey="your_api_key_here">
      <YourApp />
    </PulseTrackerProvider>
  );
}

function PaymentComponent() {
  const { trackEvent, showFeedback } = usePulseTracker();
  
  const handlePayment = () => {
    trackEvent('payment_initiated');
    // Your payment logic
    showFeedback({ type: 'emoji' });
  };
  
  return <button onClick={handlePayment}>Pay Now</button>;
}`,
        python: `from pulsetracker import PulseTracker

# Initialize
tracker = PulseTracker(api_key='your_api_key_here')

# Submit feedback
tracker.submit_feedback(
    customer_id='CUST_123',
    rating=5,
    sentiment='positive',
    comment='Great experience!',
    metadata={'product': 'mobile_app'}
)

# Get analytics
analytics = tracker.get_analytics(
    start_date='2024-12-01',
    end_date='2024-12-16',
    metrics=['csat', 'nps', 'ces']
)`
    };

    const consentTemplates = [
        {
            id: 1,
            name: 'GDPR Compliant',
            description: 'EU General Data Protection Regulation',
            content: 'We collect your feedback to improve our services. Your data will be processed according to GDPR.',
            enabled: true,
            region: 'EU'
        },
        {
            id: 2,
            name: 'CCPA Compliant',
            description: 'California Consumer Privacy Act',
            content: 'California residents have the right to know what personal information is collected.',
            enabled: true,
            region: 'US-CA'
        },
        {
            id: 3,
            name: 'General Consent',
            description: 'Standard consent form',
            content: 'By providing feedback, you consent to us using your information to improve our services.',
            enabled: true,
            region: 'Global'
        }
    ];

    return (
        <div className='p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen'>
            {/* Header */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Integrations</h1>
                    <p className='text-gray-600 dark:text-gray-400 mt-1'>Manage API keys, SDK, and widget configurations</p>
                </div>
                <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2'>
                    <ExternalLink size={16} />
                    View Documentation
                </button>
            </div>

            {/* Tabs */}
            <div className='border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-lg px-4'>
                <div className='flex gap-2 overflow-x-auto'>
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`px-4 py-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
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
                        <button
                            onClick={() => setShowNewKeyModal(true)}
                            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2'
                        >
                            <Plus size={16} />
                            Generate New Key
                        </button>
                    </div>

                    {/* API Keys List */}
                    <div className='space-y-3'>
                        {apiKeys.map((apiKey) => (
                            <div key={apiKey.id} className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
                                <div className='flex items-start justify-between mb-4'>
                                    <div className='flex-1'>
                                        <div className='flex items-center gap-3 mb-2'>
                                            <h3 className='font-semibold text-gray-900 dark:text-white'>{apiKey.name}</h3>
                                            <span className={`px-2 py-0.5 text-xs rounded-full ${getEnvironmentBadge(apiKey.environment)}`}>
                                                {apiKey.environment}
                                            </span>
                                            <span className='px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'>
                                                {apiKey.status}
                                            </span>
                                        </div>
                                        <div className='flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400'>
                                            <span>Created: {apiKey.created.toLocaleDateString()}</span>
                                            <span>Last used: {apiKey.lastUsed.toLocaleTimeString()}</span>
                                            <span>{apiKey.requests.toLocaleString()} requests</span>
                                        </div>
                                    </div>
                                    <button className='text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1'>
                                        <Trash2 size={14} />
                                        Revoke
                                    </button>
                                </div>

                                {/* Key Display */}
                                <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4'>
                                    <div className='flex items-center justify-between gap-4'>
                                        <code className='flex-1 font-mono text-sm text-gray-900 dark:text-gray-100 overflow-x-auto'>
                                            {showKey[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                                        </code>
                                        <div className='flex gap-2'>
                                            <button
                                                onClick={() => toggleKeyVisibility(apiKey.id)}
                                                className='p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded'
                                            >
                                                {showKey[apiKey.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                            <button
                                                onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                                                className='p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded'
                                            >
                                                {copiedKey === apiKey.id ? <Check size={16} className='text-green-600' /> : <Copy size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Usage Stats */}
                                <div className='mt-4 grid grid-cols-3 gap-4'>
                                    <div className='text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
                                        <p className='text-2xl font-bold text-blue-600 dark:text-blue-400'>{(apiKey.requests / 1000).toFixed(1)}K</p>
                                        <p className='text-xs text-gray-600 dark:text-gray-400 mt-1'>Total Requests</p>
                                    </div>
                                    <div className='text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg'>
                                        <p className='text-2xl font-bold text-green-600 dark:text-green-400'>99.8%</p>
                                        <p className='text-xs text-gray-600 dark:text-gray-400 mt-1'>Success Rate</p>
                                    </div>
                                    <div className='text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg'>
                                        <p className='text-2xl font-bold text-purple-600 dark:text-purple-400'>124ms</p>
                                        <p className='text-xs text-gray-600 dark:text-gray-400 mt-1'>Avg Latency</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SDK Tab */}
            {selectedTab === 'sdk' && (
                <div className='space-y-6'>
                    {/* Quick Start */}
                    <div className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Installation</h3>
                        <div className='space-y-4'>
                            <div>
                                <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>NPM</p>
                                <div className='bg-gray-900 rounded-lg p-4 flex items-center justify-between'>
                                    <code className='text-green-400 text-sm'>npm install @pulsetracker/sdk</code>
                                    <button onClick={() => copyToClipboard('npm install @pulsetracker/sdk')} className='text-gray-400 hover:text-white'>
                                        <Copy size={16} />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>Yarn</p>
                                <div className='bg-gray-900 rounded-lg p-4 flex items-center justify-between'>
                                    <code className='text-green-400 text-sm'>yarn add @pulsetracker/sdk</code>
                                    <button onClick={() => copyToClipboard('yarn add @pulsetracker/sdk')} className='text-gray-400 hover:text-white'>
                                        <Copy size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Code Examples */}
                    {Object.entries(sdkExamples).map(([lang, code]) => (
                        <div key={lang} className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
                            <div className='flex items-center justify-between mb-4'>
                                <h3 className='text-lg font-semibold text-gray-900 dark:text-white capitalize'>{lang} Example</h3>
                                <button onClick={() => copyToClipboard(code)} className='text-blue-600 hover:text-blue-700 flex items-center gap-1'>
                                    <Copy size={14} />
                                    Copy Code
                                </button>
                            </div>
                            <div className='bg-gray-900 rounded-lg p-4 overflow-x-auto'>
                                <pre className='text-green-400 text-sm'>{code}</pre>
                            </div>
                        </div>
                    ))}

                    {/* SDK Features */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        {[
                            { icon: Zap, title: 'Auto-Capture', desc: 'Automatically capture user interactions' },
                            { icon: Shield, title: 'Privacy-First', desc: 'GDPR and CCPA compliant by default' },
                            { icon: Activity, title: 'Real-Time', desc: 'Instant feedback delivery' }
                        ].map((feature, idx) => (
                            <div key={idx} className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 text-center'>
                                <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3'>
                                    <feature.icon className='text-blue-600 dark:text-blue-400' size={24} />
                                </div>
                                <h4 className='font-semibold text-gray-900 dark:text-white mb-2'>{feature.title}</h4>
                                <p className='text-sm text-gray-600 dark:text-gray-400'>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Widget Styling Tab */}
            {selectedTab === 'widget' && (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    {/* Configuration */}
                    <div className='space-y-6'>
                        <div className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
                            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Widget Configuration</h3>
                            <div className='space-y-4'>
                                {/* Position */}
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>Position</label>
                                    <select
                                        value={widgetConfig.position}
                                        onChange={(e) => setWidgetConfig({...widgetConfig, position: e.target.value})}
                                        className='w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg'
                                    >
                                        <option value='bottom-right'>Bottom Right</option>
                                        <option value='bottom-left'>Bottom Left</option>
                                        <option value='top-right'>Top Right</option>
                                        <option value='top-left'>Top Left</option>
                                    </select>
                                </div>

                                {/* Colors */}
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>Primary Color</label>
                                    <input
                                        type='color'
                                        value={widgetConfig.primaryColor}
                                        onChange={(e) => setWidgetConfig({...widgetConfig, primaryColor: e.target.value})}
                                        className='w-full h-10 rounded-lg cursor-pointer'
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>Background Color</label>
                                    <input
                                        type='color'
                                        value={widgetConfig.backgroundColor}
                                        onChange={(e) => setWidgetConfig({...widgetConfig, backgroundColor: e.target.value})}
                                        className='w-full h-10 rounded-lg cursor-pointer'
                                    />
                                </div>

                                {/* Border Radius */}
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                                        Border Radius: {widgetConfig.borderRadius}px
                                    </label>
                                    <input
                                        type='range'
                                        min='0'
                                        max='24'
                                        value={widgetConfig.borderRadius}
                                        onChange={(e) => setWidgetConfig({...widgetConfig, borderRadius: e.target.value})}
                                        className='w-full'
                                    />
                                </div>

                                {/* Toggles */}
                                <div className='space-y-3'>
                                    <label className='flex items-center justify-between'>
                                        <span className='text-sm text-gray-700 dark:text-gray-300'>Show Emojis</span>
                                        <input
                                            type='checkbox'
                                            checked={widgetConfig.showEmojis}
                                            onChange={(e) => setWidgetConfig({...widgetConfig, showEmojis: e.target.checked})}
                                            className='w-4 h-4'
                                        />
                                    </label>
                                    <label className='flex items-center justify-between'>
                                        <span className='text-sm text-gray-700 dark:text-gray-300'>Auto Trigger</span>
                                        <input
                                            type='checkbox'
                                            checked={widgetConfig.autoTrigger}
                                            onChange={(e) => setWidgetConfig({...widgetConfig, autoTrigger: e.target.checked})}
                                            className='w-4 h-4'
                                        />
                                    </label>
                                </div>

                                <button className='w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
                                    Save Configuration
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Live Preview */}
                    <div className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Live Preview</h3>
                        <div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-8 min-h-[400px] relative'>
                            <p className='text-center text-gray-500 dark:text-gray-400 mb-4'>Your widget will appear here</p>

                            {/* Widget Preview */}
                            <div
                                className='absolute shadow-lg'
                                style={{
                                    [widgetConfig.position.includes('bottom') ? 'bottom' : 'top']: '20px',
                                    [widgetConfig.position.includes('right') ? 'right' : 'left']: '20px',
                                    backgroundColor: widgetConfig.backgroundColor,
                                    borderRadius: `${widgetConfig.borderRadius}px`,
                                    padding: '16px',
                                    minWidth: '200px'
                                }}
                            >
                                <p className='text-sm mb-3' style={{ color: widgetConfig.textColor }}>How was your experience?</p>
                                {widgetConfig.showEmojis && (
                                    <div className='flex justify-around text-2xl'>
                                        <span>😊</span>
                                        <span>😐</span>
                                        <span>😣</span>
                                    </div>
                                )}
                                <button
                                    className='w-full mt-3 py-2 rounded text-white text-sm'
                                    style={{ backgroundColor: widgetConfig.primaryColor }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Consent Management Tab */}
            {selectedTab === 'consent' && (
                <div className='space-y-6'>
                    <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3'>
                        <AlertCircle className='text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5' size={20} />
                        <div>
                            <p className='text-sm text-blue-900 dark:text-blue-100 font-medium'>Privacy Compliance</p>
                            <p className='text-sm text-blue-800 dark:text-blue-200 mt-1'>
                                Ensure your consent templates comply with GDPR, CCPA, and other privacy regulations.
                            </p>
                        </div>
                    </div>

                    {consentTemplates.map((template) => (
                        <div key={template.id} className='bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6'>
                            <div className='flex items-start justify-between mb-4'>
                                <div className='flex-1'>
                                    <div className='flex items-center gap-3 mb-2'>
                                        <h3 className='font-semibold text-gray-900 dark:text-white'>{template.name}</h3>
                                        <span className='px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'>
                                            {template.region}
                                        </span>
                                        {template.enabled && (
                                            <CheckCircle2 className='text-green-500' size={16} />
                                        )}
                                    </div>
                                    <p className='text-sm text-gray-600 dark:text-gray-400'>{template.description}</p>
                                </div>
                                <label className='flex items-center gap-2'>
                                    <input type='checkbox' checked={template.enabled} className='w-4 h-4' />
                                    <span className='text-sm text-gray-600 dark:text-gray-400'>Enabled</span>
                                </label>
                            </div>
                            <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4'>
                                <p className='text-sm text-gray-700 dark:text-gray-300'>{template.content}</p>
                            </div>
                            <div className='mt-4 flex gap-2'>
                                <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm'>
                                    Edit Template
                                </button>
                                <button className='px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-sm'>
                                    View Audit Log
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default IntegrationsPage;