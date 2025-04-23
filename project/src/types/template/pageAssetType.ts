export type PageAssetType = {
  particle: ParticleAssetType;
  rollingPaper: RollingPaperAssetType;
  backgroundMusic: BackgroundMusicAssetType;
};

export type PageAssetVariantType = "particle" | "rollingPaper" | "backgroundMusic";
export type PageAssetContentType = ParticleAssetType | RollingPaperAssetType | BackgroundMusicAssetType;

export type ParticleAssetType = {
  isActive: boolean;
  emoji: string;
  color: string;
};

export type RollingPaperAssetType = {
  isActive: boolean;
  color: string;
};

export type BackgroundMusicAssetType = {
  isActive: boolean;
  musicSrc: string;
};
