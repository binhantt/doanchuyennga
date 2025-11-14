import dayjs from 'dayjs';

export const formatCurrency = (value: number | string) => {
  return Number(value).toLocaleString('vi-VN');
};

export const formatDate = (date: string | null) => {
  if (!date) return '';
  return dayjs(date).format('DD/MM/YYYY');
};

export const getStatusColor = (status: string) => {
  const colors = {
    pending: 'orange',
    confirmed: 'blue',
    completed: 'green',
    cancelled: 'red'
  };
  return colors[status as keyof typeof colors] || 'default';
};

export const getStatusText = (status: string) => {
  const texts = {
    pending: 'Chờ xử lý',
    confirmed: 'Đã xác nhận',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy'
  };
  return texts[status as keyof typeof texts] || status;
};

export const getOrderTypeText = (type?: string) => {
  const texts = {
    dishes_only: 'Món lẻ',
    with_wedding_package: 'Gói cưới',
    with_service: 'Dịch vụ',
    mixed: 'Kết hợp'
  };
  return texts[type as keyof typeof texts] || 'Không xác định';
};

export const getNextStatus = (currentStatus: string) => {
  const statusFlow = {
    pending: 'confirmed',
    confirmed: 'completed',
    completed: 'completed',
    cancelled: 'cancelled'
  };
  return statusFlow[currentStatus as keyof typeof statusFlow] || 'pending';
};