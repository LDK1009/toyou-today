import { BlockType } from "@/types/template/blockType";
import { PageAssetContentType, PageAssetVariantType } from "@/types/template/pageAssetType";
import { MakeTemplateType } from "@/types/template/templateType";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 스토어 타입 정의
interface StoreType {
  ////////// 상태
  // 템플릿 상태
  template: MakeTemplateType;

  ////////// 페이지 에셋 관련 액션
  // 페이지 에셋 설정
  setPageAsset: (name: PageAssetVariantType, content: PageAssetContentType) => void;

  ////////// 블록 관련 액션
  // 블록 세팅
  setTemplateBlocks: (templateBlocks: BlockType[]) => void;
  // 블록 추가
  addBlock: (block: BlockType) => void;
  // 블록 수정
  updateBlock: (index: number, block: BlockType) => void;
  // 블록 삭제
  deleteBlock: (index: number) => void;
  // 블록 한 칸 위로 옮기기
  moveUpBlock: (targetBlockIndex: number) => void;
  // 블록 한 칸 아래로 옮기기
  moveDownBlock: (targetBlockIndex: number) => void;
}

// 템플릿 초기 상태값
const initialTemplate: MakeTemplateType = {
  name: "",
  makerId: "",
  pageAssets: {
    particle: null,
    rollingPaper: null,
    backgroundMusic: null,
  },
  blocks: [],
};

// 스토어 생성
export const useMakeTemplateStore = create(
  persist<StoreType>(
    (set) => ({
      ////////// 상태
      template: initialTemplate,

      ////////// 페이지 에셋 관련 액션
      // 페이지 에셋 설정
      setPageAsset: (name, content) =>
        set((state) => ({
          template: { ...state.template, pageAssets: { ...state.template.pageAssets, [name]: content } },
        })),

      ////////// 블록 관련 액션

      // 블록 세팅
      setTemplateBlocks: (templateBlocks: BlockType[]) =>
        set((state) => ({ template: { ...state.template, blocks: templateBlocks } })),

      // 블록 추가
      addBlock: (block: BlockType) =>
        set((state) => ({
          template: { ...state.template, blocks: [...state.template.blocks, { ...block, id: state.template.blocks.length }] },
        })),

      // 블록 수정
      updateBlock: (index, block) =>
        set((state) => ({
          template: { ...state.template, blocks: state.template.blocks.map((b, i) => (i === index ? block : b)) },
        })),

      // 블록 삭제
      deleteBlock: (targetBlockIndex: number) =>
        set((state) => ({
          template: { ...state.template, blocks: state.template.blocks.filter((_, i) => i !== targetBlockIndex) },
        })),

      // 블록 한 칸 위로 옮기기
      moveUpBlock: (targetBlockIndex: number) =>
        set((state) => {
          const prevTemplate = state.template;
          const prevBlocks = prevTemplate.blocks;

          // 마지막 블록일 경우 옮길 수 없음
          if (targetBlockIndex === 0) {
            return {
              template: prevTemplate,
            };
          }

          // 블록 옮기기
          return {
            template: {
              ...prevTemplate,
              blocks: prevBlocks.map((el, idx) => {
                // 임시 변수에 타겟 블록 저장
                const tempBlock = prevBlocks[targetBlockIndex];

                // 타겟 인덱스 위치에 윗 블록 대입
                if (idx === targetBlockIndex) {
                  return prevBlocks[idx - 1];
                }

                // 타겟 인덱스 윗 블록 위치에 타겟 블록 대입
                if (idx === targetBlockIndex - 1) {
                  return tempBlock;
                }

                return el;
              }),
            },
          };
        }),

      // 블록 한 칸 아래로 옮기기
      moveDownBlock: (targetBlockIndex: number) =>
        set((state) => {
          const prevTemplate = state.template;
          const prevBlocks = prevTemplate.blocks;

          // 마지막 블록일 경우 옮길 수 없음
          if (targetBlockIndex === prevBlocks.length - 1) {
            return {
              template: prevTemplate,
            };
          }

          // 블록 옮기기
          return {
            template: {
              ...prevTemplate,
              blocks: prevBlocks.map((el, idx) => {
                // 임시 변수에 타겟 블록 저장
                const tempBlock = prevBlocks[targetBlockIndex];

                // 타겟 인덱스 위치에 윗 블록 대입
                if (idx === targetBlockIndex) {
                  return prevBlocks[idx + 1];
                }

                // 타겟 인덱스 윗 블록 위치에 타겟 블록 대입
                if (idx === targetBlockIndex + 1) {
                  return tempBlock;
                }

                return el;
              }),
            },
          };
        }),
    }),
    {
      name: "makeTemplate-storage",
    }
  )
);
