import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Select, MenuItem } from "@mui/material";

const yearlyData = {
  2024: [
    { month: "Jan", users: 600 },
    { month: "Feb", users: 500 },
    { month: "Mar", users: 700 },
    { month: "Apr", users: 650 },
    { month: "May", users: 700 },
    { month: "Jun", users: 850 },
    { month: "Jul", users: 600 },
    { month: "Aug", users: 580 },
    { month: "Sep", users: 620 },
    { month: "Oct", users: 680 },
    { month: "Nov", users: 650 },
    { month: "Dec", users: 750 },
  ],
  2025: [
    { month: "Jan", users: 750 },
    { month: "Feb", users: 700 },
    { month: "Mar", users: 820 },
    { month: "Apr", users: 770 },
    { month: "May", users: 880 },
    { month: "Jun", users: 930 },
    { month: "Jul", users: 720 },
    { month: "Aug", users: 690 },
    { month: "Sep", users: 760 },
    { month: "Oct", users: 810 },
    { month: "Nov", users: 770 },
    { month: "Dec", users: 900 },
  ],
};

const UserRatioChart = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="bg-white shadow-custom rounded-[10px] p-4 mt-6 font-Inter">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#151C27]">
          User Ratio
        </h2>

        <Select
          value={selectedYear}
          onChange={handleYearChange}
          size="small"
          style={{ width: "120px" }}
        >
          {Object.keys(yearlyData).map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={yearlyData[selectedYear]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#2D6A4F" barSize={26}  />
          <ReferenceLine y={0} stroke="#000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserRatioChart;