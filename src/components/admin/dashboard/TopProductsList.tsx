import React from 'react';
import { faker } from '@faker-js/faker';

const TopProductsList: React.FC = () => {
  const products = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    image: faker.image.urlLoremFlickr({ category: 'medicine' }),
    sales: faker.number.int({ min: 50, max: 500 }),
  })).sort((a, b) => b.sales - a.sales);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-4">Top Selling Products</h3>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="flex items-center space-x-4">
            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-md object-cover" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 truncate">{product.name}</p>
              <p className="text-xs text-gray-500">Total Sales</p>
            </div>
            <span className="text-sm font-bold text-gray-800">{product.sales}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopProductsList;
