import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import CustomerService from '../../../../services/CustomerService';
import CustomerAddressService from '../../../../services/CustomerAddressService';
import GHNService from '../../../../services/GHNService';
import { toast } from 'react-toastify';

const UpdateModal = ({ isOpen, setUpdateModal, customer, fetchCustomers }) => {
    const [updatedCustomer, setUpdatedCustomer] = useState(customer || {});
    const [addresses, setAddresses] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [newAddress, setNewAddress] = useState({
        provinceId: '',
        provinceName: '',
        districtId: '',
        districtName: '',
        wardId: '',
        wardName: '',
        addressDetail: ''
    });

    useEffect(() => {
        setUpdatedCustomer(customer || {});
        if (customer) {
            fetchCustomerAddresses(customer.id);
        }
        fetchProvinces();
    }, [customer]);

    const fetchCustomerAddresses = async (customerId) => {
        try {
            const response = await CustomerAddressService.getByCustomerId(customerId);
            setAddresses(response.data);
        } catch (error) {
            console.error("Error fetching customer addresses:", error);
        }
    };

    const fetchProvinces = async () => {
        try {
            const response = await GHNService.getProvinces();
            setProvinces(response.data);
        } catch (error) {
            console.error("Error fetching provinces:", error);
        }
    };

    const fetchDistricts = async (provinceId) => {
        try {
            const response = await GHNService.getDistrictsByProvince(provinceId);
            setDistricts(response.data);
        } catch (error) {
            console.error("Error fetching districts:", error);
        }
    };

    const fetchWards = async (districtId) => {
        try {
            const response = await GHNService.getWardsByDistrict(districtId);
            setWards(response.data);
        } catch (error) {
            console.error("Error fetching wards:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedCustomer(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            await CustomerService.update(customer.id, updatedCustomer);
            toast.success("Cập nhật khách hàng thành công!");
            fetchCustomers();
            setUpdateModal(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Cập nhật khách hàng thất bại!");
        }
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;

        if (name === 'provinceId') {
            const selectedProvince = provinces.find(p => p.ProvinceID == value);
            setNewAddress(prev => ({
                ...prev,
                provinceId: value,
                provinceName: selectedProvince?.ProvinceName || '',
                districtId: '',
                districtName: '',
                wardId: '',
                wardName: ''
            }));
            if (value) fetchDistricts(value);
        } else if (name === 'districtId') {
            const selectedDistrict = districts.find(d => d.DistrictID == value);
            setNewAddress(prev => ({
                ...prev,
                districtId: value,
                districtName: selectedDistrict?.DistrictName || '',
                wardId: '',
                wardName: ''
            }));
            if (value) fetchWards(value);
        } else if (name === 'wardId') {
            const selectedWard = wards.find(w => w.WardCode === value);
            setNewAddress(prev => ({
                ...prev,
                wardId: value,
                wardName: selectedWard?.WardName || ''
            }));
        } else {
            setNewAddress(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAddAddress = async () => {
        if (!newAddress.provinceId || !newAddress.districtId || !newAddress.wardId || !newAddress.addressDetail) {
            toast.error("Vui lòng điền đầy đủ thông tin địa chỉ!");
            return;
        }

        try {
            const response = await CustomerAddressService.create({
                customerId: customer.id,
                provinceId: newAddress.provinceId,
                provinceName: newAddress.provinceName,
                districtId: newAddress.districtId,
                districtName: newAddress.districtName,
                wardId: newAddress.wardId,
                wardName: newAddress.wardName,
                addressDetail: newAddress.addressDetail
            });
            setAddresses([...addresses, response.data]);
            toast.success("Thêm địa chỉ mới thành công!");
            setNewAddress({
                provinceId: '',
                provinceName: '',
                districtId: '',
                districtName: '',
                wardId: '',
                wardName: '',
                addressDetail: ''
            });
        } catch (error) {
            toast.error(error.response?.data?.message || "Thêm địa chỉ thất bại!");
        }
    };

    const handleRemoveAddress = async (addressId) => {
        try {
            await CustomerAddressService.delete(addressId);
            setAddresses(addresses.filter(address => address.id !== addressId));
            toast.success("Xóa địa chỉ thành công!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Xóa địa chỉ thất bại!");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                <div className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#1E3A8A] px-8 py-6 rounded-t-2xl relative overflow-hidden sticky top-0 z-10">
                    <div className="absolute inset-0 bg-white opacity-5"></div>
                    <h2 className="text-3xl font-bold text-white text-center relative z-10">Cập nhật khách hàng</h2>
                    <button className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2" onClick={() => setUpdateModal(false)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border-l-4 border-[#1E3A8A]">
                                <h3 className="text-lg font-bold text-[#1E3A8A]">Thông tin cá nhân</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold mb-2">Mã khách hàng</label>
                                    <input type="text" value={updatedCustomer.customerCode || ''} readOnly className="border-2 border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5 text-sm cursor-not-allowed" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold mb-2">Tên khách hàng</label>
                                    <input type="text" name="fullname" value={updatedCustomer.fullname || ''} onChange={handleChange} className="border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold mb-2">Tên đăng nhập</label>
                                    <input type="text" name="username" value={updatedCustomer.username || ''} onChange={handleChange} className="border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold mb-2">Số điện thoại</label>
                                    <input type="text" name="phone" value={updatedCustomer.phone || ''} onChange={handleChange} className="border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="text-sm font-semibold mb-2">Email</label>
                                    <input type="email" name="email" value={updatedCustomer.email || ''} onChange={handleChange} className="border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border-l-4 border-[#1E3A8A]">
                                <h3 className="text-lg font-bold text-[#1E3A8A]">Quản lý địa chỉ</h3>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 mb-4 border-2 border-dashed border-gray-300">
                                <div className="grid grid-cols-3 gap-2 mb-3">
                                    <select name="provinceId" value={newAddress.provinceId} onChange={handleAddressChange} className="border-2 border-gray-300 rounded-lg px-2 py-2 text-xs bg-white">
                                        <option value="">Tỉnh/Thành</option>
                                        {provinces.map(p => <option key={p.ProvinceID} value={p.ProvinceID}>{p.ProvinceName}</option>)}
                                    </select>
                                    <select name="districtId" value={newAddress.districtId} onChange={handleAddressChange} className="border-2 border-gray-300 rounded-lg px-2 py-2 text-xs bg-white" disabled={!newAddress.provinceId}>
                                        <option value="">Quận/Huyện</option>
                                        {districts.map(d => <option key={d.DistrictID} value={d.DistrictID}>{d.DistrictName}</option>)}
                                    </select>
                                    <select name="wardId" value={newAddress.wardId} onChange={handleAddressChange} className="border-2 border-gray-300 rounded-lg px-2 py-2 text-xs bg-white" disabled={!newAddress.districtId}>
                                        <option value="">Phường/Xã</option>
                                        {wards.map(w => <option key={w.WardCode} value={w.WardCode}>{w.WardName}</option>)}
                                    </select>
                                </div>
                                <input type="text" name="addressDetail" value={newAddress.addressDetail} onChange={handleAddressChange} className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full mb-3 text-sm" placeholder="Địa chỉ chi tiết..." />
                                <button className="w-full bg-[#1E3A8A] text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all" onClick={handleAddAddress}>Thêm địa chỉ</button>
                            </div>
                            <div className="space-y-2 max-h-[250px] overflow-y-auto">
                                {addresses.map(addr => (
                                    <div key={addr.id} className="bg-white border-2 border-gray-100 rounded-lg p-3 flex justify-between items-center group">
                                        <div>
                                            <div className="text-sm font-medium">{addr.addressDetail}</div>
                                            <div className="text-xs text-gray-500">{addr.wardName}, {addr.districtName}, {addr.provinceName}</div>
                                        </div>
                                        <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg" onClick={() => handleRemoveAddress(addr.id)}><FaTrashAlt /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4 mt-8 pt-6 border-t font-semibold">
                        <button onClick={() => setUpdateModal(false)} className="px-8 py-2 bg-gray-100 rounded-lg">Hủy</button>
                        <button onClick={handleUpdate} className="px-8 py-2 bg-[#1E3A8A] text-white rounded-lg">Cập nhật</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateModal;
