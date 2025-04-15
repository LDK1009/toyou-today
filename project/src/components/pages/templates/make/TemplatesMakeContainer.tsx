"use client";

import { mixinContainer } from "@/styles/mixins";
import { Box, Typography } from "@mui/material";

import { styled } from "@mui/material";

const TemplatesMakeContainer = () => {
  return (
    <Container>
      <Typography variant="h1">템플릿 만들기</Typography>
    </Container>
  );
};

export default TemplatesMakeContainer;

const Container = styled(Box)`
  ${mixinContainer()}
`;
