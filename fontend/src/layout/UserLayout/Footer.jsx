import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-bold text-lg">The Boys Fashion</h3>
          <p className="text-sm text-gray-500 mt-2">Thời trang nam trẻ trung, phong cách.</p>
        </div>
        <div>
          <h4 className="font-semibold">Hỗ trợ</h4>
          <ul className="mt-3 text-sm text-gray-600">
            <li><Link to="/help">Trợ giúp</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
            <li><Link to="/returns">Chính sách đổi trả</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Theo dõi</h4>
          <p className="text-sm text-gray-600 mt-3">Mạng xã hội và newsletter</p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-6">© {new Date().getFullYear()} The Boys Fashion. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
