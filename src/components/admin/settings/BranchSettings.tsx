import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

type Branch = { id: string; name: string; address: string; };

interface BranchSettingsProps {
    branches: Branch[];
    setBranches: React.Dispatch<React.SetStateAction<Branch[]>>;
}

const BranchSettings: React.FC<BranchSettingsProps> = ({ branches, setBranches }) => {
    const handleDelete = (id: string) => {
        setBranches(prev => prev.filter(b => b.id !== id));
    };

    return (
        <div className="space-y-4">
            {branches.map(loc => (
                <div key={loc.id} className="bg-gray-50 p-4 rounded-lg border flex justify-between items-center">
                    <div>
                        <p className="font-semibold">{loc.name}</p>
                        <p className="text-sm text-gray-500">{loc.address}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 text-gray-500 hover:text-taiba-blue rounded-full hover:bg-gray-100"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(loc.id)} className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"><Trash2 size={16} /></button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BranchSettings;
