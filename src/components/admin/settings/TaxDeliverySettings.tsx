import React from 'react';

interface TaxDeliverySettingsProps {
    taxRate: number;
    setTaxRate: (rate: number) => void;
    deliveryCharges: { standard: number; express: number; freeAbove: number; };
    setDeliveryCharges: (charges: { standard: number; express: number; freeAbove: number; }) => void;
    onSave: () => void;
}

const TaxDeliverySettings: React.FC<TaxDeliverySettingsProps> = ({ taxRate, setTaxRate, deliveryCharges, setDeliveryCharges, onSave }) => {
    return (
        <div className="space-y-8">
            <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-4 text-lg">Tax Configuration</h3>
                <div className="flex items-center gap-4">
                    <label htmlFor="tax-rate" className="font-medium">VAT Rate (%):</label>
                    <input type="number" id="tax-rate" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} className="w-24 p-2 border rounded-md" />
                </div>
            </div>
            <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-4 text-lg">Delivery Charges</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <label htmlFor="standard-delivery" className="font-medium w-40">Standard Delivery (OMR):</label>
                        <input type="number" id="standard-delivery" value={deliveryCharges.standard} onChange={e => setDeliveryCharges({...deliveryCharges, standard: Number(e.target.value)})} className="w-24 p-2 border rounded-md" />
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="express-delivery" className="font-medium w-40">Express Delivery (OMR):</label>
                        <input type="number" id="express-delivery" value={deliveryCharges.express} onChange={e => setDeliveryCharges({...deliveryCharges, express: Number(e.target.value)})} className="w-24 p-2 border rounded-md" />
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="free-delivery" className="font-medium w-40">Free Delivery Above (OMR):</label>
                        <input type="number" id="free-delivery" value={deliveryCharges.freeAbove} onChange={e => setDeliveryCharges({...deliveryCharges, freeAbove: Number(e.target.value)})} className="w-24 p-2 border rounded-md" />
                    </div>
                </div>
            </div>
            <div className="text-right">
                <button onClick={onSave} className="px-6 py-2 bg-taiba-blue text-white rounded-md font-semibold">Save Changes</button>
            </div>
        </div>
    );
};

export default TaxDeliverySettings;
