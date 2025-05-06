import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import { mixinSwitch } from "@/styles/mixins";
import { RollingPaperAssetType } from "@/types/template/pageAssetType";
import { CheckCircleOutlineRounded } from "@mui/icons-material";
import { Button, Stack, styled, Switch, Typography } from "@mui/material";
import React, { useState } from "react";
import RollingPaperPageAsset from "../../../templates/page-asset/RollingPaperPageAsset";
import { useAddBlockDrawerStore } from "@/store";

const RollingPaperEditor = () => {
  // 롤링페이퍼 페이지 에셋 상태
  const rollingPaperAsset = useMakeTemplateStore((state) => state?.template?.pageAssets?.rollingPaper);
  // 롤링페이퍼 페이지 기존 활성화 상태 가져오기
  const isRollingPaperAssetActive = rollingPaperAsset ? true : false;

  // 페이지 에셋 상태 업데이트 액션
  const { setPageAsset } = useMakeTemplateStore();

  // 드로어 닫기
  const { setIsOpen: setIsAddBlockDrawerOpen } = useAddBlockDrawerStore();

  // 롤링페이퍼 페이지 에셋 상태
  const [pageAssetState, setPageAssetState] = useState<RollingPaperAssetType>({
    isActive: isRollingPaperAssetActive,
  });

  // 롤링페이퍼 페이지 에셋 저장
  const handleSaveButtonClick = () => {
    setPageAsset("rollingPaper", pageAssetState);
    setIsAddBlockDrawerOpen(false);
  };

  // 롤링페이퍼 페이지 에셋 활성화 상태 변경
  function handleSwitchChange() {
    setPageAssetState({
      ...pageAssetState,
      isActive: !pageAssetState.isActive,
    });
  }

  return (
    <Container>
      {/* 활성화 스위치 */}
      <TitleWrapper>
        <Title>활성화</Title>
        <StyledSwitch checked={pageAssetState.isActive} onChange={handleSwitchChange} />
      </TitleWrapper>

      {/* 미리보기 */}
      {pageAssetState.isActive && (
        <TitleWrapper sx={{ rowGap: 0 }}>
          <Title>미리보기</Title>
          <RollingPaperPageAsset preview={true} />
        </TitleWrapper>
      )}

      {/* 저장 버튼 */}
      <EditButton variant="contained" onClick={handleSaveButtonClick} startIcon={<CheckCircleOutlineRounded />}>
        저장
      </EditButton>
    </Container>
  );
};

export default RollingPaperEditor;

const Container = styled(Stack)`
  width: 100%;
  row-gap: 16px;
`;

const TitleWrapper = styled(Stack)`
  width: 100%;
  align-items: center;
  row-gap: 4px;
`;

const Title = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

const StyledSwitch = styled(Switch)`
  ${({ theme }) => mixinSwitch(50, 25, theme)}
`;

const EditButton = styled(Button)`
  width: 100%;
  color: ${({ theme }) => theme.palette.text.white};
`;
