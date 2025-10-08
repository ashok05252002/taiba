import React, { useState } from 'react';
import { Banner } from '../../../pages/admin/CmsManagementPage';
import { Edit, Trash2, Plus } from 'lucide-react';
import ConfirmationModal from '../ConfirmationModal';

interface BannerEditorProps {
    banners: Banner[];
    onUpdate: (banner: Banner) => void;
    onDelete: (bannerId: string) => void;
    onAdd: () => void;
}

const BannerEditor: React.FC<BannerEditorProps> = ({ banners, onUpdate, onDelete, onAdd }) => {
    const [deletingBanner, setDeletingBanner] = useState<Banner | null>(null);

    const confirmDelete = () => {
        if (deletingBanner) {
            onDelete(deletingBanner.id);
            setDeletingBanner(null);
        }
    };

    return (
        <>
            <div className="flex justify-end mb-4">
                <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2 bg-taiba-blue text-white rounded-full text-sm font-semibold">
                    <Plus size={16} /> Add New Banner
                </button>
            </div>
            <div className="space-y-4">
                {banners.map(banner => (
                    <div key={banner.id} className="bg-gray-50 p-4 rounded-lg border flex items-center gap-4">
                        <img src={banner.image} alt={banner.title} className="w-32 h-16 object-cover rounded-md" />
                        <div className="flex-1">
                            <input
                                type="text"
                                value={banner.title}
                                onChange={(e) => onUpdate({ ...banner, title: e.target.value })}
                                className="font-semibold bg-transparent w-full p-1 rounded-md focus:bg-white focus:ring-1"
                            />
                             <input
                                type="text"
                                value={banner.subtitle}
                                onChange={(e) => onUpdate({ ...banner, subtitle: e.target.value })}
                                className="text-sm text-gray-500 bg-transparent w-full p-1 rounded-md focus:bg-white focus:ring-1"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => alert('Edit functionality to be implemented')} className="p-2 text-gray-500 hover:text-taiba-blue rounded-full hover:bg-gray-100"><Edit size={16} /></button>
                            <button onClick={() => setDeletingBanner(banner)} className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>
            <ConfirmationModal
                isOpen={!!deletingBanner}
                onClose={() => setDeletingBanner(null)}
                onConfirm={confirmDelete}
                title="Delete Banner"
                message={`Are you sure you want to delete the banner "${deletingBanner?.title}"?`}
            />
        </>
    );
};

export default BannerEditor;
