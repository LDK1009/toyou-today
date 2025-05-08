import { mixinMuiButtonNoShadow, mixinMuiCircleShapeButton } from "@/styles/mixins";
import { LinkRounded } from "@mui/icons-material";
import { Button, styled } from "@mui/material";
import { enqueueSnackbar } from "notistack";

const CopyLinkButton = ({ templateId }: { templateId: number }) => {

  // 페이지 링크 복사
  async function handleLink(e: React.MouseEvent) {
    e.stopPropagation(); // 부모 컨테이너의 onClick 이벤트 전파 방지
    const url = `${window.location.origin}/templates/${templateId}`;
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
  
  return (
    <Container onClick={handleLink} variant="outlined">
      <LinkRounded />
    </Container>
  );
};

export default CopyLinkButton;

const Container = styled(Button)`
  ${mixinMuiButtonNoShadow}
  ${mixinMuiCircleShapeButton(50)}

  & .MuiSvgIcon-root {
    width: 32px;
    height: 32px;
    transform: rotate(-30deg);
  }
`;
