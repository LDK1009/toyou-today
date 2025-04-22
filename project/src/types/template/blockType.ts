import { Dayjs } from "dayjs";

export type BlockType =
  | { variant: "space"; content: SpaceBlockType }
  | { variant: "text"; content: TextBlockType }
  | { variant: "calendar"; content: CalendarBlockType }
  | { variant: "image"; content: ImageBlockType }
  | { variant: "gallery"; content: GalleryBlockType }
  | { variant: "gif"; content: GifBlockType }
  | { variant: "video"; content: VideoBlockType }
  | { variant: "link"; content: LinkBlockType }
  | { variant: "quiz"; content: QuizBlockType };
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
  url: string;
  text: string;
  textColor: string;
  buttonColor: string;
};

// 퀴즈 블록 타입
export type QuizBlockType = {
  question: string;
  options: string[];
  answer: string;
};
