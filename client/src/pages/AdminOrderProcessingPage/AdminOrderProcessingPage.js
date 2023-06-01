import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';
import { publicRequest } from '../../hooks/requestMethods';

export default function AdminOrderProcessingPage() {
  const [items, setItems] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    // Make an API call to fetch the cart items from the backend
    // geting name query from url
    const orderId = window.location.href.split("?")[1].split("=")[1];

    publicRequest()
        
      .get(`order/${orderId}`)
      .then((response) => {
        
        setItems(response.data.items); // Set the items state to the response data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleItemReady = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, readyForShipping: true } : item
      )
    );
    setCurrentItemIndex((prevIndex) => prevIndex + 1);
  };

  const currentItem = items[currentItemIndex]?.product;

  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-8">Order Processing</h1>
        {currentItem ? (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">
              Current Item: {currentItem.title}
            </h2>
            <div className="mb-4">
              <img
                src={currentItem.img}
                alt={`Image of ${currentItem.title}`}
              />
            </div>
            <p className="text-lg font-bold mb-2">
              Quantity: {items[currentItemIndex].quantity}
            </p>
            {items[currentItemIndex].readyForShipping ? (
              <p className="text-green-500 font-bold">
                Item is ready for shipping
              </p>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleItemReady(items[currentItemIndex]._id)}
              >
                Mark as Ready
              </button>
            )}
          </div>
        ) : (
          <p className="text-green-500 font-bold">
            All items have been processed
          </p>
        )}
      </div>
    </>
  );
}
