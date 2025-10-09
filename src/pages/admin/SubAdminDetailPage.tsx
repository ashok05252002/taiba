import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { subAdminList, generateRoles } from '../../utils/mockData';
import { ChevronLeft } from 'lucide-react';
import SubAdminProfileCard from '../../components/admin/sub-admins/SubAdminProfileCard';
import SubAdminActivityLog from '../../components/admin/sub-admins/SubAdminActivityLog';
import SubAdminSummaryStats from '../../components/admin/sub-admins/SubAdminSummaryStats';

const SubAdminDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [subAdmin, setSubAdmin] = useState<typeof subAdminList[0] | null>(null);

    useEffect(() => {
        const allRoles = generateRoles();
        const allSubAdmins = subAdminList.map(sa => ({
            ...sa,
            permissions: allRoles.find(r => r.name === sa.role)?.permissions || {}
        }));
        const foundSubAdmin = allSubAdmins.find(sa => sa.id === id);
        setSubAdmin(foundSubAdmin || null);
    }, [id]);

    if (!subAdmin) {
        return <div>Sub-Admin not found</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <Link to="/admin/users" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900">
                <ChevronLeft size={18} />
                Back to User Management
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <SubAdminProfileCard subAdmin={subAdmin} />
                </div>
                <div className="lg:col-span-2">
                    <SubAdminSummaryStats activityLog={subAdmin.activityLog} />
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="font-semibold mb-4 text-lg">Activity & Change Log</h3>
                <SubAdminActivityLog activityLog={subAdmin.activityLog} />
            </div>
        </motion.div>
    );
};

export default SubAdminDetailPage;
