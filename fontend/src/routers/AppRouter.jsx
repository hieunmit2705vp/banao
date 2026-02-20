import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import LayoutAdmin from "../layout/AdminLayout/Layout";
import adminRoutes from "./AdminRouter";
import UserMain from "../layout/UserLayout/Layout";
import UserRouter from "./UserRouter";

import Login from "../pages/share/Login";
import Unauthorized from "../pages/share/Unauthorized";
import ForgotPasswordForm from "../pages/share/ForgotPassword";
import RegisterForm from "../pages/share/Register";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRouter() {
  const { isLoggedIn, role } = useSelector((state) => state.user);

  return (
    <Router>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-lg font-semibold text-gray-500">Đang tải...</div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              isLoggedIn && (role === "ADMIN" || role === "STAFF") ? (
                <LayoutAdmin />
              ) : (
                <Navigate
                  to={isLoggedIn ? "/unauthorized" : "/login"}
                  replace
                />
              )
            }
          >
            {adminRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
            {/* Default admin → dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* User Routes - Public + Protected */}
          <Route path="/" element={<UserMain />}>
            {UserRouter.map((route, index) => {
              const publicRoutes = ["home", "products", "search", "view-product/:productCode"];
              const isPublic = publicRoutes.includes(route.path);

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    isPublic ? (
                      <route.component />
                    ) : (
                      <ProtectedRoute>
                        <route.component />
                      </ProtectedRoute>
                    )
                  }
                />
              );
            })}
          </Route>

          <Route path="*" element={<div className="min-h-screen flex items-center justify-center text-2xl font-bold text-gray-400">404 - Không tìm thấy trang</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRouter;