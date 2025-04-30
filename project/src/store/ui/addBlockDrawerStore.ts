import { BlockContentType, BlockVariantType } from "@/types/template/blockType";
import { PageAssetVariantType } from "@/types/template/pageAssetType";
import { BlockType } from "@/types/template/blockType";
import { create } from "zustand";

type Anchor = "top" | "left" | "bottom" | "right";

interface StoreType {
  // 상태
  variant: BlockVariantType | PageAssetVariantType | null;
  anchor: Anchor;
  isOpen: boolean;

  editMode: boolean;
  editTargetBlockIndex: number;
  editTargetBlockData: BlockType | null;

  blockEditorState: BlockContentType | null;

  // 액션
  setVariant: (variant: BlockVariantType | PageAssetVariantType) => void;
  setAnchor: (anchor: Anchor) => void;
  setIsOpen: (isOpen: boolean) => void;
  setAllState: (variant: BlockVariantType | PageAssetVariantType, anchor: Anchor, isOpen: boolean) => void;

  setEditMode: (editMode: boolean) => void;
  setEditTargetBlockIndex: (editTargetBlockIndex: number) => void;
  setEditTargetBlockData: (editTargetBlockData: BlockType | null) => void;

  setBlockEditorState: (blockEditorState: BlockContentType) => void;
}

export const useAddBlockDrawerStore = create<StoreType>((set) => ({
  // 상태
  variant: null,
  anchor: "top",
  isOpen: false,

  editTargetBlockIndex: 0,
  editMode: false,
  editTargetBlockData: null,

  blockEditorState: null,

  // 액션
  setVariant: (variant: BlockVariantType | PageAssetVariantType) => set({ variant }),
  setAnchor: (anchor: Anchor) => set({ anchor }),
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  setAllState: (variant: BlockVariantType | PageAssetVariantType, anchor: Anchor, isOpen: boolean) =>
    set({ variant, anchor, isOpen }),

  setEditMode: (editMode: boolean) => set({ editMode }),
  setEditTargetBlockIndex: (editTargetBlockIndex: number) => set({ editTargetBlockIndex }),
  setEditTargetBlockData: (editTargetBlockData: BlockType | null) => set({ editTargetBlockData }),

  setBlockEditorState: (blockEditorState: BlockContentType) => set({ blockEditorState }),
}));
