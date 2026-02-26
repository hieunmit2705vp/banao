import React, { useState } from "react";
import CustomerService from "../../../../services/CustomerService";
import { toast } from "react-toastify";

const UpdatePasswordModal = ({ isOpen, setIsOpen, customer }) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!newPassword || !confirmPassword) {
            toast.error("Vui lòng nhập đầy đủ mật khẩu mới và xác nhận mật khẩu.");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Mật khẩu mới và xác nhận không khớp.");
            return;
        }

        setLoading(true);
        try {
            const response = await CustomerService.updatePassword(customer.id, {
                newPassword,
                confirmPassword,
            });
            toast.success(response.message || "Cập nhật mật khẩu thành công!");
            setIsOpen(false);
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Cập nhật mật khẩu thất bại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                <div className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#1E3A8A] px-8 py-6 rounded-t-2xl relative">
                    <h2 className="text-2xl font-bold text-white text-center">Đổi mật khẩu</h2>
                    <button className="absolute top-4 right-4 text-white" onClick={() => setIsOpen(false)} disabled={loading}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="p-8">
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 block mb-1">Mật khẩu mới</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-[#1E3A8A] outline-none"
                                placeholder="Nhập mật khẩu mới"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 block mb-1">Xác nhận mật khẩu</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-[#1E3A8A] outline-none"
                                placeholder="Nhập lại mật khẩu mới"
                            />
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} id="showPass" />
                            <label htmlFor="showPass">Hiện mật khẩu</label>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            className={`px-8 py-2 bg-[#1E3A8A] text-white rounded-lg font-semibold hover:opacity-90 transition-all ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? "Đang xử lý..." : "Cập nhật"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePasswordModal;
