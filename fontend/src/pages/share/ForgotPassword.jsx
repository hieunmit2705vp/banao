import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";

const ForgotPasswordForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      const response = await AuthService.forgetPassword(usernameOrEmail);
      setMessage(response.message || "Vui lòng kiểm tra email để đặt lại mật khẩu.");
    } catch (err) {
      setError(err.message || "Không tìm thấy tài khoản với thông tin này.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-700 flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-800 opacity-20"></div>
        <div className="z-10 flex flex-col items-center">
          <div className="w-32 h-32 mb-8 rounded-full bg-white p-2 shadow-lg">
            <img
              src="./logo.jpg"
              alt="THE BOYS Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Quên mật khẩu?</h1>
          <p className="text-xl text-blue-100 text-center max-w-md">
            Đừng lo lắng! Chúng tôi sẽ giúp bạn lấy lại quyền truy cập tài khoản dễ dàng.
          </p>
        </div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-600 opacity-20"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-indigo-500 opacity-20"></div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Khôi phục mật khẩu</h2>
            <p className="text-gray-600 mt-2">Nhập email hoặc tên đăng nhập của bạn</p>
          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg animate-fade-in">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{message}</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg animate-fade-in">
              <div className="flex items-center">...</div>
            </div>
          )}

          {/* rest of template truncated for brevity? */}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;