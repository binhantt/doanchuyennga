// Utility function to create URL-friendly slug from Vietnamese text
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics (accents)
    .replace(/đ/g, 'd') // Replace đ with d
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// Function to format price in Vietnamese currency
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

// Function to get venue type label in Vietnamese
export const getVenueTypeLabel = (type: string): string => {
  const labels = {
    indoor: 'Trong nhà',
    outdoor: 'Ngoài trời',
    garden: 'Vườn',
    beach: 'Bãi biển'
  };
  return labels[type as keyof typeof labels] || type;
};