import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartViewItem } from '../components/CartViewItem';
import { Button } from '../components/Button';
import { ShoppingCartIcon } from '../constants';

type DeliveryMethod = "pickup" | "delivery" | "subscription";

export const CartPage: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  // For simplicity, assuming all items are from one farm for pickup/delivery options.
  // A real app would need to handle multi-farm carts.
  const farmForPickup = cartItems.length > 0 ? cartItems[0].farmId : null; // Simplified

  const handleProceedToPayment = () => {
    if (!deliveryMethod) {
      alert("Please select how you'd like to get your order.");
      return;
    }
    if ((deliveryMethod === 'pickup' || deliveryMethod === 'delivery') && !selectedTimeSlot) {
      alert("Please select a time slot.");
      return;
    }
    
    // Simulate payment and order creation
    const orderId = `ORDER-${Date.now()}`; 
    // In a real app, you'd save the order here.
    // For this simulation, we'll pass some data via navigate state.
    navigate(`/order-confirmation/${orderId}`, { 
        state: { 
            items: cartItems, 
            total: getCartTotal(), 
            deliveryMethod,
            deliveryTime: selectedTimeSlot 
        } 
    });
    clearCart(); 
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingCartIcon className="h-24 w-24 text-gray-300 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-700 mb-4">Your Cart is Empty</h1>
        <p className="text-xl text-gray-500 mb-8">Looks like you haven't added any local goodies yet!</p>
        <Button as={Link} to="/" variant="primary" size="xl">
          Start Shopping
        </Button>
      </div>
    );
  }

  const subtotal = getCartTotal();
  // Simplified delivery/service fee
  const fee = deliveryMethod === 'delivery' ? 5.00 : 0; 
  const total = subtotal + fee;

  // Mock time slots
  const pickupSlots = ["Thu, 10 AM - 11 AM", "Fri, 2 PM - 3 PM", "Sat, 11 AM - 12 PM"];
  const deliverySlots = ["Wednesday, 4 PM - 6 PM", "Thursday, 5 PM - 7 PM"];

  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-10 text-center">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Order Summary</h2>
          {cartItems.map(item => (
            <CartViewItem key={item.id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1 bg-white p-6 sm:p-8 shadow-xl rounded-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">How to get it?</h3>
            <div className="space-y-3">
              {/* Simplified: assumes single farm for pickup */}
              {farmForPickup && (
                <Button 
                  onClick={() => { setDeliveryMethod('pickup'); setSelectedTimeSlot(null); }} 
                  variant={deliveryMethod === 'pickup' ? 'primary' : 'secondary'} 
                  fullWidth size="lg"
                  className="justify-start !py-4"
                >
                  Pickup @ Farm (Farm ID: {farmForPickup})
                </Button>
              )}
              <Button 
                onClick={() => { setDeliveryMethod('delivery'); setSelectedTimeSlot(null); }} 
                variant={deliveryMethod === 'delivery' ? 'primary' : 'secondary'} 
                fullWidth size="lg"
                className="justify-start !py-4"
              >
                Delivery (if available)
              </Button>
              <Button 
                onClick={() => { setDeliveryMethod('subscription'); setSelectedTimeSlot(null); }} 
                variant={deliveryMethod === 'subscription' ? 'primary' : 'secondary'} 
                fullWidth size="lg"
                className="justify-start !py-4"
                disabled // Subscription flow not fully built
              >
                Subscription (Coming Soon)
              </Button>
            </div>
          </div>

          {deliveryMethod === 'pickup' && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Select Pickup Slot:</h3>
              <div className="space-y-2">
                {pickupSlots.map(slot => (
                  <Button key={slot} onClick={() => setSelectedTimeSlot(slot)} variant={selectedTimeSlot === slot ? 'primary' : 'ghost'} fullWidth className="text-left !justify-start !py-3">
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {deliveryMethod === 'delivery' && (
             <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Select Delivery Slot:</h3>
              <div className="space-y-2">
                {deliverySlots.map(slot => (
                  <Button key={slot} onClick={() => setSelectedTimeSlot(slot)} variant={selectedTimeSlot === slot ? 'primary' : 'ghost'} fullWidth className="text-left !justify-start !py-3">
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6 space-y-3">
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
            </div>
            {deliveryMethod === 'delivery' && (
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Delivery Fee:</span>
                <span className="font-semibold text-gray-800">${fee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-2xl font-bold">
              <span className="text-gray-800">Total:</span>
              <span className="text-green-600">${total.toFixed(2)}</span>
            </div>
          </div>

          <Button 
            onClick={handleProceedToPayment} 
            variant="primary" 
            size="xl" 
            fullWidth 
            className="mt-8 !py-5 text-2xl"
            disabled={!deliveryMethod || ((deliveryMethod === 'pickup' || deliveryMethod === 'delivery') && !selectedTimeSlot) }
          >
            Pay Now (Simulated)
          </Button>
        </div>
      </div>
    </div>
  );
};
