import { BlockType } from "@/types/template/blockType";
import { PageAssetContentType, PageAssetObjectType, PageAssetVariantType } from "@/types/template/pageAssetType";
import { TemplateType } from "@/types/template/templateType";
import { create } from "zustand";

interface StoreType {
  // 상태
  template: {
    pageAssets: PageAssetObjectType;
    blocks: BlockType[];
  };

  // 페이지 에셋 관련 액션
  setPageAsset: (name: PageAssetVariantType, content: PageAssetContentType) => void;

  // 블록 관련 액션
  addBlock: (block: BlockType) => void;
  deleteBlock: (index: number) => void;
  setTemplateBlocks: (templateBlocks: BlockType[]) => void;
}

// 초기 템플릿
const initialTemplate: TemplateType = {
  id: "",
  name: "",
  pageAssets: {
    particle: null,
    rollingPaper: null,
    backgroundMusic: null,
  },
  blocks: [],
};

export const useMakeTemplateStore = create<StoreType>((set) => ({
  // 상태
  template: initialTemplate,

  
  // 액션(페이지 에셋)
  // 페이지 에셋 설정
  setPageAsset: (name, content) =>
    set((state) => ({ template: { ...state.template, [name]: content } })),

  // 액션(블록)
  // 액션(블록)
  // 블록 추가
  addBlock: (block: BlockType) =>
    set((state) => ({ template: { ...state.template, blocks: [...state.template.blocks, block] } })),

  // 블록 삭제
  deleteBlock: (index: number) =>
    set((state) => ({ template: { ...state.template, blocks: state.template.blocks.filter((_, i) => i !== index) } })),

  // 블록 설정
  setTemplateBlocks: (templateBlocks: BlockType[]) =>
    set((state) => ({ template: { ...state.template, blocks: templateBlocks } })),
}));
