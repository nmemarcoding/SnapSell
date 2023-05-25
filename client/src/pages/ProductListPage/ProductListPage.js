import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';

export default function ProductListPage() {
  const [nameFilter, setNameFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: 'apple', price: 10, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 20, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 30, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Product 4', price: 40, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Product 5', price: 50, image: 'https://via.placeholder.com/150' },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
    (priceFilter === '' || product.price <= parseInt(priceFilter))
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <>
    <Navbar />
    <div className="max-w-screen-xl mx-auto p-4 pt-32">
      <div className="flex flex-wrap justify-between mb-4">
        <input
          type="text"
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="w-full md:w-auto md:mr-4 mb-4 md:mb-0 px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Filter by price"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md"
        />
        <div className="relative">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded-md shadow-md focus:outline-none focus:shadow-outline-blue focus:border-blue-500"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                d="M14.707 7.293a1 1 0 0 0-1.414 0L10 10.586l-3.293-3.293a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 0-1.414z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <img src={product.image} alt={product.name} className="w-full mb-4" />
              <div className="font-bold text-lg mb-2">{product.name}</div>
              <div className="text-gray-700 text-base">${product.price}</div>
            </div>
            <div className="p-4">
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}