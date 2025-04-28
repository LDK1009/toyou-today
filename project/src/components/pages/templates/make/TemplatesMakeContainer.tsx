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
import { PageAssetVariantType, RollingPaperAssetType } from "@/types/template/pageAssetType";
import ParticlePageAsset from "@/components/pages/templates/page-asset/ParticlePageAsset";
import BackgroundMusicPageAsset from "../page-asset/BackgroundMusicPageAsset";
import RollingPaperPageAsset from "../page-asset/RollingPaperPageAsset";

const TemplatesMakeContainer = () => {
  ////////////////////////////////////////////////// State //////////////////////////////////////////////////
  const particle = useMakeTemplateStore((state) => state.template.pageAssets?.particle);
  const backgroundMusic = useMakeTemplateStore((state) => state.template.pageAssets?.backgroundMusic);
  const rollingPaper = useMakeTemplateStore((state) => state.template.pageAssets?.rollingPaper);

  ////////////////////////////////////////////////// Test Data //////////////////////////////////////////////////
  // 롤링페이퍼 테스트 데이터
  const rollingPaperTestData: RollingPaperAssetType = {
    id: 1,
    isActive: rollingPaper?.isActive as boolean,
    comments: [
      { comment_id: 2, nickname: "수민", comment: "졸업 진심으로 축하해. 고생했다 진짜" },
      { comment_id: 3, nickname: "민재", comment: "이제 시작이다. 앞으로 더 잘 될 거야" },
      { comment_id: 4, nickname: "서연", comment: "오늘 하루만큼은 편하게 즐겨라🎈" },
      { comment_id: 5, nickname: "현우", comment: "인생샷 기대해도 되냐ㅋㅋ" },
      { comment_id: 6, nickname: "지수", comment: "멋있다 진짜. 다음에 밥 한번 사라" },
      { comment_id: 7, nickname: "태현", comment: "야, 이렇게 잘될 줄 알았다ㅋㅋ" },
      { comment_id: 8, nickname: "소연", comment: "앞으로 좋은 일만 가득했으면 좋겠다" },
      { comment_id: 9, nickname: "예진", comment: "멋지다. 다음 목표도 기대할게🔥" },
      { comment_id: 10, nickname: "도윤", comment: "내가 다 뿌듯하다ㅋㅋ" },
      { comment_id: 11, nickname: "채원", comment: "축하해. 오랜 시간 고생했잖아" },
      { comment_id: 12, nickname: "유준", comment: "좋은 소식 들으니까 기분 좋네" },
      { comment_id: 13, nickname: "하은", comment: "멋진 하루 보내라 진심으로👍" },
      { comment_id: 14, nickname: "지후", comment: "다음은 내가 갈 차례다ㅋㅋ" },
      { comment_id: 15, nickname: "민서", comment: "진짜 수고했다. 푹 쉬어라 오늘은" },
      { comment_id: 16, nickname: "성민", comment: "마지막까지 멋지더라. 인정" },
      { comment_id: 17, nickname: "다은", comment: "야, 우리 곧 한잔하자" },
      { comment_id: 18, nickname: "예준", comment: "사진 좀 올려라ㅋㅋ 기대 중" },
      { comment_id: 19, nickname: "하린", comment: "수고했어. 다음 스텝도 응원한다" },
      { comment_id: 20, nickname: "시우", comment: "대단하다 진짜. 자랑스럽다" },
      { comment_id: 21, nickname: "은채", comment: "오늘은 아무 생각 말고 즐겨🍻" },
    ],
    empathies: [
      { empathy_id: 1, nickname: "지훈", emoji: "🎉" },
      { empathy_id: 2, nickname: "수민", emoji: "🎓" },
      { empathy_id: 3, nickname: "민재", emoji: "🔥" },
      { empathy_id: 4, nickname: "서연", emoji: "🎈" },
      { empathy_id: 5, nickname: "현우", emoji: "👍" },
      { empathy_id: 6, nickname: "지수", emoji: "💪" },
      { empathy_id: 7, nickname: "태현", emoji: "👏" },
      { empathy_id: 8, nickname: "소연", emoji: "✨" },
      { empathy_id: 9, nickname: "예진", emoji: "🌟" },
      { empathy_id: 10, nickname: "도윤", emoji: "🎊" },
      { empathy_id: 11, nickname: "채원", emoji: "🍀" },
      { empathy_id: 12, nickname: "유준", emoji: "🍻" },
      { empathy_id: 13, nickname: "하은", emoji: "😊" },
      { empathy_id: 14, nickname: "지후", emoji: "🧡" },
      { empathy_id: 15, nickname: "민서", emoji: "🥳" },
      { empathy_id: 16, nickname: "성민", emoji: "😆" },
      { empathy_id: 17, nickname: "다은", emoji: "🤩" },
      { empathy_id: 18, nickname: "예준", emoji: "🎯" },
      { empathy_id: 19, nickname: "하린", emoji: "📸" },
      { empathy_id: 20, nickname: "시우", emoji: "🏆" },
      { empathy_id: 21, nickname: "은채", emoji: "🍰" },
    ],
  };

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
      {backgroundMusic && <BackgroundMusicPageAsset />}

      {/* 블록 추가 드로어 */}
      <AddBlockDrawer />
      {/* ========== End of Default ========== */}

      {/* 페이지 에셋 추가 버튼 */}
      <AddPageAssetButton />

      {/* 블록 렌더링 */}
      <BlockComponents />

      {/* 롤링페이퍼 활성화 시 롤링페이퍼 렌더링 */}
      {rollingPaper && <RollingPaperPageAsset pageAssetData={rollingPaperTestData} />}

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
