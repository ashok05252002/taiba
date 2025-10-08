import React from 'react';
import { Promotion } from '../../../pages/admin/PromotionManagementPage';
import { Calendar, BarChart2, Edit, Trash2 } from 'lucide-react';

interface PromotionCardProps {
    promotion: Promotion;
    onEdit: () => void;
    onDelete: () => void;
}

const PromotionCard: React.FC<PromotionCardProps> = ({ promotion, onEdit, onDelete }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800';
            case 'Expired': return 'bg-gray-100 text-gray-800';
            case 'Scheduled': return 'bg-blue-100 text-blue-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-800">{promotion.title}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(promotion.status)}`}>
                    {promotion.status}
                </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
                {promotion.type}: {promotion.type === 'Percentage' ? `${promotion.value}% OFF` : `OMR ${promotion.value} OFF`}
            </p>
            <div className="space-y-2 text-sm text-gray-600 mt-auto">
                <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{promotion.startDate} - {promotion.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                    <BarChart2 size={14} />
                    <span>Used {promotion.usageCount} times</span>
                </div>
            </div>
            <div className="flex justify-end gap-2 border-t pt-3 mt-4">
                <button onClick={onEdit} className="p-2 text-gray-500 hover:text-taiba-blue rounded-full hover:bg-gray-100"><Edit size={16} /></button>
                <button onClick={onDelete} className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"><Trash2 size={16} /></button>
            </div>
        </div>
    );
};

export default PromotionCard;
