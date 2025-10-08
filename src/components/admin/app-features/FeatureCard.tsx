import React from 'react';

interface FeatureCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 bg-taiba-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="text-taiba-blue" size={24} />
            </div>
            <div>
                <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
};

export default FeatureCard;
