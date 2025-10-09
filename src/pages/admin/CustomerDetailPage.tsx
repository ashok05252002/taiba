import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { customerList } from '../../utils/mockData';
import { ChevronLeft, Download, Printer } from 'lucide-react';
import CustomerProfileSummary from '../../components/admin/customers/CustomerProfileSummary';
import CustomerDetailTabs from '../../components/admin/customers/CustomerDetailTabs';
import CustomerOrderHistoryTable from '../../components/admin/customers/CustomerOrderHistoryTable';
import CustomerPaymentHistory from '../../components/admin/customers/CustomerPaymentHistory';
import CustomerReturnsHistory from '../../components/admin/customers/CustomerReturnsHistory';
import CustomerActivityLog from '../../components/admin/customers/CustomerActivityLog';

type CustomerDetailTab = 'overview' | 'orders' | 'payments' | 'returns' | 'logs';
type Customer = typeof customerList[0];

const CustomerDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [activeTab, setActiveTab] = useState<CustomerDetailTab>('overview');

    useEffect(() => {
        const foundCustomer = customerList.find(c => c.id === id);
        setCustomer(foundCustomer || null);
    }, [id]);

    if (!customer) {
        return (
             <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-500">Customer Not Found</h2>
                <p className="text-gray-600 mt-2">The customer ID might be invalid or the data is not available.</p>
                <Link to="/admin/customers" className="mt-4 inline-block text-taiba-blue hover:underline">
                    &larr; Back to Customer List
                </Link>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <CustomerProfileSummary customer={customer} />;
            case 'orders':
                return <CustomerOrderHistoryTable orders={customer.orderHistory} />;
            case 'payments':
                return <CustomerPaymentHistory payments={customer.paymentHistory} />;
            case 'returns':
                return <CustomerReturnsHistory returns={customer.returnHistory} />;
            case 'logs':
                return <CustomerActivityLog logs={[...customer.communicationLog, ...customer.accountActionsLog]} />;
            default:
                return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <Link to="/admin/customers" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900">
                    <ChevronLeft size={18} />
                    Back to All Customers
                </Link>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm"><Printer size={14}/> Print</button>
                    <button className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm"><Download size={14}/> Export</button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
                <CustomerDetailTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="mt-6">
                    {renderContent()}
                </div>
            </div>
        </motion.div>
    );
};

export default CustomerDetailPage;
