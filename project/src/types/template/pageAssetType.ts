import { TextConfettiPropsType } from "@/components/common/TextConfetti";

export type PageAssetObjectType = {
  particle?: ParticleAssetType | null;
  rollingPaper?: RollingPaperAssetType | null;
  backgroundMusic?: BackgroundMusicAssetType | null;
} | null;

export type PageAssetVariantType = "particle" | "rollingPaper" | "backgroundMusic";
export type PageAssetContentType = ParticleAssetType | RollingPaperAssetType | BackgroundMusicAssetType;

export type ParticleAssetType = {
  isActive: boolean;
  textConfettiProps: TextConfettiPropsType;
};

export type ParticleAssetInputType = {
  isActive: boolean;
  text: string;
  size: 10 | 20 | 30 | 40 | 50;
  speed: 1 | 2 | 3;
  emitterDirectionVariant: "top" | "right" | "bottom" | "left" | "top-cross" | "bottom-cross";
};

export type RollingPaperAssetType = {
  isActive: boolean;
  color: string;
};

export type BackgroundMusicAssetType = {
  isActive: boolean;
  musicSrc: string;
};
