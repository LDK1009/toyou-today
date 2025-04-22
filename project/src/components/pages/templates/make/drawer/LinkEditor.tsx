import { Button } from "@mui/material";

import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import { useAddBlockDrawerStore } from "@/store/ui/addBlockDrawerStore";
import { AddRounded } from "@mui/icons-material";
import { styled } from "@mui/material";

const LinkEditor = () => {
  // 비디오 블록 추가
  const { addBlock } = useMakeTemplateStore();
  // 블록 추가 드래그 메뉴 열기
  const { setIsOpen: setIsOpenAddBlockDrawer } = useAddBlockDrawerStore();

  // 링크 블록 추가
  function handleAddLinkButtonClick() {
    addBlock({
      variant: "link",
      content: {
        url: "",
        text: "",
        textColor: "",
        buttonColor: "",
      },
    });
    setIsOpenAddBlockDrawer(false);
  }

  return (
    <div>
      <AddButton onClick={handleAddLinkButtonClick} startIcon={<AddRounded />} variant="contained" fullWidth>
        추가
      </AddButton>
    </div>
  );
};

export default LinkEditor;

const AddButton = styled(Button)`
  color: ${({ theme }) => theme.palette.text.white};
`;
