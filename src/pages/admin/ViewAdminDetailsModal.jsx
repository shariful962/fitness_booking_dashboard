import React from "react";
import { X } from "lucide-react";

const ViewAdminDetailsModal = ({ admin, onClose }) => {
  if (!admin) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={(e) => e.target === e.currentTarget && onClose && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Admin Details</h2>
            <p className="text-xs text-gray-400 mt-0.5">View administrator information.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="flex flex-col items-center text-center mb-6">
            <img
              src={admin.avatar || "https://via.placeholder.com/96"}
              alt={admin.name || "Admin avatar"}
              className="w-24 h-24 rounded-full object-cover border-2 border-[#1b5e43]/20"
            />
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              {admin.name || "Unnamed Admin"}
            </h3>
            <span
              className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                admin.status
                  ? "bg-[#d8efe5] text-[#1b5e43]"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {admin.status ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-100 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Email Address</p>
              <p className="text-sm font-medium text-gray-700">{admin.email || "—"}</p>
            </div>
            <div className="border border-gray-100 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Phone Number</p>
              <p className="text-sm font-medium text-gray-700">{admin.phone || "—"}</p>
            </div>
            <div className="border border-gray-100 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Role</p>
              <p className="text-sm font-medium text-gray-700">{admin.role || "—"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAdminDetailsModal;