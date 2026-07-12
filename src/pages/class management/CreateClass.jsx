import React, { useState, useRef } from "react";
import {
  Info,
  Image,
  CalendarDays,
  Tag,
  Trash2,
  CloudUpload,
  X,
  Plus,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router";

/* ─────────────────────────────────────────────
   Section Card wrapper
───────────────────────────────────────────── */
const SectionCard = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
      <Icon size={17} className="text-[#1b5e43]" />
      <h2 className="text-[15px] font-bold text-gray-800">{title}</h2>
    </div>
    {children}
  </div>
);

/* ─────────────────────────────────────────────
   Custom Select
───────────────────────────────────────────── */
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
    <ChevronDown
      size={14}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
    />
  </div>
);

/* ─────────────────────────────────────────────
   Field Label
───────────────────────────────────────────── */
const Label = ({ children }) => (
  <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">
    {children}
  </label>
);

/* ─────────────────────────────────────────────
   CreateClass Page
───────────────────────────────────────────── */
const CreateClass = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    className: "",
    studioLocation: "Downtown Studio - Room A",
    instructor: "",
    description: "",
    recurrence: "Weekly",
    startTime: "06:00 PM",
    duration: "60 min",
    capacity: "25",
    dropInCredit: "02",
  });

  const [tags, setTags] = useState(["Yoga"]);
  const [tagInput, setTagInput] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);

  const [uploadedFile, setUploadedFile] = useState({
    name: "vinyasa_cover_final.jpg",
    size: "2.4 MB",
  });
  const [isDragging, setIsDragging] = useState(false);

  /* handlers */
  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput("");
    setShowTagInput(false);
  };

  const removeTag = (tag) => setTags(tags.filter((t) => t !== tag));

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file)
      setUploadedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file)
      setUploadedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Create class:", { ...form, tags, uploadedFile });
    navigate("/class");
  };

  return (
    <div className="p-4 bg-Primary min-h-[calc(100vh-100px)]">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4 bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3">
        {/* Left side */}
        <div>
          <h1 className="text-[18px] font-bold text-gray-800">
            Create New Class
          </h1>
          <p className="text-[12px] text-gray-400">
            Configure class details, schedule, and pricing
          </p>
        </div>

        {/* Right side button */}
        <button
          onClick={handleSubmit}
          type="button"
          className="flex items-center gap-2 bg-[#1b5e43] hover:bg-[#154a35] text-white text-[13px] font-semibold px-4 py-2 rounded-lg shadow-sm transition cursor-pointer"
        >
          <span className="text-[14px]">✓</span>
          Publish Class
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-4">
          {/* ══════════════════════════════
              LEFT COLUMN
          ══════════════════════════════ */}
          <div className="flex flex-col gap-4">
            {/* ── Class Details ── */}
            <SectionCard icon={Info} title="Class Details">
              {/* Class Name */}
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

              {/* Studio Location + Instructor */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <Label>Studio Location</Label>
                  <CustomSelect
                    value={form.studioLocation}
                    onChange={(v) => handleChange("studioLocation", v)}
                    placeholder="Select Studio..."
                    options={[
                      "Downtown Studio - Room A",
                      "Downtown Studio - Room B",
                      "Uptown Studio - Main Hall",
                      "Westside Studio",
                    ]}
                  />
                </div>
                <div>
                  <Label>Primary Instructor</Label>
                  <CustomSelect
                    value={form.instructor}
                    onChange={(v) => handleChange("instructor", v)}
                    placeholder="Select Instructor..."
                    options={[
                      "Sarah Jenkins",
                      "Mike Ross",
                      "Marcus Chen",
                      "David Ross",
                    ]}
                  />
                </div>
              </div>

              {/* Category & Tags */}
              <div>
                <Label>Category &amp; Tags</Label>
                <div className="flex flex-wrap items-center gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 bg-[#e8f5f0] text-[#1b5e43] text-[12px] font-semibold px-3 py-1 rounded-full"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-0.5 hover:text-red-500 transition-colors"
                      >
                        <X size={11} />
                      </button>
                    </span>
                  ))}

                  {showTagInput ? (
                    <input
                      autoFocus
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                      }
                      onBlur={addTag}
                      placeholder="Tag name..."
                      className="border border-[#1b5e43]/30 rounded-full px-3 py-0.5 text-[12px] outline-none w-24 focus:border-[#1b5e43]"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowTagInput(true)}
                      className="flex items-center gap-1 border border-dashed border-gray-300 text-gray-500 hover:border-[#1b5e43] hover:text-[#1b5e43] text-[12px] font-medium px-3 py-1 rounded-full transition-colors"
                    >
                      <Plus size={11} />
                      Add Tag
                    </button>
                  )}
                </div>
              </div>
            </SectionCard>

            {/* ── Description & Requirements ── */}
            <SectionCard icon={Info} title="Description & Requirements">
              <div>
                <Label>Class Description</Label>
                <textarea
                  rows={5}
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe what participants can expect..."
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 placeholder-gray-300 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition resize-none"
                />
              </div>
            </SectionCard>
          </div>

          {/* ══════════════════════════════
              RIGHT COLUMN
          ══════════════════════════════ */}
          <div className="flex flex-col gap-4">
            {/* ── Class Media ── */}
            <SectionCard icon={Image} title="Class Media">
              {/* Drop zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-8 px-4 cursor-pointer transition-colors mb-3 ${
                  isDragging
                    ? "border-[#1b5e43] bg-[#e8f5f0]"
                    : "border-gray-200 hover:border-[#1b5e43] hover:bg-gray-50"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#e8f5f0] flex items-center justify-center mb-3">
                  <CloudUpload size={22} className="text-[#1b5e43]" />
                </div>
                <p className="text-[13px] font-semibold text-gray-700 text-center">
                  Click to upload or drag &amp; drop
                </p>
                <p className="text-[12px] text-gray-400 text-center mt-1">
                  SVG, PNG, JPG or GIF
                  <br />
                  (max. 800×400px)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Uploaded file preview */}
              {uploadedFile && (
                <div className="flex items-center gap-3 border border-gray-100 rounded-lg px-3 py-2.5 bg-gray-50">
                  <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0">
                    <Image size={14} className="text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-gray-700 truncate">
                      {uploadedFile.name}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {uploadedFile.size}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedFile(null)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              )}
            </SectionCard>

            {/* ── Schedule ── */}
            <SectionCard icon={CalendarDays} title="Schedule">
              {/* Recurrence toggle */}
              <div className="mb-4">
                <Label>Recurrence</Label>
                <div className="flex rounded-lg overflow-hidden border border-gray-200">
                  {["Weekly", "One-time"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleChange("recurrence", opt)}
                      className={`flex-1 py-2 text-[13px] font-medium transition-colors ${
                        form.recurrence === opt
                          ? "bg-[#1b5e43] text-white"
                          : "bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Time + Duration */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <Label>Start Time</Label>
                  <input
                    type="text"
                    value={form.startTime}
                    onChange={(e) => handleChange("startTime", e.target.value)}
                    placeholder="06:00 PM"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-700 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition"
                  />
                </div>
                <div>
                  <Label>Duration</Label>
                  <CustomSelect
                    value={form.duration}
                    onChange={(v) => handleChange("duration", v)}
                    placeholder="Select..."
                    options={["30 min", "45 min", "60 min", "75 min", "90 min"]}
                  />
                </div>
              </div>

              {/* Capacity */}
              <div>
                <Label>Capacity</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={form.capacity}
                    onChange={(e) => handleChange("capacity", e.target.value)}
                    min={1}
                    className="w-20 border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-700 outline-none focus:border-[#1b5e43] focus:ring-2 focus:ring-[#1b5e43]/10 transition text-center"
                  />
                  <span className="text-[13px] text-gray-400">
                    attendees max
                  </span>
                </div>
              </div>
            </SectionCard>

            {/* ── Pricing ── */}
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
      </form>
    </div>
  );
};

export default CreateClass;
