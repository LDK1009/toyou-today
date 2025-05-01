"use client";

import { mixinContainer, mixinFlex } from "@/styles/mixins";
import { styled, Box, Button, Typography, Stack } from "@mui/material";
import { AddBoxRounded, DashboardRounded } from "@mui/icons-material";
import { useLoadingRouter } from "@/hooks/useLoadingRouter";
import InstallPWA from "@/components/common/InstallPWA";

//////////////////////////////////////// Component ////////////////////////////////////////

const MainContainer = () => {
  const { navigateWithLoading } = useLoadingRouter();
  //////////////////////////////////////// Render ////////////////////////////////////////
  return (
    <Container>
      {/* 앱 설치 프롬프트 */}
      <InstallPWA />
      <ButtonWrapper>
        <MakePageButton
          onClick={() => navigateWithLoading("/templates/make")}
          variant="outlined"
          endIcon={<AddBoxRounded />}
        >
          <ButtonText variant="h6">페이지 만들기</ButtonText>
        </MakePageButton>
        <StartWithTemplateButton
          onClick={() => navigateWithLoading("/templates")}
          variant="contained"
          endIcon={<DashboardRounded />}
        >
          <ButtonText variant="h6">템플릿으로 시작하기</ButtonText>
        </StartWithTemplateButton>
      </ButtonWrapper>
    </Container>
  );
};

export default MainContainer;

//////////////////////////////////////// Styles ////////////////////////////////////////

// 메인 컨테이너 스타일
const Container = styled(Box)`
  ${mixinContainer()};
  ${mixinFlex("column")};
  align-items: center;
`;

const ButtonWrapper = styled(Stack)`
  row-gap: 16px;
`;
const StartWithTemplateButton = styled(Button)`
  width: 300px;
  height: 150px;
  border-radius: 16px;
  color: ${({ theme }) => theme.palette.text.white};

  &:hover {
    color: ${({ theme }) => theme.palette.text.white};
  }

  & .MuiSvgIcon-root {
    font-size: 32px !important;
  }
`;

const ButtonText = styled(Typography)`
  font-weight: bold;
`;

const MakePageButton = styled(StartWithTemplateButton)`
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.main};

  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
