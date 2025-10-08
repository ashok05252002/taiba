import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductSummaryCards from '../../components/admin/products/ProductSummaryCards';
import ProductManagementTabs from '../../components/admin/products/ProductManagementTabs';
import AdminProductGrid from '../../components/admin/products/AdminProductGrid';
import CategoryManagement from '../../components/admin/products/CategoryManagement';
import WarehouseManagement from '../../components/admin/products/WarehouseManagement';
import EditProductPanel from '../../components/admin/products/EditProductPanel';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { generateProducts, generateCategories, generateWarehouses } from '../../utils/mockData';
import { Product } from '../../types';

export type ProductCategory = ReturnType<typeof generateCategories>[0];
export type Warehouse = ReturnType<typeof generateWarehouses>[0];
export type ProductTab = 'products' | 'categories' | 'warehouses';

const ProductManagementPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ProductTab>('products');
    const [products, setProducts] = useState(() => generateProducts(20));
    const [categories, setCategories] = useState(() => generateCategories(8));
    const [warehouses, setWarehouses] = useState(() => generateWarehouses(4));
    
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isAddPanelOpen, setAddPanelOpen] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setAddPanelOpen(false);
    };

    const handleAddClick = () => {
        setEditingProduct(null);
        setAddPanelOpen(true);
    };

    const handleClosePanel = () => {
        setEditingProduct(null);
        setAddPanelOpen(false);
    };

    const handleSaveProduct = (productData: Product) => {
        if (isAddPanelOpen) { // Adding new product
            setProducts(prev => [{ ...productData, id: crypto.randomUUID() }, ...prev]);
        } else { // Editing existing product
            setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
        }
        handleClosePanel();
    };

    const handleDeleteProduct = (product: Product) => {
        setDeletingProduct(product);
    };

    const confirmDelete = () => {
        if (!deletingProduct) return;
        setProducts(prev => prev.filter(p => p.id !== deletingProduct.id));
        setDeletingProduct(null);
    };
    
    const renderContent = () => {
        switch (activeTab) {
            case 'products':
                return <AdminProductGrid products={products} onEdit={handleEditProduct} onAdd={handleAddClick} onDelete={handleDeleteProduct} />;
            case 'categories':
                return <CategoryManagement categories={categories} setCategories={setCategories} />;
            case 'warehouses':
                return <WarehouseManagement warehouses={warehouses} />;
            default:
                return null;
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                <h1 className="text-2xl font-bold text-gray-800">Product & Inventory</h1>
                <ProductSummaryCards />
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <ProductManagementTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    {renderContent()}
                </div>
                <EditProductPanel 
                    product={editingProduct} 
                    isAdding={isAddPanelOpen}
                    onClose={handleClosePanel}
                    onSave={handleSaveProduct}
                />
            </motion.div>
            <ConfirmationModal
                isOpen={!!deletingProduct}
                onClose={() => setDeletingProduct(null)}
                onConfirm={confirmDelete}
                title="Delete Product"
                message={`Are you sure you want to delete the product "${deletingProduct?.name}"? This action cannot be undone.`}
            />
        </>
    );
};

export default ProductManagementPage;
