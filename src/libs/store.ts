import create from "zustand";

import en from "@/i18n/en";
import ja from "@/i18n/ja";

type StoreProps = {
  language: any;
  setDetermined: () => void;
  setLanguage: (newLanguage: string) => void;
};

export const useStore = create<StoreProps>((set, get) => ({
  mounted: false,
  language: {
    determined: false,
    locale: "en",
    t: en,
  },
  setDetermined: () => {
    set((state) => ({
      language: {
        ...state.language,
        determined: true,
      },
    }));
  },
  setLanguage: (newLanguage) => {
    const newT = newLanguage === "ja" ? ja : en;
    return (
      set((state) => ({
        language: {
          ...state.language,
          locale: newLanguage,
          t: newT,
        },
      })),
      { name: "HomePage" }
    );
  },
}));
