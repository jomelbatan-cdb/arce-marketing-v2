import { create } from "zustand";
import { Variation } from "@/types";

interface VariationStore {
  variation: Variation | null;
  setVariation: (item: Variation | null) => void;
  clearVariation: () => void;
}

export const useVariationStore = create<VariationStore>((set) => ({
  variation: null,

  setVariation: (item) => set({ variation: item }),

  clearVariation: () => set({ variation: null }),
}));
