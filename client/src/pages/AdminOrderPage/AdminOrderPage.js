import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';
import { publicRequest } from '../../hooks/requestMethods';
import store from '../../store';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const token = store.getState().userInf.accessToken;

  useEffect(() => {
    publicRequest()
      .get(`order?token=${token}`)
      .then(response => {
        console.log(response);
        setOrders(response.data); // Extract the data property from the response
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border">Customer</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 border">{order.user.email}</td>
                  <td className="p-2 border">{order.items.length}</td>
                  <td className="p-2 border">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}