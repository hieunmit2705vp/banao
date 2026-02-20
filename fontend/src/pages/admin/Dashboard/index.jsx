import {
  FaShoppingCart, FaUsers, FaBoxOpen, FaMoneyBillWave,
  FaArrowUp, FaArrowDown, FaChartLine, FaClipboardList,
  FaTshirt, FaStar, FaFire
} from "react-icons/fa";

// ============== FAKE DATA ==============
const statsCards = [
  {
    title: "Doanh Thu Hôm Nay",
    value: "12.500.000₫",
    change: "+12.5%",
    isUp: true,
    icon: <FaMoneyBillWave />,
    color: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    title: "Đơn Hàng Mới",
    value: "48",
    change: "+8.2%",
    isUp: true,
    icon: <FaShoppingCart />,
    color: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    title: "Khách Hàng",
    value: "1,256",
    change: "+5.1%",
    isUp: true,
    icon: <FaUsers />,
    color: "from-violet-500 to-violet-600",
    bgLight: "bg-violet-50",
    textColor: "text-violet-600",
  },
  {
    title: "Sản Phẩm Tồn Kho",
    value: "3,842",
    change: "-2.3%",
    isUp: false,
    icon: <FaBoxOpen />,
    color: "from-amber-500 to-amber-600",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
  },
];

const recentOrders = [
  { id: "HD001", customer: "Nguyễn Văn A", date: "2025-06-24", total: "1.250.000₫", status: "Hoàn thành", statusColor: "bg-green-100 text-green-700" },
  { id: "HD002", customer: "Trần Thị B", date: "2025-06-24", total: "890.000₫", status: "Đang giao", statusColor: "bg-blue-100 text-blue-700" },
  { id: "HD003", customer: "Lê Văn C", date: "2025-06-23", total: "2.100.000₫", status: "Chờ xác nhận", statusColor: "bg-yellow-100 text-yellow-700" },
  { id: "HD004", customer: "Phạm Thị D", date: "2025-06-23", total: "560.000₫", status: "Hoàn thành", statusColor: "bg-green-100 text-green-700" },
  { id: "HD005", customer: "Hoàng Văn E", date: "2025-06-23", total: "1.780.000₫", status: "Đang giao", statusColor: "bg-blue-100 text-blue-700" },
  { id: "HD006", customer: "Vũ Thị F", date: "2025-06-22", total: "430.000₫", status: "Đã hủy", statusColor: "bg-red-100 text-red-700" },
];

const topProducts = [
  { id: 1, name: "Áo Thun Cổ Tròn Premium", sold: 300, revenue: "87.000.000₫", photo: "https://via.placeholder.com/60/1E3A8A/fff?text=AT" },
  { id: 2, name: "Áo Thun Oversize Logo", sold: 200, revenue: "70.000.000₫", photo: "https://via.placeholder.com/60/2563EB/fff?text=AO" },
  { id: 3, name: "Áo Tank Top Gym", sold: 180, revenue: "39.600.000₫", photo: "https://via.placeholder.com/60/3B82F6/fff?text=TT" },
  { id: 4, name: "Áo Hoodie Basic", sold: 150, revenue: "97.500.000₫", photo: "https://via.placeholder.com/60/1D4ED8/fff?text=HB" },
  { id: 5, name: "Áo Polo Classic Fit", sold: 120, revenue: "54.000.000₫", photo: "https://via.placeholder.com/60/1E40AF/fff?text=PC" },
];

const revenueData = [
  { month: "T1", value: 45 },
  { month: "T2", value: 52 },
  { month: "T3", value: 48 },
  { month: "T4", value: 61 },
  { month: "T5", value: 55 },
  { month: "T6", value: 72 },
  { month: "T7", value: 68 },
  { month: "T8", value: 80 },
  { month: "T9", value: 74 },
  { month: "T10", value: 85 },
  { month: "T11", value: 90 },
  { month: "T12", value: 95 },
];
const maxRevenue = Math.max(...revenueData.map((d) => d.value));

// ============== DASHBOARD PAGE ==============
export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black mb-2">Chào mừng trở lại! 👋</h1>
          <p className="text-blue-100 text-lg">Đây là tổng quan hoạt động cửa hàng hôm nay</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${card.bgLight} flex items-center justify-center ${card.textColor} text-xl group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${card.isUp ? "text-green-600" : "text-red-500"}`}>
                {card.isUp ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
                {card.change}
              </div>
            </div>
            <p className="text-2xl font-black text-gray-900 mb-1">{card.value}</p>
            <p className="text-sm text-gray-500 font-medium">{card.title}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart (Simulated bar chart) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <FaChartLine className="text-lg" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Doanh Thu Theo Tháng</h3>
                <p className="text-xs text-gray-400">Năm 2025 (triệu VNĐ)</p>
              </div>
            </div>
            <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">+18.2% YoY</span>
          </div>

          {/* Simple bar chart */}
          <div className="flex items-end gap-2 h-48 mt-4">
            {revenueData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-gray-500">{item.value}tr</span>
                <div
                  className="w-full bg-gradient-to-t from-[#1E3A8A] to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-blue-300 cursor-pointer group relative"
                  style={{ height: `${(item.value / maxRevenue) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.value} triệu
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-gray-400">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600">
              <FaStar className="text-lg" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Top Sản Phẩm</h3>
              <p className="text-xs text-gray-400">Bán chạy nhất tháng này</p>
            </div>
          </div>

          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${index === 0 ? "bg-yellow-400 text-white" : index === 1 ? "bg-gray-300 text-white" : index === 2 ? "bg-orange-400 text-white" : "bg-gray-100 text-gray-500"}`}>
                  {index + 1}
                </div>
                <img src={product.photo} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate group-hover:text-[#1E3A8A] transition-colors">{product.name}</p>
                  <p className="text-xs text-gray-400">
                    <span className="text-orange-500 font-semibold">{product.sold}</span> đã bán
                  </p>
                </div>
                <p className="text-xs font-bold text-[#1E3A8A] hidden sm:block">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <FaClipboardList className="text-lg" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Đơn Hàng Gần Đây</h3>
              <p className="text-xs text-gray-400">Cập nhật liên tục</p>
            </div>
          </div>
          <button className="text-sm font-bold text-[#1E3A8A] hover:underline">Xem tất cả →</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 pl-2">Mã đơn</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">Khách hàng</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">Ngày</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">Tổng tiền</th>
                <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="py-4 pl-2">
                    <span className="font-mono text-sm font-bold text-[#1E3A8A]">{order.id}</span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm font-semibold text-gray-800">{order.customer}</span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-gray-500">{order.date}</span>
                  </td>
                  <td className="py-4">
                    <span className="text-sm font-bold text-gray-800">{order.total}</span>
                  </td>
                  <td className="py-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${order.statusColor}`}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white text-center">
          <FaTshirt className="text-3xl mx-auto mb-2 opacity-80" />
          <p className="text-2xl font-black">156</p>
          <p className="text-xs text-blue-100 font-medium">Sản phẩm</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white text-center">
          <FaShoppingCart className="text-3xl mx-auto mb-2 opacity-80" />
          <p className="text-2xl font-black">1,248</p>
          <p className="text-xs text-emerald-100 font-medium">Đơn hoàn thành</p>
        </div>
        <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl p-5 text-white text-center">
          <FaUsers className="text-3xl mx-auto mb-2 opacity-80" />
          <p className="text-2xl font-black">856</p>
          <p className="text-xs text-violet-100 font-medium">Khách hàng</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-5 text-white text-center">
          <FaFire className="text-3xl mx-auto mb-2 opacity-80" />
          <p className="text-2xl font-black">98.5%</p>
          <p className="text-xs text-amber-100 font-medium">Tỷ lệ hài lòng</p>
        </div>
      </div>
    </div>
  );
}
