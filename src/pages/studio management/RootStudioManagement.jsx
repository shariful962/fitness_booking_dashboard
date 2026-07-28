import React, { useEffect, useState } from "react";
import { Eye, Search } from "lucide-react";
import { useNavigate } from "react-router";
import Paginations from "../../common/Paginations";
import { baseApi } from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endpoints";

const ROOT_STUDIO_API = ENDPOINTS.root_admin_studio;

const RootStudioManagement = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ── Pagination State ── */
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  /* ── Filter ── */
  const filtered = studios.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.owner.toLowerCase().includes(search.toLowerCase()) ||
      s.full_address.toLowerCase().includes(search.toLowerCase());

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

  useEffect(() => {
    const fetchStudios = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await baseApi.get(ROOT_STUDIO_API);
        const mapped = (res.data?.studios || []).map((item) => ({
          id: `#ST-${item.id}`,
          name: item.name || "-",
          owner: item.admin?.name || "-",
          full_address: item.full_address || "",
          classes: item.active_classes ?? 0,
          raw: item,
        }));
        setStudios(mapped);
      } catch (err) {
        console.error("Failed to load studios:", err);
        setError(
          err?.response?.data?.detail ||
            err?.response?.data?.message ||
            "Unable to load studios. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudios();
  }, []);

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
                      Classes
                    </th>

                    <th className="py-3.5 px-5 font-medium text-center whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="text-[13px]">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-400">
                        Loading studios...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-red-500">
                        {error}
                      </td>
                    </tr>
                  ) : paginatedStudios.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-400">
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
                          {startIndex + index + 1}
                        </td>

                        {/* Studio */}
                        <td className="py-3 px-5 whitespace-nowrap">
                          <span className="font-semibold text-gray-800">
                            {studio.name}
                          </span>
                        </td>

                        {/* Owner */}
                        <td className="py-3 px-5 text-gray-600 whitespace-nowrap">
                          {studio.owner}
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
                              onClick={() => navigate(`/studio/rootviewstudio/${studio.raw.id}`)}
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