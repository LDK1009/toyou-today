import { Dayjs } from "dayjs";

export type BlockType =
  | { variant: "text"; content: TextBlockType }
  | { variant: "calendar"; content: CalendarBlockType }
  | { variant: "image"; content: ImageBlockType }
  | { variant: "video"; content: VideoBlockType }
  | { variant: "link"; content: LinkBlockType };

export type BlockVariantType = "text" | "calendar" | "image" | "video" | "link" | "button";
export type AnimationType = "none" | "fadeInToLeft" | "fadeInToRight" | "fadeInToTop" | "fadeInToBottom" | "rotate";
export type AlignType = "left" | "center" | "right";

export type TextBlockType = {
  textAlign: AlignType;
  fontSize: 1 | 2 | 3 | 4 | 5;
  fontWeight: "normal" | "bold";
  animation: AnimationType;
  color: string;
  text: string;
};

// 다른 블록 타입들도 정의해야 합니다
export type CalendarBlockType = {
  date: Dayjs;
};

export type ImageBlockType = {
  imgSrc: string;
  align: AlignType;
  animation: AnimationType;
};

export type VideoBlockType = {
  videoUrl: string;
  caption: string;
  link: string;
};

export type LinkBlockType = {
  url: string;
  text: string;
};
