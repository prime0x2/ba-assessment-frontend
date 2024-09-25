import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Sidebar from "@/components/sidebar";
import PrivateRoute from "@/components/private-route";
import { Home, Dashboard, TaskDetails, Settings, NotFound } from "@/pages";

// Define the routes for the application
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Home page route
  },
  // {
  //   path: "/dashboard",
  //   element: (
  //     <PrivateRoute>
  //       <Sidebar />
  //       <Dashboard />
  //     </PrivateRoute>
  //   ), // Dashboard page route
  // },
  // {
  //   path: "/task/:id",
  //   element: (
  //     <PrivateRoute>
  //       <TaskDetails />
  //     </PrivateRoute>
  //   ), // Task detail page route
  // },
  // {
  //   path: "/settings",
  //   element: (
  //     <PrivateRoute>
  //       <Settings />
  //     </PrivateRoute>
  //   ), // Settings page route
  // },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Sidebar />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "task/:id",
        element: <TaskDetails />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />, // Fallback route for 404 Not Found
  },
]);

// Router component that provides the router to the application
const Router = () => <RouterProvider router={router} />;

export default Router;
