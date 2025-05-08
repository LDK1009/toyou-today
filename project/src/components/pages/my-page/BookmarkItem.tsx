import { useBookmarkListStore } from "@/store/my-page/bookmarkList";
import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import { mixinFlex } from "@/styles/mixins";
import { TemplateType } from "@/types/template/templateType";
import { DeleteOutlineRounded, FolderCopyOutlined } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/material";
import React from "react";
import { enqueueSnackbar } from "notistack";
import { useLoadingRouter } from "@/hooks/useLoadingRouter";

const BookmarkItem = ({ templateData }: { templateData: TemplateType }) => {
  const { deleteBookmark } = useBookmarkListStore();
  const { setTemplate } = useMakeTemplateStore();
  const { navigateWithLoading } = useLoadingRouter();
  
  function handleCopyTemplate(e: React.MouseEvent) {
    e.stopPropagation(); // 부모 컨테이너의 onClick 이벤트 전파 방지
    setTemplate(templateData);
    navigateWithLoading("/templates/make");
  }

  async function handleDeleteBookmark(e: React.MouseEvent) {
    e.stopPropagation(); // 부모 컨테이너의 onClick 이벤트 전파 방지

    const result = confirm("정말로 템플릿을 삭제하시겠습니까?");
    if (result) {
      await deleteBookmark(Number(templateData.id));
      enqueueSnackbar("템플릿이 삭제되었습니다.", {
        variant: "success",
      });
    }
  }

  return (
    <Container onClick={handleCopyTemplate}>
      <Typography variant="body2">{templateData.name}</Typography>
      <ButtonWrapper>
        <CopyTemplateButton onClick={handleCopyTemplate} />
        <DeleteButton onClick={handleDeleteBookmark} />
      </ButtonWrapper>
    </Container>
  );
};

export default BookmarkItem;

const Container = styled(Stack)`
  ${mixinFlex("row", "space-between", "center")}
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const ButtonWrapper = styled(Stack)`
  flex-direction: row;
  column-gap: 8px;
`;

const CopyTemplateButton = styled(FolderCopyOutlined)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

const DeleteButton = styled(DeleteOutlineRounded)`
  color: ${({ theme }) => theme.palette.error.main};
`;
