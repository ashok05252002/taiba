import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, Plus, Trash2 } from 'lucide-react';
import { Product } from '../../../types';

interface EditProductPanelProps {
    product: Product | null;
    isAdding: boolean;
    isViewing: boolean;
    onClose: () => void;
    onSave: (product: Product) => void;
}

const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; disabled?: boolean; }> = ({ checked, onChange, disabled }) => (
    <button
        type="button"
        onClick={() => !disabled && onChange(!checked)}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={`${
            checked ? 'bg-taiba-blue' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50`}
    >
        <span
            className={`${
                checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
    </button>
);


const EditProductPanel: React.FC<EditProductPanelProps> = ({ product, isAdding, isViewing, onClose, onSave }) => {
    const isOpen = !!product || isAdding;
    let title = 'Product Details';
    if(isAdding) title = 'Add New Product';
    if(!isAdding && !isViewing) title = 'Edit Product';

    const [formData, setFormData] = useState<Partial<Product>>({});
    const [activeIngredients, setActiveIngredients] = useState<{ name: string; benefit: string; }[]>([]);

    useEffect(() => {
        if (product) {
            setFormData(product);
            setActiveIngredients(product.activeIngredients || []);
        } else {
            setFormData({
                name: '', description: '', price: 0, originalPrice: 0, stock: 0, category: 'Medicines',
                prescriptionRequired: false, keyFeatures: [], benefits: [], directionsForUse: '', dosage: '', tags: [],
            });
            setActiveIngredients([]);
        }
    }, [product, isAdding]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const numValue = (name === 'price' || name === 'originalPrice' || name === 'stock') ? parseFloat(value) : value;
        setFormData(prev => ({ ...prev, [name]: numValue }));
    };

    const handleToggleChange = (name: keyof Product, checked: boolean) => {
        setFormData(prev => ({ ...prev, [name]: checked }));
    };
    
    const handleArrayChange = (name: 'keyFeatures' | 'benefits', value: string) => {
        const arrayValue = value.split('\n');
        setFormData(prev => ({ ...prev, [name]: arrayValue }));
    };
    
    const handleIngredientChange = (index: number, field: 'name' | 'benefit', value: string) => {
        const newIngredients = [...activeIngredients];
        newIngredients[index][field] = value;
        setActiveIngredients(newIngredients);
    };

    const addIngredient = () => setActiveIngredients([...activeIngredients, { name: '', benefit: '' }]);
    const removeIngredient = (index: number) => setActiveIngredients(activeIngredients.filter((_, i) => i !== index));
    
    const handleSave = () => {
        const finalData = { ...formData, activeIngredients } as Product;
        onSave(finalData);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-50 shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b flex justify-between items-center flex-shrink-0">
                            <h2 className="text-xl font-bold">{title}</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto space-y-6">
                            {/* Basic Info */}
                            <div className="p-4 border rounded-lg">
                                <h3 className="font-semibold mb-4">Basic Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium">Product Name</label>
                                        <input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" disabled={isViewing} />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Description</label>
                                        <textarea name="description" value={formData.description || ''} onChange={handleInputChange} rows={3} className="w-full mt-1 p-2 border rounded-md" disabled={isViewing} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium">Category</label>
                                            <select name="category" value={formData.category || 'Medicines'} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" disabled={isViewing}>
                                                <option>Medicines</option>
                                                <option>Skin Care</option>
                                                <option>Cosmetics</option>
                                                <option>Fragrances</option>
                                                <option>Health Devices</option>
                                                <option>Vitamins</option>
                                            </select>
                                        </div>
                                         <div>
                                            <label className="text-sm font-medium">Tags (comma separated)</label>
                                            <input type="text" name="tags" value={formData.tags?.join(', ') || ''} onChange={(e) => setFormData(prev => ({...prev, tags: e.target.value.split(',').map(t => t.trim())}))} className="w-full mt-1 p-2 border rounded-md" disabled={isViewing} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Pricing & Stock */}
                             <div className="p-4 border rounded-lg">
                                <h3 className="font-semibold mb-4">Pricing & Inventory</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-sm font-medium">Price (OMR)</label>
                                        <input type="number" name="price" value={formData.price || 0} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" disabled={isViewing} />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Original Price (Optional)</label>
                                        <input type="number" name="originalPrice" value={formData.originalPrice || 0} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" disabled={isViewing} />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Stock</label>
                                        <input type="number" name="stock" value={formData.stock || 0} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" disabled={isViewing} />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Regulations */}
                            <div className="p-4 border rounded-lg">
                                <h3 className="font-semibold mb-4">Regulations</h3>
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium">Prescription Required</label>
                                    <ToggleSwitch checked={!!formData.prescriptionRequired} onChange={(checked) => handleToggleChange('prescriptionRequired', checked)} disabled={isViewing} />
                                </div>
                            </div>

                             {/* Detailed Info */}
                            <div className="p-4 border rounded-lg">
                                <h3 className="font-semibold mb-4">Detailed Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium">Key Features (one per line)</label>
                                        <textarea value={formData.keyFeatures?.join('\n') || ''} onChange={(e) => handleArrayChange('keyFeatures', e.target.value)} rows={4} className="w-full mt-1 p-2 border rounded-md" disabled={isViewing} />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Benefits (one per line)</label>
                                        <textarea value={formData.benefits?.join('\n') || ''} onChange={(e) => handleArrayChange('benefits', e.target.value)} rows={4} className="w-full mt-1 p-2 border rounded-md" disabled={isViewing} />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Directions for Use</label>
                                        <textarea name="directionsForUse" value={formData.directionsForUse || ''} onChange={handleInputChange} rows={3} className="w-full mt-1 p-2 border rounded-md" disabled={isViewing} />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Dosage</label>
                                        <input type="text" name="dosage" value={formData.dosage || ''} onChange={handleInputChange} className="w-full mt-1 p-2 border rounded-md" disabled={isViewing} />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Active Ingredients */}
                            <div className="p-4 border rounded-lg">
                                <h3 className="font-semibold mb-4">Active Ingredients</h3>
                                <div className="space-y-3">
                                    {activeIngredients.map((ing, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input type="text" placeholder="Ingredient Name" value={ing.name} onChange={(e) => handleIngredientChange(index, 'name', e.target.value)} className="w-1/2 p-2 border rounded-md" disabled={isViewing}/>
                                            <input type="text" placeholder="Benefit" value={ing.benefit} onChange={(e) => handleIngredientChange(index, 'benefit', e.target.value)} className="w-1/2 p-2 border rounded-md" disabled={isViewing}/>
                                            {!isViewing && (
                                                <button type="button" onClick={() => removeIngredient(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {!isViewing && (
                                    <button type="button" onClick={addIngredient} className="mt-3 flex items-center gap-2 text-sm font-semibold text-taiba-blue">
                                        <Plus size={16}/> Add Ingredient
                                    </button>
                                )}
                            </div>

                            {/* Image Upload */}
                            <div className="p-4 border rounded-lg">
                                <h3 className="font-semibold mb-4">Product Image</h3>
                                {formData.image && <img src={formData.image} alt="product" className="w-32 h-32 object-cover rounded-md mb-4" />}
                                {!isViewing && (
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-taiba-blue hover:text-taiba-purple">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {!isViewing && (
                            <div className="p-6 border-t bg-gray-50 flex justify-end gap-4 flex-shrink-0">
                                <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold">Cancel</button>
                                <button onClick={handleSave} className="px-4 py-2 bg-taiba-blue text-white rounded-md text-sm font-semibold">
                                    {isAdding ? 'Create Product' : 'Save Changes'}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default EditProductPanel;
