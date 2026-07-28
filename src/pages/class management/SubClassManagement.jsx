import React, { useEffect, useState } from "react";
import { Eye, XCircle, Search, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import Paginations from "../../common/Paginations";
import { baseApi } from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endpoints";

const formatTime = (value) => {
  if (!value) return "N/A";
  const [hours = "00", minutes = "00"] = String(value).split(":");
  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
};

const calculateEndTime = (startTime, durationMinutes) => {
  if (!startTime || !durationMinutes) return "-";

  const [hours, minutes] = String(startTime).split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + Number(durationMinutes);
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;

  return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
};

const SubClassManagement = () => {
    const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const { data } = await baseApi.get(ENDPOINTS.classes);

        const mapped = (Array.isArray(data) ? data : []).map((item) => ({
          id: item.id,
          title: item.name || "Untitled class",
          subtitle: `${item.category || "Class"} • ${item.duration_minutes || 0}m • ${item.price || 0} Cr`,
          instructor: item.instructor_name || "-",
          date: item.date || "-",
          timeStart: formatTime(item.start_time),
          timeEnd: calculateEndTime(item.start_time, item.duration_minutes),
        }));

        setClasses(mapped);
        setError("");
      } catch (err) {
        console.error("Failed to fetch classes:", err);
        setError("Unable to load classes.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleRemove = async (id) => {
    try {
      await baseApi.delete(ENDPOINTS.class_detail.replace(":id", id));
      setClasses((prev) => prev.filter((item) => item.id !== id));
      setError("");
    } catch (err) {
      console.error("Failed to delete class:", err);
      setError("Unable to delete class.");
    }
  };



  const filtered = classes.filter((c) => {
    const value = search.toLowerCase();
    return (
      c.title.toLowerCase().includes(value) ||
      c.instructor.toLowerCase().includes(value) ||
      c.subtitle.toLowerCase().includes(value)
    );
  });

  const totalItems = filtered.length;
  const startIndex = (currentPage - 1) * perPage;
  const currentData = filtered.slice(startIndex, startIndex + perPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="p-4 bg-Primary min-h-[calc(100vh-100px)]">
    

      <div className="bg-white shadow-custom rounded-[10px] overflow-hidden min-h-[calc(100vh-135px)] font-Inter">
        {/* ── Header ── */}
        <div className="bg-[#1b5e43] px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Class Schedule Management
            </h1>
            <p className="text-green-200 text-sm mt-1">
              Manage your studio's upcoming classes, instructors, and capacity.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Search */}
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search classes..."
                className="bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-md pl-9 pr-4 py-2 text-sm outline-none focus:bg-white/20 focus:border-white/40 transition w-48"
              />
            </div>
            {/* Add Button */}
            <button
              onClick={() => navigate("/class/createclass")}
              className="cursor-pointer flex items-center gap-1.5 bg-white text-[#1b5e43] hover:bg-green-50 px-4 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm whitespace-nowrap"
            >
              <Plus size={15} />
              Add New Class
            </button>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[13px] text-gray-600">
                <th className="py-3.5 px-5 font-semibold">S.ID</th>
                <th className="py-3.5 px-5 font-semibold">Class Title</th>
                <th className="py-3.5 px-5 font-semibold">Instructor</th>
                <th className="py-3.5 px-5 font-semibold">Date &amp; Time</th>
                <th className="py-3.5 px-5 font-semibold text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400 text-sm">
                    Loading classes...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-red-500 text-sm">
                    {error}
                  </td>
                </tr>
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400 text-sm">
                    No classes found.
                  </td>
                </tr>
              ) : (
                currentData.map((cls, index) => (
                  <tr
                    key={cls.id}
                    className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="py-3.5 px-5 text-gray-500 font-medium">{startIndex + index + 1}</td>

                    <td className="py-3.5 px-5">
                      <div>
                        <p className="font-semibold text-gray-800">{cls.title}</p>
                        <p className="text-[12px] text-gray-400 mt-0.5">{cls.subtitle}</p>
                      </div>
                    </td>

                    <td className="py-3.5 px-5 text-gray-700">{cls.instructor}</td>

                    <td className="py-3.5 px-5">
                      <p className="text-gray-700 font-medium">{cls.date}</p>
                      <p className="text-[12px] text-gray-400 mt-0.5">
                        {cls.timeStart} - {cls.timeEnd}
                      </p>
                    </td>

                    <td className="py-3.5 px-5">
                      <div className="flex items-center justify-center gap-3 text-gray-400">
                        <button
                          onClick={() => navigate(`/class/viewclass/${cls.id}`)}
                          title="View"
                          className="hover:text-[#1b5e43] transition-colors cursor-pointer"
                        >
                          <Eye size={18} strokeWidth={1.5} />
                        </button>
                        <button
                          title="Remove"
                          onClick={() => handleRemove(cls.id)}
                          className="hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <XCircle size={18} strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

         <div className="px-5 py-4 border-t">
          <Paginations
            totalItems={totalItems}
            currentPage={currentPage}
            perPage={perPage}
            onPageChange={(event, value) => setCurrentPage(value)}
          />
        </div>

      </div>
    </div>
  );
};

export default SubClassManagement;

