import React from 'react';
import { motion } from 'framer-motion';

type LogEntry = {
    id: string;
    date: string;
    action: string;
    module: string;
    details: string;
};

interface SubAdminActivityLogProps {
    activityLog: LogEntry[];
}

const SubAdminActivityLog: React.FC<SubAdminActivityLogProps> = ({ activityLog }) => {
    const getActionColor = (action: string) => {
        if (action.includes('Created')) return 'bg-blue-100 text-blue-800';
        if (action.includes('Updated')) return 'bg-yellow-100 text-yellow-800';
        if (action.includes('Deleted')) return 'bg-red-100 text-red-800';
        return 'bg-gray-100 text-gray-800';
    };
    
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Module</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {activityLog.map(log => (
                        <motion.tr 
                            key={log.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(log.date).toLocaleString()}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getActionColor(log.action)}`}>
                                    {log.action}
                                </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{log.module}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{log.details}</td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SubAdminActivityLog;
