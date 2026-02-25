import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Size = lazy(() => import("../pages/admin/Size"));
const Brand = lazy(() => import("../pages/admin/Brand"));

const adminRoutes = [
  { path: "dashboard", component: Dashboard, role: ["ADMIN", "STAFF"] },
  { path: "attribute/size", component: Size, role: ["ADMIN", "STAFF"] },
  { path: "brand", component: Brand, role: ["ADMIN", "STAFF"] },
];

export default adminRoutes;
