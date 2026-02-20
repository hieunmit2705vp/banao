import { lazy } from "react";

const Home = lazy(() => import("../pages/user/Home.jsx"));

const userRouter = [
  { path: "home", component: Home, role: "CUSTOMER" },
];

export default userRouter;
