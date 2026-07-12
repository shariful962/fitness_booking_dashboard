




import {
  createBrowserRouter,
  Navigate,
} from "react-router";

import Layout from "../layout/Layout";

// Auth Pages
import Signin from "../pages/auth/Signin";
import ForgotPass from "../pages/auth/ForgotPass";

// Error Page
import Error from "../pages/error/Error";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

// Users
import Users from "../pages/users/Users";
import BlockUsers from "../pages/block/BlockUsers";

// Profile
import Profile from "../pages/profile/Profile";

// Booking
import BookingManagement from "../pages/booking management/BookingManagement";

// Admin
import AdminManagement from "../pages/admin/AdminManagement";

// Studio
import StudioManagement from "../pages/studio management/StudioManagement";
import ViewStudio from "../pages/studio management/ViewStudio";
import CreateStudio from "../pages/studio management/CreateStudio";
import EditStudio from "../pages/studio management/EditStudio";

// Class
import ClassManagement from "../pages/class management/ClassManagement";
import ViewClass from "../pages/class management/ViewClass";
import CreateClass from "../pages/class management/CreateClass";
import EditClass from "../pages/class management/EditClass";

// Protected Route
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  // =========================================
  // AUTH ROUTES
  // =========================================

  {
    path: "/signin",
    Component: Signin,
  },
  

  {
    path: "/forgotpass",
    Component: ForgotPass,
  },

  // =========================================
  // MAIN LAYOUT
  // =========================================

  {
    path: "/",
    Component: Layout,
    errorElement: <Error />,

    children: [
      // Redirect
      {
        index: true,
        element: <Navigate to="/signin" replace />,
      },

      // =========================================
      // DASHBOARD
      // =========================================

      {
        path: "dashboard",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "root_admin",
            ]}
          >
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      // =========================================
      // USER MANAGEMENT
      // =========================================

      {
        path: "user",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "root_admin",
              "sub_admin",
            ]}
          >
            <Users />
          </ProtectedRoute>
        ),
      },

      {
        path: "user/block",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "root_admin",
              "sub_admin",
            ]}
          >
            <BlockUsers />
          </ProtectedRoute>
        ),
      },

      // =========================================
      // PROFILE
      // =========================================

      {
        path: "profile",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "root_admin",
              "sub_admin",
            ]}
          >
            <Profile />
          </ProtectedRoute>
        ),
      },

      // =========================================
      // BOOKING
      // =========================================

      {
        path: "booking",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "root_admin",
              "sub_admin",
            ]}
          >
            <BookingManagement />
          </ProtectedRoute>
        ),
      },

      // =========================================
      // SUPER ADMIN
      // =========================================

      {
        path: "admin",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "root_admin",
            ]}
          >
            <AdminManagement />
          </ProtectedRoute>
        ),
      },

      // =========================================
      // STUDIO
      // =========================================

      {
        path: "studio",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "root_admin",
              "sub_admin",
            ]}
          >
            <StudioManagement />
          </ProtectedRoute>
        ),
      },

      {
        path: "studio/viewstudio",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "root_admin",
              "sub_admin",
            ]}
          >
            <ViewStudio />
          </ProtectedRoute>
        ),
      },

      {
        path: "studio/createstudio",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "root_admin",

            ]}
          >
            <CreateStudio />
          </ProtectedRoute>
        ),
      },

      {
        path: "studio/editstudio",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "root_admin",
              "sub_admin",
            ]}
          >
            <EditStudio />
          </ProtectedRoute>
        ),
      },

      // =========================================
      // CLASS
      // =========================================

      {
        path: "class",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "root_admin",
              "sub_admin",
            ]}
          >
            <ClassManagement />
          </ProtectedRoute>
        ),
      },

      {
        path: "class/createclass",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "root_admin",
            ]}
          >
            <CreateClass />
          </ProtectedRoute>
        ),
      },

      {
        path: "class/viewclass",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "root_admin",
              "sub_admin",
            ]}
          >
            <ViewClass />
          </ProtectedRoute>
        ),
      },

      {
        path: "class/editclass",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "root_admin",
            ]}
          >
            <EditClass />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
