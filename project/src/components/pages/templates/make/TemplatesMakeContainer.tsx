"use client";

import { mixinContainer, mixinFlex, mixinHideScrollbar } from "@/styles/mixins";
import {
  AddCircleOutlineRounded,
  CalendarMonthRounded,
  CelebrationRounded,
  CloseRounded,
  GifRounded,
  HistoryEduRounded,
  ImageRounded,
  InsertLinkRounded,
  MusicNoteRounded,
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
import ParticlePageAsset from "@/components/pages/templates/page-asset/ParticlePageAsset";
import BackgroundMusicPageAsset from "../page-asset/BackgroundMusicPageAsset";
import RollingPaperPageAsset from "../page-asset/RollingPaperPageAsset";

const TemplatesMakeContainer = () => {
  ////////////////////////////////////////////////// State //////////////////////////////////////////////////
  const particle = useMakeTemplateStore((state) => state.template.pageAssets?.particle);
  const backgroundMusic = useMakeTemplateStore((state) => state.template.pageAssets?.backgroundMusic);
  const rollingPaper = useMakeTemplateStore((state) => state.template.pageAssets?.rollingPaper);

  ////////////////////////////////////////////////// Render //////////////////////////////////////////////////
  return (
    <Container>
      {/* ========== Default ========== */}
      {/* 폭죽 활성화 시 폭죽 렌더링 */}
      {particle?.isActive && (
        <ParticlePageAsset
          particle={particle.textConfettiProps.particle}
          emitters={particle.textConfettiProps.emitters}
        />
      )}

      {/* 배경음악 활성화 시 배경음악 렌더링 */}
      {backgroundMusic?.isActive && <BackgroundMusicPageAsset />}

      {/* 블록 추가 드로어 */}
      <AddBlockDrawer />
      {/* ========== End of Default ========== */}

      {/* 페이지 에셋 추가 버튼 */}
      <AddPageAssetButton />

      {/* 블록 렌더링 */}
      <BlockComponents />

      {/* 롤링페이퍼 활성화 시 롤링페이퍼 렌더링 */}
      {rollingPaper && <RollingPaperPageAsset pageAssetData={rollingPaper} preview={true} />}

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
////////////////////////////// 블록 컴포넌트 //////////////////////////////
const BlockComponents = () => {
  // 템플릿 블록 스토어
  const {
    template: { blocks: templateBlocks },
  } = useMakeTemplateStore();

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

  // 렌더링
  return <BlockComponentsContainer>{renderBlocks()}</BlockComponentsContainer>;
};

const BlockComponentsContainer = styled(Box)`
  width: 100%;
`;

////////////////////////////// 페이지 에셋 추가 버튼 //////////////////////////////
const AddPageAssetButton = () => {
  // Store
  const { setAllState: setAddBlockDrawerState } = useAddBlockDrawerStore();

  // 블록 버튼 클릭 시 드로어 열기
  const handleOpenDrawer = (variant: PageAssetVariantType) => {
    setAddBlockDrawerState(variant, "top", true);
  };

  const assets: { variant: PageAssetVariantType; icon: React.ReactNode }[] = [
    {
      variant: "particle",
      icon: <CelebrationRounded />,
    },
    {
      variant: "rollingPaper",
      icon: <HistoryEduRounded />,
    },
    {
      variant: "backgroundMusic",
      icon: <MusicNoteRounded />,
    },
  ];

  return (
    <AddPageAssetButtonContainer>
      {assets.map((el, index) => (
        <PageAssetButton onClick={() => handleOpenDrawer(el.variant)} variant="outlined" key={index}>
          {el.icon}
          <Typography variant="body2">
            {el.variant === "particle" && "폭죽"}
            {el.variant === "rollingPaper" && "롤링페이퍼"}
            {el.variant === "backgroundMusic" && "배경음악"}
          </Typography>
        </PageAssetButton>
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
  ${mixinFlex("column", "center", "center")}
  row-gap: 8px;

  flex: 1;
  aspect-ratio: 1/1;

  & .MuiSvgIcon-root {
    font-size: 48px;
    color: ${({ theme }) => theme.palette.primary.main};
  }
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
          {buttons.map((el, index) => {
            const tootipTitle = () => {
              switch (el.variant) {
                case "space":
                  return "빈 공간";
                case "text":
                  return "텍스트";
                case "calendar":
                  return "캘린더";
                case "image":
                  return "이미지";
                case "gallery":
                  return "갤러리";
                case "gif":
                  return "움짤";
                case "video":
                  return "비디오";
                case "link":
                  return "링크";
                case "quiz":
                  return "퀴즈";
              }
            };

            return (
              <Tooltip title={tootipTitle()} key={index}>
                <MenuButton onClick={() => handleOpenDrawer(el.variant)} variant="outlined" endIcon={el.icon} />
              </Tooltip>
            );
          })}
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
  width: 100%;
`;

const MenuButtonContainer = styled(Stack)`
  width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: start;
  align-items: center;
  column-gap: 8px;
  overflow-x: auto;
  margin-top: 16px;

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
