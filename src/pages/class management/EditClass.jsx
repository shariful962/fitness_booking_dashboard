import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Info,
  Image,
  User,
  CalendarDays,
  Tag,
  Trash2,
  CloudUpload,
  X,
  Plus,
  ChevronDown,
  Search,
  MapPin,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { baseApi } from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endpoints";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const SectionCard = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
      <Icon size={17} className="text-[#1b5e43]" />
      <h2 className="text-[15px] font-bold text-gray-800">{title}</h2>
    </div>
    {children}
  </div>
);

const CustomSelect = ({ value, onChange, options, placeholder }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition bg-white pr-9"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

const Label = ({ children }) => (
  <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">{children}</label>
);

const ALL_CATEGORIES = [
  "Yoga",
  "Pilates",
  "Gym",
  "Spa",
  "Cycling",
  "Boxing",
  "Barre",
  "Sauna",
  "Dance",
  "Meditation",
];

const AMENITIES = ["SHOWER", "Locker", "PARKING"];
const WHAT_TO_BRING = ["Yoga mat", "Water", "Grip socks"];

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
    return value.map((item) => buildImageUrl(item)).filter(Boolean);
  }

  if (typeof value === "string") {
    return value.split(",").map((item) => buildImageUrl(item)).filter(Boolean);
  }

  if (typeof value === "object") {
    return normalizeImages(value.images || value.image_urls || value.urls || value.results || value.data);
  }

  return [];
};

const LocationSearch = ({ onSelectLocation, initialValue }) => {
  const [query, setQuery] = useState(initialValue || "");
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
    onSelectLocation(lat, lon, place.display_name);
    setQuery(place.display_name);
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
        {loading ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-[#1b5e43] border-t-transparent rounded-full"></div>
          </div>
        ) : null}
      </div>

      {showSuggestions && suggestions.length > 0 ? (
        <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((place, index) => (
            <button
              key={`${place.display_name}-${index}`}
              type="button"
              onClick={() => handleSelect(place)}
              className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-[13px] text-gray-700 border-b border-gray-100 last:border-0 flex items-start gap-2"
            >
              <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">{place.display_name}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const MapComponent = ({ position, onMapClick }) => (
  <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-200 z-0">
    <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Selected Location</Popup>
      </Marker>
      <MapClickHandler onMapClick={onMapClick} />
    </MapContainer>
  </div>
);

const EditClass = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const instructorFileRef = useRef(null);

  const [form, setForm] = useState({
    className: "",
    address: "",
    description: "",
    recurrence: "Weekly",
    classDate: "",
    startTime: "06:00",
    duration: "60 min",
    capacity: "25",
    dropInCredit: "0",
  });
  const [latitude, setLatitude] = useState(23.8103);
  const [longitude, setLongitude] = useState(90.4125);
  const [mapPosition, setMapPosition] = useState([23.8103, 90.4125]);
  const [selectedCats, setSelectedCats] = useState(["Yoga"]);
  const [selectedAmenities, setSelectedAmenities] = useState(["SHOWER"]);
  const [selectedBringItems, setSelectedBringItems] = useState(["Yoga mat"]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(true);
  const [instructor, setInstructor] = useState({ image: null, name: "", designation: "", file: null });

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleCategory = (cat) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((item) => item !== cat) : [...prev, cat]
    );
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((item) => item !== amenity) : [...prev, amenity]
    );
  };

  const toggleBringItem = (item) => {
    setSelectedBringItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSelectLocation = (lat, lng, address) => {
    setLatitude(lat);
    setLongitude(lng);
    setMapPosition([lat, lng]);
    setForm((prev) => ({ ...prev, address }));
  };

  const handleMapClick = async (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
    setMapPosition([lat, lng]);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      setForm((prev) => ({
        ...prev,
        address: data?.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
      }));
    } catch (error) {
      console.error("Error getting address:", error);
      setForm((prev) => ({ ...prev, address: `${lat.toFixed(6)}, ${lng.toFixed(6)}` }));
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length) {
      const newFiles = files.map((file) => ({
        file,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      const newFiles = files.map((file) => ({
        file,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeUploadedFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInstructorFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setInstructor((prev) => ({ ...prev, image: url, file }));
    }
  };

  const normalizeTimeTo24Hour = (value) => {
    if (!value) return "";

    const trimmed = String(value).trim();
    const match = trimmed.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(am|pm)?$/i);

    if (!match) {
      return trimmed;
    }

    let hours = Number(match[1]);
    const minutes = match[2];
    const meridiem = match[4]?.toLowerCase();

    if (meridiem === "pm" && hours < 12) hours += 12;
    if (meridiem === "am" && hours === 12) hours = 0;

    return `${String(hours).padStart(2, "0")}:${minutes}:00`;
  };

  const parseDurationMinutes = (value) => {
    const match = String(value || "").match(/(\d+)/);
    return match ? Number(match[1]) : 60;
  };

  const formatTimeForInput = (value) => {
    if (!value) return "06:00";
    const [hours = "06", minutes = "00"] = String(value).split(":");
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchClass = async () => {
      if (!id) {
        setSubmitError("No class ID provided.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data } = await baseApi.get(ENDPOINTS.class_detail.replace(":id", id));

        const categories = Array.isArray(data?.categories)
          ? data.categories
          : String(data?.category || "")
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean);

        const amenities = Array.isArray(data?.amenities)
          ? data.amenities
          : String(data?.amenities || "")
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean);

        const bringItems = Array.isArray(data?.what_to_bring)
          ? data.what_to_bring
          : String(data?.what_to_bring || "")
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean);

        setForm({
          className: data?.name || "",
          address: data?.location || "",
          description: data?.description || "",
          recurrence: data?.recurrence === "one-time" ? "One-time" : "Weekly",
          classDate: data?.date || "",
          startTime: formatTimeForInput(data?.start_time),
          duration: data?.duration_minutes ? `${data.duration_minutes} min` : "60 min",
          capacity: String(data?.capacity || 25),
          dropInCredit: String(data?.price || 0),
        });

        const lat = Number(data?.latitude ?? 23.8103);
        const lng = Number(data?.longitude ?? 90.4125);
        setLatitude(lat);
        setLongitude(lng);
        setMapPosition([lat, lng]);
        setSelectedCats(categories.length ? categories : ["Yoga"]);
        setSelectedAmenities(amenities.length ? amenities : ["SHOWER"]);
        setSelectedBringItems(bringItems.length ? bringItems : ["Yoga mat"]);
        setInstructor({
          image: buildImageUrl(data?.instructor_image) || null,
          name: data?.instructor_name || "",
          designation: data?.instructor_designation || "",
          file: null,
        });
        setExistingImages(normalizeImages(data?.images || data?.image_urls || data?.image || data?.image_url || data?.thumbnail || data?.thumbnails));
        setUploadedFiles([]);
        setSubmitError("");
      } catch (error) {
        console.error("Failed to load class:", error);
        setSubmitError("Unable to load class details.");
      } finally {
        setLoading(false);
      }
    };

    fetchClass();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const formData = new FormData();
      formData.append("name", form.className || "");
      formData.append("location", form.address || "");
      formData.append("latitude", String(latitude ?? ""));
      formData.append("longitude", String(longitude ?? ""));
      formData.append("category", selectedCats.join(", ") || "");
      selectedCats.forEach((category) => formData.append("categories", category));
      formData.append("description", form.description || "");
      formData.append("recurrence", (form.recurrence || "Weekly").toLowerCase());
      formData.append("date", form.classDate || "");
      formData.append("start_time", normalizeTimeTo24Hour(form.startTime));
      formData.append("duration_minutes", String(parseDurationMinutes(form.duration)));
      formData.append("capacity", String(form.capacity || 0));
      formData.append("price", String(form.dropInCredit || 0));
      formData.append("what_to_bring", selectedBringItems.join(", ") || "");
      formData.append("is_what_to_bring_required", selectedBringItems.length > 0 ? "true" : "false");
      formData.append("instructor_name", instructor.name || "");
      formData.append("instructor_designation", instructor.designation || "");

      selectedAmenities.forEach((item) => formData.append("amenities", item));
      uploadedFiles.forEach((uploaded) => formData.append("images", uploaded.file));
      if (instructor.file) formData.append("instructor_image", instructor.file);

      await baseApi.patch(ENDPOINTS.class_detail.replace(":id", id), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/class");
    } catch (error) {
      console.error("Error updating class:", error);
      const backendMessage =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Unable to update class. Please try again.";
      setSubmitError(backendMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-Primary min-h-[calc(100vh-100px)]">
      <div className="flex items-center justify-between mb-4 bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3">
        <div>
          <h1 className="text-[18px] font-bold text-gray-800">Edit Class</h1>
          <p className="text-[12px] text-gray-400">Update class details, schedule, and pricing</p>
        </div>
        <button
          onClick={handleSubmit}
          type="button"
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-[#1b5e43] hover:bg-[#154a35] text-white text-[13px] font-semibold px-4 py-2 rounded-lg shadow-sm transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="text-[14px]">✓</span>
          {isSubmitting ? "Updating..." : "Update Class"}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {submitError ? (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-600">
            {submitError}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-xl border border-gray-100 bg-white p-8 text-center text-gray-500">
            Loading class details...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-4">
            <div className="flex flex-col gap-4">
              <SectionCard icon={Info} title="Class Details">
                <div className="mb-4">
                  <Label>Class Name</Label>
                  <input
                    type="text"
                    value={form.className}
                    onChange={(e) => handleChange("className", e.target.value)}
                    placeholder="e.g., Vinyasa Flow, HIIT Fundamentals"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 placeholder-gray-300 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition"
                  />
                </div>

                <div className="mb-4">
                  <Label>Location</Label>
                  <LocationSearch initialValue={form.address} onSelectLocation={handleSelectLocation} />
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Address will auto-fill when you select a location"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 placeholder-gray-300 bg-gray-50 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition mb-3"
                  />
                  <MapComponent position={mapPosition} onMapClick={handleMapClick} />
                  <div className="mt-2 text-[11px] text-gray-500 flex items-center gap-2">
                    <MapPin size={12} />
                    <span>Lat: {latitude.toFixed(6)}, Lng: {longitude.toFixed(6)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <Label>Primary Categories</Label>
                  <div className="flex flex-wrap gap-2">
                    {ALL_CATEGORIES.map((cat) => {
                      const active = selectedCats.includes(cat);
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => toggleCategory(cat)}
                          className={`px-3 py-1 rounded-full text-[12px] font-medium border transition-all ${
                            active
                              ? "bg-[#1b5e43] text-white border-[#1b5e43]"
                              : "bg-white text-gray-600 border-gray-200 hover:border-[#1b5e43] hover:text-[#1b5e43]"
                          }`}
                        >
                          {active ? <X size={10} className="inline mr-1 mb-0.5" /> : null}
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-4">
                  <Label>Amenities</Label>
                  <div className="flex flex-wrap gap-2">
                    {AMENITIES.map((item) => {
                      const active = selectedAmenities.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleAmenity(item)}
                          className={`px-3 py-1 rounded-full text-[12px] font-medium border transition-all ${
                            active
                              ? "bg-[#1b5e43] text-white border-[#1b5e43]"
                              : "bg-white text-gray-600 border-gray-200 hover:border-[#1b5e43] hover:text-[#1b5e43]"
                          }`}
                        >
                          {active ? <X size={10} className="inline mr-1 mb-0.5" /> : null}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label>What to Bring</Label>
                  <div className="flex flex-wrap gap-2">
                    {WHAT_TO_BRING.map((item) => {
                      const active = selectedBringItems.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleBringItem(item)}
                          className={`px-3 py-1 rounded-full text-[12px] font-medium border transition-all ${
                            active
                              ? "bg-[#1b5e43] text-white border-[#1b5e43]"
                              : "bg-white text-gray-600 border-gray-200 hover:border-[#1b5e43] hover:text-[#1b5e43]"
                          }`}
                        >
                          {active ? <X size={10} className="inline mr-1 mb-0.5" /> : null}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </SectionCard>

              <SectionCard icon={Info} title="Description & Instructor">
                <div className="mb-4">
                  <Label>Class Description</Label>
                  <textarea
                    rows={5}
                    value={form.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Describe what participants can expect..."
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 placeholder-gray-300 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition resize-none"
                  />
                </div>

                <div className="mb-4">
                  <Label>Instructor Image</Label>
                  <div
                    onClick={() => instructorFileRef.current?.click()}
                    className="w-full h-36 flex items-center justify-center cursor-pointer mb-3"
                  >
                    <div className="w-28 h-28 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden bg-white">
                      {instructor.image ? (
                        <img src={instructor.image} alt="Instructor" className="w-full h-full object-cover" />
                      ) : (
                        <User size={40} className="text-gray-400" />
                      )}
                    </div>
                    <input
                      ref={instructorFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleInstructorFileChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Instructor Name</Label>
                      <input
                        type="text"
                        value={instructor.name}
                        onChange={(e) => setInstructor((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition"
                      />
                    </div>
                    <div>
                      <Label>Instructor Designation</Label>
                      <input
                        type="text"
                        value={instructor.designation}
                        onChange={(e) => setInstructor((prev) => ({ ...prev, designation: e.target.value }))}
                        placeholder="e.g. Senior Coach"
                        className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition"
                      />
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>

            <div className="flex flex-col gap-4">
              <SectionCard icon={Image} title="Class Media">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-8 px-4 cursor-pointer transition-colors mb-3 ${
                    isDragging ? "border-[#1b5e43] bg-[#e8f5f0]" : "border-gray-200 hover:border-[#1b5e43] hover:bg-gray-50"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#e8f5f0] flex items-center justify-center mb-3">
                    <CloudUpload size={22} className="text-[#1b5e43]" />
                  </div>
                  <p className="text-[13px] font-semibold text-gray-700 text-center">Click to upload or drag &amp; drop</p>
                  <p className="text-[12px] text-gray-400 text-center mt-1">PNG, JPG, GIF or SVG</p>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>

                {existingImages.length > 0 ? (
                  <div className="mb-3">
                    <p className="text-[12px] font-semibold text-gray-700 mb-2">Current images</p>
                    <div className="flex flex-wrap gap-2">
                      {existingImages.map((image, index) => (
                        <img key={`${image}-${index}`} src={image} alt={`Existing ${index + 1}`} className="h-16 w-16 rounded-lg object-cover border border-gray-100" />
                      ))}
                    </div>
                  </div>
                ) : null}

                {uploadedFiles.length > 0 ? (
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={`${file.name}-${index}`} className="flex items-center gap-3 border border-gray-100 rounded-lg px-3 py-2.5 bg-gray-50">
                        <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0">
                          <Image size={14} className="text-gray-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-gray-700 truncate">{file.name}</p>
                          <p className="text-[11px] text-gray-400">{file.size}</p>
                        </div>
                        <button type="button" onClick={() => removeUploadedFile(index)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null}
              </SectionCard>

              <SectionCard icon={CalendarDays} title="Schedule">
                <div className="mb-4">
                  <Label>Recurrence</Label>
                  <div className="flex rounded-lg overflow-hidden border border-gray-200">
                    {["Weekly", "One-time"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleChange("recurrence", opt)}
                        className={`flex-1 py-2 text-[13px] font-medium transition-colors ${
                          form.recurrence === opt ? "bg-[#1b5e43] text-white" : "bg-white text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <Label>Date</Label>
                    <input
                      type="date"
                      value={form.classDate}
                      onChange={(e) => handleChange("classDate", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition"
                    />
                  </div>
                  <div>
                    <Label>Start Time</Label>
                    <input
                      type="time"
                      value={form.startTime}
                      onChange={(e) => handleChange("startTime", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <Label>Duration</Label>
                    <CustomSelect
                      value={form.duration}
                      onChange={(v) => handleChange("duration", v)}
                      placeholder="Select..."
                      options={["30 min", "45 min", "60 min", "75 min", "90 min"]}
                    />
                  </div>
                  <div>
                    <Label>Capacity</Label>
                    <input
                      type="number"
                      value={form.capacity}
                      onChange={(e) => handleChange("capacity", e.target.value)}
                      min={1}
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition"
                    />
                  </div>
                </div>
              </SectionCard>

              <SectionCard icon={Tag} title="Pricing">
                <div>
                  <Label>Drop-in Credit</Label>
                  <input
                    type="number"
                    value={form.dropInCredit}
                    onChange={(e) => handleChange("dropInCredit", e.target.value)}
                    min={0}
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition"
                  />
                </div>
              </SectionCard>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditClass;
