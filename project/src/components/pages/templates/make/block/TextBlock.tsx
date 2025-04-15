import { TextBlockType } from "@/types/template/blockType";
import { Typography } from "@mui/material";

const TextBlock = ({ blockData }: { blockData: TextBlockType }) => {
    return (
        <div>
            <Typography variant="h6">{blockData.text}</Typography>
            <Typography variant="body1">{blockData.fontSize}</Typography>
            <Typography variant="body1">{blockData.color}</Typography>
            <Typography variant="body1">{blockData.fontWeight}</Typography>
            <Typography variant="body1">{blockData.animation}</Typography>
            <Typography variant="body1">{blockData.textAlign}</Typography>
        </div>
    );
};

export default TextBlock;