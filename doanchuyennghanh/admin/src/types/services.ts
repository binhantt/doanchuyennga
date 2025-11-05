export interface Service {
  id: number
  name: string
  description: string
  price: number
  category_id: number
  image_url: string
  is_available: boolean
  created_at?: string
  updated_at?: string
  category_name?: string
}

export interface CreateServiceForm {
  name: string
  description: string
  price: number
  category_id: number
  image_url: string
  is_available: boolean
}

export interface UpdateServiceForm extends Partial<CreateServiceForm> {
  id: number
}

export interface Category {
  id: number
  name: string
  description?: string
}

export interface ServiceFilters {
  category_id?: number
  is_available?: boolean
  search?: string
}