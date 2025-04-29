"use client";

import {
  mixinContainer,
  mixinFlex,
  mixinHideScrollbar,
  mixinMuiButtonNoShadow,
  mixinTextInputBorder,
} from "@/styles/mixins";
import {
  AddCircleOutlineRounded,
  ArrowDownwardRounded,
  ArrowForwardRounded,
  ArrowUpwardRounded,
  CalendarMonthRounded,
  CardGiftcardRounded,
  CelebrationRounded,
  CloseRounded,
  DeleteOutlineRounded,
  EditOutlined,
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
import { Box, Button, Fade, Stack, TextField, Tooltip, Typography } from "@mui/material";

import { styled } from "@mui/material";
import AddBlockDrawer from "./drawer/AddBlockDrawer";
import { useAddBlockDrawerStore } from "@/store";
import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import TextBlock from "../block/TextBlock";
import React, { useState } from "react";
import { BlockType, BlockVariantType } from "@/types/template/blockType";
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
import { Reorder } from "motion/react";
import { useHandleEditor } from "@/hooks/useHandleEditor";
import { createTemplate } from "@/service/tables/templates";
import { getCurrentUserUID } from "@/service/auth";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

const TemplatesMakeContainer = () => {
  ////////////////////////////////////////////////// State //////////////////////////////////////////////////
  // 페이지 에셋
  const particle = useMakeTemplateStore((state) => state.template.pageAssets?.particle);
  const backgroundMusic = useMakeTemplateStore((state) => state.template.pageAssets?.backgroundMusic);
  const rollingPaper = useMakeTemplateStore((state) => state.template.pageAssets?.rollingPaper);

  ////////////////////////////////////////////////// Render //////////////////////////////////////////////////
  return (
    <Container>
      {/* ========== 배경 레이어 섹션 ========== */}
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

      {/* ========== 컨텐츠 섹션 ========== */}
      {/* 페이지 에셋 추가 */}
      <AddPageAssetButton />

      {/* 블록 리스트 */}
      <BlockComponents />

      {/* 롤링페이퍼 */}
      {rollingPaper?.isActive && <RollingPaperPageAsset pageAssetData={rollingPaper} preview={true} />}

      {/* 블록 추가 */}
      <ButtonWrapper>
        <AddBlockButton />
        <CreateTemplateButton />
      </ButtonWrapper>
    </Container>
  );
};

export default TemplatesMakeContainer;

////////////////////////////// 스타일 //////////////////////////////
const Container = styled(Box)`
  ${mixinContainer()}
  ${mixinFlex("column", "start", "center")}
`;

const ButtonWrapper = styled(Stack)`
  row-gap: 8px;
`;

//////////////////////////////////////// 하위 컴포넌트 ////////////////////////////////////////
////////////////////////////// 블록 리스트 컴포넌트 //////////////////////////////
const BlockComponents = () => {
  // 템플릿 블록 스토어
  const {
    template: { blocks: templateBlocks },
    setTemplateBlocks,
  } = useMakeTemplateStore();

  // 블록 렌더링
  const renderBlocks = () => {
    return templateBlocks.map((el, index) => {
      return (
        <Reorder.Item key={el.id} value={el} as="div">
          <BlockWrapper blockIdx={index} blockData={el}>
            {el.variant === "space" && <SpaceBlock blockData={el.content} />}
            {el.variant === "text" && <TextBlock blockData={el.content} />}
            {el.variant === "calendar" && <CalenderBlock key={`calendar-${el.id}`} blockData={el.content} />}
            {el.variant === "image" && <ImageBlock blockData={el.content} />}
            {el.variant === "gallery" && <GalleryBlock blockData={el.content} />}
            {el.variant === "gif" && <GifBlock blockData={el.content} />}
            {el.variant === "video" && <VideoBlock blockData={el.content} />}
            {el.variant === "link" && <LinkBlock blockData={el.content} />}
            {el.variant === "quiz" && <QuizBlock blockData={el.content} />}
          </BlockWrapper>
        </Reorder.Item>
      );
    });
  };

  // 렌더링
  return (
    <BlockComponentsContainer
      axis="y"
      values={templateBlocks}
      onReorder={(state) => setTemplateBlocks(state as BlockType[])}
    >
      {renderBlocks()}
    </BlockComponentsContainer>
  );
};

const BlockComponentsContainer = styled(Reorder.Group)`
  width: 100%;
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;

////////////////////////////// 블록 랩퍼 컴포넌트 //////////////////////////////
const BlockWrapper = ({
  blockIdx,
  blockData,
  children,
}: {
  blockIdx: number;
  blockData: BlockType;
  children: React.ReactNode;
}) => {
  const { moveUpBlock, moveDownBlock, deleteBlock } = useMakeTemplateStore();
  const { openEditorInEditMode } = useHandleEditor();

  return (
    <BlockWrapper_Container>
      <BlockWrapper_Header>
        {/* 버튼 래퍼 */}
        <BlockWrapper_ButtonWrapper>
          {/* 위로 옮기기 버튼 */}
          <BlockWrapper_Button onClick={() => moveUpBlock(blockIdx)}>
            <ArrowUpwardRounded />
          </BlockWrapper_Button>
          {/* 위로 옮기기 버튼 */}
          <BlockWrapper_Button onClick={() => moveDownBlock(blockIdx)}>
            <ArrowDownwardRounded />
          </BlockWrapper_Button>
        </BlockWrapper_ButtonWrapper>

        {/* 버튼 래퍼 */}
        <BlockWrapper_ButtonWrapper>
          {/* 수정 버튼 */}
          <BlockWrapper_Button onClick={() => openEditorInEditMode(blockIdx, blockData)}>
            <EditOutlined />
          </BlockWrapper_Button>
          {/* 삭제 버튼 */}
          <BlockWrapper_Button onClick={() => deleteBlock(blockIdx)} sx={{ color: "#F44336" }}>
            <DeleteOutlineRounded />
          </BlockWrapper_Button>
        </BlockWrapper_ButtonWrapper>
      </BlockWrapper_Header>
      {children}
    </BlockWrapper_Container>
  );
};

const BlockWrapper_Container = styled(Stack)`
  width: 100%;
  row-gap: 4px;
`;

const BlockWrapper_Header = styled(Stack)`
  width: 100%;
  padding: 4px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  z-index: 100;

  & .MuiSvgIcon-root {
    width: 20px;
    height: 20px;
  }
`;

const BlockWrapper_ButtonWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  column-gap: 4px;
`;

const BlockWrapper_Button = styled(Button)`
  width: 32px;
  height: 32px;
  min-width: 32px;
  max-width: 32px;
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
        startIcon={isFadeShow ? <CloseRounded /> : <AddCircleOutlineRounded />}
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

////////////////////////////// 템플릿 제작 버튼 //////////////////////////////
const CreateTemplateButton = () => {
  const router = useRouter();
  const { template, initTemplate } = useMakeTemplateStore();

  // 템플릿 이름
  const [templateName, setTemplateName] = useState("");
  // 레이어 열림 여부
  const [open, setOpen] = useState(false);
  // 페이지 제작 완료 여부
  const [isCompleted, setIsCompleted] = useState(false);

  // 레이어 열림 버튼 클릭 시
  async function handleOpenLayer() {
    const { data: uid } = await getCurrentUserUID();

    if (!uid) {
      enqueueSnackbar("로그인 후 이용 가능합니다.", { variant: "error" });
      enqueueSnackbar("페이지 정보가 저장되었습니다.", { variant: "info" });

      router.push("/auth/sign-in");
      return;
    }

    setOpen(true);
  }

  // 템플릿 제작 버튼 클릭 시
  async function handleButtonClick() {
    const { data: uid } = await getCurrentUserUID();

    // 로그인 여부 확인
    if (!uid) {
      return { data: null, error: "로그인 후 이용 가능합니다." };
    }

    // 템플릿 생성
    const { error } = await createTemplate({
      ...template,
      name: templateName,
      makerId: uid,
    });

    if (error) {
      enqueueSnackbar("페이지 제작 실패", { variant: "error" });
      return;
    }

    // 템플릿 초기화
    initTemplate();

    setIsCompleted(true);
  }

  // 렌더링
  return (
    <CreateTemplateButton_Container>
      {/* 페이지 제작 레이어 */}
      <Fade in={open} timeout={300}>
        {/* 페이지 제작 레이어 */}
        <CreateTemplateButton_Layer>
          <LetterLayer_CloseIcon onClick={() => setOpen(false)} />
          <CreateTemplateButton_Layer_ContentContainer>
            {/* 안내 문구 */}
            <CreateTemplateButton_Layer_Title variant="h5">
              {isCompleted ? "페이지 제작 완료!" : "마지막 단계에요"}
              <br />
              {isCompleted ? "제작된 페이지를 확인해주세요" : "페이지 이름을 작성해주세요!"}
            </CreateTemplateButton_Layer_Title>
            {/* 텍스트 입력 필드 */}
            {isCompleted === false && (
              <CreateTemplateButton_Layer_TextInput
                placeholder="제작한 페이지 이름"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            )}
            {/* 제작 완료 버튼 */}
            <CreateTemplateButton_Layer_SubmitButton
              onClick={isCompleted ? () => router.push(`/templates}`) : handleButtonClick}
              variant="contained"
              startIcon={!isCompleted && <CardGiftcardRounded />}
              endIcon={isCompleted && <ArrowForwardRounded />}
            >
              {isCompleted ? "내 페이지 보러가기" : "페이지 제작하기"}
            </CreateTemplateButton_Layer_SubmitButton>
          </CreateTemplateButton_Layer_ContentContainer>
        </CreateTemplateButton_Layer>
      </Fade>

      {/* 페이지 제작 레이어 버튼 */}
      <CreateTemplateButton_CreateButton
        onClick={handleOpenLayer}
        variant="contained"
        startIcon={<CardGiftcardRounded />}
      >
        페이지 제작
      </CreateTemplateButton_CreateButton>
    </CreateTemplateButton_Container>
  );
};

const CreateTemplateButton_CreateButton = styled(Button)`
  width: 100%;
  color: ${({ theme }) => theme.palette.text.white};
  box-shadow: none;

  &:hover {
    box-shadow: none;
  }
`;

const LetterLayer_CloseIcon = styled(CloseRounded)`
  position: absolute;
  top: 16px;
  right: 16px;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const CreateTemplateButton_Container = styled(Box)``;

const CreateTemplateButton_Layer = styled(Stack)`
  width: 100vw;
  height: 100vh;
  padding: 40px;
  ${mixinFlex("column", "center", "center")}
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.palette.background.default};
  z-index: 9999;
`;

const CreateTemplateButton_Layer_ContentContainer = styled(Stack)`
  row-gap: 16px;
`;

const CreateTemplateButton_Layer_Title = styled(Typography)`
  text-align: center;
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: bold;
`;

const CreateTemplateButton_Layer_TextInput = styled(TextField)`
  width: 100%;
  ${({ theme }) => mixinTextInputBorder(theme)}
`;

const CreateTemplateButton_Layer_SubmitButton = styled(Button)`
  width: 100%;
  color: ${({ theme }) => theme.palette.text.white};
  ${mixinMuiButtonNoShadow()}
`;
