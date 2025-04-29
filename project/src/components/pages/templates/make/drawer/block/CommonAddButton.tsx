"use client";

import { Button } from "@mui/material";
import { styled } from "@mui/material";
import { AddRounded, EditRounded } from "@mui/icons-material";
import { useHandleEditor } from "@/hooks/useHandleEditor";
import { BlockType } from "@/types/template/blockType";
import { useAddBlockDrawerStore } from "@/store";

const CommonAddButton = ({ blockState, validation, disabled }: { blockState: BlockType; validation?: () => void; disabled?: boolean }) => {
  const { handleSubmitButtonClick } = useHandleEditor();
  const { editMode } = useAddBlockDrawerStore();
  return (
    <AddButton
      onClick={() => {
        if (validation) {
          validation();
        }
        handleSubmitButtonClick(blockState);
      }}
      startIcon={editMode ? <EditRounded /> : <AddRounded />}
      variant="contained"
      disabled={disabled}
      fullWidth
    >
      {editMode ? "수정" : "추가"}
    </AddButton>
  );
};

export default CommonAddButton;

const AddButton = styled(Button)`
  color: ${({ theme }) => theme.palette.text.white};
`;
