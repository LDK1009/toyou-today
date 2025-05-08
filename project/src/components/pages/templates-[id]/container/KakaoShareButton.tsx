import { mixinMuiCircleShapeButton } from "@/styles/mixins";
import { mixinMuiButtonNoShadow } from "@/styles/mixins";
import { TemplateType } from "@/types/template/templateType";
import { styled } from "@mui/material";
import { Button } from "@mui/material";
import Image from "next/image";

const KakaoShareButton = ({ templateData }: { templateData: TemplateType }) => {
  function shareMessage() {
    // @ts-expect-error - window.Kakao 타입이 전역에 정의되지 않음
    window.Kakao.Share.sendScrap({
      requestUrl: `${window.location.origin}/templates/${templateData.id}`,
      templateId: 120404,
      templateArgs: {
        title: `🎁 소중한 ${templateData.name} 님을 위한 페이지가 도착했어요`,
        content: "선물받은 페이지를 확인해보세요!",
        templateId: templateData.id,
      },
    });
  }

  return (
    <Container variant="outlined" onClick={shareMessage}>
      <Image src="/svg/kakao-icon.svg" alt="카카오 아이콘" width={20} height={20} />
    </Container>
  );
};

export default KakaoShareButton;

const Container = styled(Button)`
  ${mixinMuiButtonNoShadow}
  ${mixinMuiCircleShapeButton(50)}
`;
