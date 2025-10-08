import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { ProductCategory } from '../../../pages/admin/ProductManagementPage';

interface CategoryManagementProps {
    categories: ProductCategory[];
    setCategories: React.Dispatch<React.SetStateAction<ProductCategory[]>>;
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({ categories, setCategories }) => {

    const handleDelete = (id: string) => {
        setCategories(prev => prev.filter(c => c.id !== id));
    };

    const getStatusColor = (status: string) => {
        return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
                <div key={category.id} className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-semibold text-gray-800">{category.name}</h4>
                            <p className="text-sm text-gray-500">{category.productCount} products</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(category.status)}`}>
                            {category.status}
                        </span>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button className="p-2 text-gray-500 hover:text-taiba-blue rounded-full hover:bg-gray-100"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(category.id)} className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"><Trash2 size={16} /></button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryManagement;
