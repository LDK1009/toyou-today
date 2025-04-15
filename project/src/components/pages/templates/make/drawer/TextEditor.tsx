import { Button, TextField } from "@mui/material";
import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import { TextBlockType } from "@/types/template/blockType";
import { useState } from "react";
const TextEditor = () => {
  const { addBlock } = useMakeTemplateStore();

  const [editBlockState, setEditBlockState] = useState<TextBlockType>({
    text: "",
    fontSize: 1,
    color: "#000000",
    fontWeight: "normal",
    animation: "none",
    textAlign: "left",
  });

  return (
    <div>
      <h6>텍스트 에디터</h6>
      <TextField
        value={editBlockState.text}
        onChange={(e) => setEditBlockState({ ...editBlockState, text: e.target.value })}
      ></TextField>
      <Button onClick={() => addBlock({ variant: "text", content: editBlockState })}>추가</Button>
    </div>
  );
};

export default TextEditor;
