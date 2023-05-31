import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { publicRequest } from '../../hooks/requestMethods';
import useStore from '../../store'; 

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const userId = useStore((state) => state.userInf._id);
  const userToken = useStore((state) => state.userInf.accessToken);
 

  useEffect(() => {
    // Make an API call to fetch the cart items from the backend
    publicRequest(userToken)
      .post('cart/getcart', {userId: userId})
      .then(res => {  
        setCartItems(res.data.items);
        setCartTotal(res.data.totalPrice);
      })
      .catch(err => {
        console.log(err);
      });
  }, [userId]);

  const Navigate = useNavigate();

  const handleQuantityChange = (itemId, action) => {
   
      if(action === 'decrease'){
       
      publicRequest(userToken)
        .delete(`cart/${itemId}/${userToken}`, {userId: userId, productId: itemId,deleteQuantity:1})
        .then(res => {
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // Update the quantity of the item
      publicRequest()
        .post(`cart`, {userId: userId, productId: itemId, quantity: 1})
        .then(res => {
          // refresh the page
          window.location.reload();
        }
        )
        .catch(err => {
          console.log(err);
        }
        );

          
         
    }
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
                <div key={item._id} className="bg-white rounded-lg shadow-md p-4 transform transition duration-300 hover:rotate-y-10 hover:skew-x-10">
                  <img src={item.product.img} alt={item.product.title} className="w-full mb-2 rounded-lg" />
                  <h2 className="text-lg font-bold mb-2">{item.product.title}</h2>
                  <p className="text-gray-700 mb-2">Price: ${item.product.price.toFixed(2)}</p>
                  <div className="flex items-center mb-2">
                    <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg mr-2" onClick={() => handleQuantityChange(item.product._id, 'decrease')}>-</button>
                    <span>{item.quantity}</span>
                    <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg ml-2" onClick={() => handleQuantityChange(item.product._id, 'increase')}>+</button>
                  </div>
                  <p className="text-gray-700 font-bold">Total: ${(item.quantity * item.product.price).toFixed(2)}</p>
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