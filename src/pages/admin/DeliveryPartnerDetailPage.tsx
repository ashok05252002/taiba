import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { deliveryPartnersList } from '../../utils/mockData';
import { ChevronLeft } from 'lucide-react';
import PartnerOverview from '../../components/admin/delivery-partners/PartnerOverview';
import PartnerPerformance from '../../components/admin/delivery-partners/PartnerPerformance';
import PartnerOrders from '../../components/admin/delivery-partners/PartnerOrders';
import PartnerLocation from '../../components/admin/delivery-partners/PartnerLocation';
import PartnerPayouts from '../../components/admin/delivery-partners/PartnerPayouts';
import PartnerDocuments from '../../components/admin/delivery-partners/PartnerDocuments';
import PartnerActivityLog from '../../components/admin/delivery-partners/PartnerActivityLog';
import PartnerDetailTabs from '../../components/admin/delivery-partners/PartnerDetailTabs';

type Partner = typeof deliveryPartnersList[0];
type PartnerDetailTab = 'overview' | 'performance' | 'orders' | 'location' | 'payouts' | 'documents' | 'logs';

const DeliveryPartnerDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [partner, setPartner] = useState<Partner | null>(null);
    const [activeTab, setActiveTab] = useState<PartnerDetailTab>('overview');

    useEffect(() => {
        const foundPartner = deliveryPartnersList.find(p => p.id === id);
        setPartner(foundPartner || null);
    }, [id]);

    if (!partner) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-500">Delivery Partner Not Found</h2>
                <p className="text-gray-600 mt-2">The partner ID might be invalid or the data is not available.</p>
                <Link to="/admin/delivery-partners" className="mt-4 inline-block text-taiba-blue hover:underline">
                    &larr; Back to Delivery Partner List
                </Link>
            </div>
        );
    }

    const renderTabContent = () => {
        if (!partner) return null;
        switch (activeTab) {
            case 'overview': return <PartnerOverview partner={partner} />;
            case 'performance': return <PartnerPerformance partner={partner} />;
            case 'orders': return <PartnerOrders deliveries={partner.deliveryHistory} />;
            case 'location': return <PartnerLocation />;
            case 'payouts': return <PartnerPayouts payouts={partner.payoutHistory} />;
            case 'documents': return <PartnerDocuments documents={partner.documents} />;
            case 'logs': return <PartnerActivityLog logs={partner.activityLog} />;
            default: return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <Link to="/admin/delivery-partners" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900">
                <ChevronLeft size={18} />
                Back to All Delivery Partners
            </Link>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
                <PartnerDetailTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="mt-6">
                    {renderTabContent()}
                </div>
            </div>
        </motion.div>
    );
};

export default DeliveryPartnerDetailPage;
