<template>
     <a-row  :gutter="[16, 16]" class="p-6 bg-gray-50  ">
        <stats-cards class="mb-4" />
       <order class="mb-4" />
       <charts class="mb-4" />
     </a-row>
</template>
<script setup>
import Order from '../components/Order.vue'
import Charts from '../components/Charts.vue'
import StatsCards from '../components/StatsCards.vue'
</script>
