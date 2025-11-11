// Export all products features
export { useProductsStore } from './store/useProductsStore';
export { useProductsData } from './hooks/useProductsData';
export { productsApi } from './api/productsApi';
export * from './types';

// Components
export { default as ProductCard } from './components/ProductCard';
export { default as ProductSearch } from './components/ProductSearch';