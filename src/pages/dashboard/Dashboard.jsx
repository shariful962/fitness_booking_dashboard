import { User } from "lucide-react";
import React, { useState } from "react";
import { FaBan } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import UserRatioChart from "../../common/UserRatioChart";
import { users } from "../users/data";
import ConfirmationModal from "../../common/ConfirmationModal";
import UserModal from "../../common/UserModal";
import Label from "../../common/Label";

const Dashboard = () => {
 

  // Active state from users data
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeUsers, setActiveUsers] = useState(() => {
    return users.reduce((acc, user) => {
      acc[user.id] = user.is_active;
      return acc;
    }, {});
  });

  // Confirmation modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmUser, setConfirmUser] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  // Toggle click → open confirmation
  const handleToggleClick = (userId) => {
    const action = activeUsers[userId] ? "deactivate" : "activate";
    const user = users.find((u) => u.id === userId);

    setConfirmUser(user);
    setConfirmAction(action);
    setConfirmOpen(true);
  };

  // Confirm toggle
  const handleConfirm = () => {
    if (confirmUser) {
      setActiveUsers((prev) => ({
        ...prev,
        [confirmUser.id]: !prev[confirmUser.id],
      }));
    }

    setConfirmOpen(false);
    setConfirmUser(null);
    setConfirmAction(null);
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setConfirmUser(null);
    setConfirmAction(null);
  };

  return (
    <div className="p-4 bg-Primary min-h-[calc(100vh-100px)]">
      
      {/* label section  */}
      <Label />

      {/* Chart Section (Separated Component) */}
      <UserRatioChart />

      {/* Recent Users Section */}
      <div className="mt-7.5 font-Poppins">
        <h1 className="text-xl font-medium text-textClr mb-3">
          Recent Users
        </h1>

        <div className="overflow-x-auto shadow rounded-lg">
          <table className="w-full bg-white text-left">
            <thead className="bg-[#2C5945] text-white">
              <tr>
                <th className="px-4 py-3">S.ID</th>
                <th className="px-4 py-3">Full Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone No</th>
                <th className="px-4 py-3">Joined Date</th>
                <th className="px-4 py-3">Active & Deactive</th>
              </tr>
            </thead>

            <tbody className="bg-white text-[#154452]">
              {users.slice(0, 5).map((user) => {
                const isInactive = activeUsers[user.id];
                return (
                  <tr key={user.id} className="border-b border-[#E8E8F5]">
                    {/* Blurred Columns */}
                    <td
                      className={`px-4 py-3 ${
                        isInactive
                          ? "opacity-50 grayscale transition-all duration-300"
                          : ""
                      }`}
                    >
                      {user.id}
                    </td>

                    <td
                      className={`px-4 py-3 flex items-center gap-x-2 ${
                        isInactive
                          ? "opacity-50 grayscale transition-all duration-300"
                          : ""
                      }`}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      {user.name}
                    </td>

                    <td
                      className={`px-4 py-3 ${
                        isInactive
                          ? "opacity-50 grayscale transition-all duration-300"
                          : ""
                      }`}
                    >
                      {user.email}
                    </td>

                    <td
                      className={`hidden md:table-cell px-4 py-3 ${
                        isInactive
                          ? "opacity-50 grayscale transition-all duration-300"
                          : ""
                      }`}
                    >
                      {user.phone}
                    </td>

                    <td
                      className={`hidden md:table-cell px-4 py-3 ${
                        isInactive
                          ? "opacity-50 grayscale transition-all duration-300"
                          : ""
                      }`}
                    >
                      {user.date}
                    </td>

                    {/* Action Column (NO BLUR) */}
                    <td className="px-4 py-3 flex items-center gap-x-3">
                      <button
                        onClick={() => handleToggleClick(user.id)}
                        className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                          activeUsers[user.id] ? "bg-green-500" : "bg-gray-500"
                        }`}
                      >
                        <div
                          className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${
                            activeUsers[user.id]
                              ? "translate-x-5"
                              : "translate-x-0"
                          }`}
                        />
                      </button>

                      <LuEye
                        size={20}
                        className="text-[#154452] cursor-pointer"
                        onClick={() => setSelectedUser(user)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
       <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={confirmOpen}
        user={confirmUser}
        action={confirmAction}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Dashboard;
