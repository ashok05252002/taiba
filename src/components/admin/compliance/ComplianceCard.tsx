import React from 'react';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { ComplianceStatus } from '../../../pages/admin/CompliancePage';

interface ComplianceCardProps {
    icon: React.ElementType;
    title: string;
    status: ComplianceStatus;
    lastAudit: string;
    details: string;
    onStatusChange: (newStatus: ComplianceStatus) => void;
}

const ComplianceCard: React.FC<ComplianceCardProps> = ({ icon: Icon, title, status, lastAudit, details, onStatusChange }) => {
    const getStatusInfo = () => {
        switch (status) {
            case 'Compliant':
                return { color: 'green', icon: CheckCircle };
            case 'Action Required':
                return { color: 'red', icon: AlertTriangle };
            case 'Pending':
                return { color: 'orange', icon: Clock };
            default:
                return { color: 'gray', icon: Clock };
        }
    };

    const statusInfo = getStatusInfo();
    const statusColorClass = `text-${statusInfo.color}-600`;
    const statusBgClass = `bg-${statusInfo.color}-100`;

    return (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Icon className="text-gray-600" size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-gray-800">{title}</h3>
                </div>
                <select 
                    value={status} 
                    onChange={(e) => onStatusChange(e.target.value as ComplianceStatus)}
                    className={`text-xs font-semibold rounded-full border-none focus:ring-0 ${statusBgClass} ${statusColorClass}`}
                >
                    <option value="Compliant">Compliant</option>
                    <option value="Action Required">Action Required</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>
            <p className="text-sm text-gray-600 mb-4">{details}</p>
            <div className="text-xs text-gray-400 border-t pt-3">
                Last Audit: {lastAudit}
            </div>
        </div>
    );
};

export default ComplianceCard;
