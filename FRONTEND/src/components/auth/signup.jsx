// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../service/ApiService.jsx";
// import ApiRoutes from "../../utils/ApiRoutes.jsx";

// const signup = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     profilepic: "",
//     password: "",
//     role: "user", // default user
//     mobile: "",
//     address: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post(ApiRoutes.SIGNUP.path, formData);
//       navigate("/Login");
//     } catch (error) {
//       console.error("Signup failed:", error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="profilepic"
//           placeholder="Profile Picture URL"
//           value={formData.profilepic}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         >
//           <option value="user">User</option>
//           <option value="tailor">Tailor</option>
//         </select>
//         <input
//           type="text"
//           name="mobile"
//           placeholder="Mobile Number"
//           value={formData.mobile}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <textarea
//           name="address"
//           placeholder="Address"
//           value={formData.address}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default signup;



import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../service/ApiService.jsx";
import ApiRoutes from "../../utils/ApiRoutes.jsx";
import { User, Mail, Lock, Phone, Home, Image, UserCircle } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilepic: "",
    password: "",
    role: "user", // default user
    mobile: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(ApiRoutes.SIGNUP.path, formData);
      navigate("/Login");
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-black mb-2 text-center">Create Account</h1>
          <p className="text-gray-500 text-center mb-8">Sign up to get started</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border-0 bg-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={20} className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border-0 bg-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="profilepic"
                placeholder="Profile Picture URL"
                value={formData.profilepic}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border-0 bg-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={20} className="text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border-0 bg-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserCircle size={20} className="text-gray-400" />
              </div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border-0 bg-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all appearance-none"
                required
              >
                <option value="user">User</option>
                <option value="tailor">Tailor</option>
              </select>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border-0 bg-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                <Home size={20} className="text-gray-400" />
              </div>
              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border-0 bg-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all h-24"
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-900 text-white font-medium py-4 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-black font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By signing up, you agree to our{" "}
            <a href="#" className="text-gray-700 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-gray-700 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Signup;
