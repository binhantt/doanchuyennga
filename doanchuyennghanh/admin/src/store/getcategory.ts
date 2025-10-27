import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api, type Category } from '../api/api'
import { message } from 'ant-design-vue'

export const useCategoryStore = defineStore('category', () => {
  // State
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const categoryOptions = computed(() => 
    categories.value.map(cat => ({
      label: cat.name,
      value: cat.id,
      icon: '📂'
    }))
  )

  const getCategoryById = computed(() => (id: string) => 
    categories.value.find(cat => cat.id === id)
  )

  const getCategoryName = computed(() => (id: string) => 
    categories.value.find(cat => cat.id === id)?.name || ''
  )

  // Actions
  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    
    try {
      const data = await api.getCategories()
      categories.value = data
      return data
    } catch (err: any) {
      error.value = err.message || 'Không thể tải danh mục'
      message.error('❌ Lỗi tải danh mục: ' + error.value)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createCategory = async (categoryData: Partial<Category>) => {
    try {
      const newCategory = await api.createCategory(categoryData)
      categories.value.push(newCategory)
      message.success('✅ Tạo danh mục thành công!')
      return newCategory
    } catch (err: any) {
      message.error('❌ Lỗi tạo danh mục: ' + (err.message || 'Vui lòng thử lại'))
      throw err
    }
  }

  const updateCategory = async (id: string, categoryData: Partial<Category>) => {
    try {
      const updatedCategory = await api.updateCategory(id, categoryData)
      const index = categories.value.findIndex(cat => cat.id === id)
      if (index !== -1) {
        categories.value[index] = updatedCategory
      }
      message.success('✅ Cập nhật danh mục thành công!')
      return updatedCategory
    } catch (err: any) {
      message.error('❌ Lỗi cập nhật danh mục: ' + (err.message || 'Vui lòng thử lại'))
      throw err
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      await api.deleteCategory(id)
      categories.value = categories.value.filter(cat => cat.id !== id)
      message.success('✅ Xóa danh mục thành công!')
    } catch (err: any) {
      message.error('❌ Lỗi xóa danh mục: ' + (err.message || 'Vui lòng thử lại'))
      throw err
    }
  }

  // Initialize
  const init = async () => {
    if (categories.value.length === 0) {
      await fetchCategories()
    }
  }

  return {
    // State
    categories,
    loading,
    error,
    
    // Getters
    categoryOptions,
    getCategoryById,
    getCategoryName,
    
    // Actions
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    init
  }
})