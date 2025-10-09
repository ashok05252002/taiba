import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { generatePromotions, generateProducts } from '../../utils/mockData';
import PromotionCard from '../../components/admin/promotions/PromotionCard';
import CreateOfferModal from '../../components/admin/promotions/CreateOfferModal';
import ConfirmationModal from '../../components/admin/ConfirmationModal';

export type Promotion = ReturnType<typeof generatePromotions>[0];

const PromotionManagementPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [promotions, setPromotions] = useState(() => generatePromotions(8));
    const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
    const [deletingPromotion, setDeletingPromotion] = useState<Promotion | null>(null);
    const allProducts = generateProducts(50); // For product selection in modal

    const handleOpenModal = (promo: Promotion | null = null) => {
        setEditingPromotion(promo);
        setIsModalOpen(true);
    };

    const handleSavePromotion = (promotion: Omit<Promotion, 'id' | 'usageCount'>) => {
        if (editingPromotion) {
            // Update existing
            setPromotions(prev => prev.map(p => p.id === editingPromotion.id ? { ...editingPromotion, ...promotion } : p));
        } else {
            // Add new
            const newPromotion = {
                ...promotion,
                id: crypto.randomUUID(),
                usageCount: 0,
            } as Promotion;
            setPromotions(prev => [newPromotion, ...prev]);
        }
        setIsModalOpen(false);
        setEditingPromotion(null);
    };

    const handleDelete = (promo: Promotion) => {
        setDeletingPromotion(promo);
    };

    const confirmDelete = () => {
        if (!deletingPromotion) return;
        setPromotions(prev => prev.filter(p => p.id !== deletingPromotion.id));
        setDeletingPromotion(null);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Promotions & Offers</h1>
                    <button 
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 px-4 py-2 bg-taiba-blue text-white rounded-full text-sm font-semibold"
                    >
                        <Plus size={16} />
                        Create Offer
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {promotions.map(promo => (
                        <PromotionCard key={promo.id} promotion={promo} onEdit={() => handleOpenModal(promo)} onDelete={() => handleDelete(promo)} />
                    ))}
                </div>
            </motion.div>
            <CreateOfferModal 
                isOpen={isModalOpen} 
                onClose={() => { setIsModalOpen(false); setEditingPromotion(null); }} 
                onSave={handleSavePromotion}
                promotionToEdit={editingPromotion}
                products={allProducts}
            />
            <ConfirmationModal
                isOpen={!!deletingPromotion}
                onClose={() => setDeletingPromotion(null)}
                onConfirm={confirmDelete}
                title="Delete Promotion"
                message={`Are you sure you want to delete the promotion "${deletingPromotion?.title}"?`}
            />
        </>
    );
};

export default PromotionManagementPage;
