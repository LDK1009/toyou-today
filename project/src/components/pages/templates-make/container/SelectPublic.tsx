import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { getCurrentUserUID } from "@/service/auth";
import { createTemplate } from "@/service/tables/templates";
import { enqueueSnackbar } from "notistack";
import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import { useLoadingRouter } from "@/hooks/useLoadingRouter";
import Loading from "@/components/common/Loading";
import { styled } from "@mui/material";
import { mixinMuiButtonNoShadow } from "@/styles/mixins";

type PropsType = {
  open: boolean;
  handleClose: () => void;
};

const SelectPublic = ({ open, handleClose }: PropsType) => {
  // 페이지 제작 완료 여부
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  // 템플릿 제작 데이터
  const { template, initTemplate } = useMakeTemplateStore();
  // 페이지 제작 완료 후 템플릿 상세 페이지로 이동
  const { navigateWithLoading } = useLoadingRouter();

  ////////// 템플릿 제작 버튼 클릭 시
  async function handleCreateTemplate(isPublic: boolean) {
    // 템플릿 제작 로딩 시작
    setIsCreateLoading(true);

    // 현재 유저 uid 가져오기
    const { data: uid } = await getCurrentUserUID();

    // 로그인 여부 확인
    if (!uid) {
      return { data: null, error: "로그인 후 이용 가능합니다." };
    }

    // 템플릿 생성
    const { data, error } = await createTemplate({
      name: template.name,
      makerId: uid,
      public: isPublic,
      blocks: template.blocks,
      pageAssets: template.pageAssets,
    });

    // 템플릿 생성 실패 시
    if (error) {
      enqueueSnackbar("페이지 제작 실패", { variant: "error" });
      return;
    }

    // 템플릿 제작 데이터 초기화
    initTemplate();

    // 템플릿 제작 로딩 종료
    setIsCreateLoading(false);

    // 페이지 제작 완료 알림
    enqueueSnackbar("페이지 제작 완료!", { variant: "success" });

    // 템플릿 제작 완료 후 템플릿 상세 페이지로 이동
    navigateWithLoading(`/templates/${data.id}`);
  }

  return (
    <>
      {isCreateLoading && <Loading />}

      <Container open={open} onClose={handleClose}>
        <StyledDialogTitle> 템플릿을 공개할까요?</StyledDialogTitle>
        <StyledDialogContent>
          <StyledDialogContentText>
            나만 쓰기엔 아까운 템플릿
            <br />
            다른 사람에게도 도움이 될 수 있어요!
          </StyledDialogContentText>
        </StyledDialogContent>
        <DialogActions>
          <PrivateButton onClick={() => handleCreateTemplate(false)}>비공개</PrivateButton>
          <PublicButton onClick={() => handleCreateTemplate(true)} autoFocus variant="contained">
            공개
          </PublicButton>
        </DialogActions>
      </Container>
    </>
  );
};

export default SelectPublic;

const Container = styled(Dialog)`
  width: 400px;

  & .MuiBackdrop-root {
    background-color: transparent;
  }

  & .MuiPaper-root {
    margin: 0;
    box-shadow: none;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.palette.primary.main};
    width: 300px;
    height: 200px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  color: ${({ theme }) => theme.palette.primary.dark};
  padding: 16px 24px 8px 24px;
`;

const StyledDialogContent = styled(DialogContent)`
  padding-bottom: 0;
`;

const StyledDialogContentText = styled(DialogContentText)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

const PrivateButton = styled(Button)``;

const PublicButton = styled(Button)`
  ${mixinMuiButtonNoShadow}
  color: ${({ theme }) => theme.palette.text.white};
`;
