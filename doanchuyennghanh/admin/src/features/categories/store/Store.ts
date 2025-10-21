import { defineStore } from "pinia";
import { ref } from "vue";
import type { Category } from "../index";
import { Api } from "../api/api";
import { message } from "ant-design-vue";
export const useCategoriesStore = defineStore("categories", () => {
  const categories = ref<Category[]>([]);
  const loading = ref(false);
  const fetchCategories = async () => {
    loading.value = true;
    try {
      const res = await Api.get();
      categories.value = res.data;
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  };
const updateCategory = async (id: string, data: Category) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.image_url) {
      formData.append('image_url', data.image_url);
    }
    console.log('formData:', formData);
    await Api.update(id, formData);
    
    // Cập nhật local sau khi server thành công
    const index = categories.value.findIndex((c) => c.id === id);
    if (index !== -1) {
      categories.value[index] = { ...categories.value[index], ...data };
    }
    
    message.success("Cập nhật danh mục thành công!");
    return true;
  } catch (err) {
    console.error(err);
    message.error("Cập nhật danh mục thất bại");
    return false;
  }
};

const createCategory = async (data: Category) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.image_url) {
      formData.append('image_url', data.image_url);
    }
    const response = await Api.create(formData);
    
    // Thêm vào local sau khi server thành công
    categories.value.push(response.data);
    
    message.success("Thêm danh mục thành công!");
    return true;
  } catch (err) {
    console.error(err);
    message.error("Thêm danh mục thất bại");
    return false;
  }
};

  const deleteById = async (id: string) => {
    try {
      await Api.delete(id);
      categories.value = categories.value.filter((p) => p.id !== id);
      message.success("Xóa danh mục thành công!");
    } catch (err) {
      console.error(err);
      message.error("Xóa danh mục thất bại");
    }
  };

  return {
    categories,
    loading,
    fetchCategories,
    updateCategory,
    createCategory,
    deleteById,
  };
});
