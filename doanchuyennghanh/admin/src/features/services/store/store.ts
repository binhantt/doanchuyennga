import { defineStore } from "pinia";
import { ref } from "vue";
import type { Service } from "../index";
import { Api } from "../api/api";
import { message } from "ant-design-vue";

export const useServicesStore = defineStore("services", () => {
  const services = ref<Service[]>([]);
  const loading = ref(false);

  const fetchServices = async () => {
    loading.value = true;
    try {
      const res = await Api.get();
      services.value = res.data;
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi tải danh sách dịch vụ");
    } finally {
      loading.value = false;
    }
  };

  const createService = async (data: Service) => {
    try {
      const response = await Api.create({
        name: data.name,
        description: data.description,
        price: data.price,
        category_id: data.category_id,
        image_url: data.image_url,
        is_available: data.is_available
      });
      services.value.push(response.data);
      message.success("Thêm dịch vụ thành công!");
      return true;
    } catch (err) {
      console.error('createService error:', err);
      message.error("Thêm dịch vụ thất bại");
      return false;
    }
  };

  const updateService = async (id: string, data: Service) => {
    try {
      const updatedService = await Api.update(id, {
        name: data.name,
        description: data.description,
        price: data.price,
        category_id: data.category_id,
        image_url: data.image_url,
        is_available: data.is_available
      });

      if (updatedService) {
        const index = services.value.findIndex(service => service.id === id);
        if (index !== -1) {
          services.value[index] = updatedService.data;
        }
        message.success("Cập nhật dịch vụ thành công!");
        return true;
      }
    } catch (err) {
      console.error(err);
      message.error("Cập nhật dịch vụ thất bại");
      return false;
    }
  };

  const deleteById = async (id: string) => {
    console.log(id);
    try {
      await Api.delete(id);
      services.value = services.value.filter(service => service.id !== id);
      message.success("Xóa dịch vụ thành công!");
    } catch (err) {
      console.error(err);
      message.error("Xóa dịch vụ thất bại");
    }
  };

  return {
    services,
    loading,
    fetchServices,
    createService,
    updateService,
    deleteById,
  };
});