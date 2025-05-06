import { create } from "zustand";
import { CommentType } from "@/types/tables/commentType";
import { EmpathyType } from "@/types/tables/empathyType";

// 스토어 상태 타입 정의
interface StoreType {
  comments: CommentType[];
  empathies: EmpathyType[];

  setComments: (comments: CommentType[]) => void;
  setEmpathies: (empathies: EmpathyType[]) => void;

  //   createComment: (comment: CommentType) => Promise<void>;
  //   createEmpathy: (empathy: EmpathyType) => Promise<void>;
}

// 스토어 생성
export const useRollingPaperStore = create<StoreType>((set) => ({
  comments: [],
  empathies: [],

  setComments: (comments: CommentType[]) => set({ comments }),
  setEmpathies: (empathies: EmpathyType[]) => set({ empathies }),
}));
