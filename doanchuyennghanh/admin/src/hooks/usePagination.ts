// composables/usePagination.ts
import { ref, computed, watch, type Ref, unref } from "vue";
import { useRoute, useRouter } from "vue-router";

export function usePagination<T>(data: T[] | Ref<T[]>, defaultPageSize = 3) {
  const route = useRoute();
  const router = useRouter();

  // Chuẩn hóa data thành Ref
  const dataArray = ref(Array.isArray(data) ? data : unref(data)) as Ref<T[]>;
  const currentFromQuery = Number(route.query.tab) || 1;

  // Pagination state
  const pagination = ref({
    current: currentFromQuery,
    pageSize: defaultPageSize,
    total: dataArray.value.length,
    showSizeChanger: false, // ẩn chọn số lượng/trang nếu chỉ muốn hiển thị 3
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} của ${total} mục`,
  });

  // Computed data for current page
  const paginatedData = computed(() => {
    const start = (pagination.value.current - 1) * pagination.value.pageSize;
    const end = start + pagination.value.pageSize;
    return dataArray.value.slice(start, end);
  });

  // Watch for data changes
  watch(
    () => unref(data),
    (newData) => {
      dataArray.value = newData;
      pagination.value.total = newData.length;
      if (pagination.value.current > Math.ceil(newData.length / pagination.value.pageSize)) {
        pagination.value.current = 1;
      }
    },
    { immediate: true, deep: true }
  );

  // Watch khi route thay đổi (ví dụ người dùng đổi tab bằng tay)
  watch(
    () => route.query.tab,
    (newTab) => {
      const page = Number(newTab) || 1;
      if (page !== pagination.value.current) {
        pagination.value.current = page;
      }
    }
  );

  // Hàm chuyển trang + cập nhật URL
  const handlePageChange = (page: number, pageSize?: number) => {
    pagination.value.current = page;
    if (pageSize) pagination.value.pageSize = pageSize;

    // Cập nhật URL query
    router.replace({
      path: route.path,
      query: { ...route.query, tab: String(page) },
    });
  };

  return {
    pagination,
    paginatedData,
    handlePageChange,
  };
}
