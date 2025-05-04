import { create } from "zustand";
import { TemplateType } from "@/types/template/templateType";
import { deleteTemplate, readTemplateByMakerId } from "@/service/tables/templates";

// 스토어 상태 타입 정의
interface StoreType {
  pageList: TemplateType[];

  // 액션
  fetchPageList: () => Promise<void>;
  deletePage: (id: string) => Promise<void>;
}

// 스토어 생성
export const useMyPageListStore = create<StoreType>((set) => ({
  pageList: [],

  // 템플릿 조회
  fetchPageList: async () => {
    const { data, error } = await readTemplateByMakerId();

    if (error) {
      return;
    }

    set({ pageList: data || [] });
  },

  // 템플릿 삭제
  deletePage: async (id: string) => {
    const { error } = await deleteTemplate(id);

    if (error) {
      return;
    }

    set((state) => ({
      pageList: state.pageList.filter((template) => template.id !== id),
    }));
  },
}));
