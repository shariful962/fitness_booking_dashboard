// import React from "react";
// import {
//   MapPin,
//   Pencil,
//   CheckCircle,
//   PauseCircle,
//   Info,
//   Video,
//   CalendarDays,
//   Play,
// } from "lucide-react";
// import { useNavigate } from "react-router";

// const ViewStudio = () => {
//   const navigate = useNavigate();
//   const studio = {
//     name: "Zen Flow Studio",
//     status: "Active",
//     address: "124 Serenity Lane, Wellness District, NY 10012",
//     coverImage:
//       "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=400&fit=crop",
//     contact: {
//       name: "Sarah Jenkins",
//       email: "sarah@zenflow.com",
//       phone: "+1 (555) 123-4567",
//     },
//     taxId: "XX-XXXX892",
//     hours: "Mon-Sun: 6:00 AM - 9:00 PM",
//   };

//   const todaysClasses = [
//     {
//       time: "08:00",
//       name: "Vinyasa Flow",
//       instructor: "with Emma T.",
//       enrolled: 24,
//       capacity: 30,
//     },
//     {
//       time: "10:30",
//       name: "Restorative Yoga",
//       instructor: "with David K.",
//       enrolled: 18,
//       capacity: 20,
//     },
//   ];

//   const videos = [
//     "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=180&fit=crop",
//     "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=180&fit=crop",
//   ];

//   return (
//     <div className="p-4 bg-[#f4f7f5] min-h-[calc(100vh-100px)] font-Inter">
//       {/* ── Hero Banner ── */}
//       <div className="relative rounded-2xl overflow-hidden mb-5 shadow-sm">
//         {/* Cover image */}
//         <img
//           src={studio.coverImage}
//           alt={studio.name}
//           className="w-full h-52 object-cover"
//         />
//         {/* Dark gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

//         {/* Bottom-left: name + badge + address */}
//         <div className="absolute bottom-0 left-0 p-5">
//           <div className="flex items-center gap-2 mb-1">
//             <h1 className="text-2xl font-bold text-white">{studio.name}</h1>
//             <span className="bg-[#1b5e43] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
//               {studio.status}
//             </span>
//           </div>
//           <div className="flex items-center gap-1.5 text-white/80 text-[13px]">
//             <MapPin size={13} className="flex-shrink-0" />
//             <span>{studio.address}</span>
//           </div>
//         </div>

//         {/* Top-right: action buttons */}
//         <div className="absolute top-4 right-4 flex items-center gap-2">
//           <button
//             onClick={() => navigate("/studio/editstudio")}
//             className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-gray-700 text-[13px] font-medium px-3.5 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
//           >
//             <Pencil size={13} />
//             Edit Studio
//           </button>
//           <button className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-[#1b5e43] text-[13px] font-medium px-3.5 py-2 rounded-lg transition-colors shadow-sm border border-[#1b5e43]/30">
//             <CheckCircle size={13} />
//             Approve
//           </button>
//           <button className="flex items-center gap-1.5 bg-[#7b2d2d] hover:bg-[#6a2626] text-white text-[13px] font-medium px-3.5 py-2 rounded-lg transition-colors shadow-sm">
//             <PauseCircle size={13} />
//             Suspend
//           </button>
//         </div>
//       </div>

//       {/* ── Two-column layout ── */}
//       <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
//         {/* ── Left Column ── */}
//         <div className="flex flex-col gap-4">
//           {/* Studio Information Card */}
//           <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
//             <div className="flex items-center gap-2 mb-4">
//               <Info size={17} className="text-[#1b5e43]" />
//               <h2 className="text-[15px] font-bold text-gray-800">
//                 Studio Information
//               </h2>
//             </div>

//             <div className="grid grid-cols-2 gap-x-8 gap-y-5">
//               {/* Primary Contact */}
//               <div>
//                 <p className="text-[12px] text-gray-400 font-medium mb-1">
//                   Primary Contact
//                 </p>
//                 <p className="text-[13px] font-semibold text-gray-800">
//                   {studio.contact.name}
//                 </p>
//                 <p className="text-[12px] text-gray-500 mt-0.5">
//                   {studio.contact.email}
//                 </p>
//               </div>

//               {/* Phone Number */}
//               <div>
//                 <p className="text-[12px] text-gray-400 font-medium mb-1">
//                   Phone Number
//                 </p>
//                 <p className="text-[13px] font-semibold text-gray-800">
//                   {studio.contact.phone}
//                 </p>
//               </div>

//               {/* Tax ID */}
//               <div>
//                 <p className="text-[12px] text-gray-400 font-medium mb-1">
//                   Tax ID / EIN
//                 </p>
//                 <p className="text-[13px] font-semibold text-gray-800">
//                   {studio.taxId}
//                 </p>
//               </div>

//               {/* Operating Hours */}
//               <div>
//                 <p className="text-[12px] text-gray-400 font-medium mb-1">
//                   Operating Hours
//                 </p>
//                 <p className="text-[13px] font-semibold text-gray-800">
//                   {studio.hours}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Upload Video Card */}
//           <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
//             <div className="flex items-center gap-2 mb-4">
//               <Video size={17} className="text-[#1b5e43]" />
//               <h2 className="text-[15px] font-bold text-gray-800">
//                 Upload Video
//               </h2>
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               {videos.map((thumb, i) => (
//                 <div
//                   key={i}
//                   className="relative rounded-xl overflow-hidden group cursor-pointer"
//                 >
//                   <img
//                     src={thumb}
//                     alt={`Video ${i + 1}`}
//                     className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                   {/* Overlay */}
//                   <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
//                     <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center">
//                       <Play
//                         size={16}
//                         className="text-white fill-white ml-0.5"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ── Right Column ── */}
//         <div>
//           {/* Today's Classes Card */}
//           <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
//             <div className="flex items-center gap-2 mb-4">
//               <CalendarDays size={17} className="text-[#1b5e43]" />
//               <h2 className="text-[15px] font-bold text-gray-800">
//                 Today's Classes
//               </h2>
//             </div>

//             <div className="flex flex-col gap-3">
//               {todaysClasses.map((cls, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-4 p-3.5 rounded-xl bg-gray-50/70 hover:bg-gray-100/70 transition-colors"
//                 >
//                   {/* Time badge */}
//                   <div className="flex-shrink-0 bg-[#e8f0fd] text-[#1a4db5] text-[12px] font-bold px-2.5 py-1.5 rounded-lg min-w-[52px] text-center">
//                     {cls.time}
//                   </div>

//                   {/* Class info */}
//                   <div className="flex-1 min-w-0">
//                     <p className="text-[13px] font-semibold text-gray-800 truncate">
//                       {cls.name}
//                     </p>
//                     <p className="text-[12px] text-gray-400 mt-0.5">
//                       {cls.instructor}
//                     </p>
//                   </div>

//                   {/* Enrollment */}
//                   <div className="flex-shrink-0 text-[13px] font-semibold text-gray-600">
//                     {cls.enrolled}
//                     <span className="text-gray-400 font-normal">
//                       /{cls.capacity}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewStudio;






import React from "react";
import {
  MapPin,
  Pencil,
  CheckCircle,
  PauseCircle,
  Info,
  Video,
  CalendarDays,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router";

const ViewStudio = () => {
  const navigate = useNavigate();
  const studio = {
    name: "Zen Flow Studio",
    status: "Active",
    address: "124 Serenity Lane, Wellness District, NY 10012",
    coverImage:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=400&fit=crop",
    contact: {
      name: "Sarah Jenkins",
      email: "sarah@zenflow.com",
      phone: "+1 (555) 123-4567",
    },
    taxId: "XX-XXXX892",
    hours: "Mon-Sun: 6:00 AM - 9:00 PM",
  };

  const todaysClasses = [
    {
      time: "08:00",
      name: "Vinyasa Flow",
      instructor: "with Emma T.",
      enrolled: 24,
      capacity: 30,
    },
    {
      time: "10:30",
      name: "Restorative Yoga",
      instructor: "with David K.",
      enrolled: 18,
      capacity: 20,
    },
  ];

  const videos = [
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=180&fit=crop",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=180&fit=crop",
  ];

  return (
    <div className="p-4 bg-[#f4f7f5] min-h-[calc(100vh-100px)] font-Inter">
      {/* ── Hero Banner ── */}
      <div className="relative rounded-2xl overflow-hidden mb-5 shadow-sm">
        {/* Cover image */}
        <img
          src={studio.coverImage}
          alt={studio.name}
          className="w-full h-52 object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Bottom-left: name + badge + address */}
        <div className="absolute bottom-0 left-0 p-5">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-white">{studio.name}</h1>
            <span className="bg-[#1b5e43] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
              {studio.status}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-white/80 text-[13px]">
            <MapPin size={13} className="flex-shrink-0" />
            <span>{studio.address}</span>
          </div>
        </div>

        {/* Top-right: action buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={() => navigate("/studio/editstudio")}
            className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-gray-700 text-[13px] font-medium px-3.5 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <Pencil size={13} />
            Edit Studio
          </button>
          <button className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-[#1b5e43] text-[13px] font-medium px-3.5 py-2 rounded-lg transition-colors shadow-sm border border-[#1b5e43]/30">
            <CheckCircle size={13} />
            Approve
          </button>
          <button className="flex items-center gap-1.5 bg-[#7b2d2d] hover:bg-[#6a2626] text-white text-[13px] font-medium px-3.5 py-2 rounded-lg transition-colors shadow-sm">
            <PauseCircle size={13} />
            Suspend
          </button>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
        {/* ── Left Column ── */}
        <div className="flex flex-col gap-4">
          {/* Studio Information Card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Info size={17} className="text-[#1b5e43]" />
              <h2 className="text-[15px] font-bold text-gray-800">
                Studio Information
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              {/* Primary Contact */}
              <div>
                <p className="text-[12px] text-gray-400 font-medium mb-1">
                  Primary Contact
                </p>
                <p className="text-[13px] font-semibold text-gray-800">
                  {studio.contact.name}
                </p>
                <p className="text-[12px] text-gray-500 mt-0.5">
                  {studio.contact.email}
                </p>
              </div>

              {/* Phone Number */}
              <div>
                <p className="text-[12px] text-gray-400 font-medium mb-1">
                  Phone Number
                </p>
                <p className="text-[13px] font-semibold text-gray-800">
                  {studio.contact.phone}
                </p>
              </div>

              {/* Tax ID */}
              <div>
                <p className="text-[12px] text-gray-400 font-medium mb-1">
                  Tax ID / EIN
                </p>
                <p className="text-[13px] font-semibold text-gray-800">
                  {studio.taxId}
                </p>
              </div>

              {/* Operating Hours */}
              <div>
                <p className="text-[12px] text-gray-400 font-medium mb-1">
                  Operating Hours
                </p>
                <p className="text-[13px] font-semibold text-gray-800">
                  {studio.hours}
                </p>
              </div>
            </div>
          </div>

          {/* Upload Video Card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Video size={17} className="text-[#1b5e43]" />
              <h2 className="text-[15px] font-bold text-gray-800">
                Upload Video
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {videos.map((thumb, i) => (
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden group cursor-pointer"
                >
                  <img
                    src={thumb}
                    alt={`Video ${i + 1}`}
                    className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center">
                      <Play
                        size={16}
                        className="text-white fill-white ml-0.5"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div>
          {/* Today's Classes Card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays size={17} className="text-[#1b5e43]" />
              <h2 className="text-[15px] font-bold text-gray-800">
                Today's Classes
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {todaysClasses.map((cls, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-gray-50/70 hover:bg-gray-100/70 transition-colors"
                >
                  {/* Time badge */}
                  <div className="flex-shrink-0 bg-[#e8f0fd] text-[#1a4db5] text-[12px] font-bold px-2.5 py-1.5 rounded-lg min-w-[52px] text-center">
                    {cls.time}
                  </div>

                  {/* Class info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-gray-800 truncate">
                      {cls.name}
                    </p>
                    <p className="text-[12px] text-gray-400 mt-0.5">
                      {cls.instructor}
                    </p>
                  </div>

                  {/* Enrollment */}
                  <div className="flex-shrink-0 text-[13px] font-semibold text-gray-600">
                    {cls.enrolled}
                    <span className="text-gray-400 font-normal">
                      /{cls.capacity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudio;
