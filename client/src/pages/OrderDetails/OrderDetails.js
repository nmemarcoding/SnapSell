import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { publicRequest } from '../../hooks/requestMethods';

export default function OrderDetails(props) {
  const [orderData, setOrderData] = useState(null);
  const [orderId, setOrderId] = useState(window.location.search.split('=')[1]);
  
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const res = await publicRequest().get(`order/${orderId}`);
        setOrderData(res.data);
      } catch (error) {
        console.error("Failed to fetch order data: ", error);
        // Handle error appropriately, possibly with a state variable
      }
    };
  
    fetchOrderData();
  }, []);

 


  

  return (
    <>
      <Navbar />
      {!orderData && <div>Loading...</div>}
      {orderData && (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mt-20">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
          {orderData.items.map(item => (
            <li key={item.product._id} className="py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={item.product.img} alt="" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{item.product.title}</p>
                  <p className="text-sm text-gray-500">${item.product.price} x {item.quantity}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">${item.product.price * item.quantity}</p>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-6">
          <p className="text-lg font-medium">Total:</p>
          <p className="text-lg font-medium">${orderData.totalPrice}</p>
        </div>
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-900">Shipping Address:</p>
          <p className="text-sm text-gray-500">{orderData.shippingAddress}</p>
        </div>
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-900">Status:</p>
          <p className="text-sm text-gray-500">{orderData.status}</p>
        </div>
      </div>
      )}
    </>
  );
}