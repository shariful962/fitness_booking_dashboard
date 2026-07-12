import React, { useState } from "react";
import {
  Eye,
  XCircle,
  X,
  Upload,
  ChevronDown,
} from "lucide-react";
import Paginations from "../../common/Paginations";

/* ─────────────────────────────────────────────
   Create Admin Modal
───────────────────────────────────────────── */
const CreateAdminModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      avatar: avatarPreview,
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Create New Admin
            </h2>

            <p className="text-xs text-gray-400 mt-0.5">
              Fill in the details to add a new administrator.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-2 mb-2">
            <div className="relative w-20 h-20">
              <img
                src={
                  avatarPreview ||
                  "https://ui-avatars.com/api/?name=Admin&background=1b5e43&color=fff&size=80"
                }
                alt="avatar preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#1b5e43]/30"
              />

              <label className="absolute bottom-0 right-0 w-6 h-6 bg-[#1b5e43] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#154a35] transition-colors">
                <Upload size={12} className="text-white" />

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            <span className="text-xs text-gray-400">
              Upload profile photo
            </span>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="e.g. Sarah Jenkins"
              required
              className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                required
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 234 567 890"
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Role
            </label>

            <div className="relative">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="w-full appearance-none border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition bg-white"
              >
                <option value="" disabled>
                  Select a role
                </option>

                <option value="Super Admin">Super Admin</option>
                <option value="Content Manager">
                  Content Manager
                </option>
                <option value="Support Admin">
                  Support Admin
                </option>
                <option value="Finance Admin">
                  Finance Admin
                </option>
              </select>

              <ChevronDown
                size={15}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#1b5e43] hover:bg-[#154a35] rounded-lg text-sm font-medium text-white transition-colors shadow-sm"
            >
              Create Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Admin Details Modal
───────────────────────────────────────────── */
const AdminDetailsModal = ({ admin, onClose }) => {
  if (!admin) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Admin Details
            </h2>

            <p className="text-xs text-gray-400 mt-0.5">
              View administrator information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {/* Profile */}
          <div className="flex flex-col items-center text-center mb-6">
            <img
              src={admin.avatar}
              alt={admin.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-[#1b5e43]/20"
            />

            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              {admin.name}
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

          {/* Info */}
          <div className="space-y-4">
            <div className="border border-gray-100 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">
                Email Address
              </p>

              <p className="text-sm font-medium text-gray-700">
                {admin.email}
              </p>
            </div>

            <div className="border border-gray-100 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">
                Phone Number
              </p>

              <p className="text-sm font-medium text-gray-700">
                {admin.phone}
              </p>
            </div>

            <div className="border border-gray-100 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Role</p>

              <p className="text-sm font-medium text-gray-700">
                {admin.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Admin Management
───────────────────────────────────────────── */
const AdminManagement = () => {
  const [showModal, setShowModal] = useState(false);

  const [selectedAdmin, setSelectedAdmin] =
    useState(null);

  const [admins, setAdmins] = useState([
    {
      id: "#ST-1043",
      name: "Sarah Jenkins",
      avatar:
        "https://randomuser.me/api/portraits/women/44.jpg",
      email: "sarah@example.com",
      phone: "+1 234 567 890",
      role: "Super Admin",
      status: true,
    },
    {
      id: "#ST-1044",
      name: "Marcus Chen",
      avatar:
        "https://randomuser.me/api/portraits/men/32.jpg",
      email: "marcus@example.com",
      phone: "+1 987 654 321",
      role: "Support Admin",
      status: true,
    },
    {
      id: "#ST-1038",
      name: "David Miller",
      avatar:
        "https://randomuser.me/api/portraits/men/45.jpg",
      email: "david@example.com",
      phone: "+1 555 444 222",
      role: "Finance Admin",
      status: false,
    },
    {
      id: "#ST-1043",
      name: "Sarah Jenkins",
      avatar:
        "https://randomuser.me/api/portraits/women/44.jpg",
      email: "sarah@example.com",
      phone: "+1 234 567 890",
      role: "Super Admin",
      status: true,
    },
    {
      id: "#ST-1038",
      name: "David Miller",
      avatar:
        "https://randomuser.me/api/portraits/men/45.jpg",
      email: "david@example.com",
      phone: "+1 555 444 222",
      role: "Finance Admin",
      status: false,
    },
    {
      id: "#ST-1043",
      name: "Sarah Jenkins",
      avatar:
        "https://randomuser.me/api/portraits/women/44.jpg",
      email: "sarah@example.com",
      phone: "+1 234 567 890",
      role: "Super Admin",
      status: true,
    },
    {
      id: "#ST-1038",
      name: "David Miller",
      avatar:
        "https://randomuser.me/api/portraits/men/45.jpg",
      email: "david@example.com",
      phone: "+1 555 444 222",
      role: "Finance Admin",
      status: false,
    },
    {
      id: "#ST-1043",
      name: "Sarah Jenkins",
      avatar:
        "https://randomuser.me/api/portraits/women/44.jpg",
      email: "sarah@example.com",
      phone: "+1 234 567 890",
      role: "Super Admin",
      status: true,
    },
    {
      id: "#ST-1038",
      name: "David Miller",
      avatar:
        "https://randomuser.me/api/portraits/men/45.jpg",
      email: "david@example.com",
      phone: "+1 555 444 222",
      role: "Finance Admin",
      status: false,
    },
    {
      id: "#ST-1043",
      name: "Sarah Jenkins",
      avatar:
        "https://randomuser.me/api/portraits/women/44.jpg",
      email: "sarah@example.com",
      phone: "+1 234 567 890",
      role: "Super Admin",
      status: true,
    },
  ]);

  /* Pagination */
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 5;

  const startIndex = (currentPage - 1) * perPage;

  const currentAdmins = admins.slice(
    startIndex,
    startIndex + perPage
  );

  /* Toggle Status */
  const toggleStatus = (index) => {
    const updatedAdmins = [...admins];

    updatedAdmins[startIndex + index].status =
      !updatedAdmins[startIndex + index].status;

    setAdmins(updatedAdmins);
  };

  /* Remove */
  const handleRemove = (index) => {
    const updated = admins.filter(
      (_, i) => i !== startIndex + index
    );

    setAdmins(updated);
  };

  /* Create Admin */
  const handleCreateAdmin = (data) => {
    const newAdmin = {
      id: `#ST-${Math.floor(
        1000 + Math.random() * 9000
      )}`,
      name: data.fullName,
      avatar:
        data.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          data.fullName
        )}&background=1b5e43&color=fff`,
      email: data.email,
      phone: data.phone,
      role: data.role,
      status: true,
    };

    setAdmins([newAdmin, ...admins]);
  };

  return (
    <div className="p-6 bg-[#f4f7f5] min-h-[calc(100vh-100px)]">
      {/* Create Modal */}
      {showModal && (
        <CreateAdminModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateAdmin}
        />
      )}

      {/* Details Modal */}
      {selectedAdmin && (
        <AdminDetailsModal
          admin={selectedAdmin}
          onClose={() => setSelectedAdmin(null)}
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Admin Management
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Manage platform administrators and their
            access privileges.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="cursor-pointer bg-[#1b5e43] hover:bg-[#154a35] text-white px-4 py-2 rounded-md flex items-center text-sm font-medium transition-colors shadow-sm"
        >
          <span className="mr-2 text-lg leading-none">
            +
          </span>
          Create Admin
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1b5e43] text-white text-[13px]">
              <th className="py-3.5 px-6 font-medium">
                S.ID
              </th>

              <th className="py-3.5 px-6 font-medium">
                Admin Name
              </th>

              <th className="py-3.5 px-6 font-medium">
                Status
              </th>

              <th className="py-3.5 px-6 font-medium text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="text-[13px]">
            {currentAdmins.map((admin, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
              >
                <td className="py-3 px-6 text-gray-500">
                  {admin.id}
                </td>

                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={admin.avatar}
                      alt={admin.name}
                      className="w-[34px] h-[34px] rounded-full object-cover"
                    />

                    <span className="font-semibold text-gray-700">
                      {admin.name}
                    </span>
                  </div>
                </td>

                <td className="py-3 px-6">
                  <button
                    onClick={() => toggleStatus(index)}
                    className={`w-9 h-4 rounded-full relative transition-colors ${
                      admin.status
                        ? "bg-[#d8efe5]"
                        : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full absolute -top-0.5 transition-all shadow-sm ${
                        admin.status
                          ? "bg-[#1b5e43] right-0"
                          : "bg-gray-400 left-0"
                      }`}
                    />
                  </button>
                </td>

                <td className="py-3 px-6">
                  <div className="flex items-center justify-center gap-3 text-gray-400">
                    <button
                      onClick={() =>
                        setSelectedAdmin(admin)
                      }
                      className="hover:text-gray-600 transition-colors cursor-pointer"
                    >
                      <Eye
                        size={18}
                        strokeWidth={1.5}
                      />
                    </button>

                    <button
                      onClick={() => handleRemove(index)}
                      className="hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <XCircle
                        size={18}
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100">
          <Paginations
            totalItems={admins.length}
            currentPage={currentPage}
            perPage={perPage}
            onPageChange={(event, page) =>
              setCurrentPage(page)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;