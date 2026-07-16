import React, { useContext, useEffect, useState } from "react";
import { IoCamera } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";
import { baseApi } from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endpoints";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || user?.full_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    date_of_birth: user?.date_of_birth || "",
    gender: user?.gender || "",
    location: user?.location || "",
    image: user?.image || "",
  });
  const [editData, setEditData] = useState(formData);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.email) return;

      try {
        setLoading(true);
        const response = await baseApi.get(ENDPOINTS.profile);
        const profileData = response?.data?.data || response?.data;

        if (profileData) {
          const normalizedProfile = {
            name: profileData.name || profileData.full_name || "",
            email: profileData.email || "",
            phone: profileData.phone || "",
            date_of_birth: profileData.date_of_birth || "",
            gender: profileData.gender || "",
            location: profileData.location || "",
            image: profileData.image || "",
          };

          setFormData(normalizedProfile);
          setEditData(normalizedProfile);
          updateUser({ ...user, ...normalizedProfile });
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.email]);

  const handleEditToggle = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const savedData = {
        ...editData,
      };

      try {
        setLoading(true);
        const normalizedDate = (() => {
          if (!savedData.date_of_birth) return "";
          const value = String(savedData.date_of_birth);
          if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
          const date = new Date(value);
          if (Number.isNaN(date.getTime())) return "";
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        })();

        const payload = {
          name: savedData.name,
          phone: savedData.phone,
          gender: savedData.gender,
          location: savedData.location,
        };

        if (normalizedDate) {
          payload.date_of_birth = normalizedDate;
        }

        const formDataToSend = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            formDataToSend.append(key, value);
          }
        });

        if (selectedImageFile) {
          formDataToSend.append("image", selectedImageFile);
        }

        const response = await baseApi.patch(ENDPOINTS.profile, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const profileData = response?.data?.data || response?.data;

        const normalizedProfile = {
          name: profileData?.name || profileData?.full_name || savedData.name,
          email: profileData?.email || savedData.email,
          phone: profileData?.phone || savedData.phone,
          date_of_birth: profileData?.date_of_birth || savedData.date_of_birth,
          gender: profileData?.gender || savedData.gender,
          location: profileData?.location || savedData.location,
          image: profileData?.image || savedData.image,
        };

        setFormData(normalizedProfile);
        setEditData(normalizedProfile);
        updateUser({ ...user, ...normalizedProfile });
      } catch (error) {
        console.error("Failed to update profile", error);
      } finally {
        setLoading(false);
      }
    } else {
      setEditData(formData);
    }
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImageFile(file);
      setEditData((prev) => ({ ...prev, image: imageUrl }));
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const resolveImageUrl = (imagePath) => {
    if (!imagePath) return "/media/profile_images/default_avatar.png";
    if (/^https?:\/\//i.test(imagePath)) return imagePath;
    if (imagePath.startsWith("/media/")) {
      return `${import.meta.env.VITE_API_BASE_URL}${imagePath}`;
    }
    return imagePath;
  };

  const imageSrc = resolveImageUrl(formData.image);

  return (
    <div className="p-4 bg-Primary min-h-[calc(100vh-100px)] px-4">
      <div className="bg-white shadow-custom rounded-[10px] mt-5 min-h-[calc(100vh-155px)]">
        <div className="bg-[#1b5e43] px-6 py-4 rounded-tl-[10px] rounded-tr-[10px]">
          <div>
            <h2 className="title text-white">Profile</h2>
          </div>
        </div>

        <div className="max-w-3xl py-8 px-6 mx-auto">
          <div className="flex flex-col gap-8">
            <div className="mx-auto rounded-lg relative">
              <div className="text-center relative inline-block">
                <div className="relative inline-block">
                  <img
                    src={imageSrc}
                    className="w-24 h-24 rounded-full mx-auto object-cover border border-gray-200"
                    alt="profile"
                  />

                  {isEditing && (
                    <label
                      htmlFor="imageUpload"
                      className="absolute bottom-1 right-1 bg-white rounded-full p-2 shadow-lg cursor-pointer border border-gray-200"
                    >
                      <IoCamera className="text-2xl text-gray-700" />
                    </label>
                  )}
                </div>
                <p className="text-2xl text-[#1F1D1D] mt-3">
                  {formData.name || "User"}
                </p>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <form className="flex-1 space-y-4" onSubmit={handleEditToggle}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                  <p className="text-sm font-medium text-[#1b5e43] mb-2">Name</p>
                  {!isEditing ? (
                    <p className="text-base text-gray-800">{formData.name || "Not provided"}</p>
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  )}
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                  <p className="text-sm font-medium text-[#1b5e43] mb-2">Email</p>
                  <input
                    type="email"
                    className="w-full border-0 bg-transparent p-0 text-base text-gray-800 outline-none"
                    disabled={true}
                    value={formData.email}
                  />
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                  <p className="text-sm font-medium text-[#1b5e43] mb-2">Phone</p>
                  {!isEditing ? (
                    <p className="text-base text-gray-800">{formData.phone || "Not provided"}</p>
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value={editData.phone}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                    />
                  )}
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                  <p className="text-sm font-medium text-[#1b5e43] mb-2">Date of Birth</p>
                  {!isEditing ? (
                    <p className="text-base text-gray-800">{formData.date_of_birth || "Not provided"}</p>
                  ) : (
                    <input
                      type="date"
                      className="form-control"
                      value={editData.date_of_birth || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, date_of_birth: e.target.value })
                      }
                    />
                  )}
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 md:col-span-2">
                  <p className="text-sm font-medium text-[#1b5e43] mb-2">Gender</p>
                  {!isEditing ? (
                    <p className="text-base text-gray-800">{formData.gender || "Not provided"}</p>
                  ) : (
                    <select
                      className="form-control"
                      value={editData.gender || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, gender: e.target.value })
                      }
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  )}
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 md:col-span-2">
                  <p className="text-sm font-medium text-[#1b5e43] mb-2">Location</p>
                  {!isEditing ? (
                    <p className="text-base text-gray-800">{formData.location || "Not provided"}</p>
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value={editData.location || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, location: e.target.value })
                      }
                    />
                  )}
                </div>
              </div>

              <button type="submit" className="grade-btn" disabled={loading}>
                {loading ? "Saving..." : isEditing ? "Save Change" : "Edit Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
