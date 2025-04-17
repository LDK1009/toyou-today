import { Dayjs } from "dayjs";

export type BlockType =
  | { variant: "text"; content: TextBlockType }
  | { variant: "calendar"; content: CalendarBlockType }
  | { variant: "image"; content: ImageBlockType }
  | { variant: "video"; content: VideoBlockType }
  | { variant: "link"; content: LinkBlockType };

export type BlockVariantType = "text" | "calendar" | "image" | "video" | "link" | "button";

export type TextBlockType = {
  textAlign: "left" | "center" | "right";
  fontSize: 1 | 2 | 3 | 4 | 5;
  fontWeight: "normal" | "bold";
  animation: "none" | "fadeInToLeft" | "fadeInToRight" | "fadeInToTop" | "fadeInToBottom" | "rotate" | "typing";
  color: string;
  text: string;
};

// 다른 블록 타입들도 정의해야 합니다
export type CalendarBlockType = {
  date: Dayjs;
};

export type ImageBlockType = {
  imageUrl: string;
  altText: string;
  caption: string;
  link: string;
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
