"use client";

import { Box, Typography } from "@mui/material";

import { mixinContainer } from "@/styles/mixins";
import { styled } from "@mui/material";

const TemplatesContainer = () => {
  return (
    <Container>
      <Typography variant="h1">템플릿 페이지</Typography>
    </Container>
  );
};

export default TemplatesContainer;

const Container = styled(Box)`
  ${mixinContainer()}
`;
