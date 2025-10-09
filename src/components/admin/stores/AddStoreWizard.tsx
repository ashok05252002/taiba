import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, UploadCloud, Download } from 'lucide-react';

interface AddStoreWizardProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (storeData: any) => void;
}

const steps = ['Store Details', 'Add Staff', 'Bulk Stock Upload'];

const AddStoreWizard: React.FC<AddStoreWizardProps> = ({ isOpen, onClose, onAdd }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [storeData, setStoreData] = useState({
        name: '',
        address: '',
        zone: '',
        phone: '',
        hours: '',
        staff: [{ name: '', role: 'Pharmacist' }],
    });

    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStoreData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCreateStore = () => {
        onAdd(storeData);
        onClose();
        // Reset state for next time
        setTimeout(() => {
            setCurrentStep(0);
            setStoreData({ name: '', address: '', zone: '', phone: '', hours: '', staff: [{ name: '', role: 'Pharmacist' }]});
        }, 300);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-4">
                        <input type="text" name="name" value={storeData.name} onChange={handleChange} placeholder="Store Name" className="w-full p-2 border rounded-md" />
                        <input type="text" name="address" value={storeData.address} onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded-md" />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" name="zone" value={storeData.zone} onChange={handleChange} placeholder="Zone" className="w-full p-2 border rounded-md" />
                            <input type="text" name="phone" value={storeData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-2 border rounded-md" />
                        </div>
                        <input type="text" name="hours" value={storeData.hours} onChange={handleChange} placeholder="Opening Hours (e.g., 9am - 10pm)" className="w-full p-2 border rounded-md" />
                    </div>
                );
            case 1:
                return <div><h3 className="font-semibold mb-4">Add Staff (Placeholder)</h3><p className="text-gray-500">Functionality to add staff members to this store.</p></div>;
            case 2:
                return (
                    <div>
                        <h3 className="font-semibold mb-4">Bulk Upload Stock</h3>
                        <p className="text-sm text-gray-500 mb-4">Download the template, fill it out, and upload it here to add initial stock for this store.</p>
                        <div className="flex gap-4">
                            <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-100 rounded-md hover:bg-gray-200">
                                <Download size={16} /> Download Template
                            </button>
                            <label htmlFor="stock-upload" className="flex-1 flex items-center justify-center gap-2 p-3 bg-blue-50 text-taiba-blue rounded-md cursor-pointer hover:bg-blue-100">
                                <UploadCloud size={16} /> Upload File
                            </label>
                            <input type="file" id="stock-upload" className="hidden" />
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
                        className="bg-white rounded-2xl w-full max-w-2xl flex flex-col h-[70vh]"
                    >
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">Add New Store</h2>
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
                                <button onClick={handleCreateStore} className="px-4 py-2 bg-green-500 text-white rounded-md text-sm font-semibold">
                                    Create Store
                                </button>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddStoreWizard;
