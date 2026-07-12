import React, { useState } from "react";
import {
  Eye,
  XCircle,
  X,
  Search,
  Plus,
  ChevronDown,
  Upload,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router";
import Paginations from "../../common/Paginations";

/* ─────────────────────────────────────────────
   Sample Data
───────────────────────────────────────────── */
const initialClasses = [
  {
    id: "#ST-1043",
    title: "Morning Vinyasa Flow",
    subtitle: "Vinyasa Yoga • 60m • 2 Cr",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=60&h=60&fit=crop",
    instructor: "Sarah Jenkins",
    studio: "Downtown Core",
    date: "Oct 24, 2023",
    timeStart: "07:00 AM",
    timeEnd: "08:00 AM",
  },
  {
    id: "#ST-1043",
    title: "Morning Vinyasa Flow",
    subtitle: "Vinyasa Yoga • 60m • 2 Cr",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=60&h=60&fit=crop",
    instructor: "Marcus Chen",
    studio: "Downtown Core",
    date: "Oct 24, 2023",
    timeStart: "07:00 AM",
    timeEnd: "08:00 AM",
  },
  {
    id: "#ST-1038",
    title: "Evening Restorative",
    subtitle: "Guided Meditation • 60m • 1 Cr",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=60&h=60&fit=crop",
    instructor: "David Ross",
    studio: "Downtown Core",
    date: "Oct 24, 2023",
    timeStart: "07:00 AM",
    timeEnd: "08:00 AM",
  },
  {
    id: "#ST-1043",
    title: "Morning Vinyasa Flow",
    subtitle: "Vinyasa Yoga • 60m • 2 Cr",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=60&h=60&fit=crop",
    instructor: "Sarah Jenkins",
    studio: "Downtown Core",
    date: "Oct 24, 2023",
    timeStart: "07:00 AM",
    timeEnd: "08:00 AM",
  },
  {
    id: "#ST-1043",
    title: "Morning Vinyasa Flow",
    subtitle: "Vinyasa Yoga • 60m • 2 Cr",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=60&h=60&fit=crop",
    instructor: "Marcus Chen",
    studio: "Downtown Core",
    date: "Oct 24, 2023",
    timeStart: "07:00 AM",
    timeEnd: "08:00 AM",
  },
  {
    id: "#ST-1038",
    title: "Evening Restorative",
    subtitle: "Guided Meditation • 60m • 1 Cr",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=60&h=60&fit=crop",
    instructor: "David Ross",
    studio: "Downtown Core",
    date: "Oct 24, 2023",
    timeStart: "07:00 AM",
    timeEnd: "08:00 AM",
  },
  {
    id: "#ST-1043",
    title: "Morning Vinyasa Flow",
    subtitle: "Vinyasa Yoga • 60m • 2 Cr",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=60&h=60&fit=crop",
    instructor: "Sarah Jenkins",
    studio: "Downtown Core",
    date: "Oct 24, 2023",
    timeStart: "07:00 AM",
    timeEnd: "08:00 AM",
  },
  {
    id: "#ST-1043",
    title: "Morning Vinyasa Flow",
    subtitle: "Vinyasa Yoga • 60m • 2 Cr",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=60&h=60&fit=crop",
    instructor: "Marcus Chen",
    studio: "Downtown Core",
    date: "Oct 24, 2023",
    timeStart: "07:00 AM",
    timeEnd: "08:00 AM",
  },
  {
    id: "#ST-1038",
    title: "Evening Restorative",
    subtitle: "Guided Meditation • 60m • 1 Cr",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=60&h=60&fit=crop",
    instructor: "David Ross",
    studio: "Downtown Core",
    date: "Oct 24, 2023",
    timeStart: "07:00 AM",
    timeEnd: "08:00 AM",
  },
];


/* ─────────────────────────────────────────────
   Class Management Page
───────────────────────────────────────────── */
const ClassManagement = () => {
    const navigate = useNavigate();
  const [classes, setClasses] = useState(initialClasses);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

    // ✅ pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const handleRemove = (index) => {
    setClasses(classes.filter((_, i) => i !== index));
  };



  const filtered = classes.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase()) ||
      c.studio.toLowerCase().includes(search.toLowerCase()),
  );

    // ✅ pagination logic
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / perPage);

  const startIndex = (currentPage - 1) * perPage;
  const currentData = filtered.slice(startIndex, startIndex + perPage);

  // reset page when search changes
  React.useEffect(() => {
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
                <th className="py-3.5 px-5 font-semibold">Studio Name</th>
                <th className="py-3.5 px-5 font-semibold">Date &amp; Time</th>
                <th className="py-3.5 px-5 font-semibold text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {currentData.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-gray-400 text-sm"
                  >
                    No classes found.
                  </td>
                </tr>
              ) : (
                currentData.map((cls, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors"
                  >
                    {/* S.ID */}
                    <td className="py-3.5 px-5 text-gray-500 font-medium">
                      {cls.id}
                    </td>

                    {/* Class Title */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={cls.image}
                          alt={cls.title}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {cls.title}
                          </p>
                          <p className="text-[12px] text-gray-400 mt-0.5">
                            {cls.subtitle}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Instructor */}
                    <td className="py-3.5 px-5 text-gray-700">
                      {cls.instructor}
                    </td>

                    {/* Studio Name */}
                    <td className="py-3.5 px-5">
                      <span className="text-[#1b5e43] font-medium hover:underline cursor-pointer">
                        {cls.studio}
                      </span>
                    </td>

                    {/* Date & Time */}
                    <td className="py-3.5 px-5">
                      <p className="text-gray-700 font-medium">{cls.date}</p>
                      <p className="text-[12px] text-gray-400 mt-0.5">
                        {cls.timeStart} - {cls.timeEnd}
                      </p>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center justify-center gap-3 text-gray-400">
                        <button
                        onClick={()=>navigate('/class/viewclass')}
                          title="View"
                          className="hover:text-[#1b5e43] transition-colors cursor-pointer"
                        >
                          <Eye size={18} strokeWidth={1.5} />
                        </button>
                        <button
                          title="Remove"
                          onClick={() => handleRemove(index)}
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

export default ClassManagement;
