import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Customer = lazy(() => import("../pages/admin/Customer"));
const Sleeve = lazy(() => import("../pages/admin/Attribute/Sleeve"));

const adminRoutes = [
  { path: "dashboard", component: Dashboard, role: ["ADMIN", "STAFF"] },
  { path: "customers", component: Customer, role: ["ADMIN", "STAFF"] },
  { path: "attributes/sleeve", component: Sleeve, role: ["ADMIN", "STAFF"] },
];

export default adminRoutes;
