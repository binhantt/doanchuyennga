import { defineStore } from "pinia";
import { ref } from "vue";
import * as api from "../api/api";
import { message } from "ant-design-vue";

export interface WeddingPackage {
  id?: number;
  name: string;
  description?: string;
  price: number;
  duration_hours: number;
  max_guests: number;
  image_url?: string;
  is_available: boolean;
  created_at?: string;
  updated_at?: string;
}

export const useWeddingPackagesStore = defineStore("weddingPackages", () => {
  const packages = ref<WeddingPackage[]>([]);
  const loading = ref(false);

  const fetchPackages = async () => {
    loading.value = true;
    try {
      const response = await api.get();
      packages.value = response.data || [];
      console.log("✅ Lấy danh sách gói cưới thành công:", packages.value);
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách gói cưới:", error);
      message.error("Không thể tải danh sách gói cưới");
    } finally {
      loading.value = false;
    }
  };

  const createPackage = async (packageData: WeddingPackage) => {
    loading.value = true;
    try {
      const formData = new FormData();
      Object.entries(packageData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      const response = await api.create(formData);
      if (response.success) {
        await fetchPackages();
        message.success("Tạo gói cưới thành công!");
        return response;
      }
    } catch (error) {
      console.error("❌ Lỗi khi tạo gói cưới:", error);
      message.error("Có lỗi xảy ra khi tạo gói cưới");
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const updatePackage = async (packageData: WeddingPackage, index: number) => {
    loading.value = true;
    try {
      const response = await api.update(packageData);
      if (response.success) {
        packages.value[index] = { ...packages.value[index], ...packageData };
        message.success("Cập nhật gói cưới thành công!");
        return response;
      }
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật gói cưới:", error);
      message.error("Có lỗi xảy ra khi cập nhật gói cưới");
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const deleteById = async (id: number) => {
    loading.value = true;
    try {
      const response = await api.deleteId(id.toString());
      if (response.success) {
        packages.value = packages.value.filter(pkg => pkg.id !== id);
        message.success("Xóa gói cưới thành công!");
        return response;
      }
    } catch (error) {
      console.error("❌ Lỗi khi xóa gói cưới:", error);
      message.error("Có lỗi xảy ra khi xóa gói cưới");
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return {
    packages,
    loading,
    fetchPackages,
    createPackage,
    updatePackage,
    deleteById,
  };
});