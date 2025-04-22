"use client";

import { mixinContainer } from "@/styles/mixins";
import {
  AddCircleOutlineRounded,
  CalendarMonthRounded,
  CloseRounded,
  GifRounded,
  ImageRounded,
  InsertLinkRounded,
  PhotoLibraryRounded,
  SplitscreenRounded,
  TextFormatRounded,
  VideocamRounded,
} from "@mui/icons-material";
import { Box, Button, Fade, Stack, Typography } from "@mui/material";

import { styled } from "@mui/material";
import AddBlockDrawer from "./drawer/AddBlockDrawer";
import { useAddBlockDrawerStore } from "@/store";
import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import TextBlock from "../block/TextBlock";
import React, { useState } from "react";
import { BlockVariantType } from "@/types/template/blockType";
import CalenderBlock from "../block/CalenderBlock";
import ImageBlock from "../block/ImageBlock";
import VideoBlock from "../block/VideoBlock";
import GifBlock from "../block/GifBlock";
import GalleryBlock from "../block/GalleryBlock";
import SpaceBlock from "../block/SpaceBlock";

const TemplatesMakeContainer = () => {
  ////////////////////////////////////////////////// Store
  // AddBlockDrawerStore

  // MakeTemplateStore
  const { templateBlocks } = useMakeTemplateStore();

  ////////////////////////////////////////////////// function

  // 블록 렌더링
  const renderBlocks = () => {
    return templateBlocks.map((el, index) => {
      return (
        <React.Fragment key={index}>
          {el.variant === "space" && <SpaceBlock blockData={el.content} />}
          {el.variant === "text" && <TextBlock blockData={el.content} />}
          {el.variant === "calendar" && <CalenderBlock blockData={el.content} />}
          {el.variant === "image" && <ImageBlock blockData={el.content} />}
          {el.variant === "gif" && <GifBlock blockData={el.content} />}
          {el.variant === "video" && <VideoBlock blockData={el.content} />}
          {el.variant === "gallery" && <GalleryBlock blockData={el.content} />}
          {/* {el.variant === "link" && <LinkBlock blockData={el.content} />} */}
        </React.Fragment>
      );
    });
  };

  return (
    <Container>
      <Typography variant="h5">템플릿 만들기</Typography>
      <AddBlockDrawer />

      {renderBlocks()}

      <AddBlockButton />
    </Container>
  );
};

export default TemplatesMakeContainer;

////////////////////////////// 하위 컴포넌트 //////////////////////////////
const AddBlockButton = () => {
  const { setAllState: setAddBlockDrawerState } = useAddBlockDrawerStore();
  const [isFadeShow, setIsFadeShow] = useState(false);

  const handleOpenDrawer = (variant: BlockVariantType) => {
    setAddBlockDrawerState(variant, "top", true);
    setIsFadeShow(false);
  };

  const buttons: { variant: BlockVariantType; icon: React.ReactNode }[] = [
    {
      variant: "space",
      icon: <SplitscreenRounded />,
    },
    {
      variant: "text",
      icon: <TextFormatRounded />,
    },
    {
      variant: "calendar",
      icon: <CalendarMonthRounded />,
    },
    {
      variant: "image",
      icon: <ImageRounded />,
    },
    {
      variant: "gif",
      icon: <GifRounded />,
    },
    {
      variant: "video",
      icon: <VideocamRounded />,
    },
    {
      variant: "link",
      icon: <InsertLinkRounded />,
    },
    {
      variant: "gallery",
      icon: <PhotoLibraryRounded />,
    },
  ];

  return (
    <AddBlockButtonContainer>
      <Fade in={isFadeShow}>
        <MenuButtonContainer>
          {buttons.map((el, index) => (
            <MenuButton onClick={() => handleOpenDrawer(el.variant)} key={index} variant="outlined" endIcon={el.icon} />
          ))}
        </MenuButtonContainer>
      </Fade>

      <Button
        onClick={() => setIsFadeShow(!isFadeShow)}
        variant="outlined"
        fullWidth
        endIcon={isFadeShow ? <CloseRounded /> : <AddCircleOutlineRounded />}
      >
        {isFadeShow ? "취소" : "블럭 생성"}
      </Button>
    </AddBlockButtonContainer>
  );
};

const AddBlockButtonContainer = styled(Stack)`
  row-gap: 8px;
`;

const MenuButtonContainer = styled(Stack)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
`;

const MenuButton = styled(Button)`
  width: 32px;
  height: 32px;
  min-width: 32px;
  max-width: 32px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  padding: 0;

  & .MuiButton-icon {
    margin: 0;
  }
`;

////////////////////////////// 스타일 컴포넌트 //////////////////////////////
const Container = styled(Box)`
  ${mixinContainer()}
`;
