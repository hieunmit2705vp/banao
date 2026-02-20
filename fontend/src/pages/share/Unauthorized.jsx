import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md p-8">
        <div className="text-8xl font-black text-red-500 mb-4">403</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Truy cập bị từ chối</h1>
        <p className="text-gray-500 mb-6">Bạn không có quyền truy cập trang này.</p>
        <Link
          to="/home"
          className="inline-block px-6 py-3 bg-[#1E3A8A] text-white font-bold rounded-full hover:bg-blue-700 transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
