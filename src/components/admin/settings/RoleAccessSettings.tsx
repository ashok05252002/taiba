import React, { useState } from 'react';

const roles = ['Content Manager', 'Order Processor', 'Support Staff'];
const permissions = ['View Dashboard', 'Manage Users', 'Manage Products', 'Manage Orders', 'Manage Promotions'];

const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
    <button type="button" onClick={onChange} role="switch" aria-checked={checked} className={`${checked ? 'bg-taiba-blue' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}>
        <span className={`${checked ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`} />
    </button>
);

const RoleAccessSettings: React.FC = () => {
    const [access, setAccess] = useState<Record<string, Record<string, boolean>>>(
        roles.reduce((acc, role) => ({
            ...acc,
            [role]: permissions.reduce((pAcc, perm) => ({
                ...pAcc,
                [perm]: Math.random() > 0.5
            }), {})
        }), {})
    );

    const handleToggle = (role: string, permission: string) => {
        setAccess(prev => ({
            ...prev,
            [role]: {
                ...prev[role],
                [permission]: !prev[role][permission]
            }
        }));
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left font-semibold">Permission</th>
                        {roles.map(role => <th key={role} className="py-2 px-4 border-b font-semibold">{role}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {permissions.map(permission => (
                        <tr key={permission}>
                            <td className="py-3 px-4 border-b">{permission}</td>
                            {roles.map(role => (
                                <td key={role} className="py-3 px-4 border-b text-center">
                                    <ToggleSwitch checked={access[role][permission]} onChange={() => handleToggle(role, permission)} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
             <div className="text-right mt-6">
                <button onClick={() => alert('Permissions saved!')} className="px-6 py-2 bg-taiba-blue text-white rounded-md font-semibold">Save Permissions</button>
            </div>
        </div>
    );
};

export default RoleAccessSettings;
