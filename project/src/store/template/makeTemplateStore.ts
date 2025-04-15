import { BlockType } from "@/types/template/blockType";
import { create } from "zustand";

interface StoreType {
  // 상태
  templateBlocks: BlockType[];
  // 액션
  addBlock: (block: BlockType) => void;
  deleteBlock: (index: number) => void;
  setTemplateBlocks: (templateBlocks: BlockType[]) => void;
}

export const useMakeTemplateStore = create<StoreType>((set) => ({
  // 상태
  templateBlocks: [],
  // 액션
  addBlock: (block: BlockType) => set((state) => ({ templateBlocks: [...state.templateBlocks, block] })),
  deleteBlock: (index: number) => set((state) => ({ templateBlocks: state.templateBlocks.filter((_, i) => i !== index) })),
  setTemplateBlocks: (templateBlocks: BlockType[]) => set({ templateBlocks }),
}));
