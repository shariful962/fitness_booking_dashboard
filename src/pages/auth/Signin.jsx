// import React, { useState } from "react";
// import { useNavigate } from "react-router";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import { Icons } from "../../lib/images";

// const Signin = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "sub_admin", // Default role is sub_admin
//     rememberMe: false,
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const navigate = useNavigate();

//   // =========================================
//   // Handle Input Change
//   // =========================================
//   const handleChange = (e) => {
//     const { name, type, value, checked } = e.target;

//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" || type === "radio" ? checked ? value : formData[name] : value,
//     });
//   };

//   // =========================================
//   // Handle Login
//   // =========================================

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.email && !formData.password) {
//       setErrorMessage("Both fields are required");
//       return;
//     }

//     if (!formData.email) {
//       setErrorMessage("Please enter your email");
//       return;
//     }

//     if (!formData.password) {
//       setErrorMessage("Please enter your password");
//       return;
//     }

//     // clear error
//     setErrorMessage("");

//       // =========================================
//     // USER DATA WITH SELECTED ROLE
//     // =========================================

//     const user = {
//       email: formData.email,
//       role: formData.role,
//     };

//     // Save User
//     localStorage.setItem("user", JSON.stringify(user));

//     console.log("Logged In User:", user);

//       // Role অনুযায়ী redirect
//     if (formData.role === "root_admin") {
//       navigate("/dashboard");
//     } else {
//       navigate("/user");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">

//       <div className="w-full max-w-[691px] mx-auto px-4">

//         {/* Logo */}
//         <div className="text-center space-y-8 mb-6">
//           <img
//             src={Icons.navLogo}
//             alt="sign_in logo"
//             className="inline-block"
//           />
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit}>

//           {/* Email */}
//           <div className="mb-6">
//             <label className="label-control">
//               Email
//             </label>

//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="abc@gmail.com"
//             />
//           </div>

//           {/* Password */}
//           <div className="relative mb-2">

//             <label className="label-control">
//               Password
//             </label>

//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="*******"
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-[50px] text-gray-400 cursor-pointer"
//             >
//               {showPassword ? (
//                 <FiEyeOff size={20} />
//               ) : (
//                 <FiEye size={20} />
//               )}
//             </button>
//           </div>

//           {/* Remember Me and Forgot Password */}
//           <div className="flex justify-between items-center mt-2">

//             <label className="flex items-center text-sm text-gray-600 cursor-pointer">

//               <input
//                 type="checkbox"
//                 name="rememberMe"
//                 checked={formData.rememberMe}
//                 onChange={handleChange}
//                 className="mr-2"
//               />

//               Remember Me
//             </label>

//             <button
//               type="button"
//               onClick={() => navigate("/forgotpass")}
//               className="text-sm text-[#14B8A6] hover:underline cursor-pointer"
//             >
//               Forgot Password?
//             </button>
//           </div>
//             {/* Role Selection - Radio Buttons (এখন Remember Me এর নিচে) */}
//           <div className="mt-3">
//             <label className="label-control mb-3 block">
//               Login As
//             </label>

//             <div className="flex items-center gap-6">
//               <label className="flex items-center cursor-pointer">
//                 <input
//                   type="radio"
//                   name="role"
//                   value="root_admin"
//                   checked={formData.role === "root_admin"}
//                   onChange={handleChange}
//                   className="mr-2 cursor-pointer"
//                 />
//                 <span className="text-sm text-gray-700">Root Admin</span>
//               </label>

//               <label className="flex items-center cursor-pointer">
//                 <input
//                   type="radio"
//                   name="role"
//                   value="sub_admin"
//                   checked={formData.role === "sub_admin"}
//                   onChange={handleChange}
//                   className="mr-2 cursor-pointer"
//                 />
//                 <span className="text-sm text-gray-700">Sub Admin</span>
//               </label>
//             </div>
//           </div>

          

//           {/* Submit */}
//           <div className="text-center mt-4">

//             <button
//               type="submit"
//               className="w-full h-[50px] bg-gradient-to-r from-[#0B2D1E]/90 to-[#009A56]
//               text-white py-2 text-xl font-bold rounded-md
//               transition-all duration-300 cursor-pointer
//               hover:from-[#0B2D1E] hover:to-[#009A56]
//               hover:scale-105 hover:shadow-lg"
//             >
//               Sign In
//             </button>

//           </div>
//           {/* Error */}
//           {errorMessage && (
//             <p className="text-red-500 text-sm mt-2">
//               {errorMessage}
//             </p>
//           )}

//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signin;






import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { Icons } from "../../lib/images";
import { ENDPOINTS } from "../../api/endpoints";
import { baseApi } from "../../api/baseApi";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "sub_admin", // Default role is sub_admin
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state যোগ করলাম

  const navigate = useNavigate();

  // =========================================
  // Handle Input Change
  // =========================================
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" || type === "radio" ? checked ? value : formData[name] : value,
    });
  };

  // =========================================
  // Handle Login
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email && !formData.password) {
      setErrorMessage("Both fields are required");
      return;
    }

    if (!formData.email) {
      setErrorMessage("Please enter your email");
      return;
    }

    if (!formData.password) {
      setErrorMessage("Please enter your password");
      return;
    }

    // clear error
    setErrorMessage("");
    setLoading(true); // Loading start

    // =========================================
    // SELECT ENDPOINT BASED ON ROLE
    // =========================================
    const endpoint = formData.role === "root_admin" 
      ? ENDPOINTS.admin_login 
      : ENDPOINTS.sub_admin_login;

    try {
      // API Call
      const response = await baseApi.post(
        endpoint,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // =========================================
      // LOGIN SUCCESSFUL
      // =========================================
      console.log("Login Successful:", response.data);

      // Save User Data
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      // Remember Me functionality (optional)
      if (formData.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      // Role অনুযায়ী redirect
      if (formData.role === "root_admin") {
        navigate("/dashboard");
      } else {
        navigate("/user");
      }

    } catch (error) {
      // =========================================
      // LOGIN FAILED
      // =========================================
      console.error("Login Error:", error);

      // Backend থেকে error message নিতে পারেন
      if (error.response) {
        // Server responded with error
        const errorMsg = error.response.data?.detail || 
                        error.response.data?.message || 
                        "Invalid email or password!";
        setErrorMessage(errorMsg);
      } else if (error.request) {
        // Request made but no response
        setErrorMessage("Network error! Please check your connection.");
      } else {
        // Something else happened
        setErrorMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Loading end
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">

      <div className="w-full max-w-[691px] mx-auto px-4">

        {/* Logo */}
        <div className="text-center space-y-8 mb-6">
          <img
            src={Icons.navLogo}
            alt="sign_in logo"
            className="inline-block"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-6">
            <label className="label-control">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="abc@gmail.com"
              disabled={loading} // Loading এ disable
            />
          </div>

          {/* Password */}
          <div className="relative mb-2">

            <label className="label-control">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="*******"
              disabled={loading} // Loading এ disable
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[50px] text-gray-400 cursor-pointer"
              disabled={loading}
            >
              {showPassword ? (
                <FiEyeOff size={20} />
              ) : (
                <FiEye size={20} />
              )}
            </button>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center mt-2">

            <label className="flex items-center text-sm text-gray-600 cursor-pointer">

              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-2"
                disabled={loading}
              />

              Remember Me
            </label>

            <button
              type="button"
              onClick={() => navigate("/forgotpass")}
              className="text-sm text-[#14B8A6] hover:underline cursor-pointer"
              disabled={loading}
            >
              Forgot Password?
            </button>
          </div>

          {/* Role Selection - Radio Buttons */}
          <div className="mt-3">
            <label className="label-control mb-3 block">
              Login As
            </label>

            <div className="flex items-center gap-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="root_admin"
                  checked={formData.role === "root_admin"}
                  onChange={handleChange}
                  className="mr-2 cursor-pointer"
                  disabled={loading}
                />
                <span className="text-sm text-gray-700">Root Admin</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="sub_admin"
                  checked={formData.role === "sub_admin"}
                  onChange={handleChange}
                  className="mr-2 cursor-pointer"
                  disabled={loading}
                />
                <span className="text-sm text-gray-700">Sub Admin</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="text-center mt-4">

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[50px] bg-gradient-to-r from-[#0B2D1E]/90 to-[#009A56]
              text-white py-2 text-xl font-bold rounded-md
              transition-all duration-300 cursor-pointer
              hover:from-[#0B2D1E] hover:to-[#009A56]
              hover:scale-105 hover:shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

          </div>

          {/* Error */}
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-500 text-sm text-center">
                {errorMessage}
              </p>
            </div>
          )}

        </form>
      </div>
    </div>
  );
};

export default Signin;