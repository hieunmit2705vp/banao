import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Employee = lazy(() => import("../pages/admin/Employee"));

const adminRoutes = [
  { path: "dashboard", component: Dashboard, role: ["ADMIN", "STAFF"] },
  { path: "employee", component: Employee, role: ["ADMIN"] }
];

export default adminRoutes;
