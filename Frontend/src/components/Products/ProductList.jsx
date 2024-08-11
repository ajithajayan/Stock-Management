import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import { baseUrl } from '../../utils/constants/Constants';
import Swal from 'sweetalert2';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showExpiredOnly, setShowExpiredOnly] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(baseUrl + 'store/products/');
      setProducts(response.data.results);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (productCode) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        await axios.delete(`${baseUrl}store/products/${productCode}/`);
        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire('Error!', 'Failed to delete the product.', 'error');
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const filterExpiredProducts = () => {
    setShowExpiredOnly(!showExpiredOnly);
  };

  const filteredProducts = showExpiredOnly
    ? products.filter(product => new Date(product.expiry_date) < new Date())
    : products;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center py-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              setEditingProduct(null);
              setShowModal(true);
            }}
          >
            Add Stock / Create Product
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={filterExpiredProducts}
          >
            {showExpiredOnly ? 'Show All Products' : 'Show Expired Products'}
          </button>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Product Code</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Barcode</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Brand</th>
                <th className="py-3 px-6 text-left">Supplier</th>
                <th className="py-3 px-6 text-left">Total Stock</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {filteredProducts.map((product) => {
                const stockClass =
                  product.total_stock === 0
                    ? 'bg-red-100'
                    : product.total_stock < 10
                    ? 'bg-yellow-100'
                    : '';

                return (
                  <tr
                    key={product.product_code}
                    className={`border-b border-gray-200 hover:bg-gray-100 ${stockClass}`}
                  >
                    <td className="py-3 px-6 text-left">{product.product_code}</td>
                    <td className="py-3 px-6 text-left">{product.name}</td>
                    <td className="py-3 px-6 text-left">{product.barcode}</td>
                    <td className="py-3 px-6 text-left">{product.category_name}</td>
                    <td className="py-3 px-6 text-left">{product.brand_name}</td>
                    <td className="py-3 px-6 text-left">{product.supplier_name}</td>
                    <td className="py-3 px-6 text-left">{product.total_stock}</td>
                    <td className="py-3 px-6 text-center space-x-2">
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 mb-2 rounded hover:bg-yellow-600"
                        onClick={() => editProduct(product)}
                      >
                        Add Stock
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => deleteProduct(product.product_code)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No products available. Add stock or create a new product to get started.
        </div>
      )}

      {showModal && (
        <ProductForm
          setShowModal={setShowModal}
          fetchProducts={fetchProducts}
          editingProduct={editingProduct}
        />
      )}
    </div>
  );
};

export default ProductList;