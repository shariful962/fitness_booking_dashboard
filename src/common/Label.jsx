import React from "react";
import { FiUsers } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { LuCalendarCheck2 } from "react-icons/lu";

const statsData = [
  {
    id: 1,
    title: "Total Users",
    value: "12,480",
    icon: <FiUsers size={22} />,
    bgColor: "bg-[#B1F0CE]",
    iconColor: "text-[#0F5238]",
  },
  {
    id: 2,
    title: "Total Studios",
    value: "342",
    icon: <HiOutlineOfficeBuilding size={22} />,
    bgColor: "bg-[#DBEAFE]",
    iconColor: "text-[#2563EB]",
  },
  {
    id: 3,
    title: "Total Bookings",
    value: "8,924",
    icon: <LuCalendarCheck2 size={22} />,
    bgColor: "bg-[#FEF3C7]",
    iconColor: "text-[#D97706]",
  },
];

const Label = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-Inter">
      {statsData.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-5 flex items-center gap-4"
        >
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${item.bgColor}`}
          >
            <span className={item.iconColor}>{item.icon}</span>
          </div>

          {/* Content */}
          <div>
            <p className="text-sm text-[#707973]">{item.title}</p>
            <h2 className="text-2xl font-semibold text-[#151C27]">
              {item.value}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Label;