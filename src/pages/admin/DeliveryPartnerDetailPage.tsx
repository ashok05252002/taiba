import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { generateDeliveryPartners } from '../../utils/mockData';
import { ChevronLeft, Truck, Star, CheckCircle } from 'lucide-react';
import PartnerDetailHeader from '../../components/admin/delivery-partners/PartnerDetailHeader';
import PartnerDeliveryHistory from '../../components/admin/delivery-partners/PartnerDeliveryHistory';
import StatCard from '../../components/admin/shared/StatCard';

const DeliveryPartnerDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [partner, setPartner] = useState<ReturnType<typeof generateDeliveryPartners>[0] | null>(null);

    useEffect(() => {
        // In a real app, you'd fetch this by ID. Here we find it from the mock data.
        const allPartners = generateDeliveryPartners(15);
        const foundPartner = allPartners.find(p => p.id === id);
        setPartner(foundPartner || null);
    }, [id]);

    if (!partner) {
        return <div>Delivery Partner not found</div>;
    }

    const summaryData = [
        { title: 'Total Deliveries', value: partner.totalDeliveries.toString(), icon: Truck, color: 'text-blue-500' },
        { title: 'On-Time Rate', value: `${partner.onTimeRate}%`, icon: CheckCircle, color: 'text-green-500' },
        { title: 'Average Rating', value: `${partner.rating} ★`, icon: Star, color: 'text-yellow-500' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <Link to="/admin/delivery-partners" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900">
                <ChevronLeft size={18} />
                Back to All Partners
            </Link>

            <PartnerDetailHeader partner={partner} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {summaryData.map(data => (
                    <StatCard key={data.title} {...data} />
                ))}
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="font-semibold mb-4">Recent Delivery History</h3>
                <PartnerDeliveryHistory deliveries={partner.deliveryHistory} />
            </div>
        </motion.div>
    );
};

export default DeliveryPartnerDetailPage;
