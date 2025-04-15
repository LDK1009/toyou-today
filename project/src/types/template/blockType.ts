export type BlockType =
  | { variant: "text"; content: TextBlockType }
  | { variant: "calendar"; content: CalendarBlockType }
  | { variant: "image"; content: ImageBlockType }
  | { variant: "video"; content: VideoBlockType }
  | { variant: "link"; content: LinkBlockType }

export type BlockVariantType = "text" | "calendar" | "image" | "video" | "link" | "button";

export type TextBlockType = {
  text: string;
  fontSize: 1 | 2 | 3 | 4 | 5;
  color: string;
  fontWeight: "normal" | "bold";
  animation: "none" | "fadeIn" | "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight";
  textAlign: "left" | "center" | "right";
};

// 다른 블록 타입들도 정의해야 합니다
export type CalendarBlockType = {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
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

