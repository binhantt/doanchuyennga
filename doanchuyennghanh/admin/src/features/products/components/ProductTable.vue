<template>
  <TableRow>
    <TableCol>
      <input
        type="checkbox"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      />
    </TableCol>

    <TableCol>
      <div class="flex items-center gap-3">
        <img
          class="w-10 h-10 rounded-md object-cover"
          :src="product.imageUrl"
          :alt="product.name"
        />
        <span class="font-medium text-gray-900">{{ product.name }}</span>
      </div>
    </TableCol>

    <TableCol>{{ product.sku }}</TableCol>
    <TableCol>{{ product.category }}</TableCol>

    <TableCol>
      <span
        :class="product.stock < 10 ? 'text-red-500 font-medium' : 'text-gray-900'"
      >
        {{ product.stock > 0 ? `${product.stock} trong kho` : 'Hết hàng' }}
      </span>
    </TableCol>

    <TableCol class="font-medium text-gray-900">{{ product.price }}</TableCol>

    <TableCol>
      <ProductStatusBadge :status="product.status" />
    </TableCol>

    <TableCol align="center">
      <button class="text-gray-500 hover:text-gray-800">
        <MoreVerticalIcon class="w-5 h-5" />
      </button>
    </TableCol>
  </TableRow>
</template>

<script setup lang="ts">
import type { Product } from "../index";
import TableRow from "../../../components/common/Row.vue";
import TableCol from "../../../components/common/Col.vue";
import ProductStatusBadge from "./ProductStatusBadge.vue";

</script>
