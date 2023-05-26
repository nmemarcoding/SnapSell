import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

export default function OrderDetails(props) {
  const items = [
    { name: 'Item 1', price: 10.99, quantity: 2 },
    { name: 'Item 2', price: 5.99, quantity: 1 },
    { name: 'Item 3', price: 7.99, quantity: 3 }
  ];

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const shippingMethod = 'Standard Shipping';
  const orderStatus = 'Processing';

  return (
    <>
      <Navbar />
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mt-20">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
          {items.map(item => (
            <li key={item.name} className="py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src="https://via.placeholder.com/150" alt="" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">${item.price * item.quantity}</p>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-6">
          <p className="text-lg font-medium">Total:</p>
          <p className="text-lg font-medium">${total}</p>
        </div>
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-900">Shipping Method:</p>
          <p className="text-sm text-gray-500">{shippingMethod}</p>
        </div>
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-900">Status:</p>
          <p className="text-sm text-gray-500">{orderStatus}</p>
        </div>
      </div>
    </>
  )
}