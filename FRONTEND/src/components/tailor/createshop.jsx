import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Camera, Save, Store, User, Phone, Mail, MapPin, 
  Clock, Calendar, Truck, Info, X, Plus, Trash2
} from 'lucide-react';
import api from '../../service/ApiService';
import ApiRoutes from '../../utils/ApiRoutes';

const CreateTailor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Add new state for tailor image
  const [tailorImage, setTailorImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    contactNumber: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    shopDescription: '',
    openingHours: '9:00 AM - 8:00 PM',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    closedOn: ['Sunday'],
    offersPickupDelivery: false,
    deliveryCharges: 0
  });

  // Working days options
  const weekdays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
    'Friday', 'Saturday', 'Sunday'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // New function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setTailorImage(file);
      
      // Create a preview URL for the image
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImagePreview(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // Function to remove the selected image
  const handleRemoveImage = () => {
    setTailorImage(null);
    setImagePreview('');
  };

  const handleWorkingDaysChange = (day) => {
    const currentWorkingDays = [...formData.workingDays];
    const currentClosedDays = [...formData.closedOn];
    
    if (currentWorkingDays.includes(day)) {
      // Remove from working days and add to closed days
      setFormData({
        ...formData,
        workingDays: currentWorkingDays.filter(d => d !== day),
        closedOn: [...currentClosedDays, day]
      });
    } else {
      // Remove from closed days and add to working days
      setFormData({
        ...formData,
        workingDays: [...currentWorkingDays, day],
        closedOn: currentClosedDays.filter(d => d !== day)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Create FormData object to send both JSON and file data
      const submitData = new FormData();
      
      // Append all the form fields
      Object.keys(formData).forEach(key => {
        if (Array.isArray(formData[key])) {
          // Handle arrays by appending as JSON string
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });
      
      // Append the image file if it exists
      if (tailorImage) {
        submitData.append('shopImage', tailorImage);
      }
      
      const response = await api.post(ApiRoutes.CREATE_TAILOR.path, submitData, {
        authenticate: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/tailor/list');
      }, 1500);
    } catch (error) {
      console.error('Error creating tailor shop:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Failed to create tailor shop. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all"
              onClick={() => navigate('/tailor/list')}
            >
              <ArrowLeft size={20} />
            </motion.button>
            <div>
              <h1 className="text-3xl font-bold">Create New Tailor Shop</h1>
              <p className="mt-1 text-indigo-100">Fill in the details to set up your new shop</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Success message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md"
          >
            <div className="flex items-center">
              <div className="py-1">
                <svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                </svg>
              </div>
              <div>
                <p className="font-bold">Shop Created Successfully!</p>
                <p className="text-sm">Redirecting to shop list...</p>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md"
          >
            <div className="flex items-center">
              <div className="py-1">
                <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                </svg>
              </div>
              <div>
                <p className="font-bold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
              <button onClick={() => setError('')} className="ml-auto">
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
        
        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information Section */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <Store className="mr-2 text-indigo-600" size={20} />
                    Basic Information
                  </h3>
                  <div className="h-px bg-gradient-to-r from-indigo-500 to-purple-500 mb-6"></div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
                    <div className="relative">
                      <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        name="shopName"
                        required
                        value={formData.shopName}
                        onChange={handleInputChange}
                        className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="Enter shop name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        name="ownerName"
                        required
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="Enter owner name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="tel"
                        name="contactNumber"
                        required
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="Enter contact number"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="Enter email address (optional)"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shop Description</label>
                    <div className="relative">
                      <Info className="absolute left-3 top-3 text-gray-400" size={16} />
                      <textarea
                        name="shopDescription"
                        value={formData.shopDescription}
                        onChange={handleInputChange}
                        rows="3"
                        className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="Describe your shop and services"
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                {/* Location Section */}
                <div className="md:col-span-2 mt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <MapPin className="mr-2 text-indigo-600" size={20} />
                    Location Details
                  </h3>
                  <div className="h-px bg-gradient-to-r from-indigo-500 to-purple-500 mb-6"></div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
                    <textarea
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="2"
                      className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="Enter shop address"
                    ></textarea>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="Enter city"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="Enter pincode"
                    />
                  </div>
                </div>
                
                {/* Business Hours Section */}
                <div className="md:col-span-2 mt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <Clock className="mr-2 text-indigo-600" size={20} />
                    Business Hours
                  </h3>
                  <div className="h-px bg-gradient-to-r from-indigo-500 to-purple-500 mb-6"></div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Opening Hours</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      name="openingHours"
                      value={formData.openingHours}
                      onChange={handleInputChange}
                      className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      placeholder="e.g. 9:00 AM - 8:00 PM"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Working Days</label>
                  <div className="flex flex-wrap gap-2">
                    {weekdays.map(day => (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        key={day}
                        onClick={() => handleWorkingDaysChange(day)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                          formData.workingDays.includes(day)
                            ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                        }`}
                      >
                        {day}
                      </motion.button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Select the days your shop is open</p>
                </div>
                
                {/* Delivery Options */}
                <div className="md:col-span-2 mt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <Truck className="mr-2 text-indigo-600" size={20} />
                    Delivery Options
                  </h3>
                  <div className="h-px bg-gradient-to-r from-indigo-500 to-purple-500 mb-6"></div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <input
                      id="offersPickupDelivery"
                      name="offersPickupDelivery"
                      type="checkbox"
                      checked={formData.offersPickupDelivery}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="offersPickupDelivery" className="ml-2 block text-sm font-medium text-gray-700">
                      Offer pickup and delivery service
                    </label>
                  </div>
                  
                  {formData.offersPickupDelivery && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 ml-7"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Charges (₹)</label>
                      <input
                        type="number"
                        name="deliveryCharges"
                        value={formData.deliveryCharges}
                        onChange={handleInputChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="0"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Enter 0 for free delivery</p>
                    </motion.div>
                  )}
                </div>
                
                {/* Upload Section - Updated with actual functionality */}
                <div className="md:col-span-2 mt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <Camera className="mr-2 text-indigo-600" size={20} />
                    Shop Photos
                  </h3>
                  <div className="h-px bg-gradient-to-r from-indigo-500 to-purple-500 mb-6"></div>
                  
                  {!imagePreview ? (
                    <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                      <div className="text-center">
                        <Camera className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">Upload a photo of your shop</p>
                          <p className="text-xs text-gray-500">(Recommended: JPG, PNG, or WEBP format)</p>
                        </div>
                        <label htmlFor="shopImage" className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md text-sm font-medium inline-block cursor-pointer hover:shadow-md transition-all">
                          Choose File
                        </label>
                        <input
                          id="shopImage"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-700">Shop Image Preview</h4>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={handleRemoveImage}
                          className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-all"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                      <div className="relative w-full h-64 overflow-hidden rounded-md bg-gray-200">
                        <img 
                          src={imagePreview} 
                          alt="Shop preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {tailorImage?.name} ({(tailorImage?.size / (1024 * 1024)).toFixed(2)} MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="mt-8 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  className={`px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Create Shop
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateTailor;