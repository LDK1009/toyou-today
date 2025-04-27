import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import { mixinSwitch } from "@/styles/mixins";
import { RollingPaperAssetType } from "@/types/template/pageAssetType";
import { CheckCircleOutlineRounded } from "@mui/icons-material";
import { Button, Stack, styled, Switch, Typography } from "@mui/material";
import React, { useState } from "react";
import RollingPaperPageAsset from "../../../page-asset/RollingPaperPageAsset";
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
  const previewComments = [
    { comment_id: 1, nickname: "지훈", comment: "생일 축하한다. 오늘은 니 날이다🎉" },
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
  ];

  // 미리보기 공감 데이터
  const previewEmpathies = [
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
  ];

  // 롤링페이퍼 페이지 에셋 상태
  const [pageAssetState, setPageAssetState] = useState<RollingPaperAssetType>({
    isActive: isRollingPaperAssetActive,
    comments: previewComments,
    empathies: previewEmpathies,
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
      {/* <pre>{JSON.stringify(pageAssetState, null, 2)}</pre> */}
      {/* 활성화 스위치 */}
      <TitleWrapper>
        <Title>활성화</Title>
        <StyledSwitch checked={pageAssetState.isActive} onChange={handleSwitchChange} />
      </TitleWrapper>

      {/* 미리보기 */}
      {pageAssetState.isActive && (
        <TitleWrapper sx={{ rowGap: 0 }}>
          <Title>미리보기</Title>
          <RollingPaperPageAsset pageAssetData={pageAssetState} />
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
