import { BlockVariantType } from "@/types/template/blockType";
import { PageAssetVariantType } from "@/types/template/pageAssetType";
import { create } from "zustand";

type Anchor = "top" | "left" | "bottom" | "right";

interface StoreType {
  // 상태
  variant: BlockVariantType | PageAssetVariantType;
  anchor: Anchor;
  isOpen: boolean;
  // 액션
  setVariant: (variant: BlockVariantType | PageAssetVariantType) => void;
  setAnchor: (anchor: Anchor) => void;
  setIsOpen: (isOpen: boolean) => void;
  setAllState: (variant: BlockVariantType | PageAssetVariantType, anchor: Anchor, isOpen: boolean) => void;
}

export const useAddBlockDrawerStore = create<StoreType>((set) => ({
  // 상태
  variant: "text",
  anchor: "top",
  isOpen: false,
  // 액션
  setVariant: (variant: BlockVariantType | PageAssetVariantType) => set({ variant }),
  setAnchor: (anchor: Anchor) => set({ anchor }),
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
    setAllState: (variant: BlockVariantType | PageAssetVariantType, anchor: Anchor, isOpen: boolean) =>
    set({ variant, anchor, isOpen }),
}));
