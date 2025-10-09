import React from 'react';
import { Archive, AlertTriangle } from 'lucide-react';

const StockReservationPanel: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Archive /> Stock Reservations</h3>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                    <span>Panadol Extra</span>
                    <span className="font-medium">Reserved: 5 units</span>
                </div>
                <div className="flex justify-between items-center text-red-600">
                    <span>Amoxicillin 500mg <AlertTriangle size={14} className="inline"/></span>
                    <span className="font-medium">At risk of oversell</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span>Nivea Sunscreen</span>
                    <span className="font-medium">Reserved: 2 units</span>
                </div>
            </div>
        </div>
    );
};

export default StockReservationPanel;
