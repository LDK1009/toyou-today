"use client";

import { mixinContainer, mixinFlex } from "@/styles/mixins";
import { styled, Box } from "@mui/material";
import InstallPWA from "@/components/common/InstallPWA";

//////////////////////////////////////// Component ////////////////////////////////////////

const MainContainer = () => {
  //////////////////////////////////////// Render ////////////////////////////////////////

  return (
    <Container>
      <InstallPWA />
      프로젝트 초기화
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
  padding-top: 40px;
  padding-bottom: 40px;
`;
