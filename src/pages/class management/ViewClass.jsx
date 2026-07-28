import React, { useEffect, useState } from "react";
import { Pencil, Star, ImagePlus } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { baseApi } from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endpoints";

const defaultClassData = {
  title: "Class Details",
  subtitle: "Loading class information...",
  rating: 0,
  reviewCount: 0,
  mainImage:
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=450&fit=crop",
  thumbnails: [],
  about: "No description available.",
  sessions: [],
  category: "-",
  price: "-",
  location: "-",
  instructor: "-",
  date: "-",
  time: "-",
  duration: "-",
  capacity: "-",
  amenities: [],
  whatToBring: [],
};

const buildImageUrl = (value) => {
  if (!value) return null;

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    if (/^https?:\/\//i.test(trimmed) || /^data:/i.test(trimmed)) {
      return trimmed;
    }

    const baseUrl = ENDPOINTS.mainURL?.replace(/\/$/, "");
    if (!baseUrl) return trimmed;

    return `${baseUrl}${trimmed.startsWith("/") ? "" : "/"}${trimmed}`;
  }

  if (typeof value === "object") {
    return buildImageUrl(value.url || value.image || value.image_url || value.file || value.path || value.src);
  }

  return null;
};

const normalizeImages = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .map((item) => buildImageUrl(item))
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => buildImageUrl(item))
      .filter(Boolean);
  }

  if (typeof value === "object") {
    return normalizeImages(value.images || value.image_urls || value.urls || value.results || value.data);
  }

  return [];
};

/* ─────────────────────────────────────────────
   Session Badge
───────────────────────────────────────────── */
const SessionBadge = ({ booked, capacity }) => {
  const isFull = booked >= capacity;
  return (
    <span
      className={`text-[11px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap ${
        isFull ? "bg-[#d8efe5] text-[#1b5e43]" : "bg-gray-100 text-gray-500"
      }`}
    >
      {booked}/{capacity} {isFull ? "Full" : "Booked"}
    </span>
  );
};

/* ─────────────────────────────────────────────
   ViewClass Page
───────────────────────────────────────────── */
const ViewClass = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [classData, setClassData] = useState(defaultClassData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(defaultClassData.mainImage);

  useEffect(() => {
    const fetchClass = async () => {
      if (!id) {
        setError("No class ID provided.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data } = await baseApi.get(ENDPOINTS.class_detail.replace(":id", id));

        const images = normalizeImages(
          data?.images || data?.image_urls || data?.image || data?.image_url || data?.thumbnail || data?.thumbnails
        );
        const mainImage = images[0] || defaultClassData.mainImage;

        setClassData({
          title: data?.name || "Untitled class",
          subtitle: data?.description || "No description available.",
          rating: data?.rating || 0,
          reviewCount: data?.review_count || 0,
          mainImage,
          thumbnails: images.slice(1),
          about: data?.description || "No description available.",
          sessions: [
            {
              time: `${data?.date || "-"} • ${data?.start_time || "-"}`,
              instructor: data?.instructor_name ? `with ${data?.instructor_name}` : "Instructor not available",
              booked: data?.capacity ? 0 : 0,
              capacity: data?.capacity || 0,
            },
          ],
          category: data?.category || "-",
          price: data?.price || "-",
          location: data?.location || "-",
          instructor: data?.instructor_name || "-",
          date: data?.date || "-",
          time: data?.start_time || "-",
          duration: data?.duration_minutes ? `${data.duration_minutes} min` : "-",
          capacity: data?.capacity || "-",
          amenities: Array.isArray(data?.amenities) ? data.amenities : [],
          whatToBring: Array.isArray(data?.what_to_bring) ? data.what_to_bring : [],
        });
        setActiveImage(mainImage);
        setError("");
      } catch (err) {
        console.error("Failed to fetch class details:", err);
        setError("Unable to load class details.");
      } finally {
        setLoading(false);
      }
    };

    fetchClass();
  }, [id]);

  return (
    <div className="p-4 bg-Primary min-h-[calc(100vh-100px)] font-Inter">
      <div className="bg-white shadow-custom rounded-[10px] p-6">
        {/* ── Page Header ── */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {classData.title}
            </h1>
            <p className="text-[13px] text-gray-400 mt-0.5">
              {classData.subtitle}
            </p>
          </div>
          <button
            onClick={() => navigate(`/class/editclass/${id}`)}
            className="flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 text-[13px] font-medium px-3.5 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <Pencil size={13} />
            Edit Class
          </button>
        </div>

        {loading ? (
          <div className="py-10 text-center text-gray-500">Loading class details...</div>
        ) : error ? (
          <div className="py-10 text-center text-red-500">{error}</div>
        ) : (
          <>
        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-5">
          {/* ── Left: Image Gallery ── */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            {/* Main Image */}
            <div className="rounded-xl overflow-hidden mb-3">
              <img
                src={activeImage}
                alt="Class"
                className="w-full h-[220px] object-cover transition-all duration-300"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {classData.thumbnails.map((thumb, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(thumb)}
                  className={`w-[75px] h-[60px] rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImage === thumb
                      ? "border-[#1b5e43]"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}

              {/* Add more slot */}
              <button
                onClick={() => setActiveImage(classData.mainImage)}
                className="w-[75px] h-[60px] rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 hover:border-[#1b5e43] hover:text-[#1b5e43] transition-colors flex-shrink-0"
              >
                <ImagePlus size={20} />
              </button>
            </div>
          </div>

          {/* ── Right: Rating + Sessions ── */}
          <div className="flex flex-col gap-4">
            {/* Class Rating Card */}
            <div className="bg-[#1b5e43] rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-green-200 text-[12px] font-medium mb-1">
                  Class Rating
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="text-white text-3xl font-bold leading-none">
                    {classData.rating}
                  </span>
                  <Star
                    size={20}
                    className="text-yellow-400 fill-yellow-400 mt-0.5"
                  />
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-200 text-[12px]">Based on</p>
                <p className="text-white text-[13px] font-semibold">
                  {classData.reviewCount} Reviews
                </p>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex-1">
              <h2 className="text-[15px] font-bold text-gray-800 mb-3">
                Upcoming Sessions
              </h2>

              <div className="flex flex-col gap-2.5">
                {classData.sessions.map((session, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100/70 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-gray-800">
                        {session.time}
                      </p>
                      <p className="text-[12px] text-gray-400 mt-0.5">
                        {session.instructor}
                      </p>
                    </div>
                    <SessionBadge
                      booked={session.booked}
                      capacity={session.capacity}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Detailed Info ── */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-[15px] font-bold text-gray-800 mb-2">
              About this Class
            </h2>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              {classData.about}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-[15px] font-bold text-gray-800 mb-3">
              Class Details
            </h2>
            <div className="space-y-2 text-[13px] text-gray-600">
              <div className="flex justify-between gap-3">
                <span className="text-gray-400">Category</span>
                <span className="font-medium text-gray-700">{classData.category}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-gray-400">Price</span>
                <span className="font-medium text-gray-700">{classData.price}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-gray-400">Location</span>
                <span className="font-medium text-gray-700">{classData.location}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-gray-400">Instructor</span>
                <span className="font-medium text-gray-700">{classData.instructor}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-gray-400">Date</span>
                <span className="font-medium text-gray-700">{classData.date}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-gray-400">Time</span>
                <span className="font-medium text-gray-700">{classData.time}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-gray-400">Duration</span>
                <span className="font-medium text-gray-700">{classData.duration}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-gray-400">Capacity</span>
                <span className="font-medium text-gray-700">{classData.capacity}</span>
              </div>
            </div>

            {classData.amenities.length > 0 && (
              <div className="mt-4">
                <h3 className="text-[13px] font-semibold text-gray-800 mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {classData.amenities.map((item, index) => (
                    <span key={index} className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-[12px]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {classData.whatToBring.length > 0 && (
              <div className="mt-4">
                <h3 className="text-[13px] font-semibold text-gray-800 mb-2">What to Bring</h3>
                <ul className="list-disc list-inside text-[13px] text-gray-600 space-y-1">
                  {classData.whatToBring.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewClass;
