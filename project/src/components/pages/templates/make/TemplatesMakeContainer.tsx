"use client";

import { mixinContainer } from "@/styles/mixins";
import { AddCircleOutlineRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

import { styled } from "@mui/material";
import AddBlockDrawer from "./drawer/AddBlockDrawer";
import { useAddBlockDrawerStore } from "@/store";
import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import TextBlock from "./block/TextBlock";
import React from "react";
const TemplatesMakeContainer = () => {
  ////////////////////////////////////////////////// Store
  // AddBlockDrawerStore
  const { setAllState: setAddBlockDrawerState } = useAddBlockDrawerStore();
  // MakeTemplateStore
  const { templateBlocks } = useMakeTemplateStore();

  ////////////////////////////////////////////////// function
  const handleOpenDrawer = () => {
    setAddBlockDrawerState("text", "top", true);
  };

  const renderBlocks = () => {
    return templateBlocks.map((el, index) => {
      return (
        <React.Fragment key={index}>{el.variant === "text" && <TextBlock blockData={el.content} />}</React.Fragment>
      );
    });
  };

  return (
    <Container>
      <Typography variant="h5">템플릿 만들기</Typography>
      <AddBlockDrawer />

      {renderBlocks()}

      <Button onClick={handleOpenDrawer} variant="outlined" fullWidth endIcon={<AddCircleOutlineRounded />}>
        블럭 생성
      </Button>
    </Container>
  );
};

export default TemplatesMakeContainer;

const Container = styled(Box)`
  ${mixinContainer()}
`;
