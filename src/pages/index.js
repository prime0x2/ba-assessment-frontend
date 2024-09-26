import React from "react";
import withSuspense from "@/withSuspense";

const Home = withSuspense(React.lazy(() => import("@/pages/Home")));
const Dashboard = withSuspense(React.lazy(() => import("@/pages/Dashboard")));
const TaskCreate = withSuspense(React.lazy(() => import("@/pages/TaskCreate")));
const TaskDetails = withSuspense(React.lazy(() => import("@/pages/TaskDetails")));
const TaskUpdate = withSuspense(React.lazy(() => import("@/pages/TaskUpdate")));
const Settings = withSuspense(React.lazy(() => import("@/pages/Settings")));
const NotFound = withSuspense(React.lazy(() => import("@/pages/NotFound")));

export { Home, Dashboard, TaskCreate, TaskDetails, TaskUpdate, Settings, NotFound };
