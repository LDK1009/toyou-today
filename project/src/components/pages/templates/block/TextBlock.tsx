import { TextBlockType } from "@/types/template/blockType";
import { AnimationBlock } from "./AnimationBlock";
import { Box, Typography } from "@mui/material";

const TextBlock = ({ blockData }: { blockData: TextBlockType }) => {
  const { text, fontWeight, color, textAlign, animation, fontSize } = blockData;

  const variant =
    fontSize === 1 ? "caption" : fontSize === 2 ? "body1" : fontSize === 3 ? "h5" : fontSize === 4 ? "h3" : "h1";

  return (
    <Box>
      <AnimationBlock animationType={animation}>
        <Typography variant={variant} fontWeight={fontWeight} color={color} align={textAlign} whiteSpace="pre-wrap">
          {text}
        </Typography>
      </AnimationBlock>
    </Box>
  );
};

export default TextBlock;
