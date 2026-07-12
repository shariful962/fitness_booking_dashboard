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
    { month: "Jan", earn: 600 },
    { month: "Feb", earn: 500 },
    { month: "Mar", earn: 700 },
    { month: "Apr", earn: 650 },
    { month: "May", earn: 700 },
    { month: "Jun", earn: 850 },
    { month: "Jul", earn: 600 },
    { month: "Aug", earn: 580 },
    { month: "Sep", earn: 620 },
    { month: "Oct", earn: 680 },
    { month: "Nov", earn: 650 },
    { month: "Dec", earn: 750 },
  ],
  2025: [
    { month: "Jan", earn: 750 },
    { month: "Feb", earn: 700 },
    { month: "Mar", earn: 820 },
    { month: "Apr", earn: 770 },
    { month: "May", earn: 880 },
    { month: "Jun", earn: 930 },
    { month: "Jul", earn: 720 },
    { month: "Aug", earn: 690 },
    { month: "Sep", earn: 760 },
    { month: "Oct", earn: 810 },
    { month: "Nov", earn: 770 },
    { month: "Dec", earn: 900 },
  ],
};

const EarningsChart = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="bg-white rounded-[10px] p-4 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Earnings Overview</h2>
        <Select
          value={selectedYear}
          onChange={handleYearChange}
          style={{ width: "120px" }}
        >
          {Object.keys(yearlyData).map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={yearlyData[selectedYear]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          {/* <YAxis />
          <Tooltip /> */}
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip formatter={(value) => [`$${value}`, "Earnings"]} />
          <Legend />
          <Bar dataKey="earn" fill="#2B63A8" barSize={22} radius={[8, 8, 0, 0]} />
          <ReferenceLine y={0} stroke="#000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningsChart;
