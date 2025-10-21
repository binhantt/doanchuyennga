// composables/usePagination.ts
import { ref, computed, watch, type Ref, unref } from "vue";

export function usePagination<T>(data: T[] | Ref<T[]>, defaultPageSize = 10) {
  // Chuẩn hóa data thành Ref
  const dataArray = ref(Array.isArray(data) ? data : unref(data)) as Ref<T[]>;

  // Pagination state
  const pagination = ref({
    current: 1,
    pageSize: defaultPageSize,
    total: dataArray.value.length,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} của ${total} mục`,
  });

  // Computed data for current page
  const paginatedData = computed(() => {
    const start = (pagination.value.current - 1) * pagination.value.pageSize;
    const end = start + pagination.value.pageSize;
    return dataArray.value.slice(start, end);
  });

  // Watch for data changes to update total
  watch(
    () => unref(data),
    (newData) => {
      dataArray.value = newData;
      pagination.value.total = newData.length;
      if (pagination.value.current > Math.ceil(newData.length / pagination.value.pageSize)) {
        pagination.value.current = 1; // reset page nếu current > total pages
      }
    },
    { immediate: true, deep: true }
  );

  // Function to handle page change
  const handlePageChange = (page: number, pageSize?: number) => {
    pagination.value.current = page;
    if (pageSize) pagination.value.pageSize = pageSize;
  };

  return {
    pagination,
    paginatedData,
    handlePageChange,
  };
}
