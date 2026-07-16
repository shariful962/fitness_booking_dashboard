
// import React, { useState, useRef } from "react";
// import {
//   Save,
//   CloudUpload,
//   Plus,
//   X,
//   ChevronRight,
//   Video,
// } from "lucide-react";
// import { useNavigate } from "react-router";
// import { Icons } from "../../lib/images";

// /* ─────────────────────────────────────────────
//    Available Categories
// ───────────────────────────────────────────── */
// const ALL_CATEGORIES = [
//   "Yoga",
//   "Pilates",
//   "Barre",
//   "Meditation",
//   "HIIT",
//   "Spin",
//   "CrossFit",
//   "Boxing",
//   "Dance",
//   "Stretching",
// ];

// /* ─────────────────────────────────────────────
//    Section Card wrapper
// ───────────────────────────────────────────── */
// const SectionCard = ({ title, rightLabel, children }) => (
//   <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-4">
//     <div className="flex items-center justify-between mb-4">
//       <h2 className="text-[15px] font-bold text-[#151C27]">{title}</h2>
//       {rightLabel && (
//         <span className="text-[12px] text-gray-400">{rightLabel}</span>
//       )}
//     </div>
//     {children}
//   </div>
// );

// /* ─────────────────────────────────────────────
//    Field Label
// ───────────────────────────────────────────── */
// const Label = ({ children, required }) => (
//   <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">
//     {children}
//     {required && <span className="text-red-400 ml-0.5">*</span>}
//   </label>
// );

// /* ─────────────────────────────────────────────
//    Input Field
// ───────────────────────────────────────────── */
// const InputField = ({ placeholder, value, onChange, type = "text" }) => (
//   <input
//     type={type}
//     value={value}
//     onChange={onChange}
//     placeholder={placeholder}
//     className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 placeholder-gray-300 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition"
//   />
// );

// /* ─────────────────────────────────────────────
//    Drop Zone
// ───────────────────────────────────────────── */
// const DropZone = ({
//   onFile,
//   icon: Icon = CloudUpload,
  
//   label = "Click to upload or drag and drop",
// }) => {
//   const ref = useRef(null);
//   const [dragging, setDragging] = useState(false);

//   return (
//     <div
//       onDragOver={(e) => {
//         e.preventDefault();
//         setDragging(true);
//       }}
//       onDragLeave={() => setDragging(false)}
//       onDrop={(e) => {
//         e.preventDefault();
//         setDragging(false);
//         const file = e.dataTransfer.files[0];
//         if (file) onFile(file);
//       }}
//       onClick={() => ref.current?.click()}
//       className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-8 cursor-pointer transition-colors ${
//         dragging
//           ? "border-[#1b5e43] bg-[#e8f5f0]"
//           : "border-gray-200 hover:border-[#1b5e43] hover:bg-gray-50/60"
//       }`}
//     >
//       <Icon size={28} className="text-gray-300 mb-2" />
//       <p className="text-[13px] text-gray-400">{label}</p>

//       <input
//         ref={ref}
//         type="file"
//         accept="image/*"
//         className="hidden"
//         onChange={(e) => {
//           const f = e.target.files[0];
//           if (f) onFile(f);
//         }}
//       />
//     </div>
//   );
// };

// /* ─────────────────────────────────────────────
//    EditStudio Page
// ───────────────────────────────────────────── */
// const EditStudio = () => {
//   const navigate = useNavigate();

//   /* form state */
//   const [studioName, setStudioName] = useState("");
//   const [owner, setOwner] = useState("");
//   const [address, setAddress] = useState("");
//   const [description, setDescription] = useState("");

//   /* categories — up to 3 */
//   const [selectedCats, setSelectedCats] = useState(["Meditation"]);

//   /* cover photo */
//   const [coverPhoto, setCoverPhoto] = useState(null);

//   /* studio photos */
//   const [studioPhotos, setStudioPhotos] = useState([
//     "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=300&h=200&fit=crop",
//     "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
//   ]);

//   const photoInputRef = useRef(null);

//   /* videos */
//   const [videos, setVideos] = useState([]);

//   const videoInputRef = useRef(null);

//   /* handlers */
//   const toggleCategory = (cat) => {
//     if (selectedCats.includes(cat)) {
//       setSelectedCats(selectedCats.filter((c) => c !== cat));
//     } else if (selectedCats.length < 10) {
//       setSelectedCats([...selectedCats, cat]);
//     }
//   };

//   const addStudioPhoto = (file) => {
//     const url = URL.createObjectURL(file);
//     setStudioPhotos((prev) => [...prev, url]);
//   };

//   const addVideo = (file) => {
//     const url = URL.createObjectURL(file);

//     setVideos((prev) => [
//       ...prev,
//       {
//         url,
//         file,
//       },
//     ]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate("/studio");

//     console.log("Save studio:", {
//       studioName,
//       owner,
//       address,
//       selectedCats,
//       description,
//       videos,
//     });
//     navigate("/studio");
//   };

//   return (
//     <div className="p-4 bg-Primary min-h-[calc(100vh-100px)] font-Inter">
//       <form onSubmit={handleSubmit}>
//         {/* ── Breadcrumb ── */}
//         <div className="flex items-center gap-1.5 text-[12px] text-gray-400 mb-3">
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="hover:text-[#1b5e43] transition-colors cursor-pointer"
//           >
//             Studio Management
//           </button>

//           <ChevronRight size={13} />

//           <span className="text-gray-600 font-medium">
//             Edit Studio
//           </span>
//         </div>

//         {/* ── Page Header ── */}
//         <div className="flex items-center justify-between mb-5">
//           <h1 className="text-2xl font-bold text-[#151C27]">
//            Edit Studio
//           </h1>

//           <button
//             // onClick={() => navigate("/studio")}
//             type="submit"
//             className="flex items-center gap-1.5 bg-[#1b5e43] hover:bg-[#154a35] text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
//           >
//             <Save size={14} />
//             Save Studio
//           </button>
//         </div>

//         {/* ════════════════════════════════
//             Studio Information
//         ════════════════════════════════ */}
//         <SectionCard title="Studio Information">
//           {/* Studio Name + Owner */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
//             <div>
//               <Label required className="text-[#404943]">Studio Name</Label>

//               <InputField
//                 placeholder="e.g. ZenFlow Wellness"
//                 value={studioName}
//                 onChange={(e) => setStudioName(e.target.value)}
//               />
//             </div>

//             <div>
//               <Label className="text-[#404943]">Studio Owner / Primary Contact</Label>

//               <InputField
//                 placeholder="Select an owner..."
//                 value={owner}
//                 onChange={(e) => setOwner(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Full Address */}
//           <div className="mb-4">
//             <Label required className="text-[#404943]">Full Address</Label>

//             <InputField
//               placeholder="123 Wellness Blvd, Suite 200, City, State, ZIP"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           </div>

//           {/* Primary Categories */}
//           <div>
//             <Label>Primary Categories (Select up to 3)</Label>

//             <div className="flex flex-wrap gap-2">
//               {ALL_CATEGORIES.map((cat) => {
//                 const active = selectedCats.includes(cat);

//                 return (
//                   <button
//                     key={cat}
//                     type="button"
//                     onClick={() => toggleCategory(cat)}
//                     className={`px-3 py-1 rounded-full text-[12px] font-medium border transition-all ${
//                       active
//                         ? "bg-[#1b5e43] text-white border-[#1b5e43]"
//                         : "bg-white text-gray-600 border-gray-200 hover:border-[#1b5e43] hover:text-[#1b5e43]"
//                     }`}
//                   >
//                     {active && (
//                       <X size={10} className="inline mr-1 mb-0.5" />
//                     )}

//                     {cat}
//                   </button>
//                 );
//               })}

//               <button
//                 type="button"
//                 className="w-7 h-7 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-[#1b5e43] hover:text-[#1b5e43] transition-colors"
//               >
//                 <Plus size={14} />
//               </button>
//             </div>
//           </div>
//         </SectionCard>

//         {/* ════════════════════════════════
//             Media Gallery
//         ════════════════════════════════ */}
//         <SectionCard
//           title="Media Gallery"
//           rightLabel="High-quality JPG or PNG"
//         >
//           {/* Cover Photo */}
//           <p className="text-[12px] font-semibold text-gray-600 mb-2">
//             Cover Photo (Featured)
//           </p>

//           {coverPhoto ? (
//             <div className="relative rounded-xl overflow-hidden mb-5 group">
//               <img
//                 src={coverPhoto}
//                 alt="Cover"
//                 className="w-full h-48 object-cover"
//               />

//               <button
//                 type="button"
//                 onClick={() => setCoverPhoto(null)}
//                 className="absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
//               >
//                 <X size={13} />
//               </button>
//             </div>
//           ) : (
//             <div className="mb-5">
//               <DropZone
//                 onFile={(f) =>
//                   setCoverPhoto(URL.createObjectURL(f))
//                 }
//               />
//             </div>
//           )}

//           {/* Studio Photos */}
//           <p className="text-[12px] font-semibold text-gray-600 mb-2">
//             Studio Photos
//           </p>

//           <div className="flex flex-wrap gap-3">
//             {studioPhotos.map((src, i) => (
//               <div
//                 key={i}
//                 className="relative w-[120px] h-[84px] rounded-xl overflow-hidden group flex-shrink-0"
//               >
//                 <img
//                   src={src}
//                   alt={`Studio photo ${i + 1}`}
//                   className="w-full h-full object-cover"
//                 />

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setStudioPhotos(
//                       studioPhotos.filter((_, idx) => idx !== i)
//                     )
//                   }
//                   className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
//                 >
//                   <X size={10} />
//                 </button>
//               </div>
//             ))}

//             {/* Add photo button */}
//             <button
//               type="button"
//               onClick={() => photoInputRef.current?.click()}
//               className="w-[120px] h-[84px] rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 hover:border-[#1b5e43] hover:text-[#1b5e43] transition-colors flex-shrink-0"
//             >
//               <Plus size={22} />
//             </button>

//             <input
//               ref={photoInputRef}
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => {
//                 const f = e.target.files[0];
//                 if (f) addStudioPhoto(f);
//               }}
//             />
//           </div>
//         </SectionCard>

//         {/* ════════════════════════════════
//             Video Media
//         ════════════════════════════════ */}
//         <SectionCard
//           title="Video Media"
//           rightLabel="High-quality MP4"
//         >
//           <p className="text-[12px] font-semibold text-gray-600 mb-2">
//             Upload Studio &amp; Class Video For User
//           </p>

//           {/* Video upload drop zone */}
//           <div
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={(e) => {
//               e.preventDefault();

//               const f = e.dataTransfer.files[0];

//               if (f) addVideo(f);
//             }}
//             onClick={() => videoInputRef.current?.click()}
//             className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center py-8 cursor-pointer hover:border-[#1b5e43] hover:bg-gray-50/60 transition-colors mb-4"
//           >
//             <Video size={28} className="text-gray-300 mb-2" />

//             <p className="text-[13px] text-gray-400">
//               Click to upload or drag and drop
//             </p>

//             <input
//               ref={videoInputRef}
//               type="file"
//               accept="video/*"
//               className="hidden"
//               onChange={(e) => {
//                 const f = e.target.files[0];

//                 if (f) addVideo(f);
//               }}
//             />
//           </div>

//           {/* Uploaded Videos */}
//           {videos.length > 0 && (
//             <>
//               <p className="text-[12px] font-semibold text-gray-600 mb-2">
//                 Uploaded Videos
//               </p>

//               <div className="flex flex-wrap gap-3">
//                 {videos.map((video, i) => (
//                   <div
//                     key={i}
//                     className="relative w-[140px] h-[90px] rounded-xl overflow-hidden group flex-shrink-0 bg-black"
//                   >
//                     {/* Real Video */}
//                     <video
//                       src={video.url}
//                       className="w-full h-full object-cover"
//                       controls
//                       preload="metadata"
//                     />

//                     {/* Remove Button */}
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setVideos(
//                           videos.filter((_, idx) => idx !== i)
//                         )
//                       }
//                       className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
//                     >
//                       <X size={10} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </SectionCard>

//         {/* ════════════════════════════════
//             Studio Description
//         ════════════════════════════════ */}
//         <SectionCard title="Studio Description">
//           <textarea
//             rows={5}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Describe the vibe, mission, and unique offerings of this studio..."
//             className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 placeholder-gray-300 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition resize-none"
//           />
//         </SectionCard>
//       </form>
//     </div>
//   );
// };

// export default EditStudio;





import React, { useState, useRef, useEffect } from "react";
import {
  Save,
  CloudUpload,
  Plus,
  X,
  ChevronRight,
  Video,
  Search,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router";

// Leaflet imports
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

/* ─────────────────────────────────────────────
   Available Categories
───────────────────────────────────────────── */
const ALL_CATEGORIES = [
  "Yoga", "Pilates", "Barre", "Meditation", "HIIT",
  "Spin", "CrossFit", "Boxing", "Dance", "Stretching",
];

/* ─────────────────────────────────────────────
   Section Card wrapper
───────────────────────────────────────────── */
const SectionCard = ({ title, rightLabel, children }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-4">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-[15px] font-bold text-[#151C27]">{title}</h2>
      {rightLabel && (
        <span className="text-[12px] text-gray-400">{rightLabel}</span>
      )}
    </div>
    {children}
  </div>
);

/* ─────────────────────────────────────────────
   Field Label
───────────────────────────────────────────── */
const Label = ({ children, required }) => (
  <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">
    {children}
    {required && <span className="text-red-400 ml-0.5">*</span>}
  </label>
);

/* ─────────────────────────────────────────────
   Input Field
───────────────────────────────────────────── */
const InputField = ({ placeholder, value, onChange, type = "text", className = "" }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 placeholder-gray-300 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition ${className}`}
  />
);

/* ─────────────────────────────────────────────
   Drop Zone
───────────────────────────────────────────── */
const DropZone = ({ onFile, icon: Icon = CloudUpload, label = "Click to upload or drag and drop" }) => {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault(); setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) onFile(file);
      }}
      onClick={() => ref.current?.click()}
      className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-8 cursor-pointer transition-colors ${
        dragging ? "border-[#1b5e43] bg-[#e8f5f0]" : "border-gray-200 hover:border-[#1b5e43] hover:bg-gray-50/60"
      }`}
    >
      <Icon size={28} className="text-gray-300 mb-2" />
      <p className="text-[13px] text-gray-400">{label}</p>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => {
        const f = e.target.files[0]; if (f) onFile(f);
      }} />
    </div>
  );
};

/* ─────────────────────────────────────────────
   Custom Location Search Component
───────────────────────────────────────────── */
const LocationSearch = ({ onSelectLocation }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
        );
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (place) => {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);
    // Call parent handler with coordinates and full address
    onSelectLocation(lat, lon, place.display_name);
    
    // Clear search box after selection to avoid duplication
    setQuery(""); 
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full z-20 mb-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 3 && setShowSuggestions(true)}
          placeholder="Search location (e.g., Gulshan, Dhaka)"
          className="w-full border border-gray-200 rounded-lg pl-10 pr-3.5 py-2.5 text-[13px] text-gray-700 placeholder-gray-300 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-[#1b5e43] border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((place, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(place)}
              className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-[13px] text-gray-700 border-b border-gray-100 last:border-0 flex items-start gap-2"
            >
              <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">{place.display_name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Map Component
───────────────────────────────────────────── */
const MapComponent = ({ position, onMapClick }) => {
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-200 z-0">
      <MapContainer 
        center={position} 
        zoom={15} 
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Single Marker that moves based on 'position' prop */}
        <Marker position={position}>
           <Popup>Selected Location</Popup>
        </Marker>
        
        <MapClickHandler />
      </MapContainer>
      <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded text-[10px] font-mono shadow-sm">
        Lat: {position[0].toFixed(4)}, Lng: {position[1].toFixed(4)}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   EditStudio Page
───────────────────────────────────────────── */
const EditStudio = () => {
  const navigate = useNavigate();

  /* form state */
  const [studioName, setStudioName] = useState("");
  const [owner, setOwner] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  
  // Location state
  const [latitude, setLatitude] = useState(23.8103);
  const [longitude, setLongitude] = useState(90.4125);
  const [mapPosition, setMapPosition] = useState([23.8103, 90.4125]);

  /* categories */
  const [selectedCats, setSelectedCats] = useState(["Meditation"]);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [studioPhotos, setStudioPhotos] = useState([
    "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
  ]);
  const photoInputRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const videoInputRef = useRef(null);

  /* handlers */
  const toggleCategory = (cat) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter((c) => c !== cat));
    } else if (selectedCats.length < 10) {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  const addStudioPhoto = (file) => {
    const url = URL.createObjectURL(file);
    setStudioPhotos((prev) => [...prev, url]);
  };

  const addVideo = (file) => {
    const url = URL.createObjectURL(file);
    setVideos((prev) => [...prev, { url, file }]);
  };

  // Handle location selection from Search
  const handleSearchSelect = (lat, lng, addr) => {
    setLatitude(lat);
    setLongitude(lng);
    setMapPosition([lat, lng]); // Moves the map
    setAddress(addr); // Fills the address input below
  };

  // Handle location selection from Map Click
  const handleMapClick = async (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
    setMapPosition([lat, lng]);
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      }
    } catch (error) {
      console.error("Error getting address:", error);
      setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Save studio:", { studioName, owner, address, latitude, longitude, selectedCats, description, videos });
    navigate("/studio");
  };

  return (
    <div className="p-4 bg-Primary min-h-[calc(100vh-100px)] font-Inter">
      <form onSubmit={handleSubmit}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[12px] text-gray-400 mb-3">
          <button type="button" onClick={() => navigate(-1)} className="hover:text-[#1b5e43] transition-colors cursor-pointer">Studio Management</button>
          <ChevronRight size={13} />
          <span className="text-gray-600 font-medium">Edit Studio</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold text-[#151C27]">Edit Studio</h1>
          <button type="submit" className="flex items-center gap-1.5 bg-[#1b5e43] hover:bg-[#154a35] text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer">
            <Save size={14} /> Save Studio
          </button>
        </div>

        {/* Studio Information */}
        <SectionCard title="Studio Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <Label required className="text-[#404943]">Studio Name</Label>
              <InputField placeholder="e.g. ZenFlow Wellness" value={studioName} onChange={(e) => setStudioName(e.target.value)} />
            </div>
            <div>
              <Label className="text-[#404943]">Studio Owner / Primary Contact</Label>
              <InputField placeholder="Select an owner..." value={owner} onChange={(e) => setOwner(e.target.value)} />
            </div>
          </div>

          {/* Location Section */}
          <div className="mb-4">
            <Label required className="text-[#404943]">Full Address</Label>
            
            {/* 1. Search Bar (Clears after selection) */}
            <LocationSearch onSelectLocation={handleSearchSelect} />

            {/* 2. Address Input (Shows the final selected address) */}
            <InputField
              placeholder="Address will auto-fill when you select a location"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mb-3 bg-gray-50"
            />
            
            {/* 3. Map (Single Marker moves here) */}
            <MapComponent position={mapPosition} onMapClick={handleMapClick} />
            
            {/* Coordinates Display */}
            <div className="mt-2 text-[11px] text-gray-500 flex items-center gap-2">
              <MapPin size={12} />
              <span>Lat: {latitude.toFixed(6)}, Lng: {longitude.toFixed(6)}</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <Label>Primary Categories (Select up to 10)</Label>
            <div className="flex flex-wrap gap-2">
              {ALL_CATEGORIES.map((cat) => {
                const active = selectedCats.includes(cat);
                return (
                  <button key={cat} type="button" onClick={() => toggleCategory(cat)} className={`px-3 py-1 rounded-full text-[12px] font-medium border transition-all ${active ? "bg-[#1b5e43] text-white border-[#1b5e43]" : "bg-white text-gray-600 border-gray-200 hover:border-[#1b5e43] hover:text-[#1b5e43]"}`}>
                    {active && <X size={10} className="inline mr-1 mb-0.5" />} {cat}
                  </button>
                );
              })}
              <button type="button" className="w-7 h-7 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-[#1b5e43] hover:text-[#1b5e43] transition-colors"><Plus size={14} /></button>
            </div>
          </div>
        </SectionCard>

        {/* Media Gallery */}
        <SectionCard title="Media Gallery" rightLabel="High-quality JPG or PNG">
          <p className="text-[12px] font-semibold text-gray-600 mb-2">Cover Photo (Featured)</p>
          {coverPhoto ? (
            <div className="relative rounded-xl overflow-hidden mb-5 group">
              <img src={coverPhoto} alt="Cover" className="w-full h-48 object-cover" />
              <button type="button" onClick={() => setCoverPhoto(null)} className="absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"><X size={13} /></button>
            </div>
          ) : (
            <div className="mb-5"><DropZone onFile={(f) => setCoverPhoto(URL.createObjectURL(f))} /></div>
          )}

          <p className="text-[12px] font-semibold text-gray-600 mb-2">Studio Photos</p>
          <div className="flex flex-wrap gap-3">
            {studioPhotos.map((src, i) => (
              <div key={i} className="relative w-[120px] h-[84px] rounded-xl overflow-hidden group flex-shrink-0">
                <img src={src} alt={`Studio photo ${i + 1}`} className="w-full h-full object-cover" />
                <button type="button" onClick={() => setStudioPhotos(studioPhotos.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"><X size={10} /></button>
              </div>
            ))}
            <button type="button" onClick={() => photoInputRef.current?.click()} className="w-[120px] h-[84px] rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 hover:border-[#1b5e43] hover:text-[#1b5e43] transition-colors flex-shrink-0"><Plus size={22} /></button>
            <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files[0]; if (f) addStudioPhoto(f); }} />
          </div>
        </SectionCard>

        {/* Video Media */}
        <SectionCard title="Video Media" rightLabel="High-quality MP4">
          <p className="text-[12px] font-semibold text-gray-600 mb-2">Upload Studio & Class Video For User</p>
          <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) addVideo(f); }} onClick={() => videoInputRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center py-8 cursor-pointer hover:border-[#1b5e43] hover:bg-gray-50/60 transition-colors mb-4">
            <Video size={28} className="text-gray-300 mb-2" />
            <p className="text-[13px] text-gray-400">Click to upload or drag and drop</p>
            <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={(e) => { const f = e.target.files[0]; if (f) addVideo(f); }} />
          </div>

          {videos.length > 0 && (
            <>
              <p className="text-[12px] font-semibold text-gray-600 mb-2">Uploaded Videos</p>
              <div className="flex flex-wrap gap-3">
                {videos.map((video, i) => (
                  <div key={i} className="relative w-[140px] h-[90px] rounded-xl overflow-hidden group flex-shrink-0 bg-black">
                    <video src={video.url} className="w-full h-full object-cover" controls preload="metadata" />
                    <button type="button" onClick={() => setVideos(videos.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"><X size={10} /></button>
                  </div>
                ))}
              </div>
            </>
          )}
        </SectionCard>

        {/* Studio Description */}
        <SectionCard title="Studio Description">
          <textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the vibe, mission, and unique offerings of this studio..." className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 placeholder-gray-300 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition resize-none" />
        </SectionCard>
      </form>
    </div>
  );
};

export default EditStudio;
