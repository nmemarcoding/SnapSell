import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'

export default function OrderReview() {
  const orderSummary = {
    items: [
      { name: 'Item 1', price: 20, quantity: 2 },
      { name: 'Item 2', price: 30, quantity: 1 },
      { name: 'Item 3', price: 25, quantity: 3 }
    ],
    total: 125
  }

  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  })

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value)
  }

  const handleShippingAddressChange = (event) => {
    const { name, value } = event.target
    setShippingAddress(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const Navigate = useNavigate()

  const handlePlaceOrderClick = () => {
    Navigate('/orderdetails')
  }

  return (
    <div>
      <Navbar />
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mt-20">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
          {orderSummary.items.map(item => (
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
          <p className="text-lg font-medium">${orderSummary.total}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input type="text" id="name" name="name" value={shippingAddress.name} onChange={handleShippingAddressChange} className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border" />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input type="text" id="address" name="address" value={shippingAddress.address} onChange={handleShippingAddressChange} className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border" />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input type="text" id="city" name="city" value={shippingAddress.city} onChange={handleShippingAddressChange} className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border" />
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <input type="text" id="state" name="state" value={shippingAddress.state} onChange={handleShippingAddressChange} className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border" />
          </div>
          <div className="mb-4">
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2">Zip</label>
            <input type="text" id="zip" name="zip" value={shippingAddress.zip} onChange={handleShippingAddressChange} className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border" />
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="credit-card"
              name="payment-method"
              value="credit-card"
              checked={paymentMethod === 'credit-card'}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <label htmlFor="credit-card">Credit Card</label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="paypal"
              name="payment-method"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
          {paymentMethod === 'credit-card' && (
            <div>
              <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
              <input type="text" id="card-number" name="card-number" className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border" />
              <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 mt-4 mb-2">Expiry Date</label>
              <input type="text" id="expiry-date" name="expiry-date" className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border" />
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mt-4 mb-2">CVV</label>
              <input type="text" id="cvv" name="cvv" className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border" />
            </div>
          )}
          {paymentMethod === 'paypal' && (
            <div>
              <p>Pay with PayPal</p>
            </div>
          )}
        </div>
        <button className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded" onClick={handlePlaceOrderClick}>
          Place Order
        </button>
      </div>
    </div>
  )
}