// import React, { useState } from "react";
// import { useNavigate } from "react-router";
// import { Icons } from "../../lib/images";
// import ForgotPassword from "../../components/auth/ForgotPassword";
// import UpdatePassword from "../../components/auth/UpdatePassword";
// import VerifyCode from "../../components/auth/VerifyCode";
// import { baseApi } from "../../api/baseApi";
// import { ENDPOINTS } from "../../api/endpoints";
// import { toast } from "react-toastify";

// const ForgotPass = ({ initialStep, initialEmail }) => {
//   const [step, setStep] = useState(initialStep || "email");
//   const [email, setEmail] = useState(initialEmail || "");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState("");
//   const navigate = useNavigate();

//   // email function
//   const handleEmailSent = async (email) => {
//     setLoading(true);
//     setApiError("");
//     try {
//       const res = await baseApi.post(ENDPOINTS.forgot_pass, { email });
//       console.log(res.data);
//       toast.success(res.data.msg);
//       setStep("verify");
//     } catch (error) {
//       console.log(error);
//       const errorMessage =
//         error.response.data?.errors?.non_field_errors?.[0] ||
//         "Something went wrong. Please try again.";

//       setApiError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOtp = () => {
//     setStep("reset");
//   };

//   const handleSetPassword = () => {
//     navigate("/signin");
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="w-full max-w-[691px] mx-auto px-4">
//         <div className="text-center space-y-8 mb-4">
//           <img
//             src={Icons.navLogo}
//             alt="sign_in logo"
//             className=" inline-block"
//           />
//           {/* <h1 className="text-[32px] md:[48px] lg:[64px] font-EBGaramond font-bold text-textClr tracking-widest">
//             Menu Sidekick
//           </h1> */}
//         </div>

//         {/* function  */}
//         {step === "email" && (
//           <ForgotPassword
//             email={email}
//             setEmail={setEmail}
//             onSubmit={handleEmailSent}
//             loading={loading} // Pass loading state
//             error={apiError}
//           />
//         )}

//         {step === "verify" && (
//           <VerifyCode
//             email={email}
//             // otp={otp}
//             setOtp={setOtp}
//             onSubmit={handleOtp}
//           />
//         )}

//         {step === "reset" && (
//           <UpdatePassword
//             // newPassword={newPassword}
//             // setNewPassword={setNewPassword}
//             onSubmit={handleSetPassword}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForgotPass;

import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Icons } from "../../lib/images";
import ForgotPassword from "../../components/auth/ForgotPassword";
import UpdatePassword from "../../components/auth/UpdatePassword";
import VerifyCode from "../../components/auth/VerifyCode";
import { baseApi } from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endpoints";
import { toast } from "react-toastify";

const ForgotPass = ({ initialStep, initialEmail }) => {
  const [step, setStep] = useState(initialStep || "email");
  const [email, setEmail] = useState(initialEmail || "");
  const [otp, setOtp] = useState("");

  // Email step er jonno
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [resetToken, setResetToken] = useState("");

  // Verify step er jonno alada loading ar error state
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  const navigate = useNavigate();

  // 1. Email Send (Step 1)
  const handleEmailSent = async (email) => {
    setLoading(true);
    setApiError("");
    try {
      const res = await baseApi.post(ENDPOINTS.forgot_pass, { email });
      toast.success(res.data.msg);
      setStep("verify");
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors?.non_field_errors?.[0] ||
        error.response?.data?.msg ||
        "Something went wrong. Please try again.";
      setApiError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 2. Verify OTP (Step 2)
  const handleOtp = async (otpValue) => {
    setVerifyLoading(true);
    setVerifyError("");
    try {
      // Apnar backend er verify endpoint use korun (jemon: verify_otp)
      const res = await baseApi.post(ENDPOINTS.verify_otp, {
        email,
        otp: otpValue,
      });

      if (res.data.reset_token) {
        setResetToken(res.data.reset_token);
      }

      toast.success(res.data.msg || "OTP verified successfully!");
      setStep("reset"); // Move to Update Password step
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.errors?.non_field_errors?.[0] ||
        error.response?.data?.msg ||
        "Invalid OTP. Please try again.";

      setVerifyError(errorMessage); // Screen e red text dekhabe
      toast.error(errorMessage); // Toast notification e dekhabe
    } finally {
      setVerifyLoading(false);
    }
  };

  // 3. Resend OTP (Step 2 er Resend button)
  const handleResendOtp = async () => {
    setVerifyLoading(true);
    setVerifyError("");
    try {
      // Jodi resend er jonno alada endpoint thake, seta use korun.
      // Otherwise same forgot_pass endpoint e abar call korlei notun OTP generate hobe.
      const res = await baseApi.post(ENDPOINTS.forgot_pass, { email });
      toast.success(res.data.msg || "OTP resent to your email!");
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleSetPassword = () => {
    navigate("/signin");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-[691px] mx-auto px-4">
        <div className="text-center space-y-8 mb-4">
          <img
            src={Icons.navLogo}
            alt="sign_in logo"
            className="inline-block"
          />
        </div>

        {step === "email" && (
          <ForgotPassword
            email={email}
            setEmail={setEmail}
            onSubmit={handleEmailSent}
            loading={loading}
            error={apiError}
          />
        )}

        {step === "verify" && (
          <VerifyCode
            email={email}
            setOtp={setOtp}
            onSubmit={handleOtp}
            onResend={handleResendOtp} // ✅ Resend function pass kora holo
            loading={verifyLoading} // ✅ Verify loading state
            error={verifyError} // ✅ Verify error state
          />
        )}

        {step === "reset" && (
          <UpdatePassword
            resetToken={resetToken}
            onSubmit={handleSetPassword}
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPass;
