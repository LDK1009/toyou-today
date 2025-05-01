import React from "react";
import { TemplateType } from "@/types/template/templateType";
import { Grid2, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material";
import { mixinFlex, mixinMultilineEllipsis, mixinTextGradient } from "@/styles/mixins";
import { shouldForwardProp } from "@/utils/mui";
import { CardGiftcardRounded } from "@mui/icons-material";
import { useLoadingRouter } from "@/hooks/useLoadingRouter";

const TemplateItem = ({ template }: { template: TemplateType }) => {
  const { navigateWithLoading } = useLoadingRouter();

  // 템플릿 색상 목록
  const colors = [
    "#FF9E7A", // 소프트 코랄 (선명하고 부드러움)
    "#FFDC5E", // 라이트 머스타드 옐로우 (시인성 좋음)
    "#A3E048", // 라임그린 계열 (상큼하고 밝음)
    "#62D2FA", // 맑은 하늘색 (가독성 좋음)
    "#6C91F2", // 라이트 블루-퍼플 (딥톤 파스텔)
    "#BFA2FF", // 선명한 연보라 (파스텔 감성 유지)
    "#FF9CE6", // 비비드 핑크 퍼플 (팝한 포인트)
    "#FF7F50", // 코랄 오렌지 (기존 유지)
  ];

  // ID를 기반으로 일관된 색상 인덱스 생성
  const colorIndex = typeof template?.id === "number" ? template.id % colors.length : 0;
  // 템플릿 테두리 색상 선택
  const borderColor = colors[colorIndex];
  // 템플릿 색상 3개 선택
  const backgroundColors = [
    colors[colorIndex],
    colors[(colorIndex + 1) % colors.length],
    colors[(colorIndex + 2) % colors.length],
  ];

  // 템플릿 상세 페이지로 이동
  function goToTemplate() {
    navigateWithLoading(`/templates/${template.id}`);
  }

  return (
    <Container size={6} borderColor={borderColor} onClick={goToTemplate}>
      <ColorBox backgroundColors={backgroundColors}>
        <CardGiftcardRounded />
      </ColorBox>
      <NameWrapper>
        <Name variant="body1" colors={backgroundColors}>
          {template.name}
        </Name>
      </NameWrapper>
    </Container>
  );
};

export default TemplateItem;

type ContainerProps = {
  borderColor: string;
};

const Container = styled(Grid2, { shouldForwardProp })<ContainerProps>`
  ${mixinFlex("column", "center", "center")}
  background-color: ${({ theme }) => theme.palette.background.default};
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 8px;
  cursor: pointer;
`;

type ColorBoxProps = {
  backgroundColors: string[];
};

const ColorBox = styled(Stack, { shouldForwardProp })<ColorBoxProps>`
  ${mixinFlex("column", "center", "center")}
  width: 100%;
  height: 150px;
  border-radius: 8px 8px 0px 0px;
  background: linear-gradient(
    -45deg,
    ${({ backgroundColors }) => backgroundColors[0]},
    ${({ backgroundColors }) => backgroundColors[1]},
    ${({ backgroundColors }) => backgroundColors[2]}
  );

  & .MuiSvgIcon-root {
    font-size: 50px;
    color: ${({ theme }) => theme.palette.text.white};
  }
`;

const NameWrapper = styled(Stack)`
  width: 100%;
  padding: 8px;
`;

type NameProps = {
  colors: string[];
};

const Name = styled(Typography)<NameProps>`
  ${mixinMultilineEllipsis(1)}
  ${({ colors }) => mixinTextGradient(colors[0], colors[1])}
  text-align: center;
`;
