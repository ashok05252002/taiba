import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { StaffMember } from '../../../pages/admin/StoreManagementPage';

interface EditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffMember: StaffMember | null;
  onSave: (staff: StaffMember) => void;
}

const EditStaffModal: React.FC<EditStaffModalProps> = ({ isOpen, onClose, staffMember, onSave }) => {
  const [formData, setFormData] = useState<StaffMember | null>(null);

  useEffect(() => {
    setFormData(staffMember);
  }, [staffMember]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSave = () => {
    if (formData) {
      onSave(formData);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && formData && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-xl font-bold mb-4">Edit Staff Member</h2>
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
              </div>
              <div>
                <label className="text-sm font-medium">Role</label>
                <select name="role" value={formData.role} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md">
                  <option>Pharmacist</option>
                  <option>Manager</option>
                  <option>Cashier</option>
                  <option>Technician</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
              </div>
            </form>
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-taiba-blue text-white rounded-md text-sm font-semibold">Save Changes</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditStaffModal;
