import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Search } from 'lucide-react';
import { Promotion } from '../../../pages/admin/PromotionManagementPage';
import { Product } from '../../../types';

interface CreateOfferModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (promotion: Omit<Promotion, 'id' | 'usageCount'>) => void;
    promotionToEdit: Promotion | null;
    products: Product[];
}

const steps = ['Type', 'Details', 'Products', 'Rules', 'Schedule', 'Review'];
const defaultFormState = { title: '', type: 'Percentage', value: 10, status: 'Scheduled', startDate: '', endDate: '', eligibleProductIds: [] as string[] };

const CreateOfferModal: React.FC<CreateOfferModalProps> = ({ isOpen, onClose, onSave, promotionToEdit, products }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Partial<Omit<Promotion, 'id' | 'usageCount'>> & { eligibleProductIds?: string[] }>(defaultFormState);
    const [productSearch, setProductSearch] = useState('');
    
    const isEditing = !!promotionToEdit;

    useEffect(() => {
        if (isOpen) {
            if (isEditing) {
                setFormData({
                    ...promotionToEdit,
                    eligibleProductIds: (promotionToEdit as any).eligibleProductIds || []
                });
            } else {
                setFormData(defaultFormState);
            }
        } else {
            setTimeout(() => {
                setCurrentStep(0);
                setFormData(defaultFormState);
            }, 300);
        }
    }, [isOpen, isEditing, promotionToEdit]);

    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleProductSelection = (productId: string) => {
        setFormData(prev => {
            const currentIds = prev.eligibleProductIds || [];
            if (currentIds.includes(productId)) {
                return { ...prev, eligibleProductIds: currentIds.filter(id => id !== productId) };
            } else {
                return { ...prev, eligibleProductIds: [...currentIds, productId] };
            }
        });
    };

    const handleCreateOrUpdate = () => {
        onSave(formData as Omit<Promotion, 'id' | 'usageCount'>);
    };

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()));

    const renderStepContent = () => {
        switch (currentStep) {
            case 0: // Type
                return (
                    <div>
                        <h3 className="font-semibold mb-4">Select Offer Type</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {['Percentage', 'Fixed Amount', 'Free Delivery', 'BOGO'].map(type => (
                                <button key={type} onClick={() => setFormData(p => ({...p, type}))} className={`p-4 border rounded-lg text-center ${formData.type === type ? 'border-taiba-blue bg-blue-50' : ''}`}>
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 1: // Details
                return (
                    <div>
                        <h3 className="font-semibold mb-4">Offer Details</h3>
                        <div className="space-y-4">
                            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Offer Name (e.g., Summer Sale)" className="w-full p-2 border rounded-md" />
                            {formData.type === 'Percentage' && <input type="number" name="value" value={formData.value} onChange={handleChange} placeholder="Discount Percentage (%)" className="w-full p-2 border rounded-md" />}
                            {formData.type === 'Fixed Amount' && <input type="number" name="value" value={formData.value} onChange={handleChange} placeholder="Discount Amount (OMR)" className="w-full p-2 border rounded-md" />}
                        </div>
                    </div>
                );
            case 2: // Products
                return (
                    <div>
                        <h3 className="font-semibold mb-4">Product Eligibility</h3>
                        <p className="text-sm text-gray-500 mb-2">Leave blank to apply to all products, or select specific products.</p>
                        <div className="relative mb-4">
                             <input type="text" value={productSearch} onChange={e => setProductSearch(e.target.value)} placeholder="Search products..." className="w-full p-2 border rounded-md pl-8"/>
                             <Search size={16} className="absolute left-2.5 top-3 text-gray-400" />
                        </div>
                        <div className="max-h-60 overflow-y-auto space-y-2 border p-2 rounded-md">
                            {filteredProducts.map(p => (
                                <label key={p.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50">
                                    <input type="checkbox" checked={formData.eligibleProductIds?.includes(p.id)} onChange={() => handleProductSelection(p.id)} className="h-4 w-4 rounded text-taiba-blue"/>
                                    <img src={p.image} alt={p.name} className="w-8 h-8 rounded-md object-cover"/>
                                    <span className="text-sm">{p.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                );
            case 3: // Rules
                return <div><h3 className="font-semibold mb-4">Eligibility Rules (Placeholder)</h3><p className="text-gray-500">Define which customers or order values are eligible.</p></div>;
            case 4: // Schedule
                 return (
                    <div>
                        <h3 className="font-semibold mb-4">Schedule</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm">Start Date</label>
                                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="text-sm">End Date</label>
                                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            </div>
                        </div>
                    </div>
                );
            case 5: // Review
                return (
                    <div>
                        <h3 className="font-semibold">Review & Confirm</h3>
                        <div className="mt-4 space-y-2 text-sm">
                            <p><strong>Title:</strong> {formData.title}</p>
                            <p><strong>Type:</strong> {formData.type}</p>
                            <p><strong>Value:</strong> {formData.value}{formData.type === 'Percentage' ? '%' : ' OMR'}</p>
                            <p><strong>Eligible Products:</strong> {formData.eligibleProductIds?.length || 'All'}</p>
                            <p><strong>Starts:</strong> {formData.startDate}</p>
                            <p><strong>Ends:</strong> {formData.endDate}</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 50 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl w-full max-w-2xl flex flex-col h-[80vh]"
                    >
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">{isEditing ? 'Edit Offer' : 'Create New Offer'}</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X /></button>
                        </div>
                        <div className="p-6 flex-1 overflow-y-auto">
                            <div className="flex items-center mb-8">
                                {steps.map((step, index) => (
                                    <React.Fragment key={step}>
                                        <div className="flex flex-col items-center text-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= index ? 'bg-taiba-blue border-taiba-blue text-white' : 'bg-white border-gray-300'}`}>
                                                {index + 1}
                                            </div>
                                            <p className="text-xs mt-1 w-20">{step}</p>
                                        </div>
                                        {index < steps.length - 1 && <div className={`flex-grow h-0.5 mx-2 ${currentStep > index ? 'bg-taiba-blue' : 'bg-gray-300'}`}></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                            {renderStepContent()}
                        </div>
                        <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
                            <button onClick={handleBack} disabled={currentStep === 0} className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold disabled:opacity-50">
                                <ArrowLeft size={16} /> Back
                            </button>
                            {currentStep < steps.length - 1 ? (
                                <button onClick={handleNext} className="flex items-center gap-2 px-4 py-2 bg-taiba-blue text-white rounded-md text-sm font-semibold">
                                    Next <ArrowRight size={16} />
                                </button>
                            ) : (
                                <button onClick={handleCreateOrUpdate} className="px-4 py-2 bg-green-500 text-white rounded-md text-sm font-semibold">
                                    {isEditing ? 'Save Changes' : 'Create Promotion'}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CreateOfferModal;
