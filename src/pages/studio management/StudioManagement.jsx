// with pagination  
import React from "react";

import RootStudioManagement from "./RootStudioManagement";
import SubStudioManagement from "./SubStudioManagement";

const StudioManagement = () => {

  const user =
    JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {user?.role === "root_admin" ? (
        <RootStudioManagement />
      ) : (
        <SubStudioManagement />
      )}
    </>
  );
};

export default StudioManagement;