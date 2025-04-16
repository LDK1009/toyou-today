import { Box, Button, Grid2, Stack, styled, TextField } from "@mui/material";
import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import { TextBlockType } from "@/types/template/blockType";
import { useState } from "react";
import { FormatAlignCenterRounded } from "@mui/icons-material";
import { FormatAlignRightRounded } from "@mui/icons-material";
import { FormatAlignLeftRounded } from "@mui/icons-material";

const TextEditor = () => {
  const { addBlock } = useMakeTemplateStore();

  const [editBlockState, setEditBlockState] = useState<TextBlockType>({
    textAlign: "left",
    color: "#000000",
    text: "",
    fontSize: 1,
    fontWeight: "normal",
    animation: "none",
  });

  // 텍스트 블록 상태 수정 함수
  function setEditBlockStateProperty(key: string, value: string | number) {
    setEditBlockState({ ...editBlockState, [key]: value });
  }

  return (
    <Container container>
      <GridItem size={12}>
        <h6>미리보기</h6>
      </GridItem>
      <GridItem size={6}>
        <h6>정렬</h6>
        <AlignPicker currentAlign={editBlockState.textAlign} setEditBlockStateProperty={setEditBlockStateProperty} />
      </GridItem>
      <GridItem size={6}>
        <h6>폰트 사이즈</h6>
      </GridItem>
      <GridItem size={6}>
        <h6>두께</h6>
      </GridItem>
      <GridItem size={6}>
        <h6>애니메이션</h6>
      </GridItem>
      <GridItem size={12}>
        <h6>컬러</h6>
        <ColorPicker currentColor={editBlockState.color} setEditBlockStateProperty={setEditBlockStateProperty} />
      </GridItem>
      <GridItem size={12}>
        <h6>텍스트</h6>
        <TextField
          value={editBlockState.text}
          onChange={(e) => setEditBlockState({ ...editBlockState, text: e.target.value })}
        ></TextField>
        <Button onClick={() => addBlock({ variant: "text", content: editBlockState })}>추가</Button>
      </GridItem>
    </Container>
  );
};

export default TextEditor;

////////////////////////////// 하위 컴포넌트 //////////////////////////////
////////// 정렬 선택기
type AlignPickerProps = {
  currentAlign: string;
  setEditBlockStateProperty: (key: string, value: string | number) => void;
};

const AlignPicker = ({ currentAlign, setEditBlockStateProperty }: AlignPickerProps) => {
  const alignments = [
    { value: "left", icon: <FormatAlignLeftRounded /> },
    { value: "center", icon: <FormatAlignCenterRounded /> },
    { value: "right", icon: <FormatAlignRightRounded /> },
  ];

  return (
    <AlignPickerContainer>
      {alignments.map((alignment, idx) => (
        <AlignPickerBoxWrapper
          key={idx}
          isSelected={alignment.value === currentAlign}
          onClick={() => setEditBlockStateProperty("textAlign", alignment.value)}
        >
          <AlignPickerBox isSelected={alignment.value === currentAlign}>{alignment.icon}</AlignPickerBox>
        </AlignPickerBoxWrapper>
      ))}
    </AlignPickerContainer>
  );
};

const AlignPickerContainer = styled(Stack)`
  flex-direction: row;
  justify-content: space-between;
`;

const AlignPickerBoxWrapper = styled(Stack)<{ isSelected: boolean }>`
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme, isSelected }) => (isSelected ? theme.palette.primary.main : "#EEEEEE")};
  border-radius: 8px;
  cursor: pointer;

  transition: all 0.3s ease;
`;

const AlignPickerBox = styled("div")<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin: 4px;
  border-radius: 8px;

  & svg {
    color: ${({ theme, isSelected }) => (isSelected ? theme.palette.text.primary : theme.palette.text.secondary)};
  }
`;

////////// 컬러 선택기
type ColorPickerProps = {
  currentColor: string;
  setEditBlockStateProperty: (key: string, value: string | number) => void;
};

const ColorPicker = ({ currentColor, setEditBlockStateProperty }: ColorPickerProps) => {
  const colors = [
    "#FF0000", // 빨강
    "#FF7F00", // 주황
    "#FFFF00", // 노랑
    "#00FF00", // 초록
    "#0000FF", // 파랑
    "#4B0082", // 남색
    "#9400D3", // 보라
    "#FF1493", // 분홍
    "#8B4513", // 갈색
    "#000000", // 검정
    "#808080", // 회색
    "#FFFFFF", // 흰색
  ];

  return (
    <ColorPickerContainer>
      {colors.map((color, idx) => (
        <ColorPickerBoxWrapper
          key={idx}
          color={color}
          isSelected={color === currentColor}
          onClick={() => setEditBlockStateProperty("color", color)}
        >
          <ColorPickerBox color={color} />
        </ColorPickerBoxWrapper>
      ))}
    </ColorPickerContainer>
  );
};

const ColorPickerContainer = styled(Stack)`
  flex-direction: row;
  column-gap: 4px;
  width: 100%;
  overflow-x: scroll;
  /* Chrome, Safari, Opera*/
  ::-webkit-scrollbar {
    display: none;
  }

  /* Firefox */
  scrollbar-width: none;

  /* IE and Edge */
  -ms-overflow-style: none;
`;

const ColorPickerBoxWrapper = styled("div")<{ color: string; isSelected: boolean }>`
  border-width: 2px;
  border-style: solid;
  border-color: ${({ isSelected, color }) => (isSelected ? color : "#EEEEEE")};
  border-radius: 8px;
  cursor: pointer;

  transition: all 0.3s ease;
`;

const ColorPickerBox = styled("div")<{ color: string }>`
  width: 24px;
  height: 24px;
  margin: 4px;
  background-color: ${({ color }) => color};
  border-radius: 8px;
`;

////////// 폰트 사이즈 선택기
const FontSizePicker = () => {
  return <div>FontSizePicker</div>;
};

////////// 두께 선택기
const FontWeightPicker = () => {
  return <div>FontWeightPicker</div>;
};

////////// 애니메이션 선택기
const AnimationPicker = () => {
  return <div>AnimationPicker</div>;
};

////////////////////////////// 스타일 //////////////////////////////
const Container = styled(Grid2)``;

const GridItem = styled(Grid2)``;
