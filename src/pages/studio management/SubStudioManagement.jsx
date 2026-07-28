import React, { useEffect, useRef, useState } from "react";
import { MapPin, Info, Video, Play } from "lucide-react";
import { useNavigate } from "react-router";
import { baseApi } from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endpoints";

const SubStudioManagement = () => {
  const navigate = useNavigate();
  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const { data } = await baseApi.get(ENDPOINTS.studio);
        setStudio(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load studio details.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudio();
  }, []);

  const formatMediaUrl = (src) => {
    if (!src) return null;
    if (typeof src === "string") return src;
    if (typeof src === "object") return src.url || src.path || src.image || src.video || null;
    return null;
  };

  const studioLocation =
    studio?.full_address ||
    (studio?.latitude || studio?.longitude
      ? `${studio.latitude || ""}${
          studio.latitude && studio.longitude ? ", " : ""
        }${studio.longitude || ""}`
      : "Location not available");

  const coverUrl = formatMediaUrl(studio?.cover_photo);
  const studioImages = studio?.images ?? [];
  const studioVideos = studio?.videos ?? [];

  useEffect(() => {
    if (selectedVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [selectedVideo]);

  const openVideo = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="p-4 bg-[#f4f7f5] min-h-[calc(100vh-100px)] font-Inter">
      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading studio details...</div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">{error}</div>
      ) : (
        <>
          <div className="relative rounded-2xl overflow-hidden mb-5 shadow-sm">
            {coverUrl ? (
              <img
                src={coverUrl}
                alt={studio?.name}
                className="w-full h-52 object-cover"
              />
            ) : (
              <div className="w-full h-52 bg-[#1b5e43]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            <div className="absolute bottom-0 left-0 p-5">
              <h1 className="text-2xl font-bold text-white">{studio?.name || "Studio"}</h1>
              <div className="mt-2 flex items-center gap-1.5 text-white/80 text-[13px]">
                <MapPin size={14} className="flex-shrink-0" />
                <span>{studioLocation}</span>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <button
                type="button"
                onClick={() => navigate("/studio/editstudio")}
                className="bg-white/90 hover:bg-white text-gray-700 text-[13px] font-medium px-3.5 py-2 rounded-lg transition-colors shadow-sm"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.6fr] gap-4">
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Info size={18} className="text-[#1b5e43]" />
                  <h2 className="text-[15px] font-bold text-gray-800">Studio Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-[12px] text-gray-400 font-medium">Studio Name</p>
                    <p className="text-sm font-semibold text-gray-800">{studio?.name || "-"}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[12px] text-gray-400 font-medium">Location</p>
                    <p className="text-sm font-semibold text-gray-800">{studioLocation}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[12px] text-gray-400 font-medium">Admin Name</p>
                    <p className="text-sm font-semibold text-gray-800">{studio?.admin?.name || "-"}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[12px] text-gray-400 font-medium">Admin Email</p>
                    <p className="text-sm font-semibold text-gray-800">{studio?.admin?.email || "-"}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[12px] text-gray-400 font-medium">Admin Phone</p>
                    <p className="text-sm font-semibold text-gray-800">{studio?.admin?.phone || "-"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Video size={18} className="text-[#1b5e43]" />
                  <h2 className="text-[15px] font-bold text-gray-800">Studio Videos</h2>
                </div>

                {studioVideos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* {studioVideos.map((video, index) => {
                      const url = formatMediaUrl(video);
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => openVideo(url)}
                          className="group relative overflow-hidden rounded-xl bg-gray-100 h-36 focus:outline-none"
                        >
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/90 border border-white/60 flex items-center justify-center">
                              <Play size={18} className="text-[#1b5e43]" />
                            </div>
                          </div>
                          <div className="absolute bottom-3 left-3 text-white text-sm opacity-90">
                            Play video
                          </div>
                        </button>
                      );
                    })} */}

                    {studioVideos.map((video, index) => {
  const url = formatMediaUrl(video);
  
  return (
    <button
      key={index}
      type="button"
      onClick={() => openVideo(url)}
      className="group relative overflow-hidden rounded-xl bg-gray-100 h-36 focus:outline-none"
    >
      {/* ভিডিওর প্রথম ফ্রেম থাম্বনেইল হিসেবে দেখানো */}
      {url ? (
        <video
          src={url}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          preload="metadata"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
          No Video Available
        </div>
      )}

      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white/90 border border-white/60 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Play size={18} className="text-[#1b5e43]" fill="#1b5e43" />
        </div>
      </div>
      <div className="absolute bottom-3 left-3 text-white text-sm opacity-90 font-medium">
        Play video
      </div>
    </button>
  );
})}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
                    No videos available.
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Info size={18} className="text-[#1b5e43]" />
                  <h2 className="text-[15px] font-bold text-gray-800">Studio Photos</h2>
                </div>

                {studioImages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {studioImages.map((image, index) => {
                      const imageUrl = formatMediaUrl(image);
                      return (
                        <img
                          key={index}
                          src={imageUrl}
                          alt={`Studio photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-xl"
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
                    No photos available.
                  </div>
                )}
              </div>
            </div>
          </div>

          {selectedVideo ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
              <div className="relative w-full max-w-5xl">
                <button
                  type="button"
                  onClick={closeVideo}
                  className="absolute top-3 right-3 rounded-full bg-white/90 p-2 text-gray-700 hover:bg-white"
                >
                  Close
                </button>
                <video
                  ref={videoRef}
                  src={selectedVideo}
                  controls
                  autoPlay
                  className="w-full h-[70vh] rounded-2xl bg-black"
                />
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default SubStudioManagement;


// with next skip for 5s or 10s 
// import React, { useEffect, useRef, useState } from "react";
// import { MapPin, Info, Video, Play, X } from "lucide-react";
// import { useNavigate } from "react-router";
// import { baseApi } from "../../api/baseApi";
// import { ENDPOINTS } from "../../api/endpoints";

// const SubStudioManagement = () => {
//   const navigate = useNavigate();
//   const [studio, setStudio] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [seekIndicator, setSeekIndicator] = useState(null);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const fetchStudio = async () => {
//       try {
//         const { data } = await baseApi.get(ENDPOINTS.studio);
//         setStudio(data);
//       } catch (err) {
//         console.error(err);
//         setError("Unable to load studio details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStudio();
//   }, []);

//   // Keyboard shortcut for video seeking
//   useEffect(() => {
//     if (!selectedVideo) return;

//     const handleKeyDown = (e) => {
//       if (!videoRef.current) return;

//       // Input/textarea এ focus থাকলে shortcut কাজ করবে না
//       const tag = e.target.tagName.toLowerCase();
//       if (tag === "input" || tag === "textarea" || tag === "select") return;

//       let seekTime = 0;
//       if (e.key === "ArrowRight") {
//         seekTime = e.shiftKey ? 10 : 5;
//       } else if (e.key === "ArrowLeft") {
//         seekTime = e.shiftKey ? -10 : -5;
//       } else {
//         return;
//       }

//       e.preventDefault();
//       const video = videoRef.current;
//       const newTime = Math.max(0, Math.min(video.duration, video.currentTime + seekTime));
//       video.currentTime = newTime;

//       setSeekIndicator({
//         direction: seekTime > 0 ? "forward" : "backward",
//         seconds: Math.abs(seekTime),
//       });
//       setTimeout(() => setSeekIndicator(null), 1000);
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [selectedVideo]);

//   const formatMediaUrl = (src) => {
//     if (!src) return null;
//     if (typeof src === "string") return src;
//     if (typeof src === "object") return src.url || src.path || src.image || src.video || null;
//     return null;
//   };

//   const studioLocation =
//     studio?.full_address ||
//     (studio?.latitude || studio?.longitude
//       ? `${studio.latitude || ""}${studio.latitude && studio.longitude ? ", " : ""}${studio.longitude || ""}`
//       : "Location not available");

//   const coverUrl = formatMediaUrl(studio?.cover_photo);
//   const studioImages = studio?.images ?? [];
//   const studioVideos = studio?.videos ?? [];

//   useEffect(() => {
//     if (selectedVideo && videoRef.current) {
//       videoRef.current.play().catch(() => {});
//     }
//   }, [selectedVideo]);

//   const openVideo = (videoUrl) => setSelectedVideo(videoUrl);
//   const closeVideo = () => setSelectedVideo(null);

//   return (
//     <div className="p-4 bg-[#f4f7f5] min-h-[calc(100vh-100px)] font-Inter">
//       {loading ? (
//         <div className="text-center py-20 text-gray-500">Loading studio details...</div>
//       ) : error ? (
//         <div className="text-center py-20 text-red-500">{error}</div>
//       ) : (
//         <>
//           {/* Cover Photo Section - আগের মতোই */}
//           <div className="relative rounded-2xl overflow-hidden mb-5 shadow-sm">
//             {coverUrl ? (
//               <img src={coverUrl} alt={studio?.name} className="w-full h-52 object-cover" />
//             ) : (
//               <div className="w-full h-52 bg-[#1b5e43]" />
//             )}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
//             <div className="absolute bottom-0 left-0 p-5">
//               <h1 className="text-2xl font-bold text-white">{studio?.name || "Studio"}</h1>
//               <div className="mt-2 flex items-center gap-1.5 text-white/80 text-[13px]">
//                 <MapPin size={14} className="flex-shrink-0" />
//                 <span>{studioLocation}</span>
//               </div>
//             </div>
//             <div className="absolute top-4 right-4">
//               <button
//                 type="button"
//                 onClick={() => navigate("/studio/editstudio")}
//                 className="bg-white/90 hover:bg-white text-gray-700 text-[13px] font-medium px-3.5 py-2 rounded-lg transition-colors shadow-sm"
//               >
//                 Edit
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.6fr] gap-4">
//             <div className="space-y-4">
//               {/* Studio Info - আগের মতোই */}
//               <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
//                 <div className="flex items-center gap-2 mb-4">
//                   <Info size={18} className="text-[#1b5e43]" />
//                   <h2 className="text-[15px] font-bold text-gray-800">Studio Information</h2>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <p className="text-[12px] text-gray-400 font-medium">Studio Name</p>
//                     <p className="text-sm font-semibold text-gray-800">{studio?.name || "-"}</p>
//                   </div>
//                   <div className="space-y-2">
//                     <p className="text-[12px] text-gray-400 font-medium">Location</p>
//                     <p className="text-sm font-semibold text-gray-800">{studioLocation}</p>
//                   </div>
//                   <div className="space-y-2">
//                     <p className="text-[12px] text-gray-400 font-medium">Admin Name</p>
//                     <p className="text-sm font-semibold text-gray-800">{studio?.admin?.name || "-"}</p>
//                   </div>
//                   <div className="space-y-2">
//                     <p className="text-[12px] text-gray-400 font-medium">Admin Email</p>
//                     <p className="text-sm font-semibold text-gray-800">{studio?.admin?.email || "-"}</p>
//                   </div>
//                   <div className="space-y-2">
//                     <p className="text-[12px] text-gray-400 font-medium">Admin Phone</p>
//                     <p className="text-sm font-semibold text-gray-800">{studio?.admin?.phone || "-"}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Videos Section */}
//               <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
//                 <div className="flex items-center gap-2 mb-4">
//                   <Video size={18} className="text-[#1b5e43]" />
//                   <h2 className="text-[15px] font-bold text-gray-800">Studio Videos</h2>
//                 </div>
//                 {studioVideos.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     {studioVideos.map((video, index) => {
//                       const url = formatMediaUrl(video);
//                       return (
//                         <button
//                           key={index}
//                           type="button"
//                           onClick={() => openVideo(url)}
//                           className="group relative overflow-hidden rounded-xl bg-gray-100 h-36 focus:outline-none"
//                         >
//                           {url ? (
//                             <video
//                               src={url}
//                               className="absolute inset-0 w-full h-full object-cover"
//                               muted
//                               preload="metadata"
//                             />
//                           ) : (
//                             <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
//                               No Video Available
//                             </div>
//                           )}
//                           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
//                           <div className="absolute inset-0 flex items-center justify-center">
//                             <div className="w-12 h-12 rounded-full bg-white/90 border border-white/60 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
//                               <Play size={18} className="text-[#1b5e43]" fill="#1b5e43" />
//                             </div>
//                           </div>
//                           <div className="absolute bottom-3 left-3 text-white text-sm opacity-90 font-medium">
//                             Play video
//                           </div>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
//                     No videos available.
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Photos Section - আগের মতোই */}
//             <div className="space-y-4">
//               <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
//                 <div className="flex items-center gap-2 mb-4">
//                   <Info size={18} className="text-[#1b5e43]" />
//                   <h2 className="text-[15px] font-bold text-gray-800">Studio Photos</h2>
//                 </div>
//                 {studioImages.length > 0 ? (
//                   <div className="grid grid-cols-2 gap-3">
//                     {studioImages.map((image, index) => {
//                       const imageUrl = formatMediaUrl(image);
//                       return (
//                         <img
//                           key={index}
//                           src={imageUrl}
//                           alt={`Studio photo ${index + 1}`}
//                           className="w-full h-32 object-cover rounded-xl"
//                         />
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
//                     No photos available.
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Video Player Modal with Seek Indicator */}
//           {selectedVideo ? (
//             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
//               <div className="relative w-full max-w-5xl">
//                 <button
//                   type="button"
//                   onClick={closeVideo}
//                   className="absolute -top-12 right-0 rounded-full bg-white/90 p-2 text-gray-700 hover:bg-white flex items-center gap-1 px-3"
//                 >
//                   <X size={16} />
//                   Close
//                 </button>
//                 <video
//                   ref={videoRef}
//                   src={selectedVideo}
//                   controls
//                   autoPlay
//                   className="w-full h-[70vh] rounded-2xl bg-black"
//                 />

//                 {/* Seek Indicator Overlay */}
//                 {seekIndicator && (
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none rounded-2xl">
//                     <div
//                       key={`${seekIndicator.direction}-${seekIndicator.seconds}-${Date.now()}`}
//                       className="bg-black/70 text-white px-6 py-3 rounded-xl text-lg font-semibold flex items-center gap-2"
//                       style={{
//                         animation: "fadeInOut 1s ease-in-out",
//                       }}
//                     >
//                       {seekIndicator.direction === "forward" ? (
//                         <>
//                           <span className="text-2xl">⏩</span>
//                           <span>+{seekIndicator.seconds}s</span>
//                         </>
//                       ) : (
//                         <>
//                           <span className="text-2xl">⏪</span>
//                           <span>-{seekIndicator.seconds}s</span>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Keyboard hint */}
//                 <div className="mt-3 text-center text-white/70 text-xs">
//                   💡 <kbd className="px-1.5 py-0.5 bg-white/20 rounded">←</kbd> / <kbd className="px-1.5 py-0.5 bg-white/20 rounded">→</kbd> 5 sec skip •{" "}
//                   <kbd className="px-1.5 py-0.5 bg-white/20 rounded">Shift</kbd> + Arrow 10 sec skip
//                 </div>
//               </div>
//             </div>
//           ) : null}
//         </>
//       )}

//       {/* CSS Animation for seek indicator */}
//       <style>{`
//         @keyframes fadeInOut {
//           0% { opacity: 0; transform: scale(0.8); }
//           20% { opacity: 1; transform: scale(1); }
//           80% { opacity: 1; transform: scale(1); }
//           100% { opacity: 0; transform: scale(0.8); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SubStudioManagement;
