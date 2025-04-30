import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import { mixinMuiButtonNoShadow } from "@/styles/mixins";
import { FolderCopyOutlined, KeyboardArrowRightRounded } from "@mui/icons-material";
import { Button, styled } from "@mui/material";
import { TemplateType } from "@/types/template/templateType";
import { useRouter } from "next/navigation";

const CopyButton = ({ template }: { template: TemplateType }) => {
  const { setTemplate } = useMakeTemplateStore();
  const router = useRouter();

  function handleCopyTemplate() {
    setTemplate(template);
    router.push("/templates/make");
  }

  return (
    <Container
      onClick={handleCopyTemplate}
      variant="outlined"
      color="primary"
      startIcon={<FolderCopyOutlined />}
      endIcon={<KeyboardArrowRightRounded />}
    >
      이 템플릿으로 시작하기
    </Container>
  );
};

export default CopyButton;

const Container = styled(Button)`
  width: 100%;
  ${mixinMuiButtonNoShadow()}
`;
