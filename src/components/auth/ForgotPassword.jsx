

import React, { useState } from "react";

const ForgotPassword = ({ email, setEmail, onSubmit }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("Email is Required");
    } else {
      setErrorMessage("");
      onSubmit(email); //  move to Verify step
    }
  };

  return (
    <div>
      <div className="w-full max-w-[691px] mx-auto">
        <h1 className="font-bold font-EBGaramond text-textClr text-2xl md:text-[28px] lg:text-[2rem]">
          Forgot password
        </h1>
        <p className="text-lg text-textClr mt-3 mb-8">
          Enter your email address to get a verification code for resetting your password.
        </p>
        <form onSubmit={handleSubmit}>
          {/* email */}
          <div className="mb-6">
            <label className="label-control">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // ✅ controlled by parent
              className="form-control"
              placeholder="abc@gmail.com"
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          {/* Submit */}
          <div className="text-center mt-8">
            <button
              type="submit"
              className="w-full h-[50px] bg-gradient-to-r from-[#0B2D1E]/90 to-[#009A56]  
text-white py-2 text-xl font-bold rounded-md 
transition-all duration-300 cursor-pointer
hover:from-[#0B2D1E] hover:to-[#009A56] 
hover:scale-105 hover:shadow-lg"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
