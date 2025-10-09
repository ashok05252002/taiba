import React from 'react';

type LogEntry = {
    id: string;
    date: string;
    action: string;
    details: string;
};

interface PartnerActivityLogProps {
    logs: LogEntry[];
}

const PartnerActivityLog: React.FC<PartnerActivityLogProps> = ({ logs }) => {
    return (
        <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold mb-4">Activity Log</h4>
            <div className="space-y-4">
                {logs.map(log => (
                    <div key={log.id} className="relative pl-6">
                        <div className="absolute left-0 top-1.5 w-2 h-2 bg-gray-300 rounded-full"></div>
                        <div className="absolute left-[3px] top-4 h-full w-0.5 bg-gray-200"></div>
                        <p className="text-xs text-gray-500">{new Date(log.date).toLocaleString()}</p>
                        <p className="text-sm font-medium">{log.action}: <span className="font-normal text-gray-600">{log.details}</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartnerActivityLog;
