import React from 'react';
import { User, Calendar } from 'lucide-react';

type Customer = {
    name: string;
    avatar: string;
    status: string;
    joined: string;
};

interface CustomerDetailHeaderProps {
    customer: Customer;
}

const CustomerDetailHeader: React.FC<CustomerDetailHeaderProps> = ({ customer }) => {
    const getStatusColor = (status: string) => {
        return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    return (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex flex-col md:flex-row items-start gap-6">
                <img src={customer.avatar} alt={customer.name} className="w-24 h-24 rounded-full border-4 border-white shadow-md" />
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-2xl font-bold text-gray-800">{customer.name}</h1>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                            {customer.status}
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Calendar size={14} /> Joined: {customer.joined}</span>
                    </div>
                </div>
                 <button className="px-4 py-2 bg-taiba-blue text-white rounded-full text-sm font-semibold">Edit Customer</button>
            </div>
        </div>
    );
};

export default CustomerDetailHeader;
