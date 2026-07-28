import React, { useEffect, useState } from "react";
import {
  MapPin,
  Pencil,
  CheckCircle,
  PauseCircle,
  Info,
  Video,
  CalendarDays,
  Play,
  Image,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { baseApi } from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endpoints";

const RootViewStudio = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedVideo, setSelectedVideo] = useState(null);

  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudioDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const endpoint = ENDPOINTS.root_admin_studio_detail.replace(":id", id);
        const res = await baseApi.get(endpoint);

        if (res.data) {
          setStudio(res.data);
        }
      } catch (err) {
        console.error("Failed to load studio details:", err);
        setError(
          err?.response?.data?.detail ||
            err?.response?.data?.message ||
            "Unable to load studio details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudioDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-4 bg-[#f4f7f5] min-h-[calc(100vh-100px)] font-Inter flex items-center justify-center">
        <div className="text-gray-400">Loading studio details...</div>
      </div>
    );
  }

  if (error || !studio) {
    return (
      <div className="p-4 bg-[#f4f7f5] min-h-[calc(100vh-100px)] font-Inter flex items-center justify-center">
        <div className="text-red-500">{error || "Studio not found"}</div>
      </div>
    );
  }

  const coverImageUrl = studio.cover_photo || null;
  const studioStatus = studio.is_active ? "Active" : "Inactive";
  const studioName = studio.name || "Studio Name";
  const studioAddress = studio.full_address || "Address not available";
  const adminName = studio.admin?.name || "-";
  const adminEmail = studio.admin?.email || "-";
  const adminPhone = studio.admin?.phone || "-";
  const taxId = studio.tax_id || "-";
  const operatingHours = studio.operating_hours || "Not specified";
  // Normalize media coming from API: some responses use `images` and nested keys
  const videos = (studio.videos || []).map((v) => {
    if (!v) return null;
    if (typeof v === "string") return { id: null, url: v, thumbnail: null };
    return { id: v.id ?? null, url: v.video ?? v.url ?? null, thumbnail: v.thumbnail ?? null };
  }).filter(Boolean);

  const photos = (studio.images || studio.photos || []).map((p) => {
    if (!p) return null;
    if (typeof p === "string") return { id: null, url: p };
    return { id: p.id ?? null, url: p.image ?? p.url ?? null };
  }).filter(Boolean);
  const classes = studio.classes || [];

  return (
    <div className="p-4 bg-[#f4f7f5] min-h-[calc(100vh-100px)] font-Inter">
      {/* ── Hero Banner ── */}
      <div className="relative rounded-2xl overflow-hidden mb-5 shadow-sm">
        {/* Cover image or background color */}
        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            alt={studioName}
            className="w-full h-52 object-cover"
          />
        ) : (
          <div className="w-full h-52 bg-gradient-to-r from-[#1b5e43] to-[#2D6A4F]" />
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Bottom-left: name + badge + address */}
        <div className="absolute bottom-0 left-0 p-5">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-white">{studioName}</h1>
            <span
              className={`text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                studioStatus === "Active"
                  ? "bg-[#1b5e43]"
                  : "bg-gray-500"
              }`}
            >
              {studioStatus}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-white/80 text-[13px]">
            <MapPin size={13} className="flex-shrink-0" />
            <span>{studioAddress}</span>
          </div>
        </div>

     
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
        {/* ── Left Column ── */}
        <div className="flex flex-col gap-4">
          {/* Studio Information Card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Info size={17} className="text-[#1b5e43]" />
              <h2 className="text-[15px] font-bold text-gray-800">
                Studio Information
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <div>
                <p className="text-[12px] text-gray-400 font-medium mb-1">
                  Studio Name
                </p>
                <p className="text-[13px] font-semibold text-gray-800">
                  {studioName}
                </p>
              </div>

              <div>
                <p className="text-[12px] text-gray-400 font-medium mb-1">
                  Location
                </p>
                <p className="text-[13px] font-semibold text-gray-800">
                  {studioAddress}
                </p>
              </div>

              <div>
                <p className="text-[12px] text-gray-400 font-medium mb-1">
                  Admin Name
                </p>
                <p className="text-[13px] font-semibold text-gray-800">
                  {adminName}
                </p>
              </div>

              <div>
                <p className="text-[12px] text-gray-400 font-medium mb-1">
                  Admin Email
                </p>
                <p className="text-[13px] font-semibold text-gray-800">
                  {adminEmail}
                </p>
              </div>

              <div>
                <p className="text-[12px] text-gray-400 font-medium mb-1">
                  Admin Phone
                </p>
                <p className="text-[13px] font-semibold text-gray-800">
                  {adminPhone}
                </p>
              </div>
            </div>
          </div>

          {/* Studio Videos Card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Video size={17} className="text-[#1b5e43]" />
              <h2 className="text-[15px] font-bold text-gray-800">
                Studio Videos
              </h2>
            </div>

            {videos && videos.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {videos.map((video, i) => (
                  <div
                    key={video.id ?? i}
                    className="relative rounded-xl overflow-hidden group cursor-pointer"
                  onClick={() => video.url && setSelectedVideo(video.url)}
                  >
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt={`Video ${i + 1}`}
                        className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : video.url ? (
                      <video src={video.url} className="w-full h-28 object-cover" controls preload="metadata" onClick={(e) => e.stopPropagation()} />
                    ) : (
                      <div className="w-full h-28 bg-gray-300 flex items-center justify-center">
                        <Video size={24} className="text-gray-400" />
                      </div>
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center">
                        <Play
                          size={16}
                          className="text-white fill-white ml-0.5"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-400">
                <Video size={32} className="mx-auto mb-2 opacity-50" />
                <p>No videos available.</p>
              </div>
            )}
          </div>
          {/* Video Modal */}
          {selectedVideo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/60" onClick={() => setSelectedVideo(null)} />
              <div className="relative w-full max-w-3xl p-4">
                <video src={selectedVideo} controls autoPlay className="w-full max-h-[80vh] rounded-lg bg-black" />
                <button onClick={() => setSelectedVideo(null)} className="absolute top-3 right-3 bg-white/80 rounded-full p-2">✕</button>
              </div>
            </div>
          )}

          {/* Studio Photos Card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Image size={17} className="text-[#1b5e43]" />
              <h2 className="text-[15px] font-bold text-gray-800">
                Studio Photos
              </h2>
            </div>

            {photos && photos.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {photos.map((photo, i) => (
                  <div
                    key={photo.id ?? i}
                    className="relative rounded-xl overflow-hidden group cursor-pointer"
                  >
                    {photo.url ? (
                      <img
                        src={photo.url}
                        alt={`Photo ${i + 1}`}
                        className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-24 bg-gray-300 flex items-center justify-center">
                        <Image size={20} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-400">
                <Image size={32} className="mx-auto mb-2 opacity-50" />
                <p>No photos available.</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Right Column ── */}
        <div>
          {/* Today's Classes Card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays size={17} className="text-[#1b5e43]" />
              <h2 className="text-[15px] font-bold text-gray-800">
                Classes ({classes.length})
              </h2>
            </div>

            {classes && classes.length > 0 ? (
              <div className="flex flex-col gap-3">
                {classes.slice(0, 5).map((cls, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3.5 rounded-xl bg-gray-50/70 hover:bg-gray-100/70 transition-colors"
                  >
                    {/* Time badge */}
                    <div className="flex-shrink-0 bg-[#e8f0fd] text-[#1a4db5] text-[12px] font-bold px-2.5 py-1.5 rounded-lg min-w-[52px] text-center">
                      {cls.time || "TBD"}
                    </div>

                    {/* Class info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-gray-800 truncate">
                        {cls.name || "Class"}
                      </p>
                      <p className="text-[12px] text-gray-400 mt-0.5">
                        {cls.instructor_name
                          ? `with ${cls.instructor_name}`
                          : "Instructor TBD"}
                      </p>
                    </div>

                    {/* Enrollment */}
                    <div className="flex-shrink-0 text-[13px] font-semibold text-gray-600">
                      {cls.enrolled_count || 0}
                      <span className="text-gray-400 font-normal">
                        /{cls.capacity || 0}
                      </span>
                    </div>
                  </div>
                ))}
                {classes.length > 5 && (
                  <p className="text-[12px] text-gray-400 text-center mt-2">
                    +{classes.length - 5} more classes
                  </p>
                )}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-400">
                <CalendarDays size={32} className="mx-auto mb-2 opacity-50" />
                <p>No classes available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootViewStudio;


