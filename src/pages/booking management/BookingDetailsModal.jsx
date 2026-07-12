import React from "react";
import { X } from "lucide-react";

const StatusBadge = ({ status }) => {
  const styles = {
    Completed: "bg-[#e6f4ee] text-[#1b5e43]",
    Cancelled: "bg-[#fde8e8] text-[#c0392b]",
    Confirmed: "bg-[#e8f0fd] text-[#1a4db5]",
    Pending: "bg-[#fef6e4] text-[#b57a0a]",
    Refunded: "bg-[#f0e8fd] text-[#6a1ab5]",
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold ${
        styles[status] || "bg-gray-100 text-gray-500"
      }`}
    >
      {status}
    </span>
  );
};

const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            Booking Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* User */}
          <div className="flex flex-col items-center text-center mb-6">
            <img
              src={booking.avatar}
              alt={booking.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-[#f4f7f5]"
            />

            <h3 className="mt-3 text-lg font-semibold text-gray-800">
              {booking.name}
            </h3>

            <p className="text-sm text-gray-400">{booking.id}</p>
          </div>

          {/* Details */}
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-gray-500">Studio Name</span>

              <span className="font-medium text-[#1b5e43]">
                {booking.studio}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-gray-500">Class Name</span>

              <span className="font-medium text-gray-800">
                {booking.className}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-gray-500">Date</span>

              <span className="font-medium text-gray-800">
                {booking.date}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-gray-500">Time</span>

              <span className="font-medium text-gray-800">
                {booking.time}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-gray-500">Credit Use</span>

              <span className="font-medium text-gray-800">
                {booking.credits}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Status</span>

              <StatusBadge status={booking.status} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;