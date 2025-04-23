import { mixinFlex } from "@/styles/mixins";
import { SpaceBlockType } from "@/types/template/blockType";
import { Box, Stack, styled, Typography } from "@mui/material";
import { shouldForwardProp } from "@/utils/mui";
const SpaceBlock = ({ blockData, preview = false }: { blockData: SpaceBlockType; preview?: boolean }) => {
  return (
    <Container $preview={preview}>
      {preview && <Text variant="body1">빈 공간 생성</Text>}

      <SpaceBox $height={blockData.height} $preview={preview}></SpaceBox>
    </Container>
  );
};

export default SpaceBlock;

type ContainerProps = {
  $preview: boolean;
};

const Container = styled(Stack, { shouldForwardProp })<ContainerProps>`
  position: relative;
  height: 100px;
  ${mixinFlex("column", "center", "center")}
  border: ${({ $preview, theme }) => ($preview ? `3px dashed ${theme.palette.divider}` : "none")};
`;

type SpaceBoxProps = {
  $height: number;
  $preview: boolean;
};

const SpaceBox = styled(Box, { shouldForwardProp })<SpaceBoxProps>`
  width: 100%;
  height: ${({ $height }) => $height}px;
  background-color: ${({ theme, $preview }) => ($preview ? theme.palette.primary.main : "transparent")};
  transition: all 0.3s ease;
`;

const Text = styled(Typography)`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.palette.primary.main};
`;
