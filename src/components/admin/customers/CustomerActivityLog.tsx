import React from 'react';

type Log = {
    id: string;
    date: string;
    subject?: string;
    action?: string;
    type?: string;
};

interface CustomerActivityLogProps {
    logs: Log[];
}

const CustomerActivityLog: React.FC<CustomerActivityLogProps> = ({ logs }) => {
    return (
        <div className="space-y-4">
            {logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(log => (
                <div key={log.id} className="p-3 bg-gray-50 rounded-md border text-sm">
                    <div className="flex justify-between items-center">
                        <p className="font-medium">{log.subject || log.action}</p>
                        <p className="text-xs text-gray-500">{new Date(log.date).toLocaleString()}</p>
                    </div>
                    {log.type && <p className="text-xs text-gray-500">Type: {log.type}</p>}
                </div>
            ))}
        </div>
    );
};

export default CustomerActivityLog;
