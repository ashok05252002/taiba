import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../../types';
import AdminProductCard from './AdminProductCard';
import { Search, Plus } from 'lucide-react';

interface AdminProductGridProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onAdd: () => void;
    onDelete: (product: Product) => void;
    onView: (product: Product) => void;
}

const AdminProductGrid: React.FC<AdminProductGridProps> = ({ products, onEdit, onAdd, onDelete, onView }) => {
    return (
        <div>
            <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
                <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full bg-gray-50 rounded-full px-4 py-2 pl-10 text-sm focus:ring-2 focus:ring-taiba-blue focus:outline-none border border-gray-200"
                    />
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-taiba-blue text-white rounded-full text-sm font-semibold">
                    <Plus size={16} />
                    Add Product
                </button>
            </div>
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.05 } }
                }}
            >
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        <AdminProductCard product={product} onEdit={() => onEdit(product)} onDelete={() => onDelete(product)} onView={() => onView(product)} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default AdminProductGrid;
