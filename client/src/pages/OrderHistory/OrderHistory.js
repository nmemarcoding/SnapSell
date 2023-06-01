import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { publicRequest } from '../../hooks/requestMethods';
import useStore from '../../store';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const userId = useStore((state) => state.userInf._id);

  useEffect(() => {
    publicRequest()
      .get(`order/user/${userId}`)
      .then(res => {
        const sortedOrders = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort the orders by creation time
        setOrders(sortedOrders);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mt-20">
        <h2 className="text-2xl font-bold mb-4">Order History</h2>
        <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
          {orders.map(order => (
            <li key={order._id} className="py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 15H12a3 3 0 003-3V6" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 10H14a2 2 0 00-2 2v2" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Total: ${order.totalPrice.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Quantity: {order.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
                <Link to={`/orderdetails?orderNumber=${order._id}`} className="text-sm text-blue-500">View Details</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}