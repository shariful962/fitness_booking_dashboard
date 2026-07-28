import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { users } from "./data";
import { Link } from "react-router";
import Paginations from "../../common/Paginations";
import ConfirmationModal from "../../common/ConfirmationModal";
import UserModal from "../../common/UserModal";

const SubUsers = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Active state from users data
  const [activeUsers, setActiveUsers] = useState(() => {
    return users.reduce((acc, user) => {
      acc[user.id] = user.is_active;
      return acc;
    }, {});
  });

  const [currentPage, setCurrentPage] = useState(1);
  const perUsersPage = 5;

  // Confirmation modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmUser, setConfirmUser] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Filter users
  const filterUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search.toLowerCase())
  );

  // Pagination
  const startIndex = (currentPage - 1) * perUsersPage;
  const endIndex = startIndex + perUsersPage;
  const paginatedUsers = filterUsers.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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
    <div className="p-4 bg-Primary h-[calc(100vh-100px)]">
      <div className="bg-white shadow-custom rounded-[10px] mt-5 min-h-[calc(100vh-155px)] font-Poppins">
        <div className="bg-[#2C5945] px-6 py-4 rounded-tl-[10px] rounded-tr-[10px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <h2 className="title text-white">User List</h2>

            <div className="flex flex-col md:flex-row gap-y-2 gap-x-8">
              <div className="flex items-center w-full md:w-[300px] h-[42px] px-3 py-2 bg-white border border-Primary rounded-sm">
                <Search className="w-5 h-5 mr-2 text-Secondary" />
                <input
                  type="text"
                  placeholder="Search User"
                  className="w-full outline-none text-sm text-gray-700"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Link
                to={"/user/block"}
                className="h-[42px] px-6 w-max py-2 bg-white text-[#2C5945] rounded font-semibold"
              >
                Blocked Users
              </Link>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="mt-7.5 overflow-x-auto rounded-lg mb-4">
          <table className="w-full text-left">
            <thead className="bg-[#2C5945] text-white">
              <tr>
                <th className="px-4 py-3">S.lD</th>
                <th className="px-4 py-3">Full Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="hidden md:table-cell px-4 py-3">Phone No</th>
                <th className="hidden md:table-cell px-4 py-3">Joined Date</th>
                <th className="px-4 py-3">Active & Deactive</th>
              </tr>
            </thead>

            <tbody className="text-[#154452]">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => {
                  const isInactive = activeUsers[user.id];

                  return (
                    <tr key={user.id} className="border-b border-[#E8E8F5]">
                      {/* Blurred Columns */}
                      <td
                        className={`px-4 py-3 ${
                          isInactive ? "opacity-50 grayscale transition-all duration-300" : ""
                        }`}
                      >
                        {user.id}
                      </td>

                      <td
                        className={`px-4 py-3 flex items-center gap-x-2 ${
                          isInactive ? "opacity-50 grayscale transition-all duration-300" : ""
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
                          isInactive ? "opacity-50 grayscale transition-all duration-300" : ""
                        }`}
                      >
                        {user.email}
                      </td>

                      <td
                        className={`hidden md:table-cell px-4 py-3 ${
                          isInactive ? "opacity-50 grayscale transition-all duration-300" : ""
                        }`}
                      >
                        {user.phone}
                      </td>

                      <td
                        className={`hidden md:table-cell px-4 py-3 ${
                          isInactive ? "opacity-50 grayscale transition-all duration-300" : ""
                        }`}
                      >
                        {user.date}
                      </td>

                      {/* Action Column (NO BLUR) */}
                      <td className="px-4 py-3 flex items-center gap-x-3">
                        <button
                          onClick={() => handleToggleClick(user.id)}
                          className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                            activeUsers[user.id]
                              ? "bg-green-500"
                              : "bg-gray-500"
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
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Paginations
          totalItems={filterUsers.length}
          currentPage={currentPage}
          perPage={perUsersPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* View Modal */}
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

export default SubUsers;


