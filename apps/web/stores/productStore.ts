import { create } from "zustand";
import { Product } from "@/types";

interface ProductStore {
  product: Product | null;
  setProduct: (item: Product | null) => void;
  clearProduct: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  product: null,

  setProduct: (item) => set({ product: item }),

  clearProduct: () => set({ product: null }),
}));
