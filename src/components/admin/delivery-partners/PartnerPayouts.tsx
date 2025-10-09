import React from 'react';

type Payout = {
    id: string;
    date: string;
    amount: string;
    status: string;
};

interface PartnerPayoutsProps {
    payouts: Payout[];
}

const PartnerPayouts: React.FC<PartnerPayoutsProps> = ({ payouts }) => {
    return (
        <div className="bg-white p-4 rounded-lg border">
             <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold">Payout History</h4>
                <button className="px-3 py-1.5 bg-taiba-blue text-white rounded-md text-sm">Initiate Payout</button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Payout ID</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {payouts.map(payout => (
                            <tr key={payout.id}>
                                <td className="px-4 py-3 text-sm font-medium">{payout.id}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{payout.date}</td>
                                <td className="px-4 py-3 text-sm font-semibold">OMR {payout.amount}</td>
                                <td className="px-4 py-3 text-sm text-green-600">{payout.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PartnerPayouts;
