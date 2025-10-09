import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { generateProducts } from '../../utils/mockData';
import { Product } from '../../types';
import EditProductPanel from '../../components/admin/products/EditProductPanel';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        // In a real app, you'd fetch the product by ID. Here we simulate it.
        const [foundProduct] = generateProducts(1);
        setProduct({ ...foundProduct, id: id || 'not-found' });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <Link to="/admin/products" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900">
                <ChevronLeft size={18} />
                Back to All Products
            </Link>
            <EditProductPanel 
                product={product} 
                isAdding={false}
                isViewing={true}
                onClose={() => {}}
                onSave={() => {}}
            />
        </motion.div>
    );
};

export default ProductDetailPage;
