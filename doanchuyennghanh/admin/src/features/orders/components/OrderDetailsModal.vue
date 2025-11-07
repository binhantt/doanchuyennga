<template>
  <Modal
    :open="visible"
    title="Chi tiết đơn hàng"
    width="800px"
    @cancel="$emit('close')"
  >
    <template #footer>
      <div class="flex justify-end gap-2">
        <Button @click="$emit('close')">Đóng</Button>
        <Button type="primary" @click="$emit('print')" :loading="printLoading">
          <PrinterOutlined /> In đơn hàng
        </Button>
      </div>
    </template>
    
    <div v-if="order" class="space-y-4">
      <Descriptions title="Thông tin đơn hàng" :column="2" bordered>
        <DescriptionsItem label="Mã đơn hàng">#{{ order.id }}</DescriptionsItem>
        <DescriptionsItem label="Trạng thái">
          <Tag :color="getStatusColor(order.status)">
            {{ getStatusText(order.status) }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="Ngày sự kiện">{{ formatDate(order.event_date) }}</DescriptionsItem>
        <DescriptionsItem label="Số khách">{{ order.guest_count }} người</DescriptionsItem>
        <DescriptionsItem label="Loại đơn hàng">{{ getOrderTypeText(order.order_type) }}</DescriptionsItem>
        <DescriptionsItem label="Ghi chú" :span="2">{{ order.notes || 'Không có' }}</DescriptionsItem>
      </Descriptions>

      <Descriptions title="Thông tin khách hàng" :column="2" bordered>
        <DescriptionsItem label="Tên khách hàng">{{ order.username }}</DescriptionsItem>
        <DescriptionsItem label="Email">{{ order.email }}</DescriptionsItem>
        <DescriptionsItem label="Số điện thoại">{{ order.phoneNumber }}</DescriptionsItem>
        <DescriptionsItem label="Địa chỉ khách hàng">{{ order.customer_address || 'Chưa cập nhật' }}</DescriptionsItem>
      </Descriptions>

      <Descriptions title="Thông tin địa điểm tổ chức" :column="1" bordered>
        <DescriptionsItem label="Địa chỉ tổ chức">{{ order.event_address || 'Chưa cập nhật' }}</DescriptionsItem>
      </Descriptions>

      <Descriptions title="Chi tiết chi phí" :column="1" bordered>
        <DescriptionsItem label="Gói cưới" v-if="order.wedding_package_name">
          <div class="flex justify-between">
            <span>{{ order.wedding_package_name }}</span>
            <span class="font-medium">{{ formatCurrency(weddingPackagePrice) }}₫</span>
          </div>
        </DescriptionsItem>
        <DescriptionsItem label="Dịch vụ" v-if="order.service_name">
          <div class="flex justify-between">
            <span>{{ order.service_name }}</span>
            <span class="font-medium">{{ formatCurrency(servicePrice) }}₫</span>
          </div>
        </DescriptionsItem>
        <DescriptionsItem label="Món ăn" v-if="orderDishes.length > 0">
          <div class="space-y-2">
            <div v-for="dish in orderDishes" :key="dish.id" class="flex justify-between">
              <span>{{ dish.dish_name }} (x{{ dish.quantity }})</span>
              <span class="font-medium">{{ formatCurrency(dish.price * dish.quantity) }}₫</span>
            </div>
          </div>
        </DescriptionsItem>
        <DescriptionsItem label="Tổng cộng">
          <div class="flex justify-between font-semibold text-lg">
            <span>Tổng tiền</span>
            <span>{{ formatCurrency(order.total_amount) }}₫</span>
          </div>
        </DescriptionsItem>
        <DescriptionsItem label="Giảm giá" v-if="order.discount_amount > 0">
          <div class="flex justify-between text-red-500">
            <span>Voucher/Khuyến mãi</span>
            <span>-{{ formatCurrency(order.discount_amount) }}₫</span>
          </div>
        </DescriptionsItem>
        <DescriptionsItem label="Thành tiền">
          <div class="flex justify-between text-xl font-bold text-green-600 border-t pt-2">
            <span>Tổng thanh toán</span>
            <span>{{ formatCurrency(order.final_amount) }}₫</span>
          </div>
        </DescriptionsItem>
      </Descriptions>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { Modal, Tag, Descriptions, Button } from "ant-design-vue";
import { PrinterOutlined } from "@ant-design/icons-vue";
import { formatCurrency, formatDate, getStatusColor, getStatusText, getOrderTypeText } from '../utils/orderUtils';

const { Item: DescriptionsItem } = Descriptions;

interface Props {
  visible: boolean;
  order: any;
  orderDishes: any[];
  weddingPackagePrice: number;
  servicePrice: number;
  printLoading: boolean;
}

defineProps<Props>();
defineEmits<{
  close: [];
  print: [];
}>();
</script>