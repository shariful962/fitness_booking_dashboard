// // with modal 

// import React, { useState } from "react";
// import { Eye, XCircle, X } from "lucide-react";
// import Paginations from "../../common/Paginations";

// const TABS = [
//   "All",
//   "Confirmed",
//   "Pending",
//   "Cancelled",
//   "Completed",
//   "Refunded",
// ];

// const BOOKINGS = [
//   {
//     id: "#ST-1043",
//     name: "Sarah Jenkins",
//     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     studio: "Downtown Core",
//     className: "Downtown Vitality",
//     date: "Oct 24, 2023",
//     time: "07:00 AM – 08:00 AM",
//     credits: "02",
//     status: "Completed",
//   },
//   {
//     id: "#ST-1043",
//     name: "Marcus Chen",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//     studio: "Downtown Core",
//     className: "Uptown Core",
//     date: "Oct 24, 2023",
//     time: "07:00 AM – 08:00 AM",
//     credits: "04",
//     status: "Cancelled",
//   },
//   {
//     id: "#ST-1038",
//     name: "David Miller",
//     avatar: "https://randomuser.me/api/portraits/men/45.jpg",
//     studio: "Downtown Core",
//     className: "Restorative Yoga",
//     date: "Oct 24, 2023",
//     time: "07:00 AM – 08:00 AM",
//     credits: "08",
//     status: "Completed",
//   },
//   {
//     id: "#ST-1043",
//     name: "Sarah Jenkins",
//     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     studio: "Downtown Core",
//     className: "Downtown Vitality",
//     date: "Oct 24, 2023",
//     time: "07:00 AM – 08:00 AM",
//     credits: "02",
//     status: "Completed",
//   },
//   {
//     id: "#ST-1043",
//     name: "Marcus Chen",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//     studio: "Downtown Core",
//     className: "Uptown Core",
//     date: "Oct 24, 2023",
//     time: "07:00 AM – 08:00 AM",
//     credits: "04",
//     status: "Cancelled",
//   },
//   {
//     id: "#ST-1038",
//     name: "David Miller",
//     avatar: "https://randomuser.me/api/portraits/men/45.jpg",
//     studio: "Downtown Core",
//     className: "Restorative Yoga",
//     date: "Oct 24, 2023",
//     time: "07:00 AM – 08:00 AM",
//     credits: "08",
//     status: "Completed",
//   },
//   {
//     id: "#ST-1043",
//     name: "Sarah Jenkins",
//     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     studio: "Downtown Core",
//     className: "Downtown Vitality",
//     date: "Oct 24, 2023",
//     time: "07:00 AM – 08:00 AM",
//     credits: "02",
//     status: "Completed",
//   },
//   {
//     id: "#ST-1043",
//     name: "Marcus Chen",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//     studio: "Downtown Core",
//     className: "Uptown Core",
//     date: "Oct 24, 2023",
//     time: "07:00 AM – 08:00 AM",
//     credits: "04",
//     status: "Cancelled",
//   },
//   {
//     id: "#ST-1038",
//     name: "David Miller",
//     avatar: "https://randomuser.me/api/portraits/men/45.jpg",
//     studio: "Downtown Core",
//     className: "Restorative Yoga",
//     date: "Oct 24, 2023",
//     time: "07:00 AM – 08:00 AM",
//     credits: "08",
//     status: "Completed",
//   },
// ];

// const StatusBadge = ({ status }) => {
//   const styles = {
//     Completed: "bg-[#e6f4ee] text-[#1b5e43]",
//     Cancelled: "bg-[#fde8e8] text-[#c0392b]",
//     Confirmed: "bg-[#e8f0fd] text-[#1a4db5]",
//     Pending: "bg-[#fef6e4] text-[#b57a0a]",
//     Refunded: "bg-[#f0e8fd] text-[#6a1ab5]",
//   };

//   return (
//     <span
//       className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold ${
//         styles[status] || "bg-gray-100 text-gray-500"
//       }`}
//     >
//       {status}
//     </span>
//   );
// };

// const SubBookingManagement = () => {
//   const [activeTab, setActiveTab] = useState("All");
//   const [bookings, setBookings] = useState(BOOKINGS);

//   // ✅ modal state
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   // ✅ pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const perPage = 5;

//   // filter data
//   const filtered =
//     activeTab === "All"
//       ? bookings
//       : bookings.filter((b) => b.status === activeTab);

//   // pagination logic
//   const startIndex = (currentPage - 1) * perPage;
//   const paginatedData = filtered.slice(startIndex, startIndex + perPage);

//   // remove handler
//   const handleRemove = (bookingToRemove) => {
//     setBookings((prev) =>
//       prev.filter(
//         (b) =>
//           b.id !== bookingToRemove.id || b.name !== bookingToRemove.name
//       )
//     );
//   };

//   return (
//     <div className="p-6 bg-[#f4f7f5] min-h-[calc(100vh-100px)] font-Inter">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-5">
//         <h1 className="text-2xl font-bold text-gray-900">
//           Booking Management
//         </h1>
//       </div>

//       {/* Card */}
//       <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
//         {/* Tabs */}
//         <div className="flex flex-wrap items-center gap-1 px-5 py-3.5 border-b border-gray-100">
//           {TABS.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => {
//                 setActiveTab(tab);
//                 setCurrentPage(1);
//               }}
//               className={`px-3.5 py-1.5 rounded-md text-[13px] font-medium transition-colors cursor-pointer ${
//                 activeTab === tab
//                   ? "bg-[#1b5e43] text-white"
//                   : "text-gray-500 hover:bg-gray-100"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-[#1b5e43] text-white text-[13px]">
//                 <th className="py-3 px-5">S.ID</th>
//                 <th className="py-3 px-5">User Name</th>
//                 <th className="py-3 px-5">Studio Name</th>
//                 <th className="py-3 px-5">Class Name</th>
//                 <th className="py-3 px-5">Date & Time</th>
//                 <th className="py-3 px-5">Credit Use</th>
//                 <th className="py-3 px-5">Status</th>
//                 <th className="py-3 px-5 text-center">Action</th>
//               </tr>
//             </thead>

//             <tbody className="text-[13px]">
//               {paginatedData.length === 0 ? (
//                 <tr>
//                   <td colSpan={8} className="py-10 text-center text-gray-400">
//                     No bookings found.
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedData.map((booking, index) => (
//                   <tr
//                     key={index}
//                     className="border-b border-gray-100 hover:bg-gray-50/50"
//                   >
//                     <td className="py-3 px-5 text-gray-500">{booking.id}</td>

//                     <td className="py-3 px-5">
//                       <div className="flex items-center gap-2.5">
//                         <img
//                           src={booking.avatar}
//                           alt=""
//                           className="w-8 h-8 rounded-full"
//                         />
//                         <span className="font-semibold text-gray-700">
//                           {booking.name}
//                         </span>
//                       </div>
//                     </td>

//                     <td className="py-3 px-5 text-[#1b5e43] font-medium">
//                       {booking.studio}
//                     </td>

//                     <td className="py-3 px-5">{booking.className}</td>

//                     <td className="py-3 px-5">
//                       <div>{booking.date}</div>
//                       <div className="text-[11px] text-gray-400">
//                         {booking.time}
//                       </div>
//                     </td>

//                     <td className="py-3 px-5">{booking.credits}</td>

//                     <td className="py-3 px-5">
//                       <StatusBadge status={booking.status} />
//                     </td>

//                     <td className="py-3 px-5">
//                       <div className="flex justify-center gap-3">
//                         {/* 👁 View Modal Open */}
//                         <button
//                           onClick={() => setSelectedBooking(booking)}
//                           className="text-gray-400 hover:text-gray-600 cursor-pointer"
//                         >
//                           <Eye size={17} />
//                         </button>

//                         <button
//                           onClick={() => handleRemove(booking)}
//                           className="text-gray-400 hover:text-red-500 cursor-pointer"
//                         >
//                           <XCircle size={17} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="py-4 border-t border-gray-100">
//           <Paginations
//             totalItems={filtered.length}
//             currentPage={currentPage}
//             perPage={perPage}
//             onPageChange={(e, page) => setCurrentPage(page)}
//           />
//         </div>
//       </div>

//       {/* ================= MODAL ================= */}
//       {selectedBooking && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
//           <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
//               <h2 className="text-lg font-bold text-gray-900">
//                 Booking Details
//               </h2>

//               <button
//                 onClick={() => setSelectedBooking(null)}
//                 className="text-gray-400 hover:text-red-500 transition cursor-pointer"
//               >
//                 <X size={22} />
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="p-6">
//               {/* Profile */}
//               <div className="flex flex-col items-center text-center mb-6">
//                 <img
//                   src={selectedBooking.avatar}
//                   alt=""
//                   className="w-20 h-20 rounded-full object-cover border-4 border-[#f4f7f5]"
//                 />

//                 <h3 className="mt-3 text-lg font-semibold text-gray-800">
//                   {selectedBooking.name}
//                 </h3>

//                 <p className="text-sm text-gray-400">
//                   {selectedBooking.id}
//                 </p>
//               </div>

//               {/* Details */}
//               <div className="space-y-4 text-sm">
//                 <div className="flex items-center justify-between border-b border-gray-100 pb-3">
//                   <span className="text-gray-500">Studio Name</span>
//                   <span className="font-medium text-[#1b5e43]">
//                     {selectedBooking.studio}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between border-b border-gray-100 pb-3">
//                   <span className="text-gray-500">Class Name</span>
//                   <span className="font-medium text-gray-800">
//                     {selectedBooking.className}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between border-b border-gray-100 pb-3">
//                   <span className="text-gray-500">Credit Use</span>
//                   <span className="font-medium text-gray-800">
//                     {selectedBooking.credits}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-500">Status</span>

//                   <StatusBadge status={selectedBooking.status} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubBookingManagement;


import React from 'react'

const SubBookingManagement = () => {
  return (
    <div>
      This is SubBookingManagement page. You can implement the booking management functionality for sub-admins here.
    </div>
  )
}

export default SubBookingManagement
