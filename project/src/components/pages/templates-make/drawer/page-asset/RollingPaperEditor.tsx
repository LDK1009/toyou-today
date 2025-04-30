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

  // 미리보기 댓글 데이터
  // 롤링페이퍼 테스트 데이터
  const previewData = {
    comments: [
      { comment_id: 1, nickname: "동규", comment: "생일 축하해! 행복한 하루 보내 :)" },
      { comment_id: 2, nickname: "수민", comment: "생일 진심으로 축하해! 오늘 행복한 하루 보내자" },
      { comment_id: 3, nickname: "민재", comment: "한 살 더 예뻐진 거 축하해. 멋진 한 해 되자" },
      { comment_id: 4, nickname: "서연", comment: "오늘은 그냥 마음껏 즐기자" },
      { comment_id: 5, nickname: "현우", comment: "생일 인생샷 꼭 올려줘야 해" },
      { comment_id: 6, nickname: "지수", comment: "멋지다 진짜. 생일 기념으로 밥 한번 사줘" },
      { comment_id: 7, nickname: "태현", comment: "생일인 거 오늘 하루 내내 티 내도 돼" },
      { comment_id: 8, nickname: "소연", comment: "앞으로 좋은 일만 가득했으면 좋겠다" },
      { comment_id: 9, nickname: "예진", comment: "오늘 주인공 너야. 생일 축하해" },
      { comment_id: 10, nickname: "도윤", comment: "생일 소식 들으니까 괜히 나도 기분 좋다" },
      { comment_id: 11, nickname: "채원", comment: "진심으로 축하해. 행복 가득한 하루 보내" },
      { comment_id: 12, nickname: "유준", comment: "좋은 소식 들으니까 마음까지 따뜻해진다" },
      { comment_id: 13, nickname: "하은", comment: "오늘은 너만 생각하면서 신나게 놀아" },
      { comment_id: 14, nickname: "지후", comment: "생일 다음은 내 차례니까 기대해줘" },
      { comment_id: 15, nickname: "민서", comment: "오늘은 무조건 니가 주인공이야. 생일 축하해" },
      { comment_id: 16, nickname: "성민", comment: "오늘 하루 특별하게 보내자. 생일 축하해" },
      { comment_id: 17, nickname: "다은", comment: "생일이니까 곧 만나서 한잔하자" },
      { comment_id: 18, nickname: "예준", comment: "생일 사진 올려줘. 보고 싶어" },
      { comment_id: 19, nickname: "하린", comment: "생일 축하해. 앞으로도 항상 행복하자" },
      { comment_id: 20, nickname: "시우", comment: "진짜 멋있다. 생일 진심으로 축하해" },
    ],
    empathies: [
      { empathy_id: 1, nickname: "지훈", emoji: "🔥" },
      { empathy_id: 2, nickname: "수민", emoji: "💕" },
      { empathy_id: 3, nickname: "민재", emoji: "🎉" },
      { empathy_id: 4, nickname: "서연", emoji: "👍🏻" },
      { empathy_id: 5, nickname: "현우", emoji: "🔥" },
      { empathy_id: 6, nickname: "지수", emoji: "🎊" },
      { empathy_id: 7, nickname: "태현", emoji: "🎉" },
      { empathy_id: 8, nickname: "소연", emoji: "💕" },
      { empathy_id: 9, nickname: "예진", emoji: "🔥" },
      { empathy_id: 10, nickname: "도윤", emoji: "🎉" },
      { empathy_id: 11, nickname: "채원", emoji: "🎊" },
      { empathy_id: 12, nickname: "유준", emoji: "👍🏻" },
      { empathy_id: 13, nickname: "하은", emoji: "💕" },
      { empathy_id: 14, nickname: "지후", emoji: "🔥" },
      { empathy_id: 15, nickname: "민서", emoji: "🎉" },
      { empathy_id: 16, nickname: "성민", emoji: "🎊" },
      { empathy_id: 17, nickname: "다은", emoji: "💕" },
      { empathy_id: 18, nickname: "예준", emoji: "👍🏻" },
      { empathy_id: 19, nickname: "하린", emoji: "🔥" },
      { empathy_id: 20, nickname: "시우", emoji: "🎊" },
      { empathy_id: 21, nickname: "은채", emoji: "💕" },
      { empathy_id: 22, nickname: "윤아", emoji: "🎉" },
      { empathy_id: 23, nickname: "도현", emoji: "👍🏻" },
      { empathy_id: 24, nickname: "가은", emoji: "🎊" },
      { empathy_id: 25, nickname: "세진", emoji: "🔥" },
      { empathy_id: 26, nickname: "하영", emoji: "💕" },
      { empathy_id: 27, nickname: "서윤", emoji: "🎉" },
      { empathy_id: 28, nickname: "주원", emoji: "🔥" },
      { empathy_id: 29, nickname: "나윤", emoji: "💕" },
      { empathy_id: 30, nickname: "정우", emoji: "👍🏻" },
    ],
  };

  // 롤링페이퍼 페이지 에셋 상태
  const [pageAssetState, setPageAssetState] = useState<RollingPaperAssetType>({
    isActive: isRollingPaperAssetActive,
    comments: previewData.comments,
    empathies: previewData.empathies,
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
          <RollingPaperPageAsset pageAssetData={pageAssetState} preview={true} />
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
