import { create } from "zustand";
import { deleteBookmark, readBookmarks } from "@/service/tables/bookmarks";
import { TemplateType } from "@/types/template/templateType";
import { enqueueSnackbar } from "notistack";

// 스토어 상태 타입 정의
type BookmarkItemType = {
  id?: number;
  uid: string;
  templateId: number;
  createdAt?: string;
  templates: TemplateType;
};

interface StoreType {
  bookmarkList: BookmarkItemType[];

  // 액션
  fetchBookmarkList: () => Promise<void>;

  deleteBookmark: (id: number) => Promise<void>;
}

// 스토어 생성
export const useBookmarkListStore = create<StoreType>((set) => ({
  bookmarkList: [],

  // 템플릿 조회
  fetchBookmarkList: async () => {
    const { data, error } = await readBookmarks();

    if (error) {
      return;
    }

    set({ bookmarkList: data || [] });
  },

  deleteBookmark: async (templateId: number) => {
    set((state) => ({
      bookmarkList: state.bookmarkList.filter((el) => el.templateId !== templateId),
    }));

    const { error } = await deleteBookmark(templateId);

    if (error) {
      enqueueSnackbar("북마크 삭제 실패", { variant: "error" });
      return;
    }
  },
}));
