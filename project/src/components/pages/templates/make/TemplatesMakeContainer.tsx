"use client";

import { mixinContainer, mixinFlex, mixinHideScrollbar } from "@/styles/mixins";
import {
  AddCircleOutlineRounded,
  CalendarMonthRounded,
  CloseRounded,
  GifRounded,
  ImageRounded,
  InsertLinkRounded,
  PhotoLibraryRounded,
  QuizRounded,
  SplitscreenRounded,
  TextFormatRounded,
  VideocamRounded,
} from "@mui/icons-material";
import { Box, Button, Fade, Stack, Tooltip, Typography } from "@mui/material";

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
import LinkBlock from "../block/LinkBlock";
import QuizBlock from "../block/QuizBlock";
import { PageAssetVariantType } from "@/types/template/pageAssetType";

const TemplatesMakeContainer = () => {
  ////////////////////////////////////////////////// Store //////////////////////////////////////////////////
  // 템플릿 블록 스토어
  const { templateBlocks } = useMakeTemplateStore();

  ////////////////////////////////////////////////// function //////////////////////////////////////////////////
  // 블록 렌더링
  const renderBlocks = () => {
    return templateBlocks.map((el, index) => {
      return (
        <React.Fragment key={index}>
          {el.variant === "space" && <SpaceBlock blockData={el.content} />}
          {el.variant === "text" && <TextBlock blockData={el.content} />}
          {el.variant === "calendar" && <CalenderBlock blockData={el.content} />}
          {el.variant === "image" && <ImageBlock blockData={el.content} />}
          {el.variant === "gallery" && <GalleryBlock blockData={el.content} />}
          {el.variant === "gif" && <GifBlock blockData={el.content} />}
          {el.variant === "video" && <VideoBlock blockData={el.content} />}
          {el.variant === "link" && <LinkBlock blockData={el.content} />}
          {el.variant === "quiz" && <QuizBlock blockData={el.content} />}
        </React.Fragment>
      );
    });
  };

  ////////////////////////////////////////////////// Render //////////////////////////////////////////////////
  return (
    <Container>
      <Typography variant="h5">템플릿 만들기</Typography>
      {/* 블록 추가 드로어 */}
      <AddBlockDrawer />

      {/* 페이지 에셋 추가 버튼 */}
      <AddPageAssetButton />

      {/* 블록 렌더링 */}
      {renderBlocks()}

      {/* 블록 추가 버튼 */}
      <AddBlockButton />
    </Container>
  );
};

export default TemplatesMakeContainer;
////////////////////////////// 스타일 //////////////////////////////
const Container = styled(Box)`
  ${mixinContainer()}
  ${mixinFlex("column", "start", "center")}
`;

//////////////////////////////////////// 하위 컴포넌트 ////////////////////////////////////////
////////////////////////////// 페이지 에셋 추가 버튼 //////////////////////////////
const AddPageAssetButton = () => {
  const assets: { variant: PageAssetVariantType; icon: React.ReactNode }[] = [
    {
      variant: "particle",
      icon: <ImageRounded />,
    },
    {
      variant: "rollingPaper",
      icon: <ImageRounded />,
    },
    {
      variant: "backgroundMusic",
      icon: <ImageRounded />,
    },
  ];

  return (
    <AddPageAssetButtonContainer>
      {assets.map((el, index) => (
        <PageAssetButton variant="outlined" endIcon={el.icon} key={index}/>
      ))}
    </AddPageAssetButtonContainer>
  );
};

const AddPageAssetButtonContainer = styled(Stack)`
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  column-gap: 8px;
`;

const PageAssetButton = styled(Button)`
  flex: 1;
  aspect-ratio: 1/1;
`;

////////////////////////////// 블록 추가 버튼 //////////////////////////////
const AddBlockButton = () => {
  // Store
  const { setAllState: setAddBlockDrawerState } = useAddBlockDrawerStore();

  // State
  const [isFadeShow, setIsFadeShow] = useState(false);

  // 블록 버튼 클릭 시 드로어 열기
  const handleOpenDrawer = (variant: BlockVariantType) => {
    setAddBlockDrawerState(variant, "top", true);
    setIsFadeShow(false);
  };

  // 블록 버튼 목록
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
      variant: "gallery",
      icon: <PhotoLibraryRounded />,
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
      variant: "quiz",
      icon: <QuizRounded />,
    },
  ];

  // 블록 버튼 목록 렌더링
  return (
    <AddBlockButtonContainer>
      <Fade in={isFadeShow}>
        <MenuButtonContainer>
          {buttons.map((el, index) => (
            <Tooltip title={el.variant} key={index}>
              <MenuButton onClick={() => handleOpenDrawer(el.variant)} variant="outlined" endIcon={el.icon} />
            </Tooltip>
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
  width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: start;
  align-items: center;
  column-gap: 8px;
  overflow-x: auto;

  ${mixinHideScrollbar()}
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
