import React, { useState, useEffect } from 'react';
import api from '../../service/ApiService';
import ApiRoutes from '../../utils/ApiRoutes';

const TailorEditModal = ({ isOpen, onClose, tailor, onUpdate }) => {
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    contactNumber: '',
    address: '',
    city: '',
    pincode: '',
  });
  

  useEffect(() => {
    if (tailor) {
      setFormData(tailor);
    }
  }, [tailor]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`${ApiRoutes.EDIT_TAILOR.path}/${tailor._id}`, formData, {
        authenticate: true,
      });
      onUpdate();
      onClose();
    } catch (err) {
      console.error('Edit failed', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600/80 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Tailor Shop</h2>
        <form onSubmit={handleSubmit}>
          <input name="shopName" value={formData.shopName || ''} onChange={handleChange} placeholder="Shop Name" className="border p-2 w-full mb-2" />
          <input name="ownerName" value={formData.ownerName || ''} onChange={handleChange} placeholder="Owner Name" className="border p-2 w-full mb-2" />
          <input name="contactNumber" value={formData.contactNumber || ''} onChange={handleChange} placeholder="Contact Number" className="border p-2 w-full mb-2" />
          <input name="address" value={formData.address || ''} onChange={handleChange} placeholder="Address" className="border p-2 w-full mb-2" />
          <input name="city" value={formData.city || ''} onChange={handleChange} placeholder="City" className="border p-2 w-full mb-2" />
          <input name="pincode" value={formData.pincode || ''} onChange={handleChange} placeholder="Pincode" className="border p-2 w-full mb-4" />

          <div className="flex justify-between">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TailorEditModal;
