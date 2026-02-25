import React, { useState } from "react";
import CustomModal from "../../../../components/common/CustomModal";
import { toast } from "react-toastify";
import SizeService from "../../../../services/SizeService";

// Modal.setAppElement("#root"); // This should probably be set once in the main App file

export default function CreateModal({ isOpen, onConfirm, onCancel, fetchSizes }) {
    const [sizeName, setSizeName] = useState("");

    const handleCreateSize = async () => {
        if (!sizeName.trim()) {
            toast.error("Tên kích cỡ không được để trống!");
            return;
        }

        try {
            await SizeService.createSize({ name: sizeName });
            toast.success("Thêm kích cỡ thành công!");
            fetchSizes();
            onConfirm();
            setSizeName("");
        } catch (error) {
            console.error("Lỗi khi tạo kích cỡ:", error);
            toast.error(error.response?.data?.message || "Không thể thêm kích cỡ. Vui lòng thử lại!");
        }
    };

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onCancel}
            title="Thêm Kích Thước Mới"
        >
            <div className="text-center">
                <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
                        Tên kích thước <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ví dụ: S, M, L, XL, 39, 40..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition-all duration-300 shadow-sm text-gray-700 bg-gray-50 hover:bg-white"
                        value={sizeName}
                        onChange={(e) => setSizeName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCreateSize();
                        }}
                        autoFocus
                    />
                </div>

                <div className="flex justify-end gap-3 mt-8">
                    <button
                        className="px-6 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors duration-300 border border-transparent hover:border-gray-200"
                        onClick={onCancel}
                    >
                        Hủy bỏ
                    </button>
                    <button
                        className="px-6 py-2.5 bg-[#1E3A8A] text-white rounded-xl font-semibold hover:bg-[#163172] transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95"
                        onClick={handleCreateSize}
                    >
                        Thêm mới
                    </button>
                </div>
            </div>
        </CustomModal>
    );
}
