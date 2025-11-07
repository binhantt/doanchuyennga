<template>
  <div id="printOrderTemplate" style="display: none;">
    <div v-if="order" class="print-content">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold">HÓA ĐƠN ĐƠN HÀNG</h1>
        <h2 class="text-lg">NHHA RESTAURANT</h2>
        <p class="text-gray-600 mt-2">Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</p>
        <p class="text-gray-600">Điện thoại: 0123.456.789</p>
        <hr class="my-4">
      </div>
      
      <div class="order-info mb-4">
        <h3 class="font-bold mb-2">THÔNG TIN ĐƠN HÀNG</h3>
        <table class="info-table">
          <tr>
            <td><strong>Mã đơn hàng:</strong></td>
            <td>#{{ order.id }}</td>
          </tr>
          <tr>
            <td><strong>Ngày in:</strong></td>
            <td>{{ new Date().toLocaleDateString('vi-VN') }}</td>
          </tr>
          <tr>
            <td><strong>Ngày sự kiện:</strong></td>
            <td>{{ formatDate(order.event_date) }}</td>
          </tr>
          <tr>
            <td><strong>Số khách:</strong></td>
            <td>{{ order.guest_count }} người</td>
          </tr>
          <tr>
            <td><strong>Loại đơn hàng:</strong></td>
            <td>{{ getOrderTypeText(order.order_type) }}</td>
          </tr>
          <tr>
            <td><strong>Trạng thái:</strong></td>
            <td>{{ getStatusText(order.status) }}</td>
          </tr>
          <tr v-if="order.event_address">
            <td><strong>Địa chỉ tổ chức:</strong></td>
            <td>{{ order.event_address }}</td>
          </tr>
        </table>
      </div>

      <div class="customer-info mb-4">
        <h3 class="font-bold mb-2">THÔNG TIN KHÁCH HÀNG</h3>
        <table class="info-table">
          <tr>
            <td><strong>Tên khách hàng:</strong></td>
            <td>{{ order.username }}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{{ order.email }}</td>
          </tr>
          <tr>
            <td><strong>Số điện thoại:</strong></td>
            <td>{{ order.phoneNumber }}</td>
          </tr>
          <tr v-if="order.customer_address">
            <td><strong>Địa chỉ:</strong></td>
            <td>{{ order.customer_address }}</td>
          </tr>
        </table>
      </div>

      <div class="order-details mb-4">
        <h3 class="font-bold mb-2">CHI TIẾT ĐƠN HÀNG</h3>
        <table class="details-table">
          <thead>
            <tr>
              <th>Mô tả</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="order.wedding_package_name">
              <td>{{ order.wedding_package_name }}</td>
              <td class="text-center">1</td>
              <td class="text-right">{{ formatCurrency(weddingPackagePrice) }}₫</td>
              <td class="text-right">{{ formatCurrency(weddingPackagePrice) }}₫</td>
            </tr>
            <tr v-if="order.service_name">
              <td>{{ order.service_name }}</td>
              <td class="text-center">1</td>
              <td class="text-right">{{ formatCurrency(servicePrice) }}₫</td>
              <td class="text-right">{{ formatCurrency(servicePrice) }}₫</td>
            </tr>
            <tr v-for="dish in orderDishes" :key="dish.id">
              <td>{{ dish.dish_name }}</td>
              <td class="text-center">{{ dish.quantity }}</td>
              <td class="text-right">{{ formatCurrency(dish.price) }}₫</td>
              <td class="text-right">{{ formatCurrency(dish.price * dish.quantity) }}₫</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="total-section">
        <table class="total-table">
          <tr>
            <td><strong>Tổng cộng:</strong></td>
            <td class="text-right"><strong>{{ formatCurrency(order.total_amount) }}₫</strong></td>
          </tr>
          <tr v-if="order.discount_amount > 0">
            <td><strong>Giảm giá:</strong></td>
            <td class="text-right text-red-500"><strong>-{{ formatCurrency(order.discount_amount) }}₫</strong></td>
          </tr>
          <tr class="final-total">
            <td><strong>THÀNH TIỀN:</strong></td>
            <td class="text-right"><strong>{{ formatCurrency(order.final_amount) }}₫</strong></td>
          </tr>
        </table>
      </div>

      <div class="notes mt-4" v-if="order.notes">
        <h3 class="font-bold mb-2">GHI CHÚ</h3>
        <p>{{ order.notes }}</p>
      </div>

      <div class="footer mt-6 text-center">
        <p class="text-sm">Cảm ơn quý khách đã sử dụng dịch vụ!</p>
        <p class="text-sm">Mọi thắc mắc xin liên hệ: 0123.456.789</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency, formatDate, getStatusText, getOrderTypeText } from '../utils/orderUtils';

interface Props {
  order: any;
  orderDishes: any[];
  weddingPackagePrice: number;
  servicePrice: number;
}

defineProps<Props>();
</script>