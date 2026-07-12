import React, { useState } from "react";
import { Pencil, Star, ImagePlus } from "lucide-react";
import { useNavigate } from "react-router";

/* ─────────────────────────────────────────────
   Static Data
───────────────────────────────────────────── */
const classData = {
  title: "Reformer Pilates",
  subtitle: "Intermediate to Advanced Level Core Conditioning",
  rating: 4.9,
  reviewCount: 245,
  mainImage:
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=450&fit=crop",
  thumbnails: [
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=120&h=90&fit=crop",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=120&h=90&fit=crop",
  ],
  about:
    "A dynamic and rigorous full-body workout using the Reformer apparatus. This class focuses on core strength, flexibility, and lean muscle development. Suitable for those with previous Reformer experience looking to deepen their practice and challenge their stability.",
  sessions: [
    {
      time: "Today, 5:30 PM",
      instructor: "with Sarah Jenkins",
      booked: 8,
      capacity: 8,
    },
    {
      time: "Tomorrow, 7:00 AM",
      instructor: "with Mike Ross",
      booked: 6,
      capacity: 8,
    },
    {
      time: "Tomorrow, 6:00 PM",
      instructor: "with Sarah Jenkins",
      booked: 4,
      capacity: 8,
    },
  ],
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
  const [activeImage, setActiveImage] = useState(classData.mainImage);

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
            onClick={() => navigate("/class/editclass")}
            className="flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 text-[13px] font-medium px-3.5 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <Pencil size={13} />
            Edit Class
          </button>
        </div>

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

        {/* ── About this Class ── */}
        <div className="mt-5 w-full lg:w-3/4 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-[15px] font-bold text-gray-800 mb-2">
            About this Class
          </h2>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            {classData.about}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewClass;
