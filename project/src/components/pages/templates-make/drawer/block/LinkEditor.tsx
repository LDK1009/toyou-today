import { Stack, TextField, Typography } from "@mui/material";

import { styled } from "@mui/material";
import { ColorPicker } from "./CommonPicker";
import { LinkBlockType } from "@/types/template/blockType";
import LinkBlock from "../../../templates/block/LinkBlock";
import CommonAddButton from "./CommonAddButton";
import { useAddBlockDrawerStore } from "@/store";

const LinkEditor = () => {
  // 블록 상태 초기화값
  const initBlockState: LinkBlockType = {
    text: "",
    url: "",
    textColor: "#FFFFFF",
    buttonColor: "#FFB6B9",
  };

  // 전역 블록 상태
  const { blockEditorState, setBlockEditorState } = useAddBlockDrawerStore();

  // 블록 존재 여부
  const isLinkBlockExist =
    blockEditorState &&
    "text" in blockEditorState &&
    "url" in blockEditorState &&
    "textColor" in blockEditorState &&
    "buttonColor" in blockEditorState;

  // 블록 상태
  const blockState = isLinkBlockExist ? (blockEditorState as LinkBlockType) : initBlockState;

  // 블록 상태 수정
  const setBlockState = (newBlockState: LinkBlockType) => {
    setBlockEditorState(newBlockState);
  };

  // 텍스트 색상 변경
  function handleTextColorChange(color: string) {
    setBlockState({ ...blockState, textColor: color });
  }

  // 버튼 색상 변경
  function handleButtonColorChange(color: string) {
    setBlockState({ ...blockState, buttonColor: color });
  }

  // 버튼 텍스트 변경
  function handleButtonTextChange(text: string) {
    setBlockState({ ...blockState, text: text });
  }
  // URL 변경
  function handleUrlChange(url: string) {
    setBlockState({ ...blockState, url: url });
  }

  // 카테고리 목록
  const categories = [
    {
      label: "미리보기",
      component: blockState.text ? <LinkBlock blockData={blockState} /> : null,
    },
    {
      label: "텍스트 색상",
      component: <ColorPicker currentColor={blockState.textColor} handleColorBoxClick={handleTextColorChange} />,
    },
    {
      label: "버튼 색상",
      component: <ColorPicker currentColor={blockState.buttonColor} handleColorBoxClick={handleButtonColorChange} />,
    },
    {
      label: "버튼 텍스트",
      component: (
        <TextField
          value={blockState.text}
          onChange={(e) => handleButtonTextChange(e.target.value)}
          placeholder="버튼 텍스트를 입력해주세요."
        />
      ),
    },
    {
      label: "링크 URL",
      component: (
        <TextField
          value={blockState.url}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="URL을 입력해주세요."
        />
      ),
    },
  ];

  return (
    <Container>
      <CategoryContainer>
        {categories.map((category) => {
          return (
            <Stack key={category.label} rowGap={0.5}>
              <Title>{category.label}</Title>
              {category.component}
            </Stack>
          );
        })}
      </CategoryContainer>

      {/* 추가 버튼 */}
      <CommonAddButton blockState={{ variant: "link", content: blockState }} />
    </Container>
  );
};

export default LinkEditor;

const Container = styled(Stack)`
  row-gap: 16px;
`;

const CategoryContainer = styled(Stack)`
  row-gap: 16px;
`;

const Title = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
`;
