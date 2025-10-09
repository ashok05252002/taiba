import React from 'react';
import StatCard from '../shared/StatCard';
import { User, ShoppingBag, MapPin, DollarSign, Repeat, Gift } from 'lucide-react';

type Customer = {
    name: string;
    avatar: string;
    email: string;
    status: string;
    joined: string;
    lastLogin: string;
    addresses: { id: string; type: string; address: string }[];
    orderHistory: any[];
    loyaltyPoints: number;
};

interface CustomerProfileSummaryProps {
    customer: Customer;
}

const CustomerProfileSummary: React.FC<CustomerProfileSummaryProps> = ({ customer }) => {
    const summaryData = [
        { title: 'Total Orders', value: customer.orderHistory.length.toString(), icon: ShoppingBag, color: 'text-blue-500' },
        { title: 'Total Spent', value: `OMR ${customer.orderHistory.reduce((acc, o) => acc + parseFloat(o.total), 0).toFixed(2)}`, icon: DollarSign, color: 'text-green-500' },
        { title: 'Loyalty Points', value: customer.loyaltyPoints.toString(), icon: Gift, color: 'text-purple-500' },
    ];

    const getStatusColor = (status: string) => {
        return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
                <img src={customer.avatar} alt={customer.name} className="w-24 h-24 rounded-full border-4 border-white shadow-md" />
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-2xl font-bold text-gray-800">{customer.name}</h1>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                            {customer.status}
                        </span>
                    </div>
                    <p className="text-gray-500">{customer.email}</p>
                    <p className="text-sm text-gray-400 mt-1">Joined: {customer.joined} | Last Login: {new Date(customer.lastLogin).toLocaleString()}</p>
                </div>
                 <button className="px-4 py-2 bg-taiba-blue text-white rounded-full text-sm font-semibold">Edit Customer</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {summaryData.map(data => (
                    <StatCard key={data.title} {...data} />
                ))}
            </div>

            <div>
                <h3 className="font-semibold mb-3">Saved Addresses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {customer.addresses.map(addr => (
                        <div key={addr.id} className="bg-gray-50 p-4 rounded-lg border">
                            <p className="font-medium flex items-center gap-2"><MapPin size={16}/> {addr.type}</p>
                            <p className="text-sm text-gray-600 pl-7">{addr.address}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomerProfileSummary;
