<template>
  <TableRow>
    <TableCol>
      <Checkbox type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
    </TableCol>
    <TableCol>
      <div class="flex items-center gap-3">
        <span class="font-medium text-gray-900">{{ product.id }}</span>
      </div>
    </TableCol>
    <TableCol>
      <div class="flex items-center gap-3">
        <img class="w-10 h-10 rounded-md object-cover" :src="product.imageUrl" :alt="product.name" />
        <span class="font-medium text-gray-900">{{ product.name }}</span>
      </div>
    </TableCol>
    <TableCol>{{ product.description }}</TableCol>
    <TableCol>{{ product.category_name }}</TableCol>
    <TableCol>
      <span :class="[product.is_available ? 'text-green-600' : 'text-red-500','font-medium']">
        {{ product.is_available ? 'Đang bán' : 'Hết hàng' }}
      </span>
    </TableCol>
    <TableCol class="font-medium text-gray-900">{{ formatPrice(product.price) }}</TableCol>
    <TableCol align="center">
      <div class="flex justify-center gap-2">
        <BaseButton @click="onEdit"
          class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-transparent rounded-lg hover:bg-blue-100 active:scale-95 transition-all duration-150">
          <component :is="ICONS.Edit" class="w-4 h-4" />
          <span>Sửa</span>
        </BaseButton>
        <BaseButton @click="onDelete"
          class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 border border-transparent rounded-lg hover:bg-blue-100 active:scale-95 transition-all duration-150">
          <component :is="ICONS.Delete" class="w-4 h-4" />
          <span>Xóa</span>
        </BaseButton>
      </div>
    </TableCol>
  </TableRow>
</template>

<script setup lang="ts">
import { h } from "vue"; // import h để tạo vnode
import TableRow from "../../../components/common/table/Row.vue";
import TableCol from "../../../components/common/table/Col.vue";
import type { Product } from "../index";
import { ICONS } from "../../../components/constants/icon";
import { useProductsStore } from "../store/Store";
import { useModal } from "../hooks/UserModal"; 
import { toast } from "vue3-toastify";
import { deleteProduct } from "../api/productsApi";

const props = defineProps<{ product: Product }>();
const productsStore = useProductsStore(); 
const modalStore = useModal();

const onEdit = () => modalStore.openModal(props.product);

const onDelete = () => {
  const productId = props.product.id; // lưu closure
  toast(
    ({ toastInstance }) => {
      return h('div', { class: 'flex items-center gap-2' }, [
        h('span', `Bạn có chắc chắn muốn xóa sản phẩm ${productId}?`),
        h('button', {
          class: 'px-2 py-1 bg-red-500 text-white rounded',
          onClick: () => {
            productsStore.deleteById(productId);
            deleteProduct(productId);
            toast.success(`Xóa sản phẩm thành công! ${productId}`);
            toastInstance.dismiss(); // đóng toast xác nhận
          }
        }, 'Yes'),
        h('button', {
          class: 'px-2 py-1 bg-gray-300 rounded',
          onClick: () => toastInstance.dismiss() // hủy 
        }, 'No')
      ]);
    },
  );
};

function formatPrice(price: string | number) {
  const p = typeof price === "string" ? parseFloat(price) : price;
  return p.toLocaleString("vi-VN") + " ₫";
}
</script>
