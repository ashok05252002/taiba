import React from 'react';
import { useParams } from 'react-router-dom';
import OrderTracker from '../components/OrderTracker';

const OrderTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // In a real app, you would fetch order data using this id
  console.log("Tracking order:", id);

  return (
    <div>
      <OrderTracker />
    </div>
  );
};

export default OrderTrackingPage;
