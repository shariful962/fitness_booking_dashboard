import React, { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { LuCalendarCheck2 } from "react-icons/lu";
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
import { useSearchParams } from "react-router";
import { baseApi } from "../api/baseApi";
import { ENDPOINTS } from "../api/endpoints";

const generateYears = (start = 2025, end = new Date().getFullYear()) => {
  const years = [];
  for (let y = start; y <= end; y++) years.push(String(y));
  return years;
};


const formatNumber = (n) => new Intl.NumberFormat().format(n || 0);

const LabelAndUserChart = () => {
  const currentYear = new Date().getFullYear();
  const defaultYear = String(Math.max(2025, currentYear));

  const [searchParams, setSearchParams] = useSearchParams();
  const urlYear = searchParams.get("year");

  const [selectedYear, setSelectedYear] = useState(urlYear || defaultYear);
  const [chartData, setChartData] = useState([]);
  const [totals, setTotals] = useState({ total_user: 0, total_studio: 0, total_booking: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (urlYear && urlYear !== selectedYear) setSelectedYear(urlYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlYear]);

  const YearOptions = ["all", ...generateYears(2025, currentYear)];

  useEffect(() => {
    const fetchDashboard = async (year) => {
      try {
        const options = year && year !== "all" ? { params: { year } } : {};
        const res = await baseApi.get(ENDPOINTS.dashboard, options);
        return res.data || {};
      } catch (err) {
        console.error("Failed to fetch dashboard for year", year, err);
        return null;
      }
    };

    const load = async () => {
      setLoading(true);
      setError("");

      let d = await fetchDashboard(selectedYear);
      if (!d) {
        setError("Unable to load dashboard data");
        setChartData([]);
        setTotals({ total_user: 0, total_studio: 0, total_booking: 0 });
        setLoading(false);
        return;
      }

      // If all monthly counts are zero and a specific year was requested,
      // try earlier years down to 2025 (skip when 'all' is selected)
      const allZero = (arr) => !arr || arr.length === 0 || arr.every((m) => Number(m.count) === 0);
      if (selectedYear !== "all" && allZero(d.user_ratio_monthly)) {
        const startYear = Math.min(Number(selectedYear), currentYear);
        for (let y = startYear; y >= 2025; y--) {
          if (String(y) === String(selectedYear)) continue;
          const candidate = await fetchDashboard(String(y));
          if (candidate && !allZero(candidate.user_ratio_monthly)) {
            d = candidate;
            setSelectedYear(String(y));
            setSearchParams({ year: String(y) });
            break;
          }
        }
      }

      setTotals({
        total_user: d.total_user || 0,
        total_studio: d.total_studio || 0,
        total_booking: d.total_booking || 0,
      });

      const monthly = d.user_ratio_monthly || [];
      setChartData(monthly.map((m) => ({ month: m.month, users: Number(m.count) || 0 })));
      setLoading(false);
    };

    load();
  }, [selectedYear]);

  const handleYearChange = (e) => {
    const y = e.target.value;
    setSelectedYear(y);
    setSearchParams({ year: y });
  };

  const statsData = [
    {
      id: 1,
      title: "Total Users",
      value: formatNumber(totals.total_user),
      icon: <FiUsers size={22} />,
      bgColor: "bg-[#B1F0CE]",
      iconColor: "text-[#0F5238]",
    },
    {
      id: 2,
      title: "Total Studios",
      value: formatNumber(totals.total_studio),
      icon: <HiOutlineOfficeBuilding size={22} />,
      bgColor: "bg-[#DBEAFE]",
      iconColor: "text-[#2563EB]",
    },
    {
      id: 3,
      title: "Total Bookings",
      value: formatNumber(totals.total_booking),
      icon: <LuCalendarCheck2 size={22} />,
      bgColor: "bg-[#FEF3C7]",
      iconColor: "text-[#D97706]",
    },
  ];

  return (
    <div className="space-y-6 font-Inter">
      {/* --- Label Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-5 flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.bgColor}`}>
              <span className={item.iconColor}>{item.icon}</span>
            </div>

            <div>
              <p className="text-sm text-[#707973]">{item.title}</p>
              <h2 className="text-2xl font-semibold text-[#151C27]">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* --- UserRatioChart Section --- */}
      <div className="bg-white shadow-custom rounded-[10px] p-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#151C27]">User Ratio</h2>

          <Select
            value={selectedYear}
            onChange={handleYearChange}
            size="small"
            style={{ width: "140px" }}
            MenuProps={{ PaperProps: { style: { maxHeight: 240 } } }}
          >
            {YearOptions.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div style={{ height: 320 }}>
          {loading ? (
            <div className="flex items-center justify-center h-full">Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#2D6A4F" barSize={26} />
                <ReferenceLine y={0} stroke="#000" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabelAndUserChart;
