import { create } from 'zustand';
import { WeddingPackage, Service, PackageSelection } from '../types';

interface WeddingStore {
  packages: WeddingPackage[];
  featuredPackages: WeddingPackage[];
  services: Service[];
  selection: PackageSelection;
  loading: boolean;
  error: string | null;
  
  // Actions
  setPackages: (packages: WeddingPackage[]) => void;
  setFeaturedPackages: (packages: WeddingPackage[]) => void;
  setServices: (services: Service[]) => void;
  selectPackage: (pkg: WeddingPackage) => void;
  toggleService: (service: Service) => void;
  clearSelection: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  calculateTotal: () => void;
}

export const useWeddingStore = create<WeddingStore>((set, get) => ({
  packages: [],
  featuredPackages: [],
  services: [],
  selection: {
    selectedPackage: null,
    selectedServices: [],
    totalPrice: 0,
  },
  loading: false,
  error: null,

  setPackages: (packages) => set({ packages }),
  
  setFeaturedPackages: (packages) => set({ featuredPackages: packages }),
  
  setServices: (services) => set({ services }),
  
  selectPackage: (pkg) => {
    set((state) => ({
      selection: {
        ...state.selection,
        selectedPackage: pkg,
      }
    }));
    get().calculateTotal();
  },
  
  toggleService: (service) => {
    set((state) => {
      const isSelected = state.selection.selectedServices.some(s => s.id === service.id);
      const selectedServices = isSelected
        ? state.selection.selectedServices.filter(s => s.id !== service.id)
        : [...state.selection.selectedServices, service];
      
      return {
        selection: {
          ...state.selection,
          selectedServices,
        }
      };
    });
    get().calculateTotal();
  },
  
  clearSelection: () => set({
    selection: {
      selectedPackage: null,
      selectedServices: [],
      totalPrice: 0,
    }
  }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  calculateTotal: () => {
    const { selection } = get();
    const packagePrice = selection.selectedPackage?.price || 0;
    const servicesPrice = selection.selectedServices.reduce((sum, service) => sum + service.price, 0);
    
    set((state) => ({
      selection: {
        ...state.selection,
        totalPrice: packagePrice + servicesPrice,
      }
    }));
  },
}));