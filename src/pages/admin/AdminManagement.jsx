// import React, { useState } from "react";
// import { Eye, XCircle } from "lucide-react";
// import Paginations from "../../common/Paginations";
// import CreateAdminModal from "./CreateAdminModal";
// import ViewAdminDetailsModal from "./ViewAdminDetailsModal";

// const AdminManagement = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedAdmin, setSelectedAdmin] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const perPage = 5;

//   const [admins, setAdmins] = useState([
//     {
//       id: "#ST-1043",
//       name: "Sarah Jenkins",
//       avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//       email: "sarah@example.com",
//       phone: "+1 234 567 890",
//       role: "Super Admin",
//       status: true,
//     },
//     {
//       id: "#ST-1044",
//       name: "Marcus Chen",
//       avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//       email: "marcus@example.com",
//       phone: "+1 987 654 321",
//       role: "Support Admin",
//       status: true,
//     },
//     {
//       id: "#ST-1038",
//       name: "David Miller",
//       avatar: "https://randomuser.me/api/portraits/men/45.jpg",
//       email: "david@example.com",
//       phone: "+1 555 444 222",
//       role: "Finance Admin",
//       status: false,
//     },
//     // ... (add the rest of your initial mock data here)
//   ]);

//   const startIndex = (currentPage - 1) * perPage;
//   const currentAdmins = admins.slice(startIndex, startIndex + perPage);

//   const toggleStatus = (index) => {
//     const updatedAdmins = [...admins];
//     updatedAdmins[startIndex + index].status = !updatedAdmins[startIndex + index].status;
//     setAdmins(updatedAdmins);
//   };

//   const handleRemove = (index) => {
//     const updated = admins.filter((_, i) => i !== startIndex + index);
//     setAdmins(updated);
//   };

//   const handleCreateAdmin = (data) => {
//     const newAdmin = {
//       id: `#ST-${Math.floor(1000 + Math.random() * 9000)}`,
//       name: data.fullName,
//       avatar:
//         data.avatar ||
//         `https://ui-avatars.com/api/?name=${encodeURIComponent(data.fullName)}&background=1b5e43&color=fff`,
//       email: data.email,
//       phone: data.phone,
//       role: data.role || "Admin", // Fallback added since role isn't in the create form
//       status: true,
//     };
//     setAdmins([newAdmin, ...admins]);
//   };

//   return (
//     <div className="p-6 bg-[#f4f7f5] min-h-[calc(100vh-100px)]">
//       {/* Create Modal */}
//       {showModal && (
//         <CreateAdminModal
//           onClose={() => setShowModal(false)}
//           onSubmit={handleCreateAdmin}
//         />
//       )}

//       {/* Details Modal */}
//       {selectedAdmin && (
//         <ViewAdminDetailsModal
//           admin={selectedAdmin}
//           onClose={() => setSelectedAdmin(null)}
//         />
//       )}

//       {/* Header */}
//       <div className="flex justify-between items-start mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Manage platform administrators and their access privileges.
//           </p>
//         </div>
//         <button
//           onClick={() => setShowModal(true)}
//           className="cursor-pointer bg-[#1b5e43] hover:bg-[#154a35] text-white px-4 py-2 rounded-md flex items-center text-sm font-medium transition-colors shadow-sm"
//         >
//           <span className="mr-2 text-lg leading-none">+</span>
//           Create Admin
//         </button>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-[#1b5e43] text-white text-[13px]">
//               <th className="py-3.5 px-6 font-medium">S.ID</th>
//               <th className="py-3.5 px-6 font-medium">Admin Name</th>
//               <th className="py-3.5 px-6 font-medium">Status</th>
//               <th className="py-3.5 px-6 font-medium text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-[13px]">
//             {currentAdmins.map((admin, index) => (
//               <tr
//                 key={admin.id + index}
//                 className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
//               >
//                 <td className="py-3 px-6 text-gray-500">{admin.id}</td>
//                 <td className="py-3 px-6">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={admin.avatar}
//                       alt={admin.name}
//                       className="w-[34px] h-[34px] rounded-full object-cover"
//                     />
//                     <span className="font-semibold text-gray-700">
//                       {admin.name}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="py-3 px-6">
//                   <button
//                     onClick={() => toggleStatus(index)}
//                     className={`w-9 h-4 rounded-full relative transition-colors ${
//                       admin.status ? "bg-[#d8efe5]" : "bg-gray-200"
//                     }`}
//                   >
//                     <div
//                       className={`w-5 h-5 rounded-full absolute -top-0.5 transition-all shadow-sm ${
//                         admin.status
//                           ? "bg-[#1b5e43] right-0"
//                           : "bg-gray-400 left-0"
//                       }`}
//                     />
//                   </button>
//                 </td>
//                 <td className="py-3 px-6">
//                   <div className="flex items-center justify-center gap-3 text-gray-400">
//                     <button
//                       onClick={() => setSelectedAdmin(admin)}
//                       className="hover:text-gray-600 transition-colors cursor-pointer"
//                       title="View Details"
//                     >
//                       <Eye size={18} strokeWidth={1.5} />
//                     </button>
//                     <button
//                       onClick={() => handleRemove(index)}
//                       className="hover:text-red-500 transition-colors cursor-pointer"
//                       title="Remove Admin"
//                     >
//                       <XCircle size={18} strokeWidth={1.5} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="p-4 border-t border-gray-100">
//           <Paginations
//             totalItems={admins.length}
//             currentPage={currentPage}
//             perPage={perPage}
//             onPageChange={(event, page) => setCurrentPage(page)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminManagement;

import React, { useEffect, useState } from "react";
import { Eye, XCircle } from "lucide-react";
import Paginations from "../../common/Paginations";
import CreateAdminModal from "./CreateAdminModal";
import ViewAdminDetailsModal from "./ViewAdminDetailsModal";
import { baseApi } from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endpoints";

const AdminManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);

  const startIndex = (currentPage - 1) * perPage;
  const currentAdmins = admins.slice(startIndex, startIndex + perPage);

  const toggleStatus = (index) => {
    const updatedAdmins = [...admins];
    updatedAdmins[startIndex + index].status =
      !updatedAdmins[startIndex + index].status;
    setAdmins(updatedAdmins);
  };

  const handleRemove = (index) => {
    const updated = admins.filter((_, i) => i !== startIndex + index);
    setAdmins(updated);
  };

  // get subadmin 
  const getSubAdmins = async()=>{
    try {
      setLoading(true);
      const res = await baseApi.get(ENDPOINTS.get_subAdmin, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      });
      console.log("Subadmins fetched:", res.data);
       const formattedData = res.data.map((item) => ({
      id: item.id,
      name: item.name,
      avatar: item.image
        ? `${ENDPOINTS.mainURL}${item.image}`
        : "https://ui-avatars.com/api/?name=" +
          encodeURIComponent(item.name),

      email: item.email,
      phone: item.phone,
      role: item.is_admin ? "Root Admin" : "Sub Admin",

      // Backend এ status নাই তাই default true দিলাম
      status: true,

      date_of_birth: item.date_of_birth,
      gender: item.gender,
      location: item.location,
      has_location: item.has_location,
      my_interests: item.my_interests,
    }));

    setAdmins(formattedData);
      
    } catch (error) {
      console.error("Error fetching subadmins:", error);
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
  getSubAdmins();
}, []);

  const handleCreateAdmin = async(data) => {
    try {
      const payload = {
        email: data.email,
        full_name: data.fullName,
        phone: data.phone,
        password: data.password,
        confirm_password: data.confirmPassword

      }
      const res = await baseApi.post(ENDPOINTS.create_subAdmin, payload,{
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      });
      console.log("Admin created:", res.data);
      getSubAdmins(); // Refresh the list after creating a new admin
      setShowModal(false); // Close the modal after successful creation
    } catch (error) {
        console.log(error.response?.data);

  const errors = error.response?.data?.errors;

  if (errors) {
    const errorMessage = Object.values(errors)
      .flat()
      .join("\n");

    alert(errorMessage);
  } else {
    alert("Something went wrong");
  }
    }
  };


  if (loading) {
  return (
    <div className="flex justify-center items-center h-96">
      Loading...
    </div>
  );
}
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
        <ViewAdminDetailsModal
          admin={selectedAdmin}
          onClose={() => setSelectedAdmin(null)}
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage platform administrators and their access privileges.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="cursor-pointer bg-[#1b5e43] hover:bg-[#154a35] text-white px-4 py-2 rounded-md flex items-center text-sm font-medium transition-colors shadow-sm"
        >
          <span className="mr-2 text-lg leading-none">+</span>
          Create Admin
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1b5e43] text-white text-[13px]">
              <th className="py-3.5 px-6 font-medium">S.ID</th>
              <th className="py-3.5 px-6 font-medium">Admin Name</th>
              <th className="py-3.5 px-6 font-medium">Status</th>
              <th className="py-3.5 px-6 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {currentAdmins.map((admin, index) => (
              <tr
                key={admin.id + index}
                className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
              >
                <td className="py-3 px-6 text-gray-500">{admin.id}</td>
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
                      admin.status ? "bg-[#d8efe5]" : "bg-gray-200"
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
                      onClick={() => setSelectedAdmin(admin)}
                      className="hover:text-gray-600 transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Eye size={18} strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => handleRemove(index)}
                      className="hover:text-red-500 transition-colors cursor-pointer"
                      title="Remove Admin"
                    >
                      <XCircle size={18} strokeWidth={1.5} />
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
            onPageChange={(event, page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
