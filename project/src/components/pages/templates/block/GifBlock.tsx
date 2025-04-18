import { GifBlockType } from "@/types/template/blockType";
import { Box, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";
import { AnimationBlock } from "./AnimationBlock";
import { ImageNotSupportedRounded } from "@mui/icons-material";

const GifBlock = ({ blockData, preview = false }: { blockData: GifBlockType; preview?: boolean }) => {
  const { gifSrc, align, animation } = blockData;

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
      {gifSrc ? (
        <AnimationBlock animationType={animation}>
          <ImageWrapper sx={{ minWidth: preview ? "100px" : "200px", minHeight: preview ? "100px" : "200px" }}>
            <Image src={gifSrc} alt="gif" fill />
          </ImageWrapper>
        </AnimationBlock>
      ) : (
        <Stack alignItems="center" justifyContent="center" rowGap={1}>
          <ImageNotSupportedRounded color="primary" fontSize="large" />
          <Typography variant="caption" color="text.secondary">
            gif 불러오기 실패
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default GifBlock;

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
