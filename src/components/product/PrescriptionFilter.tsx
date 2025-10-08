import React, { useState } from 'react';

interface PrescriptionFilterProps {
  onFilterChange: (isActive: boolean) => void;
}

const PrescriptionFilter: React.FC<PrescriptionFilterProps> = ({ onFilterChange }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    const newIsActive = !isActive;
    setIsActive(newIsActive);
    onFilterChange(newIsActive);
  };

  return (
    <div className="border-t pt-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">Prescription</h3>
      <div className="flex items-center justify-between">
        <label htmlFor="prescription-toggle" className="text-sm font-medium text-gray-700">
          Show prescription items only
        </label>
        <button
          onClick={handleToggle}
          role="switch"
          aria-checked={isActive}
          className={`${
            isActive ? 'bg-taiba-purple' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
        >
          <span
            className={`${
              isActive ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </button>
      </div>
    </div>
  );
};

export default PrescriptionFilter;
