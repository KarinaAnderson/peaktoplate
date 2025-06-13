import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { CheckCircleIcon } from '../constants';
import { CartItem as CartItemType } from '../types'; // Renamed to avoid conflict

interface LocationState {
  items: CartItemType[];
  total: number;
  deliveryMethod: "pickup" | "delivery" | "subscription";
  deliveryTime?: string;
}

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const state = location.state as LocationState | null;

  if (!state) {
    // Handle case where state is not passed, e.g., direct navigation
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">Order Information Not Found</h1>
        <p className="text-lg text-gray-500 mb-8">There was an issue retrieving your order details.</p>
        <Button as={Link} to="/" variant="primary" size="lg">
          Back to Home
        </Button>
      </div>
    );
  }

  const { items, total, deliveryMethod, deliveryTime } = state;

  return (
    <div className="max-w-2xl mx-auto text-center py-12 px-4">
      <CheckCircleIcon className="h-24 w-24 text-green-500 mx-auto mb-6" />
      <h1 className="text-4xl sm:text-5xl font-extrabold text-green-600 mb-4">Thank You!</h1>
      <p className="text-2xl text-gray-700 mb-2">Your order <span className="font-semibold">#{orderId?.replace('ORDER-', '')}</span> has been placed.</p>
      <p className="text-lg text-gray-600 mb-8">
        We've received your order and it's being processed.
        {deliveryMethod === 'pickup' && deliveryTime && ` We'll see you for pickup on ${deliveryTime}!`}
        {deliveryMethod === 'delivery' && deliveryTime && ` Your order will be delivered on ${deliveryTime}.`}
      </p>

      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 text-left mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">Order Summary</h2>
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center py-3 border-b last:border-b-0">
            <div>
              <p className="text-lg font-medium text-gray-700">{item.name} <span className="text-sm text-gray-500">(x{item.quantity})</span></p>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)} / {item.unit}</p>
            </div>
            <p className="text-lg font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <div className="flex justify-between text-xl font-bold mt-6 pt-4 border-t">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <Button as={Link} to="/" variant="primary" size="xl" className="!py-4 text-xl">
        Continue Shopping
      </Button>
    </div>
  );
};
