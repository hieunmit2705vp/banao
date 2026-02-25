import React, { useState } from "react";
import CustomModal from "../../../../components/common/CustomModal";
import { toast } from "react-toastify";
import BrandService from "../../../../services/BrandService";

export default function CreateModal({ isOpen, onConfirm, onCancel, fetchBrands }) {
    const [brandName, setBrandName] = useState("");

    const handleCreateBrand = async () => {
        if (!brandName.trim()) {
            toast.error("Tên thương hiệu không được để trống!");
            return;
        }

        try {
            await BrandService.createBrand({ brandName });
            toast.success("Thêm thương hiệu thành công!");
            fetchBrands();
            onConfirm();
            setBrandName("");
        } catch (error) {
            console.error("Lỗi khi tạo thương hiệu:", error);
            toast.error(error.response?.data?.message || "Không thể thêm thương hiệu. Vui lòng thử lại!");
        }
    };

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onCancel}
            title="Thêm Thương Hiệu Mới"
        >
            <div className="text-center">
                <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
                        Tên thương hiệu <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ví dụ: Nike, Adidas, Puma..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition-all duration-300 shadow-sm text-gray-700 bg-gray-50 hover:bg-white"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCreateBrand();
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
                        onClick={handleCreateBrand}
                    >
                        Thêm mới
                    </button>
                </div>
            </div>
        </CustomModal>
    );
}
