import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home, Dashboard, TaskDetails, Settings, NotFound } from "@/pages";

// Define the routes for the application
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Home page route
  },
  {
    path: "/dashboard",
    element: <Dashboard />, // Dashboard page route
  },
  {
    path: "/task/:id",
    element: <TaskDetails />, // Task detail page route
  },
  {
    path: "/settings",
    element: <Settings />, // Settings page route
  },
  {
    path: "*",
    element: <NotFound />, // Fallback route for 404 Not Found
  },
]);

// Router component that provides the router to the application
const Router = () => <RouterProvider router={router} />;

export default Router;
