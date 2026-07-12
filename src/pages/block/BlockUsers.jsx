


// BlockUsers.jsx
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { FaUndo } from "react-icons/fa";
import ConfirmBlockModal from "./ConfirmBlockModal";
import { users } from "../users/data";
import Paginations from "../../common/Paginations";
import UserModal from "../../common/UserModal";

const BlockUsers = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [userToBlock, setUserToBlock] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const perUsersPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  //  Only inactive users
  const filterUsers = users.filter(
    (user) =>
      user.is_active === false &&
      (
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search.toLowerCase())
      )
  );

  const handleRequestUnblock = (user) => {
    setUserToBlock(user);
    setBlockModalOpen(true);
  };

  const handleConfirmUnblock = () => {
    console.log("Unblocked user:", userToBlock);

    // Frontend only update (temporary)
    userToBlock.is_active = true;

    setBlockModalOpen(false);
    setUserToBlock(null);
    setSelectedUser(null);
  };

  const handleCancelUnblock = () => {
    setBlockModalOpen(false);
    setUserToBlock(null);
  };

  // Pagination
  const startIndex = (currentPage - 1) * perUsersPage;
  const endIndex = startIndex + perUsersPage;
  const paginatedUsers = filterUsers.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="p-4 bg-Primary h-[calc(100vh-100px)]">
      <div className="bg-white shadow-custom rounded-[10px] mt-5 min-h-[calc(100vh-155px)]">
        
        {/* Header */}
        <div className="bg-[#2C5945] px-6 py-4 rounded-tl-[10px] rounded-tr-[10px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <h2 className="title text-white">Blocked List</h2>

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
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-7.5 overflow-x-auto px-4">
          <table className="w-full text-left">
            <thead className="border-b border-[#154452]">
              <tr>
                <th className="px-4 py-3">S.lD</th>
                <th className="px-4 py-3">Full Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="hidden md:table-cell px-4 py-3">Phone No</th>
                <th className="hidden md:table-cell px-4 py-3">Joined Date</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody className="text-[#154452]">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="border-b border-[#E8E8F5]">
                    <td className="px-4 py-3">{user.id}</td>

                    <td className="px-4 py-3 flex items-center gap-x-2">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      {user.name}
                    </td>

                    <td className="px-4 py-3">{user.email}</td>

                    <td className="hidden md:table-cell px-4 py-3">
                      {user.phone}
                    </td>

                    <td className="hidden md:table-cell px-4 py-3">
                      {user.date}
                    </td>

                    <td className="px-4 py-3 flex items-center gap-x-3">
                      {/* Undo (Unblock) */}
                      <FaUndo
                        size={18}
                        className="text-[#154452] cursor-pointer"
                        onClick={() => handleRequestUnblock(user)}
                      />

                      {/* View */}
                      <LuEye
                        size={20}
                        className="text-[#154452] cursor-pointer"
                        onClick={() => setSelectedUser(user)}
                      />
                    </td>
                  </tr>
                ))
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

        {/* Pagination */}
        <div className="mt-4">
          <Paginations
            totalItems={filterUsers.length}
            currentPage={currentPage}
            perPage={perUsersPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* User Details Modal */}
      <UserModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />

      {/* Confirm Modal */}
      <ConfirmBlockModal
        open={blockModalOpen}
        user={userToBlock}
        onConfirm={handleConfirmUnblock}
        onCancel={handleCancelUnblock}
        title="Do you want to activate this user?"
      />
    </div>
  );
};

export default BlockUsers;