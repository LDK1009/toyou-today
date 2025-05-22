import { mixinFlex, mixinMultilineEllipsis } from "@/styles/mixins";
import { TemplateType } from "@/types/template/templateType";
import { formatDateWithDot } from "@/utils/time";
import { DeleteOutlineRounded, InsertLinkRounded } from "@mui/icons-material";
import { Stack, styled, Typography } from "@mui/material";
import React from "react";
import { enqueueSnackbar } from "notistack";
import { useMyPageListStore } from "@/store/my-page/myPageList";
import { useLoadingRouter } from "@/hooks/useLoadingRouter";
import Image from "next/image";
import { shareMessage } from "@/utils/kakao";

const PageItem = ({ pageData }: { pageData: TemplateType }) => {
  const { navigateWithLoading } = useLoadingRouter();
  const { deletePage } = useMyPageListStore();

  // 페이지 삭제
  async function handleRemove(e: React.MouseEvent) {
    e.stopPropagation();
    const result = confirm("정말로 페이지를 삭제하시겠습니까?");
    if (result) {
      await deletePage(pageData.id);
      enqueueSnackbar("페이지가 삭제되었습니다.", {
        variant: "success",
      });
    }
  }

  // 페이지 링크 복사
  async function handleLink(e: React.MouseEvent) {
    e.stopPropagation(); // 부모 컨테이너의 onClick 이벤트 전파 방지
    const url = `${window.location.origin}/templates/${pageData.id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        enqueueSnackbar("링크가 클립보드에 복사되었습니다.", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.error("링크 복사 실패:", err);
        enqueueSnackbar("링크 복사에 실패했습니다.", {
          variant: "error",
        });
      });
  }

  const handleKakaoShare = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 컨테이너의 onClick 이벤트 전파 방지
    shareMessage(pageData);
  };

  // 카카오 버튼 컴포넌트
  const KakaoShareButton = () => {
    return (
      <Stack alignItems="center" justifyContent="center" width={24} height={24} onClick={handleKakaoShare}>
        <Image src="/svg/kakao-icon.svg" alt="카카오 아이콘" width={18} height={18} />
      </Stack>
    );
  };

  return (
    <Container onClick={() => navigateWithLoading(`/templates/${pageData.id}`)}>
      <TextWrapper>
        <CreatedAt variant="caption">{formatDateWithDot(pageData.createdAt)}</CreatedAt>
        <PageName variant="body2">{pageData.name}</PageName>
      </TextWrapper>
      <ButtonWrapper>
        <KakaoShareButton />
        <LinkButton onClick={handleLink} />
        <RemoveButton onClick={handleRemove} />
      </ButtonWrapper>
    </Container>
  );
};

export default PageItem;

const Container = styled(Stack)`
  ${mixinFlex("row", "space-between", "center")}
  column-gap: 16px;
  border-radius: 8px;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const TextWrapper = styled(Stack)`
  row-gap: 4px;
`;

const ButtonWrapper = styled(Stack)`
  flex-direction: row;
  column-gap: 8px;
`;

const CreatedAt = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const PageName = styled(Typography)`
  ${mixinMultilineEllipsis(1)}
`;

const RemoveButton = styled(DeleteOutlineRounded)`
  color: ${({ theme }) => theme.palette.error.main};
`;

const LinkButton = styled(InsertLinkRounded)`
  color: ${({ theme }) => theme.palette.primary.dark};
  transform: rotate(-30deg);
`;
