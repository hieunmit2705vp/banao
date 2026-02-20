import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaFire, FaStar, FaTrophy, FaArrowRight, FaShoppingCart,
  FaCreditCard, FaCheckCircle
} from "react-icons/fa";
import {
  FaFacebook, FaYoutube, FaTiktok, FaInstagram
} from "react-icons/fa";

const formatCurrency = (amount) => {
  return amount ? amount.toLocaleString("vi-VN") + "₫" : "Liên hệ";
};

// ============== FAKE DATA ==============
const fakeVouchers = [
  { id: 1, voucherCode: "SUMMER24", voucherName: "Giảm giá mùa hè", reducedPercent: 20, minCondition: 500000, endDate: "2025-08-31" },
  { id: 2, voucherCode: "NEWUSER", voucherName: "Khách hàng mới", reducedPercent: 15, minCondition: 300000, endDate: "2025-12-31" },
  { id: 3, voucherCode: "FLASH50", voucherName: "Flash Sale cuối tuần", reducedPercent: 50, minCondition: 1000000, endDate: "2025-07-15" },
  { id: 4, voucherCode: "VIP2025", voucherName: "VIP Member Only", reducedPercent: 30, minCondition: 800000, endDate: "2025-09-30" },
];

const fakeBrands = [
  { id: 1, brandName: "Nike", brandPhoto: null },
  { id: 2, brandName: "Adidas", brandPhoto: null },
  { id: 3, brandName: "Uniqlo", brandPhoto: null },
  { id: 4, brandName: "Zara", brandPhoto: null },
  { id: 5, brandName: "H&M", brandPhoto: null },
  { id: 6, brandName: "Gucci", brandPhoto: null },
];

const fakeProducts = [
  { id: 1, nameProduct: "Áo Polo Classic Fit", salePrice: 450000, importPrice: 600000, photo: "https://via.placeholder.com/300x400/1E3A8A/fff?text=Polo+Classic", quantitySaled: 120, quantity: 200, brand: { name: "Nike" }, material: { name: "Cotton" } },
  { id: 2, nameProduct: "Áo Sơ Mi Oxford Trắng", salePrice: 520000, importPrice: 700000, photo: "https://via.placeholder.com/300x400/2563EB/fff?text=So+Mi+Oxford", quantitySaled: 85, quantity: 150, brand: { name: "Uniqlo" }, material: { name: "Oxford" } },
  { id: 3, nameProduct: "Áo Thun Oversize Logo", salePrice: 350000, importPrice: 450000, photo: "https://via.placeholder.com/300x400/3B82F6/fff?text=Thun+Oversize", quantitySaled: 200, quantity: 300, brand: { name: "Adidas" }, material: { name: "Cotton" } },
  { id: 4, nameProduct: "Áo Khoác Bomber Jacket", salePrice: 890000, importPrice: 1200000, photo: "https://via.placeholder.com/300x400/1E40AF/fff?text=Bomber+Jacket", quantitySaled: 67, quantity: 100, brand: { name: "Zara" }, material: { name: "Polyester" } },
  { id: 5, nameProduct: "Áo Hoodie Basic", salePrice: 650000, importPrice: 800000, photo: "https://via.placeholder.com/300x400/1D4ED8/fff?text=Hoodie+Basic", quantitySaled: 150, quantity: 250, brand: { name: "H&M" }, material: { name: "Fleece" } },
  { id: 6, nameProduct: "Áo Vest Công Sở Slim", salePrice: 1200000, importPrice: 1500000, photo: "https://via.placeholder.com/300x400/172554/fff?text=Vest+Slim", quantitySaled: 45, quantity: 80, brand: { name: "Gucci" }, material: { name: "Wool" } },
  { id: 7, nameProduct: "Áo Thun Cổ Tròn Premium", salePrice: 290000, importPrice: 400000, photo: "https://via.placeholder.com/300x400/1E3A8A/fff?text=Thun+Premium", quantitySaled: 300, quantity: 500, brand: { name: "Uniqlo" }, material: { name: "Cotton" } },
  { id: 8, nameProduct: "Áo Flannel Kẻ Caro", salePrice: 480000, importPrice: 650000, photo: "https://via.placeholder.com/300x400/2563EB/fff?text=Flannel+Caro", quantitySaled: 92, quantity: 120, brand: { name: "Zara" }, material: { name: "Flannel" } },
  { id: 9, nameProduct: "Áo Denim Jacket Vintage", salePrice: 750000, importPrice: 950000, photo: "https://via.placeholder.com/300x400/3B82F6/fff?text=Denim+Vintage", quantitySaled: 78, quantity: 100, brand: { name: "Nike" }, material: { name: "Denim" } },
  { id: 10, nameProduct: "Áo Tank Top Gym", salePrice: 220000, importPrice: 300000, photo: "https://via.placeholder.com/300x400/1E40AF/fff?text=Tank+Top", quantitySaled: 180, quantity: 400, brand: { name: "Adidas" }, material: { name: "Spandex" } },
];

const fakeBestSelling = [
  { id: 7, nameProduct: "Áo Thun Cổ Tròn Premium", salePrice: 290000, photo: "https://via.placeholder.com/150/1E3A8A/fff?text=Premium", quantitySaled: 300 },
  { id: 3, nameProduct: "Áo Thun Oversize Logo", salePrice: 350000, photo: "https://via.placeholder.com/150/2563EB/fff?text=Oversize", quantitySaled: 200 },
  { id: 10, nameProduct: "Áo Tank Top Gym", salePrice: 220000, photo: "https://via.placeholder.com/150/3B82F6/fff?text=Tank+Top", quantitySaled: 180 },
  { id: 5, nameProduct: "Áo Hoodie Basic", salePrice: 650000, photo: "https://via.placeholder.com/150/1D4ED8/fff?text=Hoodie", quantitySaled: 150 },
  { id: 1, nameProduct: "Áo Polo Classic Fit", salePrice: 450000, photo: "https://via.placeholder.com/150/1E40AF/fff?text=Polo", quantitySaled: 120 },
];

const fakeLatestProducts = [
  { id: 9, nameProduct: "Áo Denim Jacket Vintage", salePrice: 750000, photo: "https://via.placeholder.com/150/3B82F6/fff?text=Denim" },
  { id: 6, nameProduct: "Áo Vest Công Sở Slim", salePrice: 1200000, photo: "https://via.placeholder.com/150/172554/fff?text=Vest" },
  { id: 8, nameProduct: "Áo Flannel Kẻ Caro", salePrice: 480000, photo: "https://via.placeholder.com/150/2563EB/fff?text=Flannel" },
  { id: 4, nameProduct: "Áo Khoác Bomber Jacket", salePrice: 890000, photo: "https://via.placeholder.com/150/1E40AF/fff?text=Bomber" },
];

const newsItems = [
  { img: "https://via.placeholder.com/400x300/1E3A8A/fff?text=Fashion+News+1", title: "7 Kiểu Áo Sơ Mi Nam Không Bao Giờ Lỗi Thời", desc: "Những món đồ kinh điển như sơ mi cài nút, polo, và flannel không bao giờ lỗi mốt...", date: "21/02/2024" },
  { img: "https://via.placeholder.com/400x300/2563EB/fff?text=Fashion+News+2", title: "Phong Cách 'The Boy' Trong Phim Thời Trang", desc: "Áo đặc trưng của chúng tôi gây chú ý trong một bộ phim gần đây...", date: "20/02/2024" },
  { img: "https://via.placeholder.com/400x300/3B82F6/fff?text=Fashion+News+3", title: "Phong Cách Anh Quốc Thanh Lịch", desc: "Sự tinh tế nhẹ nhàng với áo may đo của chúng tôi, lấy cảm hứng từ phong cách Anh Quốc...", date: "19/02/2024" },
  { img: "https://via.placeholder.com/400x300/1D4ED8/fff?text=Fashion+News+4", title: "Tủ Đồ Tối Giản: Chìa Khóa Chọn Áo Thông Minh", desc: "Xây dựng bộ sưu tập áo đa năng với The Boy—phong cách, tiết kiệm...", date: "18/02/2024" },
];

// ============== COMPONENTS ==============

const ProductCard = ({ product, onView, onToggleSelect, selectedProducts, isHot = false }) => {
  const discount = product.importPrice > product.salePrice
    ? Math.round(((product.importPrice - product.salePrice) / product.importPrice) * 100)
    : 0;
  const isSelected = selectedProducts.some((p) => p.id === product.id);

  return (
    <div className={`flex-shrink-0 w-[260px] bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-2xl hover:border-blue-100 transition-all duration-300 relative ${isHot ? "ring-2 ring-transparent" : ""}`}>
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img src={product.photo} alt={product.nameProduct} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {isHot && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1 uppercase tracking-wider">
              <FaFire /> Hot
            </span>
          )}
          {discount > 0 && (
            <span className="bg-yellow-400 text-blue-900 text-[10px] font-bold px-2 py-1 rounded shadow-sm">-{discount}%</span>
          )}
        </div>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[1px]">
          <button onClick={() => onView(product.id)} className="w-10 h-10 bg-white text-[#1E3A8A] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1E3A8A] hover:text-white transition-all transform hover:scale-110" title="Xem chi tiết">
            <FaArrowRight />
          </button>
          <button onClick={() => onToggleSelect(product)} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-110 ${isSelected ? "bg-green-500 text-white" : "bg-white text-gray-600 hover:text-green-600"}`} title="So sánh">
            {isSelected ? <FaCheckCircle /> : <FaShoppingCart />}
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2 h-10">
          <h3 className="font-bold text-gray-800 text-sm line-clamp-2 group-hover:text-[#1E3A8A] transition-colors leading-snug cursor-pointer" onClick={() => onView(product.id)}>
            {product.nameProduct}
          </h3>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[#1E3A8A] font-extrabold text-lg">{formatCurrency(product.salePrice)}</p>
            {discount > 0 && <p className="text-xs text-gray-400 line-through">{formatCurrency(product.importPrice)}</p>}
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-[10px] text-gray-500 mb-1 font-semibold">
            <span>Đã bán: {product.quantitySaled || 0}</span>
            {product.quantitySaled > 50 && <span className="text-orange-500">🔥 Bán chạy</span>}
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#1E3A8A] to-blue-400 h-full rounded-full" style={{ width: `${Math.min(((product.quantitySaled || 0) / (product.quantity || 100)) * 100, 100)}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductListItem = ({ product, rank, onView }) => {
  return (
    <div onClick={() => onView(product.id)} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:bg-blue-50/10 transition-all cursor-pointer group relative overflow-hidden">
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shadow-md z-10 ${rank === 1 ? "bg-yellow-400 text-white ring-4 ring-yellow-100" : rank === 2 ? "bg-gray-300 text-white ring-4 ring-gray-100" : rank === 3 ? "bg-orange-400 text-white ring-4 ring-orange-100" : "bg-gray-100 text-gray-500"}`}>
        {rank}
      </div>
      <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
        <img src={product.photo} alt={product.nameProduct} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="flex-1 min-w-0 z-10">
        <h3 className="font-bold text-gray-800 group-hover:text-[#1E3A8A] transition-colors line-clamp-2 text-base mb-1">{product.nameProduct}</h3>
        <p className="text-[#1E3A8A] font-extrabold text-lg">{formatCurrency(product.salePrice)}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">Đã bán {product.quantitySaled}</span>
          {rank <= 3 && <span className="text-xs text-red-500 font-bold flex items-center gap-1"><FaFire /> Trending</span>}
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-2 text-[#1E3A8A]">
        <FaArrowRight />
      </div>
    </div>
  );
};

// ============== HOME PAGE ==============
const Home = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const navigate = useNavigate();

  const vouchers = fakeVouchers;
  const brands = fakeBrands;
  const products = fakeProducts;
  const bestSellingProducts = fakeBestSelling;
  const latestProducts = fakeLatestProducts;

  const toggleSelectProduct = (product) => {
    setSelectedProducts((prev) => {
      const isSelected = prev.some((p) => p.id === product.id);
      return isSelected ? prev.filter((p) => p.id !== product.id) : prev.length < 3 ? [...prev, product] : prev;
    });
  };

  const handleViewProduct = (productId) => {
    navigate(`/view-product/${productId}`);
  };

  const removeSelectedProduct = (productId) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  return (
    <main className="bg-gray-50 min-h-screen font-sans">

      {/* 1. Hero Banner */}
      <section className="relative w-full h-[600px] lg:h-[700px] overflow-hidden group">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="w-full h-full bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#172554]"></div>
        <div className="absolute inset-0 z-20 flex items-center bg-gradient-to-r from-black/80 via-transparent to-transparent">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-2xl">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400 text-blue-300 text-sm font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
                Bộ Sưu Tập Mới 2024
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                Nâng Tầm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Phong Cách</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 font-light max-w-lg leading-relaxed">
                Khám phá những thiết kế độc bản, chất liệu cao cấp và sự tinh tế trong từng đường kim mũi chỉ tại The Boys.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => navigate("/products")} className="px-8 py-4 bg-[#1E3A8A] text-white font-bold rounded-full shadow-lg shadow-blue-900/30 hover:bg-blue-700 hover:shadow-blue-700/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                  Mua Sắm Ngay <FaArrowRight />
                </button>
                <button onClick={() => navigate("/products")} className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border border-white/30 hover:bg-white hover:text-[#1E3A8A] hover:-translate-y-1 transition-all duration-300">
                  Xem Bộ Sưu Tập
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Exclusive Vouchers */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E3A8A] mb-3 relative inline-block">
              Ưu Đãi Đặc Quyền
              <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 rounded-full transform scale-x-50"></span>
            </h2>
            <p className="text-gray-500 mt-2">Dành riêng cho khách hàng thân thiết của The Boys</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vouchers.map((voucher) => (
              <div key={voucher.id} className="relative group bg-gradient-to-br from-[#1E3A8A] to-blue-900 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold border border-white/20">VOUCHER</div>
                      <FaCreditCard className="text-white/50 text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{voucher.voucherCode}</h3>
                    <p className="text-blue-200 text-sm mb-4 line-clamp-1">{voucher.voucherName}</p>
                    <div className="bg-black/20 p-3 rounded-xl mb-4 text-center">
                      <p className="text-xs text-blue-200 mb-1">Giảm Giá</p>
                      <p className="text-3xl font-bold text-yellow-400">{voucher.reducedPercent}%</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-blue-200 flex justify-between mb-1">
                      <span>Đơn tối thiểu:</span>
                      <span className="font-semibold text-white">{formatCurrency(voucher.minCondition)}</span>
                    </p>
                    <p className="text-xs text-blue-200 flex justify-between">
                      <span>Hết hạn:</span>
                      <span className="font-semibold text-white">{new Date(voucher.endDate).toLocaleDateString("vi-VN")}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Hot Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-red-500 font-bold uppercase tracking-widest text-sm mb-2 block animate-pulse">Running Fast!</span>
              <h2 className="text-4xl font-extrabold text-[#1E3A8A] flex items-center gap-3">
                Sản Phẩm Hot <FaFire className="text-orange-500" />
              </h2>
            </div>
            <button onClick={() => navigate("/products")} className="group flex items-center gap-2 text-[#1E3A8A] font-bold hover:text-blue-700 transition-colors">
              Xem Tất Cả <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
          <div className="relative -mx-6 px-6 overflow-hidden">
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide py-4 px-2">
              {products.slice(0, 10).map((product) => (
                <div key={product.id} className="snap-center">
                  <ProductCard product={product} onView={handleViewProduct} onToggleSelect={toggleSelectProduct} selectedProducts={selectedProducts} isHot={true} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Best Selling & New Arrivals */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Best Sellers */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-yellow-100 rounded-full text-yellow-600"><FaTrophy className="text-2xl" /></div>
                <h2 className="text-3xl font-extrabold text-[#1E3A8A]">Bán Chạy Nhất</h2>
              </div>
              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 shadow-inner">
                <div className="space-y-4">
                  {bestSellingProducts.map((product, index) => (
                    <ProductListItem key={product.id} product={product} rank={index + 1} onView={handleViewProduct} />
                  ))}
                </div>
              </div>
            </div>

            {/* Latest Arrivals */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-blue-100 rounded-full text-blue-600"><FaStar className="text-2xl" /></div>
                  <h2 className="text-3xl font-extrabold text-[#1E3A8A]">Mới Lên Kệ</h2>
                </div>
                <div className="grid grid-cols-1 gap-5">
                  {latestProducts.map((product) => (
                    <div key={product.id} onClick={() => handleViewProduct(product.id)} className="group flex gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-[#1E3A8A] shadow-sm hover:shadow-lg transition-all cursor-pointer items-center">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <img src={product.photo} alt={product.nameProduct} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-[10px] uppercase font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">New Arrival</span>
                        </div>
                        <h3 className="font-bold text-gray-800 group-hover:text-[#1E3A8A] transition-colors line-clamp-1 mb-1 text-sm md:text-base">{product.nameProduct}</h3>
                        <p className="text-[#1E3A8A] font-extrabold">{formatCurrency(product.salePrice)}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#1E3A8A] group-hover:text-white transition-all">
                        <FaArrowRight size={12} />
                      </div>
                    </div>
                  ))}
                  <button onClick={() => navigate("/products")} className="w-full py-4 mt-2 rounded-xl text-[#1E3A8A] font-bold bg-blue-50 hover:bg-[#1E3A8A] hover:text-white transition-all border border-blue-100 uppercase text-sm tracking-wide">
                    Xem toàn bộ sản phẩm mới
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Brands */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">Đối Tác Thương Hiệu</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-80 hover:opacity-100 transition-opacity">
            {brands.map((brand) => (
              <div key={brand.id} className="w-full flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 cursor-pointer" title={brand.brandName}>
                <span className="text-xl font-bold text-gray-400 hover:text-[#1E3A8A]">{brand.brandName}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Blog/News */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-extrabold text-[#1E3A8A] mb-2">The Boys Blog</h2>
              <p className="text-gray-500">Cập nhật xu hướng thời trang mới nhất</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newsItems.map((news, index) => (
              <article key={index} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img src={news.img} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-[#1E3A8A] shadow-sm">{news.date}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#1E3A8A] transition-colors leading-snug">{news.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3 leading-relaxed">{news.desc}</p>
                  <span className="text-[#1E3A8A] text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">Đọc thêm <FaArrowRight className="text-xs" /></span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Compare Floating Button */}
      {selectedProducts.length > 0 && (
        <>
          <button onClick={() => setShowCompareModal(true)} className="fixed bottom-8 right-8 bg-[#1E3A8A] text-white pl-4 pr-6 py-3 rounded-full shadow-2xl hover:bg-blue-800 hover:scale-105 transition-all font-bold flex items-center gap-3 z-40 ring-4 ring-white/50">
            <span className="bg-yellow-400 text-blue-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold">{selectedProducts.length}</span>
            So Sánh Sản Phẩm
          </button>
          {showCompareModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="bg-gray-50 px-8 py-5 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1E3A8A]">So Sánh Sản Phẩm</h2>
                    <p className="text-sm text-gray-500">So sánh giá và tính năng để chọn lựa tốt nhất</p>
                  </div>
                  <button onClick={() => setShowCompareModal(false)} className="w-10 h-10 rounded-full bg-white hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500 transition-all font-bold text-xl shadow-sm">✕</button>
                </div>
                <div className="p-8 overflow-y-auto bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {selectedProducts.map((product) => (
                      <div key={product.id} className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 relative group hover:border-[#1E3A8A] transition-all">
                        <button onClick={() => removeSelectedProduct(product.id)} className="absolute top-3 right-3 w-8 h-8 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition-all z-10" title="Xóa khỏi so sánh">✕</button>
                        <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-gray-100">
                          <img src={product.photo} alt={product.nameProduct} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 min-h-[3.5rem]">{product.nameProduct}</h3>
                        <div className="flex items-baseline gap-2 mb-4">
                          <p className="text-2xl font-extrabold text-[#1E3A8A]">{formatCurrency(product.salePrice)}</p>
                        </div>
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                            <span className="text-gray-500">Thương hiệu</span>
                            <span className="font-semibold text-gray-900">{product.brand?.name || "N/A"}</span>
                          </div>
                          <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                            <span className="text-gray-500">Chất liệu</span>
                            <span className="font-semibold text-gray-900">{product.material?.name || "N/A"}</span>
                          </div>
                          <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                            <span className="text-gray-500">Đã bán</span>
                            <span className="font-semibold text-green-600">{product.quantitySaled || 0}</span>
                          </div>
                        </div>
                        <button onClick={() => handleViewProduct(product.id)} className="w-full bg-[#1E3A8A] text-white py-3 rounded-xl font-bold hover:bg-blue-800 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">Xem Chi Tiết</button>
                      </div>
                    ))}
                    {selectedProducts.length < 3 && (
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-gray-400 min-h-[400px]">
                        <FaShoppingCart className="text-4xl mb-4 opacity-30" />
                        <p>Thêm sản phẩm khác để so sánh</p>
                        <button onClick={() => setShowCompareModal(false)} className="mt-4 text-[#1E3A8A] font-bold hover:underline">Tiếp tục mua sắm</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Home;
