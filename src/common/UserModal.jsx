import React from "react";
import { RxCross2 } from "react-icons/rx";

const UserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg w-[400px] p-6 relative pb-10">
        {/* cross button  */}
        <span>
          {" "}
          <RxCross2
            size={18}
            onClick={onClose}
            className="absolute top-3 right-3 cursor-pointer"
          />{" "}
        </span>
        <h2 className="title text-center text-textClr mb-1">User Details</h2>
        <p className="text-center text-[#919191] mb-4">
          See all details about {user.name}
        </p>
        <div className="flex flex-row justify-center items-center gap-3 mb-8 px-7">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full"
          />
          {/* <p className="font-medium text-xl md:text-2xl">{user.name}</p> */}
        </div>
        <div className="space-y-1 px-5">
          <div className="w-full flex items-center">
            <div className="w-[130px] font-bold text-textClr">Name:</div>
            <div className="flex-1 text-right text-sm">{user.name}</div>
          </div>
          <div className="w-full flex items-center">
            <div className="w-[130px] font-bold text-textClr ">Email:</div>
            <div className="flex-1 text-right text-sm">{user.email}</div>
          </div>
          <div className="w-full flex items-center">
            <div className="w-[130px] font-bold text-textClr ">Phone</div>
            <div className="flex-1 text-right text-sm">{user.phone}</div>
          </div>
          <div className="w-full flex items-center">
            <div className="w-[130px] font-bold text-textClr ">
              Joining Date:
            </div>
            <div className="flex-1 text-right text-sm">{user.date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;