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
      // Call API update
      const updatedCategory = await Api.update(id, {
        name: data.name,
        image_url: data.image_url || '',
        category_id: data.category_id || 0,
      });

      if (updatedCategory) {
       
        const index = categories.value.findIndex(category => category.id === id);

        if (index !== -1) {
          categories.value[index] = updatedCategory;
        }
        console.log(updateCategory)
        message.success("Cập nhật danh mục thành công!");
        return true;
      }
    } catch (err) {
      console.error(err);
      message.error("Cập nhật danh mục thất bại");
      return false;
    }
  };
  const createCategory = async (data: Category) => {
    try {
      const response = await Api.create({
        name: data.name,
        image_url: data.image_url,
        category_id: data.category_id || 0
      });
      categories.value.push(response.data);
      message.success("Thêm danh mục thành công!");
      return true;
    } catch (err) {
      console.error('createCategory error:', err);
      message.error("Thêm danh mục thất bại");
      return false;
    }
  };

  const deleteById = async (id: string)  => {
    console.log(id)
    try {
      await Api.delete(id);     
      
      categories.value = categories.value.filter(cat =>cat.id !== id);
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
