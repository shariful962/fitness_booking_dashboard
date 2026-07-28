// with pagination  
import React from "react";
import RootClassManagement from "./RootClassManagement";
import SubClassManagement from "./SubClassManagement";


const ClassManagement = () => {

  const user =
    JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {user?.role === "root_admin" ? (
        <RootClassManagement />
      ) : (
        <SubClassManagement />
      )}
    </>
  );
};

export default ClassManagement;