import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', quantity: 1, image: 'https://hwpi.harvard.edu/sites/hwpi.harvard.edu/files/assetslibrary/files/card-600x400.png?m=1575485000' },
    { id: 2, name: 'Item 2', quantity: 2, image: 'https://hwpi.harvard.edu/sites/hwpi.harvard.edu/files/assetslibrary/files/card-600x400.png?m=1575485000' },
    { id: 3, name: 'Item 3', quantity: 3, image: 'https://hwpi.harvard.edu/sites/hwpi.harvard.edu/files/assetslibrary/files/card-600x400.png?m=1575485000' },
  ]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.quantity * 10, 0);
    setCartTotal(total);
  }, [cartItems]);

  const Navigate = useNavigate();

  const handleQuantityChange = (itemId, action) => {
    setCartItems(prevCartItems => {
      return prevCartItems.map(item => {
        if (item.id === itemId) {
          if (action === 'increase') {
            return { ...item, quantity: item.quantity + 1 };
          } else if (action === 'decrease') {
            const newQuantity = item.quantity - 1;
            if (newQuantity === 0) {
              return null; // remove the item from the cart
            } else {
              return { ...item, quantity: newQuantity };
            }
          }
        }
        return item;
      }).filter(Boolean); // remove null items from the array
    });
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    // Navigate to the OrderReview page
    Navigate('/orderreview');
  };

  return (
    <div>
      {/* Add your navbar component here */}
      <Navbar />

      {/* The existing content of the CartPage component */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Cart</h1>
        <div className="mt-4 text-right mb-4">
          <p className="text-gray-700 font-bold">Cart Total: ${cartTotal.toFixed(2)}</p>
        </div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cartItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4 transform transition duration-300 hover:rotate-y-10 hover:skew-x-10">
                  <img src={item.image} alt={item.name} className="w-full mb-2 rounded-lg" />
                  <h2 className="text-lg font-bold mb-2">{item.name}</h2>
                  <p className="text-gray-700 mb-2">Price: $10.00</p>
                  <div className="flex items-center mb-2">
                    <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg mr-2" onClick={() => handleQuantityChange(item.id, 'decrease')}>-</button>
                    <span>{item.quantity}</span>
                    <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg ml-2" onClick={() => handleQuantityChange(item.id, 'increase')}>+</button>
                  </div>
                  <p className="text-gray-700 font-bold">Total: ${(item.quantity * 10).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full" onClick={handleCheckout}>Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}