// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../../service/ApiService.jsx";
// import ApiRoutes from "../../utils/ApiRoutes.jsx";

// const login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   useEffect(() => {
//     // If token already exists, redirect to TopBar
//     const token = sessionStorage.getItem("token");
//     if (token) {
//       navigate("/TopBar");
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post(ApiRoutes.LOGIN.path, formData, {
//         authenticate: ApiRoutes.LOGIN.authenticate,
//       });

//       sessionStorage.setItem("token", response.token);
//       sessionStorage.setItem("userId", response.id);

//       navigate("/TopBar");
//     } catch (error) {
//       console.error("Login failed:", error.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="w-full p-2 border rounded"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="w-full p-2 border rounded"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
//         >
//           Login
//         </button>
//       </form>

//       {/* Sign up redirect */}
//       <p className="mt-4 text-center text-sm text-gray-600">
//         Don't have an account?{" "}
//         <Link to="/signup" className="text-blue-600 hover:underline">
//           Sign up here
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default login;

// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../../service/ApiService.jsx";
// import ApiRoutes from "../../utils/ApiRoutes.jsx";
// import { X } from "lucide-react";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");
//   const [toastType, setToastType] = useState("success");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // If token already exists, redirect to TopBar
//     const token = sessionStorage.getItem("token");
//     if (token) {
//       navigate("/TopBar");
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const showToastNotification = (message, type = "success") => {
//     setToastMessage(message);
//     setToastType(type);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post(ApiRoutes.LOGIN.path, formData, {
//         authenticate: ApiRoutes.LOGIN.authenticate,
//       });

//       sessionStorage.setItem("token", response.token);
//       sessionStorage.setItem("userId", response.id);

//       showToastNotification("Login successful!");

//       // Small delay to show the toast before navigating
//       setTimeout(() => {
//         navigate("/TopBar");
//       }, 1000);
//     } catch (error) {
//       console.error("Login failed:", error.message);
//       showToastNotification("Login failed. Please check your credentials.", "error");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50 items-center justify-center p-4">
//       {/* Toast Notification */}
//       {showToast && (
//         <div className={`fixed top-4 right-4 max-w-md z-50 flex items-center p-4 rounded-lg shadow-lg transition-all duration-300 ${
//           toastType === "success" ? "bg-white border border-gray-200" : "bg-white border border-red-200"
//         }`}>
//           <div className={`flex-shrink-0 w-2 h-2 rounded-full mr-3 ${
//             toastType === "success" ? "bg-green-500" : "bg-red-500"
//           }`}></div>
//           <p className="text-sm font-medium text-gray-800">{toastMessage}</p>
//           <button
//             onClick={() => setShowToast(false)}
//             className="ml-4 text-gray-400 hover:text-gray-600"
//           >
//             <X size={16} />
//           </button>
//         </div>
//       )}

//       <div className="w-full max-w-md">
//         {/* Apple logo */}
//         <div className="mb-10 text-center">
//           <svg className="h-8 w-8 mx-auto" viewBox="0 0 24 24" fill="black">
//             <path d="M17.05 20.28c-.98.95-2.05.8-3.08.36-1.09-.45-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.15 3.51 7.84 8.65 7.49c1.19.05 2.16.55 2.99.55.78 0 2.21-.65 3.89-.5 1.44.13 2.79.79 3.58 1.97-3.25 2.09-2.7 6.6.5 8.25-.48 1.42-1.36 2.76-2.56 4.01v.01zm-6.25-18C10.05 1.03 11.46.4 12.92.5c.18 2.14-1.42 4.05-3.44 4.05-.18-1.92.73-3.02 1.32-4.27z" />
//           </svg>
//         </div>

//         <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
//           <h1 className="text-3xl font-medium text-gray-900 mb-1 text-center">Sign in</h1>
//           <p className="text-gray-500 text-center mb-8">Use your account details to sign in</p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-4">
//               <div>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border-0 bg-gray-100 rounded-lg focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border-0 bg-gray-100 rounded-lg focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
//                 />
//               </div>
//             </div>

//             <div className="pt-2">
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200"
//               >
//                 Sign In
//               </button>
//             </div>
//           </form>

//           <div className="mt-6 text-center">
//             <a href="#" className="text-sm text-blue-600 hover:underline">
//               Forgot password?
//             </a>
//           </div>

//           <div className="mt-8 pt-6 border-t border-gray-200 text-center">
//             <p className="text-gray-600">
//               Don't have an account?{" "}
//               <Link to="/signup" className="text-blue-600 font-medium hover:underline">
//                 Create an account
//               </Link>
//             </p>
//           </div>
//         </div>

//         <div className="mt-8 text-center">
//           <p className="text-xs text-gray-500">
//             By signing in, you agree to our{" "}
//             <a href="#" className="text-gray-700 hover:underline">
//               Terms of Service
//             </a>{" "}
//             and{" "}
//             <a href="#" className="text-gray-700 hover:underline">
//               Privacy Policy
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../service/ApiService.jsx";
import ApiRoutes from "../../utils/ApiRoutes.jsx";
import { X, Lock, Mail } from "lucide-react"; // Update this path to your actual file location
import { toast } from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const navigate = useNavigate();

  // useEffect(() => {
  //   // If token already exists, redirect to TopBar
  //   const token = sessionStorage.getItem("token");
  //   if (token) {
  //     navigate("/TopBar");
  //   }
  // }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showToastNotification = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(ApiRoutes.LOGIN.path, formData, {
        authenticate: ApiRoutes.LOGIN.authenticate,
      });

      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("userId", response.id);

      showToastNotification("Login successful!");

      // Small delay to show the toast before navigating
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Login failed:", error.message);
      showToastNotification(
        "Login failed. Please check your credentials.",
        "error"
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center p-4">
      {/* Toast Notification */}
      {showToast && (
        <div
          className={`fixed top-4 right-4 max-w-md z-50 flex items-center p-4 rounded-lg shadow-lg transition-all duration-300 ${
            toastType === "success"
              ? "bg-black text-white"
              : "bg-white border-l-4 border-red-500"
          }`}
        >
          <div
            className={`flex-shrink-0 w-2 h-2 rounded-full mr-3 ${
              toastType === "success" ? "bg-green-400" : "bg-red-500"
            }`}
          ></div>
          <p className="text-sm font-medium">{toastMessage}</p>
          <button
            onClick={() => setShowToast(false)}
            className="ml-4 text-gray-300 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-black mb-2 text-center">
            Sign in
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Use your account credentials to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
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
                  className="w-full pl-10 pr-4 py-4 border-0 bg-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all"
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
                  className="w-full pl-10 pr-4 py-4 border-0 bg-gray-100 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-black border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-black hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-900 text-white font-medium py-4 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* <div className="mt-8 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div> */}

          {/* <div className="mt-6 space-y-3">
            <button className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-all">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center bg-black text-white border border-black rounded-xl px-4 py-3 font-medium hover:bg-gray-900 transition-all">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="white">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.36-1.09-.45-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.15 3.51 7.84 8.65 7.49c1.19.05 2.16.55 2.99.55.78 0 2.21-.65 3.89-.5 1.44.13 2.79.79 3.58 1.97-3.25 2.09-2.7 6.6.5 8.25-.48 1.42-1.36 2.76-2.56 4.01v.01zm-6.25-18C10.05 1.03 11.46.4 12.92.5c.18 2.14-1.42 4.05-3.44 4.05-.18-1.92.73-3.02 1.32-4.27z" />
              </svg>
              Continue with Apple
            </button>
          </div> */}

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-black font-semibold hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{" "}
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

export default Login;
