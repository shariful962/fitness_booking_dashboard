import React from "react";
import {
  MapPin,
  Pencil,
  CheckCircle,
  PauseCircle,
  Info,
  Video,
  CalendarDays,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router";

const SubStudioManagement = () => {
  const navigate = useNavigate();
  const studio = {
    name: "Zen Flow Studio",
    status: "Active",
    address: "124 Serenity Lane, Wellness District, NY 10012",
    coverImage:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=400&fit=crop",
    contact: {
      name: "Sarah Jenkins",
      email: "sarah@zenflow.com",
      phone: "+1 (555) 123-4567",
    },
    taxId: "XX-XXXX892",
    hours: "Mon-Sun: 6:00 AM - 9:00 PM",
  };

  const todaysClasses = [
    {
      time: "08:00",
      name: "Vinyasa Flow",
      instructor: "with Emma T.",
      enrolled: 24,
      capacity: 30,
    },
    {
      time: "10:30",
      name: "Restorative Yoga",
      instructor: "with David K.",
      enrolled: 18,
      capacity: 20,
    },
  ];

  const videos = [
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=180&fit=crop",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=180&fit=crop",
  ];

  return (
    <div className="p-4 bg-[#f4f7f5] min-h-[calc(100vh-100px)] font-Inter">
      {/* ── Hero Banner ── */}
      <div className="relative rounded-2xl overflow-hidden mb-5 shadow-sm">
        {/* Cover image */}
        <img
          src={studio.coverImage}
          alt={studio.name}
          className="w-full h-52 object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Bottom-left: name + badge + address */}
        <div className="absolute bottom-0 left-0 p-5">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-white">{studio.name}</h1>
            <span className="bg-[#1b5e43] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
              {studio.status}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-white/80 text-[13px]">
            <MapPin size={13} className="flex-shrink-0" />
            <span>{studio.address}</span>
          </div>
        </div>

        {/* Top-right: action buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={() => navigate("/studio/editstudio")}
            className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-gray-700 text-[13px] font-medium px-3.5 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <Pencil size={13} />
            Edit Studio
          </button>
          <button className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-[#1b5e43] text-[13px] font-medium px-3.5 py-2 rounded-lg transition-colors shadow-sm border border-[#1b5e43]/30">
            <CheckCircle size={13} />
            Approve
          </button>
          <button className="flex items-center gap-1.5 bg-[#7b2d2d] hover:bg-[#6a2626] text-white text-[13px] font-medium px-3.5 py-2 rounded-lg transition-colors shadow-sm">
            <PauseCircle size={13} />
            Suspend
          </button>
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
              {/* Primary Contact */}
              <div>
                <p className="text-[12px] text-gray-400 font-medium mb-1">
                  Primary Contact
                </p>
                <p className="text-[13px] font-semibold text-gray-800">
                  {studio.contact.name}
                </p>
                <p className="text-[12px] text-gray-500 mt-0.5">
                  {studio.contact.email}
                </p>
              </div>

              {/* Phone Number */}
              <div>
                <p className="text-[12px] text-gray-400 font-medium mb-1">
                  Phone Number
                </p>
                <p className="text-[13px] font-semibold text-gray-800">
                  {studio.contact.phone}
                </p>
              </div>

              {/* Tax ID */}
              <div>
                <p className="text-[12px] text-gray-400 font-medium mb-1">
                  Tax ID / EIN
                </p>
                <p className="text-[13px] font-semibold text-gray-800">
                  {studio.taxId}
                </p>
              </div>

              {/* Operating Hours */}
              <div>
                <p className="text-[12px] text-gray-400 font-medium mb-1">
                  Operating Hours
                </p>
                <p className="text-[13px] font-semibold text-gray-800">
                  {studio.hours}
                </p>
              </div>
            </div>
          </div>

          {/* Upload Video Card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Video size={17} className="text-[#1b5e43]" />
              <h2 className="text-[15px] font-bold text-gray-800">
                Upload Video
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {videos.map((thumb, i) => (
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden group cursor-pointer"
                >
                  <img
                    src={thumb}
                    alt={`Video ${i + 1}`}
                    className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
          </div>
        </div>

        {/* ── Right Column ── */}
        <div>
          {/* Today's Classes Card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays size={17} className="text-[#1b5e43]" />
              <h2 className="text-[15px] font-bold text-gray-800">
                Today's Classes
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {todaysClasses.map((cls, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-gray-50/70 hover:bg-gray-100/70 transition-colors"
                >
                  {/* Time badge */}
                  <div className="flex-shrink-0 bg-[#e8f0fd] text-[#1a4db5] text-[12px] font-bold px-2.5 py-1.5 rounded-lg min-w-[52px] text-center">
                    {cls.time}
                  </div>

                  {/* Class info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-gray-800 truncate">
                      {cls.name}
                    </p>
                    <p className="text-[12px] text-gray-400 mt-0.5">
                      {cls.instructor}
                    </p>
                  </div>

                  {/* Enrollment */}
                  <div className="flex-shrink-0 text-[13px] font-semibold text-gray-600">
                    {cls.enrolled}
                    <span className="text-gray-400 font-normal">
                      /{cls.capacity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubStudioManagement;








// edit studio 



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
  Loader2,
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

const API_URL = "http://16.170.40.206:8000/studios/my-studio/";

const ALL_CATEGORIES = [
  "Yoga", "Pilates", "Barre", "Meditation", "HIIT",
  "Spin", "CrossFit", "Boxing", "Dance", "Stretching", "Gym", "Wet"
];

const SectionCard = ({ title, rightLabel, children }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-4">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-[15px] font-bold text-[#151C27]">{title}</h2>
      {rightLabel && <span className="text-[12px] text-gray-400">{rightLabel}</span>}
    </div>
    {children}
  </div>
);

const Label = ({ children, required }) => (
  <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">
    {children}
    {required && <span className="text-red-400 ml-0.5">*</span>}
  </label>
);

const InputField = ({ placeholder, value, onChange, type = "text", className = "" }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 placeholder-gray-300 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition ${className}`}
  />
);

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
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
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
    onSelectLocation(parseFloat(place.lat), parseFloat(place.lon), place.display_name);
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
        {loading && <div className="absolute right-3 top-1/2 -translate-y-1/2"><Loader2 className="animate-spin h-4 w-4 text-[#1b5e43]" /></div>}
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-30">
          {suggestions.map((place, index) => (
            <button key={index} type="button" onClick={() => handleSelect(place)} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-[13px] text-gray-700 border-b border-gray-100 last:border-0 flex items-start gap-2">
              <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">{place.display_name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const MapComponent = ({ position, onMapClick }) => {
  const MapClickHandler = () => {
    useMapEvents({
      click(e) { onMapClick(e.latlng.lat, e.latlng.lng); },
    });
    return null;
  };

  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-200 z-0">
      <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
        <Marker position={position}><Popup>Selected Location</Popup></Marker>
        <MapClickHandler />
      </MapContainer>
      <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded text-[10px] font-mono shadow-sm">
        Lat: {position[0].toFixed(4)}, Lng: {position[1].toFixed(4)}
      </div>
    </div>
  );
};

const EditStudio = () => {
  const navigate = useNavigate();

  // Loading & Error States
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Form State
  const [studioName, setStudioName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [startCredit, setStartCredit] = useState(0);
  const [endCredit, setEndCredit] = useState(0);
  
  const [latitude, setLatitude] = useState(23.8103);
  const [longitude, setLongitude] = useState(90.4125);
  const [mapPosition, setMapPosition] = useState([23.8103, 90.4125]);

  const [selectedCats, setSelectedCats] = useState([]);
  
  // Media State: Stores { id, url, file?, isExisting }
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [studioPhotos, setStudioPhotos] = useState([]);
  const photoInputRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const videoInputRef = useRef(null);

  /* ─────────────────────────────────────────────
     1. FETCH DATA ON MOUNT
  ───────────────────────────────────────────── */
  useEffect(() => {
    const fetchStudio = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace 'token' with your actual auth token key (e.g., 'access_token')
        const token = localStorage.getItem('access_token'); 
        
        const response = await fetch(API_URL, {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Accept': 'application/json',
          }
        });

        if (!response.ok) throw new Error('Failed to fetch studio data');
        const data = await response.json();

        // Populate State
        setStudioName(data.name || "");
        setEmail(data.email || "");
        setAddress(data.full_address || "");
        setDescription(data.description || "");
        setStartCredit(data.start_credit ?? 0);
        setEndCredit(data.end_credit ?? 0);

        const lat = data.latitude || 23.8103;
        const lng = data.longitude || 90.4125;
        setLatitude(lat);
        setLongitude(lng);
        setMapPosition([lat, lng]);

        const initialCats = data.primary_category 
          ? data.primary_category.split(",").map(c => c.trim().charAt(0).toUpperCase() + c.trim().slice(1)) 
          : [];
        setSelectedCats(initialCats);

        // Handle Cover Photo
        if (data.cover_photo) {
          setCoverPhoto({ id: 'existing-cover', url: data.cover_photo, isExisting: true });
        }

        // Handle Existing Images
        const existingImages = (data.images || []).map((url, i) => ({
          id: `existing-img-${i}`,
          url: url,
          isExisting: true
        }));
        setStudioPhotos(existingImages);

        // Handle Existing Videos
        const existingVideos = (data.videos || []).map((url, i) => ({
          id: `existing-vid-${i}`,
          url: url,
          isExisting: true
        }));
        setVideos(existingVideos);

      } catch (err) {
        console.error(err);
        setError(err.message || "An error occurred while loading studio data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudio();
  }, []);

  /* ─────────────────────────────────────────────
     2. HANDLERS
  ───────────────────────────────────────────── */
  const toggleCategory = (cat) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter((c) => c !== cat));
    } else if (selectedCats.length < 10) {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  const handleCoverPhoto = (file) => {
    setCoverPhoto({
      id: `new-cover-${Date.now()}`,
      url: URL.createObjectURL(file),
      file: file,
      isExisting: false
    });
  };

  const addStudioPhoto = (file) => {
    const newPhoto = {
      id: `new-img-${Date.now()}`,
      url: URL.createObjectURL(file),
      file: file,
      isExisting: false
    };
    setStudioPhotos((prev) => [...prev, newPhoto]);
  };

  const addVideo = (file) => {
    const newVideo = {
      id: `new-vid-${Date.now()}`,
      url: URL.createObjectURL(file),
      file: file,
      isExisting: false
    };
    setVideos((prev) => [...prev, newVideo]);
  };

  const handleSearchSelect = (lat, lng, addr) => {
    setLatitude(lat);
    setLongitude(lng);
    setMapPosition([lat, lng]);
    setAddress(addr);
  };

  const handleMapClick = async (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
    setMapPosition([lat, lng]);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      setAddress(data?.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    } catch (error) {
      setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    }
  };

  /* ─────────────────────────────────────────────
     3. SUBMIT (PUT/PATCH with FormData)
  ───────────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', studioName);
      formData.append('email', email);
      formData.append('full_address', address);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('primary_category', selectedCats.join(', ').toLowerCase());
      formData.append('description', description);
      formData.append('start_credit', Number(startCredit));
      formData.append('end_credit', Number(endCredit));

      // Append new cover photo if it's a file
      if (coverPhoto && coverPhoto.file) {
        formData.append('cover_photo', coverPhoto.file);
      }

      // Append only NEW image files
      studioPhotos.forEach((photo) => {
        if (photo.file) {
          formData.append('images', photo.file);
        }
      });

      // Append only NEW video files
      videos.forEach((video) => {
        if (video.file) {
          formData.append('videos', video.file);
        }
      });

      const token = localStorage.getItem('token');
      
      // Use 'PUT' for full replacement or 'PATCH' for partial update based on your backend setup
      const response = await fetch(API_URL, {
        method: 'PUT', 
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          // NOTE: Do NOT manually set 'Content-Type': 'multipart/form-data' here. 
          // The browser automatically sets it with the correct boundary when using FormData.
        },
        body: formData
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || errData.detail || 'Failed to update studio');
      }

      alert('Studio updated successfully!');
      navigate("/studio"); // Adjust route as needed

    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ─────────────────────────────────────────────
     4. RENDER
  ───────────────────────────────────────────── */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <Loader2 className="animate-spin h-8 w-8 text-[#1b5e43]" />
        <span className="ml-2 text-gray-600">Loading studio data...</span>
      </div>
    );
  }

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
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex items-center gap-1.5 bg-[#1b5e43] hover:bg-[#154a35] disabled:bg-gray-400 text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : <Save size={14} />} 
            {isSubmitting ? "Saving..." : "Save Studio"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-[13px]">
            {error}
          </div>
        )}

        {/* Studio Information */}
        <SectionCard title="Studio Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <Label required className="text-[#404943]">Studio Name</Label>
              <InputField placeholder="e.g. MY STDIO" value={studioName} onChange={(e) => setStudioName(e.target.value)} />
            </div>
            <div>
              <Label required className="text-[#404943]">Studio Email</Label>
              <InputField type="email" placeholder="e.g. contact@studio.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <Label className="text-[#404943]">Start Credit</Label>
              <InputField type="number" value={startCredit} onChange={(e) => setStartCredit(e.target.value)} />
            </div>
            <div>
              <Label className="text-[#404943]">End Credit</Label>
              <InputField type="number" value={endCredit} onChange={(e) => setEndCredit(e.target.value)} />
            </div>
          </div>

          {/* Location Section */}
          <div className="mb-4">
            <Label required className="text-[#404943]">Full Address</Label>
            <LocationSearch onSelectLocation={handleSearchSelect} />
            <InputField placeholder="Address will auto-fill when you select a location" value={address} onChange={(e) => setAddress(e.target.value)} className="mb-3 bg-gray-50" />
            <MapComponent position={mapPosition} onMapClick={handleMapClick} />
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
              <img src={coverPhoto.url} alt="Cover" className="w-full h-48 object-cover" />
              <button type="button" onClick={() => setCoverPhoto(null)} className="absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"><X size={13} /></button>
            </div>
          ) : (
            <div className="mb-5"><DropZone onFile={handleCoverPhoto} /></div>
          )}

          <p className="text-[12px] font-semibold text-gray-600 mb-2">Studio Photos</p>
          <div className="flex flex-wrap gap-3">
            {studioPhotos.map((photo) => (
              <div key={photo.id} className="relative w-[120px] h-[84px] rounded-xl overflow-hidden group flex-shrink-0">
                <img src={photo.url} alt="Studio photo" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setStudioPhotos(studioPhotos.filter((p) => p.id !== photo.id))} className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"><X size={10} /></button>
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
                {videos.map((video) => (
                  <div key={video.id} className="relative w-[140px] h-[90px] rounded-xl overflow-hidden group flex-shrink-0 bg-black">
                    <video src={video.url} className="w-full h-full object-cover" controls preload="metadata" />
                    <button type="button" onClick={() => setVideos(videos.filter((v) => v.id !== video.id))} className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"><X size={10} /></button>
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