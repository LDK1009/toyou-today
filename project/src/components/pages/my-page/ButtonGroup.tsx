import { deleteUser, signOut } from "@/service/auth";
import { useAuthStore } from "@/store";
import { mixinFlex, mixinBorderRadius } from "@/styles/mixins";
import { styled, Button, Paper, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { LogoutOutlined, PersonRemoveOutlined } from "@mui/icons-material";

//////////////////////////////////////// Component ////////////////////////////////////////

/**
 * 버튼 그룹 컴포넌트
 * 로그아웃 및 회원탈퇴 기능 제공
 */
const ButtonGroup = () => {
  //////////////////////////////////////// State ////////////////////////////////////////
  
  // 회원탈퇴 확인 다이얼로그 상태
  const [openDialog, setOpenDialog] = useState(false);
  
  //////////////////////////////////////// Store ////////////////////////////////////////
  
  // 전역 상태 관리
  const { initUser, user } = useAuthStore();

  //////////////////////////////////////// Hooks ////////////////////////////////////////
  
  // 라우터 훅
  const router = useRouter();

  //////////////////////////////////////// Handlers ////////////////////////////////////////
  
  // 다이얼로그 열기/닫기 핸들러
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  /**
   * 로그아웃 처리 함수
   */
  async function handleSignOut() {
    const { error } = await signOut();
    if (!error) {
      enqueueSnackbar("로그아웃 되었습니다", { variant: "success" });
      initUser();
      router.push("/");
    } else {
      enqueueSnackbar("로그아웃 중 오류가 발생했습니다", { variant: "error" });
    }
  }

  /**
   * 회원탈퇴 처리 함수
   */
  async function handleDeleteUser() {
    handleCloseDialog();
    
    try {
      // 로그아웃 및 회원탈퇴 요청
      const { error: signOutError } = await signOut();
      const { error: deleteUserError } = await deleteUser(user.uid);

      // 결과 처리
      if (!deleteUserError) {
        enqueueSnackbar("회원탈퇴가 완료되었습니다", { variant: "success" });
        initUser();
        router.push("/");
      } else {
        if (signOutError) {
          enqueueSnackbar("로그아웃 중 오류가 발생했습니다", { variant: "error" });
        }
        enqueueSnackbar("회원탈퇴 중 오류가 발생했습니다", { variant: "error" });
        console.error(deleteUserError);
      }
    } catch (error) {
      enqueueSnackbar("처리 중 오류가 발생했습니다", { variant: "error" });
      console.error(error);
    }
  }

  //////////////////////////////////////// Render ////////////////////////////////////////
  
  return (
    <>
      {/* 버튼 그룹 컨테이너 */}
      <Container>
        <SectionTitle variant="subtitle1" fontWeight="bold">계정 관리</SectionTitle>
        <ButtonsCard elevation={2}>
          {/* 로그아웃 버튼 */}
          <LogoutButton 
            variant="contained" 
            color="primary"
            startIcon={<LogoutOutlined />}
            onClick={handleSignOut}
            sx={{ color: "white" }}
          >
            로그아웃
          </LogoutButton>
          
          {/* 회원탈퇴 버튼 */}
          <DeleteButton 
            variant="outlined" 
            color="error"
            startIcon={<PersonRemoveOutlined />}
            onClick={handleOpenDialog}
          >
            회원탈퇴
          </DeleteButton>
        </ButtonsCard>
      </Container>
      
      {/* 회원탈퇴 확인 다이얼로그 */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>회원탈퇴 확인</DialogTitle>
        <DialogContent>
          <DialogContentText>
            정말로 회원탈퇴를 진행하시겠습니까? 이 작업은 되돌릴 수 없으며, 모든 계정 정보가 삭제됩니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            취소
          </Button>
          <Button onClick={handleDeleteUser} color="error" variant="contained">
            회원탈퇴
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ButtonGroup;

//////////////////////////////////////// Styles ////////////////////////////////////////

// 버튼 그룹 컨테이너 스타일
const Container = styled("div")`
  ${mixinFlex("column")};
  width: 100%;
  gap: 16px;
  align-items: flex-start;
`;

// 섹션 제목 스타일
const SectionTitle = styled(Typography)`
  margin-bottom: -8px;
`;

// 버튼 카드 스타일
const ButtonsCard = styled(Paper)`
  ${mixinFlex("column")};
  width: 100%;
  padding: 16px;
  gap: 12px;
  ${mixinBorderRadius("medium")};
`;

// 로그아웃 버튼 스타일
const LogoutButton = styled(Button)`
  width: 100%;
  height: 48px;
  text-transform: none;
  font-weight: 500;
`;

// 회원탈퇴 버튼 스타일
const DeleteButton = styled(Button)`
  width: 100%;
  height: 48px;
  text-transform: none;
  font-weight: 500;
`;
