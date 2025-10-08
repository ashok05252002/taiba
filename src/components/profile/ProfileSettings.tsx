import React from 'react';
import { motion } from 'framer-motion';

const ProfileSettings = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" defaultValue="Ahmed Ali" className="mt-1 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" defaultValue="+968 9876 5432" className="mt-1 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-blue" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" defaultValue="ahmed.ali@email.com" readOnly className="mt-1 block w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold border-t pt-6 mt-6">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">New Password</label>
                            <input type="password" placeholder="••••••••" className="mt-1 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-blue" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                            <input type="password" placeholder="••••••••" className="mt-1 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-blue" />
                        </div>
                    </div>
                </div>
                <div className="pt-4">
                    <motion.button
                        type="submit"
                        className="bg-taiba-blue text-white px-6 py-2 rounded-lg font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Save Changes
                    </motion.button>
                </div>
            </form>
        </div>
    );
};

export default ProfileSettings;
