import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CmsTabs from '../../components/admin/cms/CmsTabs';
import PageEditor from '../../components/admin/cms/PageEditor';
import BannerEditor from '../../components/admin/cms/BannerEditor';
import NotificationEditor from '../../components/admin/cms/NotificationEditor';
import { generateBanners, generateNotificationTemplates } from '../../utils/mockData';
import { faker } from '@faker-js/faker';

export type CmsTab = 'pages' | 'banners' | 'notifications';
export type Banner = ReturnType<typeof generateBanners>[0];
export type NotificationTemplate = ReturnType<typeof generateNotificationTemplates>[0];

const CmsManagementPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<CmsTab>('pages');
    const [staticPages, setStaticPages] = useState<Record<string, string>>({
        about: faker.lorem.paragraphs(5),
        privacy: faker.lorem.paragraphs(8),
        terms: faker.lorem.paragraphs(10),
        faq: 'FAQs content here...',
    });
    const [banners, setBanners] = useState(() => generateBanners(3));
    const [templates, setTemplates] = useState(() => generateNotificationTemplates(4));

    const handleSavePage = (pageId: string, content: string) => {
        setStaticPages(prev => ({ ...prev, [pageId]: content }));
        alert('Page content saved!');
    };

    const handleUpdateBanner = (updatedBanner: Banner) => {
        setBanners(prev => prev.map(b => b.id === updatedBanner.id ? updatedBanner : b));
    };

    const handleDeleteBanner = (bannerId: string) => {
        setBanners(prev => prev.filter(b => b.id !== bannerId));
    };
    
    const handleAddBanner = () => {
        const newBanner: Banner = {
            id: crypto.randomUUID(),
            title: 'New Banner Title',
            subtitle: 'New banner subtitle',
            image: `https://picsum.photos/seed/${crypto.randomUUID()}/800/400`,
            cta: 'Learn More',
        };
        setBanners(prev => [newBanner, ...prev]);
    };

    const handleUpdateTemplate = (updatedTemplate: NotificationTemplate) => {
        setTemplates(prev => prev.map(t => t.id === updatedTemplate.id ? updatedTemplate : t));
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'pages':
                return <PageEditor pagesContent={staticPages} onSave={handleSavePage} />;
            case 'banners':
                return <BannerEditor banners={banners} onUpdate={handleUpdateBanner} onDelete={handleDeleteBanner} onAdd={handleAddBanner} />;
            case 'notifications':
                return <NotificationEditor templates={templates} onUpdate={handleUpdateTemplate} />;
            default:
                return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <h1 className="text-2xl font-bold text-gray-800">Content Management System (CMS)</h1>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <CmsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {renderContent()}
            </div>
        </motion.div>
    );
};

export default CmsManagementPage;
