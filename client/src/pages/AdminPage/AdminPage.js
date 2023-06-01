import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import { publicRequest } from "../../hooks/requestMethods";
import store from "../../store";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    categories: "",
    price: "",
    img:"test",
    searchQuery: "",
    token:store.getState().userInf.accessToken,
  });
  
 
  const [products, setProducts] = useState([]);

  useEffect(() => {
   try{
    publicRequest()
      .get("product")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
   }
    catch(err){
      console.log(err);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    publicRequest()
      .post("product", formData)
      .then((res) => {
        alert("Product added successfully!");
        window.location.reload();
        
      })
      .catch((err) => {
        console.log(err);
      });
    // Send form data to server for processing
  };

  const handleDelete = (productId) => {
    // Delete product with given ID from server
    ;
    publicRequest()
      .delete(`product/${productId}`)
      .then((res) => {
        alert("Product deleted successfully!");
        window.location.reload();
      }
      )
      .catch((err) => {
        console.log(err);
      }
      );
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(formData.searchQuery.toLowerCase())
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
   
  };

  return (
    <>
      <AdminNavbar />
      <br></br>
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
            htmlFor="categories"
            className="block text-gray-700 font-bold mb-2"
          >
            Product Category:
          </label>
          <input
            type="text"
            id="categories"
            name="categories"
            value={formData.categories}
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
            name="desc"
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
                <tr key={product._id}>
                  <td className="border px-4 py-2">{product.title}</td>
                  <td className="border px-4 py-2">{product.categories}</td>
                  <td className="border px-4 py-2">${product.price}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(product._id)}
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
