import React, { useState, useEffect } from "react";
import CustomModal from "../../../../components/common/CustomModal";
import SizeService from "../../../../services/SizeService";
import { toast } from "react-toastify";

const UpdateModal = ({ isOpen, setUpdateModal, size, fetchSizes }) => {
    const [sizeName, setSizeName] = useState("");

    useEffect(() => {
        if (size) {
            setSizeName(size.name);
        }
    }, [size]);

    const handleUpdate = async () => {
        if (!sizeName.trim()) {
            toast.error("Tên kích cỡ không được để trống!");
            return;
        }
        try {
            await SizeService.updateSize(size.id, { id: size.id, name: sizeName });
            toast.success("Cập nhật kích cỡ thành công!");
            fetchSizes();
            setUpdateModal(false);
        } catch (error) {
            console.error("Lỗi khi cập nhật kích cỡ:", error);
            toast.error(error.response?.data?.message || "Không thể cập nhật kích cỡ. Vui lòng thử lại!");
        }
    };

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={() => setUpdateModal(false)}
            title="Cập Nhật Kích Thước"
        >
            <div className="text-center">
                <div className="mb-6 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
                        Sửa tên kích thước <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition-all duration-300 shadow-sm text-gray-700 bg-gray-50 hover:bg-white"
                        value={sizeName}
                        onChange={(e) => setSizeName(e.target.value)}
                        placeholder="Nhập tên kích thước"
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleUpdate();
                        }}
                    />
                </div>

                <div className="flex justify-end gap-3 mt-8">
                    <button
                        className="px-6 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors duration-300 border border-transparent hover:border-gray-200"
                        onClick={() => setUpdateModal(false)}
                    >
                        Hủy bỏ
                    </button>
                    <button
                        className="px-6 py-2.5 bg-[#1E3A8A] text-white rounded-xl font-semibold hover:bg-[#163172] transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95"
                        onClick={handleUpdate}
                    >
                        Cập nhật
                    </button>
                </div>
            </div>
        </CustomModal>
    );
};

export default UpdateModal;
