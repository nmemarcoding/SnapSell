import React from 'react'
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar'

const orders = [
  { id: 1, customer: 'John Doe', product: 'Widget', quantity: 2, total: 100 },
  { id: 2, customer: 'Jane Smith', product: 'Gadget', quantity: 1, total: 50 },
  { id: 3, customer: 'Bob Johnson', product: 'Thingamajig', quantity: 3, total: 200 },
]

export default function OrdersPage() {
  return (
    <>
      <AdminNavbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Customer</th>
                <th className="p-2 border">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="p-2 border">{order.id}</td>
                  <td className="p-2 border">{order.customer}</td>
                  <td className="p-2 border">{order.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}