import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
            <div className="bg-white rounded-lg shadow-xl max-w-sm p-6 w-full mx-4">
                <h3 className="font-bold text-lg text-center text-gray-800">Xác nhận</h3>
                <p className="py-4 text-center text-gray-600 font-medium">{message}</p>
                <div className="flex justify-center gap-4 mt-2">
                    <button
                        className="px-6 py-2 bg-[#1E3A8A] text-white rounded-lg font-semibold hover:bg-[#2563EB] transition-colors"
                        onClick={onConfirm}
                    >
                        Xác nhận
                    </button>
                    <button
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        onClick={onClose}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
