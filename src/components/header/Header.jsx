import React from "react";
import { IoMdMenu } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router";

const Header = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[100px] flex items-center justify-center bg-Primary px-4">
      <div className="w-full h-[80px] mt-[2%] mb-[1%] bg-white shadow-custom rounded-[8px] flex items-center justify-between gap-8 px-3 relative font-Poppins">

        {/* Left */}
        <div className="flex items-center gap-x-4">
          <span
            className="text-2xl lg:hidden cursor-pointer"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <IoMdMenu size={28} />
          </span>

          <div>
            <h1 className="text-xl text-textClr font-semibold">
              Welcome, Marco
            </h1>
            <p className="text-textClr">Have a nice day!</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex gap-x-4 relative">

          {/* User Icon */}
          <div className="w-10 h-10 rounded-full border border-Secondary flex items-center justify-center cursor-pointer">
            <CiUser
              size={28}
              className="text-[#2C5945]"
              onClick={() => navigate("/profile")}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;
