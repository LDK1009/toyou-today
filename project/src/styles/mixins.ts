import { css } from "@emotion/react";
import { Theme } from "@mui/material/styles";

const breakpoint = {
  xs: 0,
  // 모바일 범위
  sm: 600,
  // 태블릿 범위
  md: 900,
  // 노트북 범위
  lg: 1200,
  // 데스크톱 범위
  xl: 1536,
};

// 믹스인 정의
// Q&A. 믹스인(Mixin)이란 재사용 가능한 스타일 조각을 정의하여 여러 컴포넌트에서 공유하는 방식을 의미합니다.
// 전체 검색(ctrl + shift + F)에 mixinFlex를 검색해 믹스인 활용 예시를 찾아보세요.

// 컨테이너 믹스인 - 헤더와 바텀 내비게이션을 고려한 컨텐츠 영역
export const mixinContainer = () => css`
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  padding: 80px 16px;

  /* 모바일 화면에서는 헤더 높이가 56px로 줄어듦 */
  @media (max-width: ${breakpoint.sm - 1}px) {
    padding: 70px 16px;
  }
`;

// Flex 믹스인
export const mixinFlex = (
  direction: "row" | "column" = "row",
  justifyContent: string = "center",
  alignItems: string = "center",
  gap?: string
) => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  ${gap && `gap: ${gap}`};
`;

// 폰트 무게 믹스인
export const mixinFontWeight = (weight: "light" | "medium" | "bold" = "medium") => {
  const weights = {
    light: 300,
    medium: 500,
    bold: 700,
  };

  return css`
    font-weight: ${weights[weight]};
  `;
};

// 폰트 색상 믹스인
export const mixinFontColor = (theme: Theme, color: "black" | "gray" | "primary" | "secondary") => {
  if (color === "black")
    return css`
      color: ${theme.palette.text.primary};
    `;

  if (color === "gray")
    return css`
      color: ${theme.palette.text.secondary};
    `;

  if (color === "primary" || color === "secondary") {
    return css`
      color: ${theme.palette[color].main};
    `;
  }
};

// 테두리 둥글게 믹스인 - 레벨에 따른 설정
export const mixinBorderRadius = (level: "small" | "medium" | "large" | "circle" = "medium") => {
  const radiusMap = {
    small: "4px",
    medium: "8px",
    large: "16px",
    circle: "50%",
  };

  return css`
    border-radius: ${radiusMap[level]};
  `;
};

// 모바일에서만 보이는 믹스인
export const mixinOnlyMobile = () => css`
  @media (max-width: ${breakpoint.sm - 1}px) {
    display: none;
  }
`;

// PC에서만 보이는 믹스인
export const mixinOnlyPC = () => css`
  @media (min-width: ${breakpoint.xs}px) {
    display: none;
  }
`;

// 텍스트 말줄임표 믹스인 (한 줄)
export const mixinEllipsis = (width: string = "100%") => css`
  max-width: ${width};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 텍스트 말줄임표 믹스인 (여러 줄)
export const mixinMultilineEllipsis = (lines: number = 2) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 반응형 미디어 쿼리 믹스인
export const mixinMediaQuery = (breakpoint: number) => (styles: string) =>
  css`
    @media (max-width: ${breakpoint}px) {
      ${styles}
    }
  `;

// 그림자 효과 믹스인
export const mixinBoxShadow = (intensity: "light" | "medium" | "heavy" = "medium") => {
  const shadows = {
    light: "0 2px 5px rgba(0, 0, 0, 0.1)",
    medium: "0 4px 8px rgba(0, 0, 0, 0.15)",
    heavy: "0 8px 16px rgba(0, 0, 0, 0.2)",
  };

  return css`
    box-shadow: ${shadows[intensity]};
  `;
};

// 스크롤바 스타일링 믹스인
export const mixinScrollbar = (width: string, thumbColor: string, trackColor: string) => css`
  &::-webkit-scrollbar {
    width: ${width};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${thumbColor};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${trackColor};
  }
`;

// 스크롤바 숨기기 믹스인
export const mixinHideScrollbar = () => css`
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
    width: 0;
    background: transparent;
  }
`;

// 텍스트 그라데이션 믹스인
export const mixinTextGradient = (startColor: string = "#ff7e5f", endColor: string = "#feb47b") => css`
  background: linear-gradient(to right, ${startColor}, ${endColor});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;
