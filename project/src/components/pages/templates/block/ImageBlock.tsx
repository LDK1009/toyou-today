import { ImageBlockType } from "@/types/template/blockType";
import { Box, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";
import { AnimationBlock } from "./AnimationBlock";
import { ImageNotSupportedRounded } from "@mui/icons-material";

const ImageBlock = ({ blockData, preview = false }: { blockData: ImageBlockType; preview?: boolean }) => {
  const { imgSrc, align, animation } = blockData;

  const justifyStyle = {
    left: {
      justifyContent: "flex-start",
    },
    right: {
      justifyContent: "flex-end",
    },
    center: {
      justifyContent: "center",
    },
  };

  return (
    <Box sx={{ display: "flex", ...justifyStyle[align], alignItems: "center", width: preview ? "100%" : "auto" }}>
      {imgSrc ? (
        <AnimationBlock animationType={animation}>
          <ImageWrapper sx={{ minWidth: preview ? "100px" : "200px" }}>
            <Image src={imgSrc} alt="이미지" fill />
          </ImageWrapper>
        </AnimationBlock>
      ) : (
        <Stack alignItems="center" justifyContent="center" rowGap={1}>
          <ImageNotSupportedRounded color="primary" fontSize="large" />
          <Typography variant="caption" color="text.secondary">
            이미지 불러오기 실패
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default ImageBlock;

const ImageWrapper = styled(Box)`
  position: relative;
  width: 100%;
  height: auto;
  min-width: 200px;
  min-height: 200px;

  & img {
    object-fit: contain;
    border-radius: 16px;
  }
`;
