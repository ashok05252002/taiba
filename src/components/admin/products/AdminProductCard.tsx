import React from 'react';
import { Product } from '../../../types';
import { Edit, Trash2 } from 'lucide-react';

interface AdminProductCardProps {
    product: Product;
    onEdit: () => void;
    onDelete: () => void;
}

const AdminProductCard: React.FC<AdminProductCardProps> = ({ product, onEdit, onDelete }) => {
    const stockStatusColor = product.stock > 20 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col">
            <img src={product.image} alt={product.name} className="h-40 w-full object-cover" />
            <div className="p-4 flex-grow flex flex-col">
                <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 flex-grow">{product.name}</h4>
                <div className="flex justify-between items-center text-sm mb-3">
                    <span className="font-bold text-taiba-blue">OMR {product.price.toFixed(2)}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${stockStatusColor}`}>
                        {product.stock} in stock
                    </span>
                </div>
                <div className="flex justify-end gap-2 border-t pt-3 mt-auto">
                    <button onClick={onEdit} className="p-2 text-gray-500 hover:text-taiba-blue rounded-full hover:bg-gray-100">
                        <Edit size={16} />
                    </button>
                    <button onClick={onDelete} className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminProductCard;
