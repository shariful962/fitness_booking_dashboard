import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import Paginations from "../../common/Paginations";
import { baseApi } from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endpoints";

const formatTime = (value) => {
  if (!value) return "-";

  const [hours = "0", minutes = "00"] = String(value).split(":");
  const hour = Number(hours);

  if (Number.isNaN(hour)) return value;

  const suffix = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;

  return `${formattedHour}:${minutes.padStart(2, "0")} ${suffix}`;
};

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

const normalizeApiData = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.classes)) return payload.classes;
  return [];
};

const mapClassData = (item) => ({
  id: item.id,
  title: item.name || "-",
  subtitle: [
    item.category,
    item.duration_minutes ? `${item.duration_minutes}m` : null,
    item.credit ? `${item.credit} Cr` : null,
  ]
    .filter(Boolean)
    .join(" • "),
  instructor: item.instructor_name || "-",
  studio: item.studio_name || "-",
  date: formatDate(item.date),
  timeStart: formatTime(item.start_time),
  active: item.is_active ?? true,
});

const RootClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [togglingId, setTogglingId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingClass, setPendingClass] = useState(null);
  const perPage = 5;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await baseApi.get(ENDPOINTS.root_Admin_Classes);
        const data = normalizeApiData(response.data);
        setClasses(data.map(mapClassData));
        setError("");
      } catch (err) {
        console.error("Failed to fetch root admin classes:", err);
        const detail = err?.response?.data?.detail || err?.response?.data?.message;
        setError(detail || "Unable to load classes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleToggleRequest = (classItem) => {
    setPendingClass(classItem);
    setShowConfirmModal(true);
  };

  const handleToggleConfirm = async () => {
    if (!pendingClass) return;

    const classId = pendingClass.id;
    const nextValue = !pendingClass.active;

    try {
      setTogglingId(classId);
      setError("");

      const endpoint = ENDPOINTS.root_Admin_ClassDetail.replace(":id", classId);
      await baseApi.patch(endpoint, { is_active: nextValue });

      setClasses((prev) =>
        prev.map((cls) => (cls.id === classId ? { ...cls, active: nextValue } : cls))
      );
      setShowConfirmModal(false);
      setPendingClass(null);
    } catch (err) {
      console.error("Failed to update class status:", err);
      const detail = err?.response?.data?.detail || err?.response?.data?.message;
      setError(detail || "Unable to update class status. Please try again.");
    } finally {
      setTogglingId(null);
    }
  };

  const handleToggleCancel = () => {
    setShowConfirmModal(false);
    setPendingClass(null);
  };

  const filtered = classes.filter((c) => {
    const searchValue = search.toLowerCase();

    return [c.title, c.subtitle, c.instructor, c.studio, c.date, c.timeStart]
      .join(" ")
      .toLowerCase()
      .includes(searchValue);
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
        <div className="bg-[#1b5e43] px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Class Schedule Management</h1>
            <p className="text-green-200 text-sm mt-1">
              Manage your studio's upcoming classes, instructors, and capacity.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
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
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[13px] text-gray-600">
                <th className="py-3.5 px-5 font-semibold">S.ID</th>
                <th className="py-3.5 px-5 font-semibold">Class Title</th>
                <th className="py-3.5 px-5 font-semibold">Instructor</th>
                <th className="py-3.5 px-5 font-semibold">Studio Name</th>
                <th className="py-3.5 px-5 font-semibold">Date &amp; Time</th>
                <th className="py-3.5 px-5 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 text-sm">
                    Loading classes...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-red-500 text-sm">
                    {error}
                  </td>
                </tr>
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 text-sm">
                    No classes found.
                  </td>
                </tr>
              ) : (
                currentData.map((cls, index) => (
                  <tr key={cls.id} className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-5 text-gray-500 font-medium">{startIndex + index + 1}</td>

                    <td className="py-3.5 px-5">
                      <div>
                        <p className="font-semibold text-gray-800">{cls.title}</p>
                        <p className="text-[12px] text-gray-400 mt-0.5">{cls.subtitle}</p>
                      </div>
                    </td>

                    <td className="py-3.5 px-5 text-gray-700">{cls.instructor}</td>

                    <td className="py-3.5 px-5">
                      <span className="text-[#1b5e43] font-medium hover:underline cursor-pointer">
                        {cls.studio}
                      </span>
                    </td>

                    <td className="py-3.5 px-5">
                      <p className="text-gray-700 font-medium">{cls.date}</p>
                      <p className="text-[12px] text-gray-400 mt-0.5">{cls.timeStart}</p>
                    </td>

                    <td className="py-3.5 px-5">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleToggleRequest(cls)}
                          disabled={togglingId === cls.id}
                          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1b5e43]/20 cursor-pointer disabled:opacity-60"
                          style={{ backgroundColor: cls.active ? "#1b5e43" : "#d1d5db" }}
                          aria-label="Toggle class status"
                        >
                          <span
                            className="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform"
                            style={{ transform: cls.active ? "translateX(1.25rem)" : "translateX(0.125rem)" }}
                          />
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

      {showConfirmModal && pendingClass && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-[16px] bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {pendingClass.active ? "Deactivate this class?" : "Activate this class?"}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  This will change the class status for the selected class.
                </p>
              </div>
              <button
                onClick={handleToggleCancel}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="font-semibold text-gray-800">{pendingClass.title}</p>
              <p className="text-sm text-gray-500">
                {pendingClass.instructor} • {pendingClass.studio}
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleToggleCancel}
                className="rounded-[10px] border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleToggleConfirm}
                disabled={togglingId === pendingClass.id}
                className={`rounded-[10px] px-4 py-2 text-sm font-medium text-white ${
                  pendingClass.active ? "bg-red-600 hover:bg-red-700" : "bg-[#1b5e43] hover:bg-[#144c35]"
                } disabled:opacity-60`}
              >
                {togglingId === pendingClass.id
                  ? "Updating..."
                  : pendingClass.active
                    ? "Deactivate"
                    : "Activate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RootClassManagement;
