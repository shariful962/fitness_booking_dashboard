import React, { useEffect, useState } from "react";
import { Eye, Search } from "lucide-react";
import { useNavigate } from "react-router";
import Paginations from "../../common/Paginations";



/* ── Studio Data ── */
const STUDIOS_DATA = [
  {
    id: "#ST-1043",
    name: "Aura Yoga",
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=80&h=80&fit=crop",
    owner: "Sarah Jenkins",
    category: "Yoga",
    city: "Seattle, WA",
    status: "Approved",
    classes: 24,
  },
  {
    id: "#ST-1044",
    name: "Velocity Cycle",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=80&h=80&fit=crop",
    owner: "Marcus Chen",
    category: "Cycling",
    city: "Austin, TX",
    status: "Pending",
    classes: 0,
  },
  {
    id: "#ST-1038",
    name: "Iron Core",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop",
    owner: "David Ross",
    category: "Strength",
    city: "Denver, CO",
    status: "Suspended",
    classes: 0,
  },
  {
    id: "#ST-1045",
    name: "Zenith Pilates",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=80&h=80&fit=crop",
    owner: "Elena Rostova",
    category: "Pilates",
    city: "Miami, FL",
    status: "Rejected",
    classes: 0,
  },
  {
    id: "#ST-1046",
    name: "Power House",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=80&h=80&fit=crop",
    owner: "James Smith",
    category: "Strength",
    city: "Chicago, IL",
    status: "Approved",
    classes: 15,
  },
  {
    id: "#ST-1047",
    name: "Flex Studio",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=80&h=80&fit=crop",
    owner: "Emma Watson",
    category: "Pilates",
    city: "Dallas, TX",
    status: "Pending",
    classes: 0,
  },
  {
    id: "#ST-1048",
    name: "Mind & Body",
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=80&h=80&fit=crop",
    owner: "Olivia Brown",
    category: "Yoga",
    city: "Phoenix, AZ",
    status: "Approved",
    classes: 10,
  },
  {
    id: "#ST-1049",
    name: "Spin Nation",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=80&h=80&fit=crop",
    owner: "Daniel Lee",
    category: "Cycling",
    city: "Boston, MA",
    status: "Rejected",
    classes: 0,
  },
];

/* ── Category Badge ── */
const CategoryBadge = ({ category }) => {
  const styles = {
    Yoga: "bg-purple-50 text-purple-600",
    Cycling: "bg-blue-50 text-blue-600",
    Strength: "bg-orange-50 text-orange-600",
    Pilates: "bg-pink-50 text-pink-600",
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-[11px] font-medium ${
        styles[category] || "bg-gray-100 text-gray-500"
      }`}
    >
      {category}
    </span>
  );
};

const RootStudioManagement = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [studios, setStudios] = useState(STUDIOS_DATA);

  /* ── Pagination State ── */
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  /* ── Filter ── */
  const filtered = studios.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.owner.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  /* ── Pagination Logic ── */
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const paginatedStudios = filtered.slice(startIndex, endIndex);

  /* ── Reset Page On Filter/Search Change ── */
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="p-4 bg-Primary min-h-[calc(100vh-100px)] px-4">
      <div className="bg-white shadow-custom rounded-[10px] mt-5 min-h-[calc(100vh-155px)] font-Inter">
        {/* ── Header ── */}
        <div className="bg-[#2D6A4F] px-8 py-7 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Studio Management
              </h1>

              <p className="text-[#a8d5be] text-sm mt-1.5 max-w-md leading-relaxed">
                Oversee all registered wellness studios, review new
                applications,
                <br />
                and manage operational statuses across the network.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="flex items-center gap-2 bg-white border border-white/20 rounded-lg px-3.5 py-2.5 min-w-[260px]">
                <Search size={15} className="text-gray-700 flex-shrink-0" />

                <input
                  type="text"
                  placeholder="Search studios, owners, cities..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent text-sm text-gray-700 placeholder:text-gray-500 outline-none w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="mt-6">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {/* ── Table ── */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1b5e43] text-white text-[13px]">
                    <th className="py-3.5 px-5 font-medium whitespace-nowrap">
                      S.ID
                    </th>

                    <th className="py-3.5 px-5 font-medium whitespace-nowrap">
                      Studio Name
                    </th>

                    <th className="py-3.5 px-5 font-medium whitespace-nowrap">
                      Owner
                    </th>

                    <th className="py-3.5 px-5 font-medium whitespace-nowrap">
                      Category
                    </th>

                    <th className="py-3.5 px-5 font-medium whitespace-nowrap">
                      City
                    </th>

                    <th className="py-3.5 px-5 font-medium whitespace-nowrap">
                      Classes
                    </th>

                    <th className="py-3.5 px-5 font-medium text-center whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="text-[13px]">
                  {paginatedStudios.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-12 text-center text-gray-400"
                      >
                        No studios found.
                      </td>
                    </tr>
                  ) : (
                    paginatedStudios.map((studio, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                      >
                        {/* ID */}
                        <td className="py-3 px-5 text-gray-500 whitespace-nowrap">
                          {studio.id}
                        </td>

                        {/* Studio */}
                        <td className="py-3 px-5 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <img
                              src={studio.image}
                              alt={studio.name}
                              className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                            />

                            <span className="font-semibold text-gray-800">
                              {studio.name}
                            </span>
                          </div>
                        </td>

                        {/* Owner */}
                        <td className="py-3 px-5 text-gray-600 whitespace-nowrap">
                          {studio.owner}
                        </td>

                        {/* Category */}
                        <td className="py-3 px-5 whitespace-nowrap">
                          <CategoryBadge category={studio.category} />
                        </td>

                        {/* City */}
                        <td className="py-3 px-5 text-gray-600 whitespace-nowrap">
                          {studio.city}
                        </td>

                        {/* Classes */}
                        <td className="py-3 px-5 text-gray-600 whitespace-nowrap">
                          {studio.classes > 0
                            ? `${studio.classes} Active`
                            : "0 Active"}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-5 whitespace-nowrap">
                          <div className="flex items-center justify-center text-gray-400">
                            <button
                              onClick={() => navigate("/studio/rootviewstudio")}
                              className="hover:text-gray-600 transition-colors cursor-pointer"
                            >
                              <Eye size={17} strokeWidth={1.5} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* ── Pagination ── */}
            <div className="p-4 border-t border-gray-100">
              <Paginations
                totalItems={filtered.length}
                currentPage={currentPage}
                perPage={perPage}
                onPageChange={(event, value) => setCurrentPage(value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootStudioManagement;