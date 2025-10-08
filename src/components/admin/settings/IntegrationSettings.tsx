import React, { useState } from 'react';

const initialIntegrations = [
    { name: 'Stripe', category: 'Payment Gateway', enabled: true },
    { name: 'Google Maps', category: 'Mapping Service', enabled: true },
    { name: 'Twilio', category: 'SMS/Communications', enabled: false },
];

const IntegrationSettings: React.FC = () => {
    const [integrations, setIntegrations] = useState(initialIntegrations);

    const handleToggle = (name: string) => {
        setIntegrations(prev => prev.map(int => int.name === name ? {...int, enabled: !int.enabled} : int));
    };

    return (
        <div className="space-y-6">
            {integrations.map(int => (
                <div key={int.name} className="p-6 border rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="font-semibold text-lg">{int.name}</h3>
                            <p className="text-sm text-gray-500">{int.category}</p>
                        </div>
                        <button onClick={() => handleToggle(int.name)} role="switch" aria-checked={int.enabled} className={`${int.enabled ? 'bg-taiba-blue' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}>
                            <span className={`${int.enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`} />
                        </button>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">API Key</label>
                        <input type="password" defaultValue="••••••••••••••••" className="w-full p-2 border rounded-md" />
                    </div>
                </div>
            ))}
             <div className="text-right mt-6">
                <button onClick={() => alert('Integrations saved!')} className="px-6 py-2 bg-taiba-blue text-white rounded-md font-semibold">Save Integrations</button>
            </div>
        </div>
    );
};

export default IntegrationSettings;
