import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

type Document = {
    id: string;
    name: string;
    status: string;
    expiry: string;
};

interface PartnerDocumentsProps {
    documents: Document[];
}

const PartnerDocuments: React.FC<PartnerDocumentsProps> = ({ documents }) => {
    return (
        <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold mb-4">Compliance Documents</h4>
            <ul className="space-y-3">
                {documents.map(doc => (
                    <li key={doc.id} className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                        <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-xs text-gray-500">Expires: {doc.expiry}</p>
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-semibold ${doc.status === 'Verified' ? 'text-green-600' : 'text-red-600'}`}>
                            {doc.status === 'Verified' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                            {doc.status}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PartnerDocuments;
