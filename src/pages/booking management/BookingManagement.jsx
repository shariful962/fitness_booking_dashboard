// with pagination  
import React from "react";
import RootBookingManagement from "./RootBookingManagement";
import SubBookingManagement from "./SubBookingManagement";



const BookingManagement = () => {

  const user =
    JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {user?.role === "root_admin" ? (
        <RootBookingManagement />
      ) : (
        <SubBookingManagement />
      )}
    </>
  );
};

export default BookingManagement;