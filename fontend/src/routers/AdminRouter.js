import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Customer = lazy(() => import("../pages/admin/Customer"));
const Sleeve = lazy(() => import("../pages/admin/Attribute/Sleeve"));

const Size = lazy(() => import("../pages/admin/Size"));
const Brand = lazy(() => import("../pages/admin/Brand"));
const Employee = lazy(() => import("../pages/admin/Employee"));
const adminRoutes = [
  { path: "dashboard", component: Dashboard, role: ["ADMIN", "STAFF"] },
  { path: "customers", component: Customer, role: ["ADMIN", "STAFF"] },
  { path: "attributes/sleeve", component: Sleeve, role: ["ADMIN", "STAFF"] },
  { path: "attribute/size", component: Size, role: ["ADMIN", "STAFF"] },
  { path: "brand", component: Brand, role: ["ADMIN", "STAFF"] },
   { path: "employee", component: Employee, role: ["ADMIN"] }
];

export default adminRoutes;
