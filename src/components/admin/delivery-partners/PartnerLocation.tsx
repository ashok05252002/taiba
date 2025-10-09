import React from 'react';
import LiveTrackingMap from '../orders/LiveTrackingMap';

const PartnerLocation: React.FC = () => {
    return (
        <div className="bg-white p-4 rounded-lg border h-full">
            <div className="h-full min-h-[400px]">
                <LiveTrackingMap />
            </div>
        </div>
    );
};

export default PartnerLocation;
