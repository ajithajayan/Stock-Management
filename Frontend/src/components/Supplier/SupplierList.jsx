import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SupplierModal from './SupplierModal'; // Modal component for creating a supplier
import { baseUrl } from '../../utils/constants/Constants';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(baseUrl + 'store/suppliers/');
      console.log(response.data); // Debug: Check the fetched data
      setSuppliers(response.data.results); // Access the results array
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const deleteSupplier = async (supplierId) => {
    try {
      await axios.delete(`${baseUrl}store/suppliers/${supplierId}/`);
      fetchSuppliers(); // Refresh the supplier list after deletion
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center py-4">
        <h2 className="text-2xl font-bold">Suppliers</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setShowModal(true)}
        >
          Create Supplier
        </button>
      </div>

      {suppliers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Supplier ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Mobile Number</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Location</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{supplier.id}</td>
                  <td className="py-3 px-6 text-left">{supplier.name}</td>
                  <td className="py-3 px-6 text-left">{supplier.mobile_number}</td>
                  <td className="py-3 px-6 text-left">{supplier.email}</td>
                  <td className="py-3 px-6 text-left">{supplier.location}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => deleteSupplier(supplier.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">No suppliers available. Create a new one to get started.</div>
      )}

      {showModal && (
        <SupplierModal 
          setShowModal={setShowModal}
          fetchSuppliers={fetchSuppliers}
        />
      )}
    </div>
  );
};

export default SupplierList;
