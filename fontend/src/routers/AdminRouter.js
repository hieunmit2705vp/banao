import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/admin/Dashboard"));

const adminRoutes = [
  { path: "dashboard", component: Dashboard, role: ["ADMIN", "STAFF"] },
];

export default adminRoutes;
