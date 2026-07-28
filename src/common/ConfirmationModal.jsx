// ConfirmationModal.jsx
// import React from "react";

// const ConfirmationModal = ({ open, user, action, onConfirm, onCancel }) => {
//   if (!open) return null;

//   const actionText = action === "activate" ? "Deactivate" : "Activate";

//   return (
//     <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-[350px]">
//         <h2 className="text-lg font-semibold mb-4 text-center">
//           Do you want to {actionText}  {user?.name}?
//         </h2>
//         {/* <p className="text-gray-600 mb-6">{user?.name}</p> */}
//         <div className="flex justify-center gap-3">
//           <button
//             className="px-4 py-2 rounded border border-Secondary cursor-pointer"
//             onClick={onCancel}
//           >
//             Cancel
//           </button>
//           <button
//             className={`px-4 py-2 rounded text-white cursor-pointer ${
//               action === "activate" ? "grade-btn1" : "bg-red-500 hover:bg-red-600"
//             }`}
//             onClick={onConfirm}
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmationModal;


import React from "react";
import { IoWarningOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const ConfirmationModal = ({
  open,
  user,
  action,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  const isActivate = action === "activate";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-[20px] w-full max-w-[420px] p-6 relative animate-in fade-in zoom-in-95 duration-200 font-Inter">

        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-5 right-5 text-[#404943] hover:text-black cursor-pointer"
        >
          <RxCross2 size={22} />
        </button>

        {/* Warning Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-[#FFF4EE] flex items-center justify-center">
            <IoWarningOutline
              size={34}
              className="text-[#F97316]"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-[32px] font-semibold text-center mt-5 text-[#1E293B]">
          {isActivate ? "Activate this admin?" : "Deactivate this admin?"}
        </h2>

        {/* User Info */}
        <div className="bg-[#F5F7FF] rounded-[10px] px-4 py-3 mt-5 text-center">
          <h4 className="font-semibold text-[#1E293B]">
            {user?.name}
          </h4>

          <p className="text-sm text-gray-500">
            {user?.email}
          </p>
        </div>

        {/* Description */}
        <p className="text-center text-[#6B7280] text-[15px] leading-7 mt-5">
          {isActivate
            ? `Activating this admin will restore their access and allow them to manage administrative tasks again.`
            : `Deactivating this admin will revoke their access and prevent them from signing in until reactivated.`}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-7">
          <button
            onClick={onCancel}
            className="w-full h-[52px] rounded-[10px] border border-[#D1D5DB] font-medium text-[#1E293B] cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className={`w-full h-[52px] rounded-[10px] font-medium text-white cursor-pointer ${
              isActivate
                ? "bg-[#2C5945] hover:bg-[#234636]"
                : "bg-[#BA1A1A] hover:bg-red-700"
            }`}
          >
            {isActivate ? "Confirm Activate" : "Confirm Deactivate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;