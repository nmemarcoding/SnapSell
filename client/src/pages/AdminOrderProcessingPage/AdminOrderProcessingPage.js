import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';
import { publicRequest } from '../../hooks/requestMethods';

export default function AdminOrderProcessingPage() {
  const [items, setItems] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const orderId = window.location.href.split('?')[1].split('=')[1];
    publicRequest()
      .get(`order/${orderId}`)
      .then((response) => {
        setItems(response.data.items);
        setAddress(response.data.shippingAddress);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const nextItem = () => {
    if (currentItemIndex >= items.length - 1) {
      setCurrentItemIndex(0);
    } else {
      setCurrentItemIndex((prevIndex) => prevIndex + 1);
    }
  };

  const pickItem = () => {
    // remove item from items array with current index
    const newItems = [...items];
    newItems.splice(currentItemIndex, 1);
    setItems(newItems);
  };



  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminNavbar /> 
      <br></br>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-8">Order Processing</h1>
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
          {items.length === 0 ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Done</h2>
              <p className="text-lg font-bold mb-2">Shipping Address: {address}</p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">
                Current Item: {items[currentItemIndex]?.product?.title}
              </h2>
              <div className="mb-4">
                <img
                  src={items[currentItemIndex]?.product?.img}
                  alt={`Image of ${items[currentItemIndex]?.product?.title}`}
                  className="w-64 h-64 object-contain"
                />
              </div>
              <p className="text-lg font-bold mb-2">
                Quantity: {items[currentItemIndex]?.quantity}
              </p>
              <div className="flex">
                <button
                  onClick={pickItem}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Pick Item
                </button>
                <button
                  onClick={nextItem}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}