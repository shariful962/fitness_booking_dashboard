// with pagination  
import React from "react";
import RootUsers from "./RootUsers";
import SubUsers from "./SubUsers";



const Users = () => {

  const user =
    JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {user?.role === "root_admin" ? (
        <RootUsers />
      ) : (
        <SubUsers />
      )}
    </>
  );
};

export default Users;