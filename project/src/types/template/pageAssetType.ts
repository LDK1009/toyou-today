//////////////////////////////////////// 페이지 에셋 관련 타입 ////////////////////////////////////////
// 페이지 에셋 객체 타입
export type PageAssetObjectType = {
  particle?: ParticleAssetType | null;
  rollingPaper?: RollingPaperAssetType | null;
  backgroundMusic?: BackgroundMusicAssetType | null;
} | null;

// 페이지 에셋 속성 종류
export type PageAssetVariantType = "particle" | "rollingPaper" | "backgroundMusic";

// 페이지 에셋 콘텐츠 종류
export type PageAssetContentType = ParticleAssetType | RollingPaperAssetType | BackgroundMusicAssetType;

//////////////////////////////////////// 파티클 관련 타입 ////////////////////////////////////////
// 파티클 에셋 타입
export type ParticleAssetType = {
  isActive: boolean;
  textConfettiProps: TextConfettiPropsType;
};

// 파티클 에셋 입력 타입
export type ParticleAssetInputType = {
  isActive: boolean;
  text: string;
  size: 10 | 20 | 30 | 40 | 50;
  speed: 1 | 2 | 3;
  emitterDirectionVariant: "top" | "right" | "bottom" | "left" | "top-cross" | "bottom-cross";
};

//////////////////////////////////////// 텍스트 파티클 컴포넌트 관련 타입 ////////////////////////////////////////
// 텍스트 파티클 컴포넌트 프롭스 타입
export type TextConfettiPropsType = {
  particle: particleOptionsType;
  emitters: emitterOptionsType[];
};

// 파티클 옵션 타입
export type particleOptionsType = {
  text: string;
  size: [number, number];
  speed: [number, number];
};

// 에미터 옵션 타입
export type emitterOptionsType = {
  direction: "none" | "top" | "top-right" | "right" | "bottom-right" | "bottom" | "bottom-left" | "left" | "top-left";
  position: "center" | "top" | "top-right" | "right" | "bottom-right" | "bottom" | "bottom-left" | "left" | "top-left";
  repeatCount: number;
  duration: number | "infinity";
  delay: number;
  particleQuantity: number;
};


//////////////////////////////////////// 롤링페이퍼 관련 타입 ////////////////////////////////////////
// 롤링페이퍼 에셋 타입
export type RollingPaperAssetType = {
  id?: number;
  isActive: boolean;
  comments: RollingPaperAsset_CommentItemType[];
  empathies: RollingPaperAsset_EmpathyItemType[];
};

// 롤링페이퍼 댓글 아이템 타입
export type RollingPaperAsset_CommentItemType = {
  comment_id?: number;
  nickname: string;
  comment: string;
};

// 롤링페이퍼 공감 아이템 타입
export type RollingPaperAsset_EmpathyItemType = {
  empathy_id?: number;
  nickname: string;
  emoji: string;
};

//////////////////////////////////////// 배경음악 관련 타입 ////////////////////////////////////////
// 배경음악 에셋 타입
export type BackgroundMusicAssetType = {
  isActive: boolean;
  label: string;
  musicSrc: string;
};
