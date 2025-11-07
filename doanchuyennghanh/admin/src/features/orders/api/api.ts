import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1/admin/orders";

export interface Order {
  id?: number;
  user_id?: number;
  event_date: string;
  guest_count: number;
  total_amount: number;
  discount_amount: number;
  final_amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  wedding_package_id?: number | null;
  service_id?: number | null;
  notes?: string | null;
  order_type?: 'dishes_only' | 'with_wedding_package' | 'with_service' | 'mixed';
  created_at?: string;
  updated_at?: string;
  // Thông tin join
  username?: string;
  email?: string;
  phoneNumber?: string;
  wedding_package_name?: string;
  service_name?: string;
}

export const getAll = async () => {
  const res = await axios.get(API_BASE_URL);
  return res.data;
};

export const getById = async (id: number) => {
  const res = await axios.get(`${API_BASE_URL}/${id}`);
  return res.data;
};

export const updateStatus = async (id: number, status: string) => {
  const res = await axios.put(`${API_BASE_URL}/update-status/${id}`, { status });
  return res.data;
};

export const getByStatus = async (status: string) => {
  const res = await axios.get(`${API_BASE_URL}/status/${status}`);
  return res.data;
};

export const getByDateRange = async (startDate: string, endDate: string) => {
  const res = await axios.get(`${API_BASE_URL}/date-range?startDate=${startDate}&endDate=${endDate}`);
  return res.data;
};

export const getStatistics = async () => {
  const res = await axios.get(`${API_BASE_URL}/statistics`);
  return res.data;
};

export const getPrintData = async (filters?: {
  status?: string;
  startDate?: string;
  endDate?: string;
  userId?: number;
}) => {
  const params = new URLSearchParams();
  if (filters?.status) params.append('status', filters.status);
  if (filters?.startDate) params.append('startDate', filters.startDate);
  if (filters?.endDate) params.append('endDate', filters.endDate);
  if (filters?.userId) params.append('userId', filters.userId.toString());
  
  const res = await axios.get(`${API_BASE_URL}/print?${params.toString()}`);
  return res.data;
};

export const checkVoucher = async (voucherCode: string, totalAmount?: number) => {
  const res = await axios.post(`${API_BASE_URL}/check-voucher`, {
    voucher_code: voucherCode,
    total_amount: totalAmount
  });
  return res.data;
};