import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/constants/Constants';

const BranchModal = ({ setShowModal, fetchBranches }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contactDetails, setContactDetails] = useState('');

  const handleCreateBranch = async () => {
    try {
      await axios.post(baseUrl+'store/branches/', {
        name,
        location,
        contact_details: contactDetails,
      });
      fetchBranches();
      setShowModal(false);
    } catch (error) {
      console.error('Error creating branch:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Create Branch</h3>
          <button onClick={() => setShowModal(false)}>
            &times;
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Branch Name</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Contact Details</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={contactDetails}
            onChange={(e) => setContactDetails(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleCreateBranch}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default BranchModal;
