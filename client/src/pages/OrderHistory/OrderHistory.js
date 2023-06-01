import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

export default function OrderHistory() {
  const orders = [
    { id: 1, date: '2021-10-01', total: 100 },
    { id: 2, date: '2021-10-02', total: 200 },
    { id: 3, date: '2021-10-03', total: 300 },
  ]

  return (
    <>
      <Navbar />
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mt-20">
        <h2 className="text-2xl font-bold mb-4">Order History</h2>
        <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
          {orders.map(order => (
            <li key={order.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 15H12a3 3 0 003-3V6" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 10H14a2 2 0 00-2 2v2" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-500">Date: {order.date}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">${order.total}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}