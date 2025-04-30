import { AnimatePresence, motion } from 'framer-motion';
import { Edit, MapPin, Phone, PlusCircle, Search, Trash2, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../service/ApiService.jsx';
import ApiRoutes from '../../utils/ApiRoutes.jsx';

const TailorList = () => {
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTailor, setSelectedTailor] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tailorToDelete, setTailorToDelete] = useState(null);
  const navigate = useNavigate();

  const colorTheme = {
    primary: '#2c3e50',    // Deep blue-gray
    secondary: '#8e44ad',  // Royal purple
    accent: '#f39c12',     // Golden orange
    light: '#ecf0f1',      // Light gray
    dark: '#2c3e50',       // Dark slate
    success: '#27ae60',    // Emerald green
    background: '#f9fafc', // Off-white
  };

  useEffect(() => {
    fetchTailors();
  }, []);

  const fetchTailors = async () => {
    setLoading(true);
    try {
      const res = await api.get(ApiRoutes.GET_ALL_TAILORS.path, {
        authenticate: true
      });
      
      const tailorData = res.data || res.tailors || [];
      setTailors(Array.isArray(tailorData) ? tailorData : []);
    } catch (error) {
      console.error("Fetch Tailors Error:", error.response?.data || error.message);
      setTailors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTailor = async () => {
    if (!tailorToDelete) return;
    
    try {
      await api.delete(ApiRoutes.DELETE_TAILOR.path(tailorToDelete._id), {
        authenticate: true
      });
      
      // Remove the deleted tailor from state
      setTailors(tailors.filter(t => t._id !== tailorToDelete._id));
      
      // Show success notification
      toast.success(`${tailorToDelete.shopName} was successfully deleted`);
      
      // Reset states
      setTailorToDelete(null);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Delete Tailor Error:", error.response?.data || error.message);
      toast.error(`Failed to delete ${tailorToDelete.shopName}. Please try again.`);
    }
  };

  const openDeleteConfirm = (tailor, e) => {
    e.stopPropagation();
    setTailorToDelete(tailor);
    setShowDeleteConfirm(true);
  };

  const filteredTailors = tailors.filter(tailor => 
    tailor.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tailor.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tailor.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (tailor) => {
    setSelectedTailor(selectedTailor && selectedTailor._id === tailor._id ? null : tailor);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient */}
      <div 
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg"
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Tailor Shop Management</h1>
          <p className="mt-2 text-indigo-100">Manage your premium tailor establishments</p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Create bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by shop name, city or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-lg border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all w-full md:w-auto justify-center"
            onClick={() => navigate('/tailor/createshop')}
          >
            <PlusCircle size={18} />
            <span>Create New Shop</span>
          </motion.button>
        </div>
        
        {/* Statistics row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500"
          >
            <h3 className="text-lg font-medium text-gray-500">Total Shops</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{tailors.length}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500"
          >
            <h3 className="text-lg font-medium text-gray-500">Active Cities</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {new Set(tailors.map(t => t.city)).size}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500"
          >
            <h3 className="text-lg font-medium text-gray-500">Recent Updates</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {tailors.filter(t => new Date(t.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length || 0}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500"
          >
            <h3 className="text-lg font-medium text-gray-500">Featured Shops</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {tailors.filter(t => t.featured).length || 0}
            </p>
          </motion.div>
        </div>
        
        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading your tailor shops...</p>
          </div>
        ) : (
          <>
            {/* Empty state */}
            {tailors.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg shadow-md p-8 text-center"
              >
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PlusCircle size={40} className="text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Tailor Shops Found</h3>
                <p className="text-gray-600 mb-6">Start by creating your first tailor shop</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto"
                  onClick={() => navigate('/tailor/createshop')}
                >
                  <PlusCircle size={18} />
                  <span>Create New Shop</span>
                </motion.button>
              </motion.div>
            ) : (
              <>
                {/* Tailor Shop Cards */}
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Tailor Shops</h2>
                {filteredTailors.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <p className="text-gray-600">No shops match your search criteria</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AnimatePresence>
                      {filteredTailors.map((tailor, index) => (
                        <motion.div
                          key={tailor._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.1 }}
                          className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 ${selectedTailor && selectedTailor._id === tailor._id ? 'ring-2 ring-indigo-500' : 'hover:shadow-lg'}`}
                          onClick={() => handleCardClick(tailor)}
                        >
                          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3"></div>
                          <div className="p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-bold text-gray-800">{tailor.shopName}</h3>
                                <div className="flex items-center text-gray-600 mt-2">
                                  <MapPin size={16} className="mr-1" />
                                  <span>{tailor.address}, {tailor.city} - {tailor.pincode}</span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="bg-green-500 text-white p-2 rounded-full"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/tailor/editshop/${tailor._id}`);
                                  }}
                                >
                                  <Edit size={16} />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="bg-red-500 text-white p-2 rounded-full"
                                  onClick={(e) => openDeleteConfirm(tailor, e)}
                                >
                                  <Trash2 size={16} />
                                </motion.button>
                              </div>
                            </div>
                            
                            <AnimatePresence>
                              {selectedTailor && selectedTailor._id === tailor._id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-4 pt-4 border-t border-gray-100"
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                      <User size={16} className="text-indigo-500 mr-2" />
                                      <div>
                                        <p className="text-sm text-gray-500">Owner</p>
                                        <p className="font-medium">{tailor.ownerName}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      <Phone size={16} className="text-indigo-500 mr-2" />
                                      <div>
                                        <p className="text-sm text-gray-500">Contact</p>
                                        <p className="font-medium">{tailor.contactNumber}</p>
                                      </div>
                                    </div>
                                    {tailor.email && (
                                      <div className="flex items-center md:col-span-2">
                                        <div>
                                          <p className="text-sm text-gray-500">Email</p>
                                          <p className="font-medium">{tailor.email}</p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="mt-4 flex gap-2">
                                    <button 
                                      className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-200 transition-colors"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/tailor/manage/${tailor._id}`);
                                      }}
                                    >
                                      Manage Shop
                                    </button>
                                    <button 
                                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md text-sm font-medium hover:bg-purple-200 transition-colors"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/tailor/orders/${tailor._id}`);
                                      }}
                                    >
                                      View Orders
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-lg w-full"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold">{tailorToDelete?.shopName}</span>? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setTailorToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                onClick={handleDeleteTailor}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TailorList;