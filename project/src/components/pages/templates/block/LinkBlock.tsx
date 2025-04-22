import { Button } from "@mui/material";
import { LinkBlockType } from "@/types/template/blockType";
import { ArrowForwardIosRounded } from "@mui/icons-material";

const LinkBlock = ({ blockData }: { blockData: LinkBlockType }) => {
  const { text, url, textColor, buttonColor } = blockData;
  return (
    <Button 
      variant="contained" 
      href={url || "https://www.toyou-today.site/"} 
      target="_blank" 
      sx={{ 
        backgroundColor: buttonColor, 
        color: textColor, 
        boxShadow: "none", 
        ":hover": { backgroundColor: buttonColor, color: textColor },
        "& .MuiButton-endIcon": {
          position: "absolute",
          right: 16,
        },
      }}
      fullWidth
      endIcon={<ArrowForwardIosRounded />}
    >
      {text || "링크"}
    </Button>
  );
};

export default LinkBlock;
