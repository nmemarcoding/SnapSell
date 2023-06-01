import React, { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
const initialProducts = [
  {
    id: 1,
    title: "Product 1",
    description: "This is the first product",
    image: "https://example.com/product1.jpg",
    category: "Category 1",
    price: 10.99,
  },
  {
    id: 2,
    title: "Product 2",
    description: "This is the second product",
    image: "https://example.com/product2.jpg",
    category: "Category 2",
    price: 19.99,
  },
  {
    id: 3,
    title: "Product 3",
    description: "This is the third product",
    image: "https://example.com/product3.jpg",
    category: "Category 1",
    price: 5.99,
  },
  // Add more products here
];

export default function AdminPage() {
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    searchQuery: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Send form data to server for processing
  };

  const handleDelete = (productId) => {
    // Delete product with given ID from server
  };

  const filteredProducts = initialProducts.filter((product) =>
    product.title.toLowerCase().includes(formData.searchQuery.toLowerCase())
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(formData);
  };

  return (
    <>
      <AdminNavbar/>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-bold mb-2"
          >
            Product Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-bold mb-2"
          >
            Product Category:
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <dive className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Product Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </dive>


        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 font-bold mb-2"
          >
            Product Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full sm:w-auto"
        >
          Create Product
        </button>
      </form>
      <br></br>
      <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Product List</h2>
        <div className="mb-4">
          <label
            htmlFor="search"
            className="block text-gray-700 font-bold mb-2"
          >
            Search Products:
          </label>
          <input
            type="text"
            id="search"
            name="searchQuery"
            value={formData.searchQuery}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">{product.title}</td>
                  <td className="border px-4 py-2">{product.category}</td>
                  <td className="border px-4 py-2">${product.price}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
