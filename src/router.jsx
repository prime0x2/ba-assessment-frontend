import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Sidebar from "@/components/sidebar";
import PrivateRoute from "@/components/private-route";
import { Home, Dashboard, TaskCreate, TaskDetails, TaskUpdate, Settings, NotFound } from "@/pages";

// Define the routes for the application
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
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
        path: "task",
        children: [
          {
            index: true,
            element: <TaskCreate />,
          },
          {
            path: "details/:id",
            element: <TaskDetails />,
          },
          {
            path: "update/:id",
            element: <TaskUpdate />,
          },
        ],
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
