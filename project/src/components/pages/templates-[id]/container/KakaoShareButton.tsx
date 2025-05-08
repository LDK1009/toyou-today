import { mixinMuiCircleShapeButton } from "@/styles/mixins";
import { mixinMuiButtonNoShadow } from "@/styles/mixins";
import { styled } from "@mui/material";
import { Button } from "@mui/material";
import Image from "next/image";

const KakaoShareButton = () => {
    
  return (
    <Container variant="outlined">
      <Image src="/svg/kakao-icon.svg" alt="카카오 아이콘" width={20} height={20} />
    </Container>
  );
};

export default KakaoShareButton;

const Container = styled(Button)`
  ${mixinMuiButtonNoShadow}
  ${mixinMuiCircleShapeButton(50)}
`;
