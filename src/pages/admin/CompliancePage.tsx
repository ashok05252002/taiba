import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ComplianceCard from '../../components/admin/compliance/ComplianceCard';
import { Shield, FileText, Megaphone, Lock, ShieldCheck } from 'lucide-react';

const initialComplianceAreas = [
    { id: 1, icon: Lock, title: 'Data Protection (GDPR/Local Law)', status: 'Compliant' as const, lastAudit: '2025-05-15', details: 'All user data is encrypted and handled according to regulations.' },
    { id: 2, icon: Megaphone, title: 'Advertising Standards', status: 'Compliant' as const, lastAudit: '2025-04-20', details: 'All promotional materials reviewed and approved.' },
    { id: 3, icon: FileText, title: 'Pharmacy Licensing', status: 'Action Required' as const, lastAudit: '2024-12-01', details: 'License for Sohar branch expires in 30 days. Renewal in progress.' },
    { id: 4, icon: Shield, title: 'Product Registration', status: 'Compliant' as const, lastAudit: '2025-05-01', details: 'All products are registered with the Ministry of Health.' },
];

export type ComplianceStatus = 'Compliant' | 'Action Required' | 'Pending';

const CompliancePage: React.FC = () => {
    const [complianceAreas, setComplianceAreas] = useState(initialComplianceAreas);

    const handleStatusChange = (id: number, newStatus: ComplianceStatus) => {
        setComplianceAreas(prev => prev.map(area => area.id === id ? {...area, status: newStatus} : area));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><ShieldCheck /> Compliance & Regulations</h1>
            <p className="text-gray-600">
                An overview of the pharmacy's adherence to key regulatory and compliance standards.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {complianceAreas.map((area) => (
                    <ComplianceCard key={area.id} {...area} onStatusChange={(newStatus) => handleStatusChange(area.id, newStatus)} />
                ))}
            </div>
        </motion.div>
    );
};

export default CompliancePage;
