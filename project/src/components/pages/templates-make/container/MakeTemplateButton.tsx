import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import { getCurrentUserUID } from "@/service/auth";
import { Fade, Button, Stack, Box, Typography, TextField, styled } from "@mui/material";
import { CloseRounded, CardGiftcardRounded } from "@mui/icons-material";
import SelectPublic from "./SelectPublic";
import { mixinFlex, mixinTextInputBorder, mixinMuiButtonNoShadow } from "@/styles/mixins";

const MakeTemplateButton = () => {
  const router = useRouter();
  const { template, setTemplateName } = useMakeTemplateStore();

  // 레이어 열림 여부
  const [open, setOpen] = useState(false);

  // 다이얼로그 열림 여부
  const [dialogOpen, setDialogOpen] = useState(false);

  ////////// 레이어 열림 버튼 클릭 시
  async function handleOpenLayer() {
    if (template.blocks.length < 5) {
      enqueueSnackbar("최소 5개 이상의 블록을 추가해주세요.", { variant: "error" });
      return;
    }

    const { data: uid } = await getCurrentUserUID();

    if (!uid) {
      enqueueSnackbar("로그인 후 이용 가능합니다.", { variant: "error" });
      enqueueSnackbar("페이지 정보가 저장되었습니다.", { variant: "info" });

      router.push("/auth/sign-in");
      return;
    }

    setOpen(true);
  }

  // 다이얼로그 열기
  function handleOpenDialog() {
    if (template.name === "") {
      enqueueSnackbar("템플릿 이름을 입력해주세요", { variant: "error" });
      return;
    }

    setDialogOpen(true);
  }

  // 다이얼로그 닫기
  function handleCloseDialog() {
    setDialogOpen(false);
  }

  ////////////////////////////////////////////////// 렌더링 //////////////////////////////////////////////////
  return (
    <Container>
      {/* 페이지 제작 레이어 */}
      <Fade in={open} timeout={300}>
      <Layer>
        {/* 공개 여부 선택 다이얼로그 */}
        <SelectPublic open={dialogOpen} handleClose={handleCloseDialog} />
        {/* 레이어 닫기 아이콘 */}
        <CloseIcon onClick={() => setOpen(false)} />
        {/* 레이어 컨텐츠 */}
        <LayerContentContainer>
          {/* 안내 문구 */}
          <LayerTitle variant="h6">
            마지막이에요!
            <br />
            소중한 사람의 이름을 작성해주세요
          </LayerTitle>
          {/* 텍스트 입력 필드 */}
          <LayerTextInput
            placeholder="소중한 사람의 이름"
            value={template.name}
            onChange={(e) => setTemplateName(e.target.value)}
          />
          {/* 제작 완료 버튼 */}
          <LayerSubmitButton onClick={handleOpenDialog} variant="contained" startIcon={<CardGiftcardRounded />}>
            페이지 제작하기
          </LayerSubmitButton>
        </LayerContentContainer>
      </Layer>
    </Fade>

    {/* 페이지 제작 레이어 버튼 */}
    <CreateButton onClick={handleOpenLayer} variant="contained" startIcon={<CardGiftcardRounded />}>
        페이지 제작
      </CreateButton>
    </Container>
  );
};

export default MakeTemplateButton;

////////////////////////////// 템플릿 제작 버튼 //////////////////////////////

const CreateButton = styled(Button)`
  width: 100%;
  color: ${({ theme }) => theme.palette.text.white};
  box-shadow: none;

  &:hover {
    box-shadow: none;
  }
`;

const CloseIcon = styled(CloseRounded)`
  position: absolute;
  top: 16px;
  right: 16px;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const Container = styled(Box)``;

const Layer = styled(Stack)`
  width: 100vw;
  height: 100vh;
  padding: 40px;
  ${mixinFlex("column", "center", "center")}
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.palette.background.default};
  z-index: 1200;
`;

const LayerContentContainer = styled(Stack)`
  row-gap: 16px;
`;

const LayerTitle = styled(Typography)`
  text-align: center;
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: bold;
`;

const LayerTextInput = styled(TextField)`
  width: 100%;
  ${({ theme }) => mixinTextInputBorder(theme)}
`;

const LayerSubmitButton = styled(Button)`
  width: 100%;
  color: ${({ theme }) => theme.palette.text.white};
  ${mixinMuiButtonNoShadow()}
`;
