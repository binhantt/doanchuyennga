import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { servicesAPI } from '@/api/services'
import type { Service, CreateServiceForm, Category, ServiceFilters } from '@/types/services'
import { toast } from 'vue3-toastify'

export const useServicesStore = defineStore('services', () => {
  // State
  const services = ref<Service[]>([])
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const filters = ref<ServiceFilters>({})

  // Getters
  const filteredServices = computed(() => {
    let result = services.value

    if (filters.value.category_id) {
      result = result.filter(service => service.category_id === filters.value.category_id)
    }

    if (filters.value.is_available !== undefined) {
      result = result.filter(service => service.is_available === filters.value.is_available)
    }

    if (filters.value.search) {
      const search = filters.value.search.toLowerCase()
      result = result.filter(service => 
        service.name.toLowerCase().includes(search) ||
        service.description.toLowerCase().includes(search)
      )
    }

    return result
  })

  const availableServices = computed(() => 
    services.value.filter(service => service.is_available)
  )

  // Actions
  async function fetchServices() {
    try {
      loading.value = true
      services.value = await servicesAPI.getServices()
    } catch (error) {
      console.error('Error fetching services:', error)
      toast.error('Lỗi khi tải danh sách dịch vụ')
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    try {
      categories.value = await servicesAPI.getCategories()
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Lỗi khi tải danh sách danh mục')
    }
  }

  async function createService(serviceData: CreateServiceForm) {
    try {
      loading.value = true
      const newService = await servicesAPI.createService(serviceData)
      services.value.unshift(newService)
      toast.success('Tạo dịch vụ thành công!')
      return newService
    } catch (error: any) {
      console.error('Error creating service:', error)
      toast.error(error.response?.data?.error || 'Lỗi khi tạo dịch vụ')
      throw error
    } finally {
      loading.value = false
    }
  }

  async function updateService(id: number, serviceData: Partial<CreateServiceForm>) {
    try {
      loading.value = true
      const updatedService = await servicesAPI.updateService(id, serviceData)
      const index = services.value.findIndex(service => service.id === id)
      if (index !== -1) {
        services.value[index] = updatedService
      }
      toast.success('Cập nhật dịch vụ thành công!')
      return updatedService
    } catch (error: any) {
      console.error('Error updating service:', error)
      toast.error(error.response?.data?.error || 'Lỗi khi cập nhật dịch vụ')
      throw error
    } finally {
      loading.value = false
    }
  }

  async function deleteService(id: number) {
    try {
      loading.value = true
      await servicesAPI.deleteService(id)
      services.value = services.value.filter(service => service.id !== id)
      toast.success('Xóa dịch vụ thành công!')
    } catch (error: any) {
      console.error('Error deleting service:', error)
      toast.error(error.response?.data?.error || 'Lỗi khi xóa dịch vụ')
      throw error
    } finally {
      loading.value = false
    }
  }

  function setFilters(newFilters: ServiceFilters) {
    filters.value = { ...filters.value, ...newFilters }
  }

  function clearFilters() {
    filters.value = {}
  }

  function getCategoryName(categoryId: number): string {
    const category = categories.value.find(cat => cat.id === categoryId)
    return category?.name || 'Không xác định'
  }

  return {
    // State
    services,
    categories,
    loading,
    filters,
    
    // Getters
    filteredServices,
    availableServices,
    
    // Actions
    fetchServices,
    fetchCategories,
    createService,
    updateService,
    deleteService,
    setFilters,
    clearFilters,
    getCategoryName
  }
})