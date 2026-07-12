// import React, { useState } from "react";
// import { useNavigate } from "react-router";
// import { FiEye, FiEyeOff } from "react-icons/fi";

// const UpdatePassword = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     newPassword: "",
//     confirmNewPassword: "",
//   });

//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.newPassword || !formData.confirmNewPassword) {
//       setErrorMessage("Fill the password field");
//       return;
//     }
//     if (formData.newPassword !== formData.confirmNewPassword) {
//       setErrorMessage("Passwords do not match!");
//       return;
//     }

//     onSubmit(formData.newPassword); //  move to SignIn
//     navigate("/signin");
//   };

//   return (
//     <div>
//       <div className="max-w-[691px] mx-auto mt-10 px-4">
//         <h1 className="font-bold font-EBGaramond text-textClr text-2xl md:text-[28px] lg:text-[2rem] mb-8">
//           Set new password
//         </h1>
//         <form onSubmit={handleSubmit}>
//           {/* new password */}
//           <div className="relative mb-4">
//             <label className="label-control">New Password</label>
//             <input
//               type={showNewPassword ? "text" : "password"}
//               name="newPassword"
//               value={formData.newPassword}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="*******"
//             />
//             <button
//               type="button"
//               onClick={() => setShowNewPassword(!showNewPassword)}
//               className="absolute right-3 top-[50px] text-gray-400 cursor-pointer"
//             >
//               {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//             </button>
//           </div>

//           {/* confirm new password */}
//           <div className="relative">
//             <label className="label-control">Confirm New Password</label>
//             <input
//               type={showConfirmNewPassword ? "text" : "password"}
//               name="confirmNewPassword"
//               value={formData.confirmNewPassword}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="*******"
//             />
//             <button
//               type="button"
//               onClick={() =>
//                 setShowConfirmNewPassword(!showConfirmNewPassword)
//               }
//               className="absolute right-3 top-[50px] text-gray-400 cursor-pointer"
//             >
//               {showConfirmNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//             </button>
//           </div>

//           {errorMessage && (
//             <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
//           )}

//           {/* Submit */}
//           <div className="text-center mt-8">
//             <button
//               type="submit"
//               className="w-full h-[50px] bg-gradient-to-r from-[#0B2D1E]/90 to-[#009A56]
// text-white py-2 text-xl font-bold rounded-md
// transition-all duration-300 cursor-pointer
// hover:from-[#0B2D1E] hover:to-[#009A56]
// hover:scale-105 hover:shadow-lg"
//             >
//               Update Password
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdatePassword;

import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { baseApi } from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endpoints";
import { toast } from "react-toastify";

const UpdatePassword = ({ resetToken, onSubmit }) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Local validation
    if (!formData.newPassword || !formData.confirmNewPassword) {
      setErrorMessage("Fill the password field");
      return;
    }
    if (formData.newPassword !== formData.confirmNewPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // ✅ Backend 'new_password2' expect korche, tai 'confirm_new_password' er jaygay 'new_password2' use kora holo
      const res = await baseApi.post(ENDPOINTS.reset_pass, {
        reset_token: resetToken,
        new_password: formData.newPassword,
        new_password2: formData.confirmNewPassword, // ✅ Field name change kora holo
      });

      toast.success(res.data.msg || "Password updated successfully!");
      onSubmit(); // Parent e call jabe ar /signin e navigate korbe
    } catch (error) {
      console.log(error);

      // ✅ Error handling e 'new_password2' er specific error o catch korar usejoggo kora holo
      const errorMsg =
        error.response?.data?.new_password2?.[0] ||
        error.response?.data?.new_password?.[0] ||
        error.response?.data?.msg ||
        error.response?.data?.errors?.non_field_errors?.[0] ||
        "Failed to update password. Token might be expired.";

      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-[691px] mx-auto mt-10 px-4">
        <h1 className="font-bold font-EBGaramond text-textClr text-2xl md:text-[28px] lg:text-[2rem] mb-8">
          Set new password
        </h1>
        <form onSubmit={handleSubmit}>
          {/* new password */}
          <div className="relative mb-4">
            <label className="label-control">New Password</label>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="form-control"
              placeholder="*******"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-[50px] text-gray-400 cursor-pointer"
            >
              {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* confirm new password */}
          <div className="relative">
            <label className="label-control">Confirm New Password</label>
            <input
              type={showConfirmNewPassword ? "text" : "password"}
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              className="form-control"
              placeholder="*******"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
              className="absolute right-3 top-[50px] text-gray-400 cursor-pointer"
            >
              {showConfirmNewPassword ? (
                <FiEyeOff size={20} />
              ) : (
                <FiEye size={20} />
              )}
            </button>
          </div>

          {/* Error message show */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          {/* Submit */}
          <div className="text-center mt-8">
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
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
