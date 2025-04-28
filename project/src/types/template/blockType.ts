import { Dayjs } from "dayjs";

export type BlockType =
  | { id?: number; variant: "space"; content: SpaceBlockType }
  | { id?: number; variant: "text"; content: TextBlockType }
  | { id?: number; variant: "calendar"; content: CalendarBlockType }
  | { id?: number; variant: "image"; content: ImageBlockType }
  | { id?: number; variant: "gallery"; content: GalleryBlockType }
  | { id?: number; variant: "gif"; content: GifBlockType }
  | { id?: number; variant: "video"; content: VideoBlockType }
  | { id?: number; variant: "link"; content: LinkBlockType }
  | { id?: number; variant: "quiz"; content: QuizBlockType };
export type BlockVariantType = "space" | "text" | "calendar" | "image" | "gallery" | "gif" | "video" | "link" | "quiz";
export type AnimationType = "none" | "fadeInToLeft" | "fadeInToRight" | "fadeInToTop" | "fadeInToBottom" | "rotate";
export type AlignType = "left" | "center" | "right";

// 스페이스 블록 타입
export type SpaceBlockType = {
  height: number;
};

// 텍스트 블록 타입
export type TextBlockType = {
  textAlign: AlignType;
  fontSize: 1 | 2 | 3 | 4 | 5;
  fontWeight: "normal" | "bold";
  animation: AnimationType;
  color: string;
  text: string;
};

// 캘린더 블록 타입
export type CalendarBlockType = {
  date: Dayjs;
};

// 이미지 블록 타입
export type ImageBlockType = {
  imgSrc: string;
  align: AlignType;
  animation: AnimationType;
};

// 갤러리 블록 타입
export type GalleryBlockItemType = {
  imgSrc: string;
  text: string;
};

// 갤러리 블록 타입
export type GalleryBlockType = GalleryBlockItemType[];

// 움짤 블록 타입
export type GifBlockType = {
  gifSrc: string;
  align: AlignType;
  animation: AnimationType;
};

// 비디오 블록 타입
export type VideoBlockType = {
  videoLink: string;
};

// 링크 블록 타입
export type LinkBlockType = {
  text: string;
  url: string;
  textColor: string;
  buttonColor: string;
};

// 퀴즈 블록 타입
export type QuizBlockType = {
  question: string;
  answer: string;
  color: string;
};
