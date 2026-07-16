import { createContext, useState } from "react";

export const AuthContext = createContext();

export const getStoredAuthData = () => {
  if (typeof window === "undefined") {
    return { user: null, accessToken: null, refreshToken: null };
  }

  try {
    const storedAuthData = localStorage.getItem("authData");
    if (storedAuthData) {
      const parsedAuthData = JSON.parse(storedAuthData);
      if (parsedAuthData?.user) {
        return {
          user: parsedAuthData.user,
          accessToken:
            parsedAuthData.accessToken || parsedAuthData.access || null,
          refreshToken:
            parsedAuthData.refreshToken || parsedAuthData.refresh || null,
        };
      }
    }

    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      if (parsedUserData?.user) {
        return {
          user: parsedUserData.user,
          accessToken:
            parsedUserData.accessToken || parsedUserData.access || null,
          refreshToken:
            parsedUserData.refreshToken || parsedUserData.refresh || null,
        };
      }
    }

    const storedUser = localStorage.getItem("user");
    const accessToken =
      localStorage.getItem("accessToken") || localStorage.getItem("access_token");
    const refreshToken =
      localStorage.getItem("refreshToken") || localStorage.getItem("refresh_token");

    if (storedUser || accessToken || refreshToken) {
      return {
        user: storedUser ? JSON.parse(storedUser) : null,
        accessToken,
        refreshToken,
      };
    }
  } catch (error) {
    console.error("Failed to parse stored auth data", error);
  }

  return { user: null, accessToken: null, refreshToken: null };
};

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(getStoredAuthData);

  const loginUser = (userData, accessToken, refreshToken) => {
    const normalizedUser = userData?.user || userData;
    const normalizedAuthData = {
      user: normalizedUser,
      accessToken,
      refreshToken,
    };

    localStorage.setItem("authData", JSON.stringify(normalizedAuthData));
    localStorage.setItem("userData", JSON.stringify(normalizedAuthData));
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);

    setAuthData(normalizedAuthData);
  };

  const logoutUser = () => {
    localStorage.removeItem("authData");
    localStorage.removeItem("userData");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setAuthData({ user: null, accessToken: null, refreshToken: null });
  };

  const updateUser = (updatedUserData) => {
    const normalizedUser = updatedUserData?.user || updatedUserData;
    const nextAuthData = {
      ...authData,
      user: normalizedUser,
    };

    localStorage.setItem("authData", JSON.stringify(nextAuthData));
    localStorage.setItem("userData", JSON.stringify(nextAuthData));
    localStorage.setItem("user", JSON.stringify(normalizedUser));

    setAuthData(nextAuthData);
  };

  const authInfo = {
    user: authData.user,
    accessToken: authData.accessToken,
    refreshToken: authData.refreshToken,
    loginUser,
    logoutUser,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;