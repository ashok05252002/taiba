import React, { useState } from 'react';
import { Edit, Trash2, Plus, ArrowLeft } from 'lucide-react';
import { ProductCategory } from '../../../pages/admin/ProductManagementPage';
import { Product } from '../../../types';
import AdminProductGrid from './AdminProductGrid';
import AddCategoryModal from './AddCategoryModal';
import { Link } from 'react-router-dom';

interface CategoryManagementProps {
    categories: ProductCategory[];
    setCategories: React.Dispatch<React.SetStateAction<ProductCategory[]>>;
    allProducts: Product[];
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({ categories, setCategories, allProducts }) => {
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const handleDelete = (id: string) => {
        setCategories(prev => prev.filter(c => c.id !== id));
    };
    
    const handleAddCategory = (name: string) => {
        const newCategory: ProductCategory = {
            id: crypto.randomUUID(),
            name,
            productCount: 0,
            status: 'Active',
        };
        setCategories(prev => [newCategory, ...prev]);
        setAddModalOpen(false);
    };

    const getStatusColor = (status: string) => {
        return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    if (selectedCategory) {
        const productsInCategory = allProducts.filter(p => p.category === selectedCategory.name);
        return (
            <div>
                <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-4">
                    <ArrowLeft size={16} /> Back to Categories
                </button>
                <h3 className="text-xl font-bold mb-4">Products in: {selectedCategory.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productsInCategory.map(p => (
                        <div key={p.id} className="bg-gray-50 p-3 rounded-lg border">
                            <img src={p.image} alt={p.name} className="h-24 w-full object-cover rounded-md mb-2"/>
                            <p className="text-xs font-semibold line-clamp-2">{p.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-end mb-4">
                 <button onClick={() => setAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-taiba-blue text-white rounded-full text-sm font-semibold">
                    <Plus size={16} /> Add Category
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(category => (
                    <div key={category.id} className="bg-gray-50 p-4 rounded-lg border hover:shadow-md transition-shadow">
                        <div onClick={() => setSelectedCategory(category)} className="cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold text-gray-800">{category.name}</h4>
                                    <p className="text-sm text-gray-500">{category.productCount} products</p>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(category.status)}`}>
                                    {category.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4 border-t pt-2">
                            <button className="p-2 text-gray-500 hover:text-taiba-blue rounded-full hover:bg-gray-100"><Edit size={16} /></button>
                            <button onClick={() => handleDelete(category.id)} className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
            <AddCategoryModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleAddCategory} />
        </>
    );
};

export default CategoryManagement;
