import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import Paginations from "../../common/Paginations";
import UserModal from "../../common/UserModal";
import { baseApi } from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endpoints";

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const RootUsers = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perUsersPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await baseApi.get(ENDPOINTS.root_users);
        const data = Array.isArray(res.data) ? res.data : res.data?.results || [];
        const mappedData = data.map((item) => ({
          id: item.id,
          name: item.full_name || item.name || item.username || "Unknown",
          email: item.email || item.username || "-",
          phone: item.phone || "-",
          avatar:
            item.image ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              item.full_name || item.name || item.username || "User"
            )}&background=1b5e43&color=fff`,
          date: formatDate(item.joint_date || item.created_at),
        }));
        setUsers(mappedData);
      } catch (fetchError) {
        console.error("Failed to load root users:", fetchError);
        setError(
          fetchError?.response?.data?.detail ||
            fetchError?.response?.data?.message ||
            "Unable to load users. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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


  return (
    <div className="p-4 bg-Primary h-[calc(100vh-100px)]">
      <div className="bg-white shadow-custom rounded-[10px] mt-5 min-h-[calc(100vh-155px)] font-Poppins">
        <div className="bg-[#2C5945] px-6 py-4 rounded-tl-[10px] rounded-tr-[10px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <h2 className="title text-white">User List</h2>

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
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody className="text-[#154452]">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-red-500">
                    {error}
                  </td>
                </tr>
              ) : paginatedUsers.length > 0 ? (
                paginatedUsers.map((user, index) => (
                  <tr key={user.id} className="border-b border-[#E8E8F5]">
                    <td className="px-4 py-3">{startIndex + index + 1}</td>
                    <td className="px-4 py-3 flex items-center gap-x-2">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      {user.name}
                    </td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="hidden md:table-cell px-4 py-3">{user.phone}</td>
                    <td className="hidden md:table-cell px-4 py-3">{user.date}</td>
                    <td className="px-4 py-3 flex items-center gap-x-3">
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

        <Paginations
          totalItems={filterUsers.length}
          currentPage={currentPage}
          perPage={perUsersPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* View Modal */}
      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />

    </div>
  );
};

export default RootUsers;






