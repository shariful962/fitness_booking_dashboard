import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoArrowBack, IoCamera } from "react-icons/io5";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Marco",
    email: "marco@gmail.com",
    phone: "+880123456789",
    profilePic: "https://i.pravatar.cc/150?img=12", // Added profile picture URL
  });
  const [image, setImage] = useState(null);

  const handleEditToggle = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Save action here (API call etc.)
      console.log("Saved:", formData);
    }
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a new URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profilePic: imageUrl });
      setImage(file); // Optionally store the image file for API upload
    }
  };
  return (
    <div className="p-4 bg-Primary min-h-[calc(100vh-100px)] px-4">
      <div className="bg-white shadow-custom rounded-[10px]  mt-5 min-h-[calc(100vh-155px)]">
        {/* header section  */}
        <div className="bg-[#1b5e43] px-6 py-4 rounded-tl-[10px] rounded-tr-[10px]">
          <div>
            <h2 className="title text-white">Profile</h2>
          </div>
        </div>
        {/* content section  */}
        <div className="max-w-2xl py-6 px-6 mx-auto">
          {/* MAIN CONTENT */}
          <div className="flex flex-col  gap-8">
            {/* PROFILE CARD */}
            <div className="mt-10 mx-auto rounded-lg relative">
              <div className="text-center relative">
                <img
                  src={formData.profilePic}
                  className="w-24 h-24 rounded-full mx-auto"
                  alt="profile"
                />
                <h1 className="text-lg font-regular text-textClr mt-2">
                  Profile
                </h1>
                <p className="text-2xl text-[#1F1D1D]">Admin</p>

                {/* Image Edit Button */}
                <div>
                  {isEditing && (
                    <label
                      htmlFor="imageUpload"
                      className="absolute bottom-16 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer"
                    >
                      <IoCamera className="text-2xl text-gray-700" />
                    </label>
                  )}
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            {/* FORM */}
            <form className="flex-1 space-y-4">
              {/* NAME */}
              <div>
                <label className="label-control">Name</label>
                <input
                  type="text"
                  className="form-control"
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="label-control">Email</label>
                <input
                  type="email"
                  className="form-control"
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleEditToggle}
                className="grade-btn"
              >
                {isEditing ? "Save Change" : "Edit Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
