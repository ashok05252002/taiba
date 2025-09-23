import React from 'react';
import { Product } from '../../types';
import { List, Sparkles, Beaker, BookOpen } from 'lucide-react';

interface ProductInfoSectionProps {
  product: Product;
}

const InfoBlock: React.FC<{ icon: React.ElementType, title: string, children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
    <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-taiba-pistachio/20 rounded-lg flex items-center justify-center">
                <Icon className="text-taiba-purple" size={22} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <div className="pl-4 text-taiba-grey">{children}</div>
    </div>
);

const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({ product }) => {
  return (
    <div>
        <InfoBlock icon={List} title="Key Features">
            <ul className="list-disc list-inside space-y-1">
            {product.keyFeatures.map((feature, i) => (
                <li key={i}>{feature}</li>
            ))}
            </ul>
        </InfoBlock>

        <InfoBlock icon={Sparkles} title="Benefits">
            <ul className="list-disc list-inside space-y-1">
            {product.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
            ))}
            </ul>
        </InfoBlock>

        <InfoBlock icon={Beaker} title="Active Ingredients">
            <ul className="list-disc list-inside space-y-1">
            {product.activeIngredients.map((ing, i) => (
                <li key={i}>
                <strong>{ing.name}:</strong> {ing.benefit}
                </li>
            ))}
            </ul>
        </InfoBlock>

        <InfoBlock icon={BookOpen} title="Directions for Use">
            <p>{product.directionsForUse}</p>
        </InfoBlock>
    </div>
  );
};

export default ProductInfoSection;
