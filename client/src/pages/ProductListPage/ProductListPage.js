import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { publicRequest } from '../../hooks/requestMethods';

export default function ProductListPage() {
  const [nameFilter, setNameFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // geting search from url.href
    const searchInput = window.location.href.split('/')[4];
    
    publicRequest()
      .get(`product/${searchInput}`)
      .then((res) => {
       
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(nameFilter.toLowerCase()) &&
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

  const showDetails = (product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
        <div className="flex flex-wrap justify-between mb-4">
          <input
            type="text"
            placeholder="Filter by name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="w-full md:w-auto md:mr-4 mb-4 md:mb-0 px-4 py-2 border border-gray-300 rounded-md shadow-md"
          />

          <input
            type="text"
            placeholder="Filter by price"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md mb-4 md:mb-0 shadow-md"
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
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M14.707 7.293a1 1 0 0 0-1.414 0L10 10.586l-3.293-3.293a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 0-1.414z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-4">
                <img
                  src="https://hwpi.harvard.edu/sites/hwpi.harvard.edu/files/assetslibrary/files/card-600x400.png?m=1575485000"
                  alt={product.title}
                  className="w-full mb-4 rounded-md shadow-md"
                />
                <div className="font-bold text-lg mb-2">{product.title}</div>
                <div className="text-gray-700 text-base">${product.price}</div>
              </div>
              <div className="p-4">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md mr-2"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => showDetails(product)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md shadow-md"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-bold mb-2">{selectedProduct.title}</h2>
            <img
              src="https://hwpi.harvard.edu/sites/hwpi.harvard.edu/files/assetslibrary/files/card-600x400.png?m=1575485000"
              alt={selectedProduct.title}
              className="w-full mb-4 rounded-md shadow-md"
            />
            <p className="text-gray-700 mb-4">{selectedProduct.desc}</p>
            <button
              onClick={() => setSelectedProduct(null)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}