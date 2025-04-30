import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, Loader2, AlertCircle, Clock, MapPin, Mail, Phone, User, Store, Calendar, Truck } from 'lucide-react';
import api from '../../service/ApiService';
import ApiRoutes from '../../utils/ApiRoutes';

const EditTailor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    contactNumber: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    shopDescription: '',
    openingHours: '',
    workingDays: [],
    closedOn: [],
    offersPickupDelivery: false,
    deliveryCharges: 0
  });

  const weekdays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
    'Friday', 'Saturday', 'Sunday'
  ];

  useEffect(() => {
    const fetchTailorData = async () => {
      setLoading(true);
      try {
        const res = await api.get(ApiRoutes.GET_TAILOR_BY_ID.path(id), {
          authenticate: true,
        });
        setFormData(res.tailor);
      } catch (err) {
        setError('Failed to load tailor data');
        showToastMessage('Failed to load tailor data', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchTailorData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleWorkingDaysChange = (day) => {
    const workingDays = [...formData.workingDays];
    const closedOn = [...formData.closedOn];

    if (workingDays.includes(day)) {
      setFormData({
        ...formData,
        workingDays: workingDays.filter(d => d !== day),
        closedOn: [...closedOn, day],
      });
    } else {
      setFormData({
        ...formData,
        workingDays: [...workingDays, day],
        closedOn: closedOn.filter(d => d !== day),
      });
    }
  };

  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setError('');

    try {
      await api.put(ApiRoutes.EDIT_TAILOR.path(id), formData, {
        authenticate: true,
      });
      showToastMessage('Tailor shop updated successfully', 'success');
      setTimeout(() => navigate('/tailor/list'), 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update shop';
      setError(errorMessage);
      showToastMessage(errorMessage, 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  const Toast = ({ message, type }) => {
    const bgColor = type === 'success' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500';
    const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
    const icon = type === 'success' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />;
    
    return (
      <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg border-l-4 flex items-center space-x-3 ${bgColor} transition-all duration-300 ease-in-out z-50`}>
        {icon}
        <p className={`font-medium ${textColor}`}>{message}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="mt-4 text-gray-600 font-medium">Loading tailor data...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      {showToast && <Toast message={toastMessage} type={toastType} />}
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Store className="w-6 h-6 mr-2" /> 
            Edit Tailor Shop
          </h2>
          <p className="text-blue-100 mt-1">Update your tailor shop information</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shop Information */}
            <div className="space-y-6 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Shop Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <Store className="w-4 h-4 mr-1 text-gray-500" /> Shop Name
                  </label>
                  <input
                    type="text"
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <User className="w-4 h-4 mr-1 text-gray-500" /> Owner Name
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-gray-500" /> Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-gray-500" /> Opening Hours
                  </label>
                  <input
                    type="text"
                    name="openingHours"
                    value={formData.openingHours}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="e.g. 9:00 AM - 6:00 PM"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-6 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <Phone className="w-4 h-4 mr-1 text-gray-500" /> Contact Number
                  </label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <Mail className="w-4 h-4 mr-1 text-gray-500" /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>
            
            {/* Shop Description */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Shop Description</label>
              <textarea
                name="shopDescription"
                value={formData.shopDescription}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Describe your shop, services, and specialties..."
              />
            </div>
            
            {/* Working Days */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-gray-600" /> 
                Working Days
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {weekdays.map((day) => {
                  const isWorking = formData.workingDays.includes(day);
                  return (
                    <div 
                      key={day}
                      onClick={() => handleWorkingDaysChange(day)}
                      className={`cursor-pointer rounded-lg px-4 py-3 transition-all duration-200 border ${
                        isWorking 
                          ? 'bg-blue-50 border-blue-300 text-blue-800' 
                          : 'bg-gray-50 border-gray-200 text-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{day}</span>
                        <div className={`w-3 h-3 rounded-full ${isWorking ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Delivery Options */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center">
                <Truck className="w-5 h-5 mr-2 text-gray-600" /> 
                Delivery Options
              </h3>
              
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <label className="flex items-center space-x-3 bg-white px-4 py-3 rounded-lg border border-gray-200 cursor-pointer transition-all hover:border-blue-300">
                  <input
                    type="checkbox"
                    name="offersPickupDelivery"
                    checked={formData.offersPickupDelivery}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Offers Pickup & Delivery</span>
                </label>
                
                <div className={`flex items-center space-x-3 transition-all duration-300 ${formData.offersPickupDelivery ? 'opacity-100' : 'opacity-50'}`}>
                  <label className="text-sm font-medium text-gray-700">Delivery Charges (₹)</label>
                  <input
                    type="number"
                    name="deliveryCharges"
                    value={formData.deliveryCharges}
                    onChange={handleInputChange}
                    disabled={!formData.offersPickupDelivery}
                    className="w-24 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}
          
          <div className="flex justify-end pt-4 border-t border-gray-100 space-x-3">
            <button
              type="button"
              onClick={() => navigate('/tailor/list')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={saveLoading}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2 disabled:opacity-70"
            >
              {saveLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Update Shop</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTailor;