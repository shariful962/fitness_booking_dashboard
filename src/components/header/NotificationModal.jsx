import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";

const NotificationModal = ({ notifications, showAll, setShowAll }) => {
  const visibleNotifications = showAll ? notifications : notifications.slice(0, 5);

  return (
    <div className="absolute right-0 top-12 w-[360px] bg-white shadow-lg border border-gray-300 rounded-lg z-50">

      {/* Modal Header */}
      <div className="px-4 py-3 border-b bg-white rounded-t-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Notifications
        </h2>
      </div>

      {/* Notification List */}
      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: showAll ? "400px" : "300px" }}
      >
        <div className="max-h-[400px] overflow-y-auto">
          {visibleNotifications.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <IoNotificationsOutline className="text-blue-500 w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">{item.des}</p>
                <span className="text-[11px] text-gray-400">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      {!showAll && (
        <div className="p-3 flex justify-center">
          <button
            className="w-[220px] bg-gradient-to-r from-[#2B63A8] to-[#5C96DE] text-white py-2 rounded px-6 cursor-pointer"
            onClick={() => setShowAll(true)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationModal;