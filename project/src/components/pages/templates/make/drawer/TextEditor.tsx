import { Button, Grid2, Stack, styled, TextField, Typography } from "@mui/material";
import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import { TextBlockType } from "@/types/template/blockType";
import React, { useState } from "react";
import {
  AddRounded,
  CachedRounded,
  DoNotDisturbAltRounded,
  FormatAlignCenterRounded,
  KeyboardDoubleArrowDownRounded,
  KeyboardDoubleArrowLeftRounded,
  KeyboardDoubleArrowRightRounded,
  KeyboardDoubleArrowUpRounded,
} from "@mui/icons-material";
import { FormatAlignRightRounded } from "@mui/icons-material";
import { FormatAlignLeftRounded } from "@mui/icons-material";
import { useAddBlockDrawerStore } from "@/store/ui/addBlockDrawerStore";
import TextBlock from "../../block/TextBlock";

const TextEditor = () => {
  ////////////////////////////// state //////////////////////////////
  // 텍스트 블록 추가 함수
  const { addBlock } = useMakeTemplateStore();
  const { setIsOpen: setAddBlockDrawerIsOpen } = useAddBlockDrawerStore();
  ////////////////////////////// Variables //////////////////////////////
  // 추가 텍스트 블록 상태
  const [editBlockState, setEditBlockState] = useState<TextBlockType>({
    textAlign: "left",
    fontSize: 1,
    fontWeight: "normal",
    animation: "none",
    color: "#000000",
    text: "",
  });

  ////////////////////////////// Fuctions //////////////////////////////
  // 텍스트 블록 상태 수정 함수
  function setEditBlockStateProperty(key: string, value: string | number) {
    setEditBlockState({ ...editBlockState, [key]: value });
  }

  function handleAddButtonClick() {
    addBlock({ variant: "text", content: editBlockState });
    setAddBlockDrawerIsOpen(false);
  }

  ////////////////////////////// Variables //////////////////////////////
  const editCategories = [
    {
      label: "미리보기",
      gridSize: 12,
      component: <TextBlock blockData={editBlockState} />,
    },
    {
      label: "정렬",
      gridSize: 5,
      component: (
        <AlignPicker currentAlign={editBlockState.textAlign} setEditBlockStateProperty={setEditBlockStateProperty} />
      ),
    },
    {
      label: "크기",
      gridSize: 7,
      component: (
        <FontSizePicker
          currentFontSize={editBlockState.fontSize}
          setEditBlockStateProperty={setEditBlockStateProperty}
        />
      ),
    },
    {
      label: "두께",
      gridSize: 5,
      component: (
        <FontWeightPicker
          currentFontWeight={editBlockState.fontWeight}
          setEditBlockStateProperty={setEditBlockStateProperty}
        />
      ),
    },
    {
      label: "애니메이션",
      gridSize: 7,
      component: (
        <AnimationPicker
          currentAnimation={editBlockState.animation}
          setEditBlockStateProperty={setEditBlockStateProperty}
        />
      ),
    },
    {
      label: "컬러",
      gridSize: 12,
      component: (
        <ColorPicker currentColor={editBlockState.color} setEditBlockStateProperty={setEditBlockStateProperty} />
      ),
    },
    {
      label: "텍스트",
      gridSize: 12,
      component: (
        <TextField
          value={editBlockState.text}
          onChange={(e) => setEditBlockStateProperty("text", e.target.value)}
          fullWidth
          multiline
          rows={2}
        />
      ),
    },
  ];

  return (
    <Container container rowSpacing={2}>
      {editCategories.map((category, idx) => (
        <GridItem key={idx} size={category.gridSize}>
          <Typography variant="body2">{category.label}</Typography>
          {category.component}
        </GridItem>
      ))}

      <GridItem size={12}>
        <AddButton startIcon={<AddRounded />} variant="contained" onClick={handleAddButtonClick} fullWidth>
          추가
        </AddButton>
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
  justify-content: start;
  column-gap: 4px;
`;

type AlignPickerBoxWrapperProps = {
  isSelected: boolean;
};

const AlignPickerBoxWrapper = styled("div")<AlignPickerBoxWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme, isSelected }) => (isSelected ? theme.palette.primary.main : "#EEEEEE")};
  border-radius: 8px;
  cursor: pointer;

  transition: all 0.3s ease;
`;

type AlignPickerBoxProps = {
  isSelected: boolean;
};

const AlignPickerBox = styled("div")<AlignPickerBoxProps>`
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

////////// 폰트 선택기
type FontSizePickerProps = {
  currentFontSize: number;
  setEditBlockStateProperty: (key: string, value: string | number) => void;
};

const FontSizePicker = ({ currentFontSize, setEditBlockStateProperty }: FontSizePickerProps) => {
  const fontSizes = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }];

  return (
    <FontSizePickerContainer>
      {fontSizes.map((fontSize, idx) => (
        <FontSizePickerBoxWrapper
          key={idx}
          onClick={() => setEditBlockStateProperty("fontSize", fontSize.value)}
          isSelected={fontSize.value === currentFontSize}
        >
          <FontSizePickerBox isSelected={fontSize.value === currentFontSize}>{fontSize.value}</FontSizePickerBox>
        </FontSizePickerBoxWrapper>
      ))}
    </FontSizePickerContainer>
  );
};

const FontSizePickerContainer = styled(Stack)`
  flex-direction: row;
  column-gap: 4px;
  width: 100%;
`;

type FontSizePickerBoxWrapperProps = {
  isSelected: boolean;
};

const FontSizePickerBoxWrapper = styled("div")<FontSizePickerBoxWrapperProps>`
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme, isSelected }) => (isSelected ? theme.palette.primary.main : "#EEEEEE")};
  border-radius: 8px;
  cursor: pointer;

  transition: all 0.3s ease;
`;

type FontSizePickerBoxProps = {
  isSelected: boolean;
};

const FontSizePickerBox = styled("div")<FontSizePickerBoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin: 4px;
  color: ${({ theme, isSelected }) => (isSelected ? theme.palette.text.primary : theme.palette.text.secondary)};
  border-radius: 8px;
`;

////////// 두께 선택기
type FontWeightPickerProps = {
  currentFontWeight: string;
  setEditBlockStateProperty: (key: string, value: string | number) => void;
};

const FontWeightPicker = ({ currentFontWeight, setEditBlockStateProperty }: FontWeightPickerProps) => {
  const fontWeights = [
    { label: "일반", value: "normal" },
    { label: "굵게", value: "bold" },
  ];

  return (
    <FontWeightPickerContainer>
      {fontWeights.map((fontWeight, idx) => (
        <FontWeightPickerBoxWrapper
          key={idx}
          isSelected={fontWeight.value === currentFontWeight}
          onClick={() => setEditBlockStateProperty("fontWeight", fontWeight.value)}
        >
          <FontWeightPickerBox
            isSelected={fontWeight.value === currentFontWeight}
            sx={{ fontWeight: fontWeight.value }}
          >
            {fontWeight.label}
          </FontWeightPickerBox>
        </FontWeightPickerBoxWrapper>
      ))}
    </FontWeightPickerContainer>
  );
};

const FontWeightPickerContainer = styled(Stack)`
  flex-direction: row;
  column-gap: 4px;
  width: 100%;
`;

type FontWeightPickerBoxWrapperProps = {
  isSelected: boolean;
};

const FontWeightPickerBoxWrapper = styled("div")<FontWeightPickerBoxWrapperProps>`
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme, isSelected }) => (isSelected ? theme.palette.primary.main : "#EEEEEE")};
  border-radius: 8px;
  cursor: pointer;

  transition: all 0.3s ease;
`;

type FontWeightPickerBoxProps = {
  isSelected: boolean;
};

const FontWeightPickerBox = styled("div")<FontWeightPickerBoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin: 4px;
  color: ${({ theme, isSelected }) => (isSelected ? theme.palette.text.primary : theme.palette.text.secondary)};
  border-radius: 8px;
`;

////////// 애니메이션 선택기
type AnimationPickerProps = {
  currentAnimation: string;
  setEditBlockStateProperty: (key: string, value: string | number) => void;
};

const AnimationPicker = ({ currentAnimation, setEditBlockStateProperty }: AnimationPickerProps) => {
  const animations = [
    { value: "none", icon: <DoNotDisturbAltRounded /> },
    { value: "fadeInToLeft", icon: <KeyboardDoubleArrowLeftRounded /> },
    { value: "fadeInToRight", icon: <KeyboardDoubleArrowRightRounded /> },
    { value: "fadeInToTop", icon: <KeyboardDoubleArrowUpRounded /> },
    { value: "fadeInToBottom", icon: <KeyboardDoubleArrowDownRounded /> },
    { value: "rotate", icon: <CachedRounded /> },
  ];

  return (
    <AnimationPickerContainer>
      {animations.map((animation, idx) => (
        <AnimationPickerBoxWrapper
          key={idx}
          isSelected={animation.value === currentAnimation}
          onClick={() => setEditBlockStateProperty("animation", animation.value)}
        >
          <AnimationPickerBox isSelected={animation.value === currentAnimation}>{animation.icon}</AnimationPickerBox>
        </AnimationPickerBoxWrapper>
      ))}
    </AnimationPickerContainer>
  );
};

const AnimationPickerContainer = styled(Stack)`
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

type AnimationPickerBoxWrapperProps = {
  isSelected: boolean;
};

const AnimationPickerBoxWrapper = styled("div")<AnimationPickerBoxWrapperProps>`
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme, isSelected }) => (isSelected ? theme.palette.primary.main : "#EEEEEE")};
  border-radius: 8px;
  cursor: pointer;

  transition: all 0.3s ease;
`;

type AnimationPickerBoxProps = {
  isSelected: boolean;
};

const AnimationPickerBox = styled("div")<AnimationPickerBoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;

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
    "#000000", // 검정
    "#808080", // 회색
    "#FF0000", // 빨강
    "#FF7F00", // 주황
    "#FFFF00", // 노랑
    "#00FF00", // 초록
    "#0000FF", // 파랑
    "#4B0082", // 남색
    "#9400D3", // 보라
    "#FF1493", // 분홍
    "#8B4513", // 갈색
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

type ColorPickerBoxWrapperProps = {
  color: string;
  isSelected: boolean;
};

const ColorPickerBoxWrapper = styled("div")<ColorPickerBoxWrapperProps>`
  border-width: 2px;
  border-style: solid;
  border-color: ${({ isSelected, color }) => (isSelected ? color : "#EEEEEE")};
  border-radius: 8px;
  cursor: pointer;

  transition: all 0.3s ease;
`;

type ColorPickerBoxProps = {
  color: string;
};

const ColorPickerBox = styled("div")<ColorPickerBoxProps>`
  width: 24px;
  height: 24px;
  margin: 4px;
  background-color: ${({ color }) => color};
  border-radius: 8px;
`;

////////////////////////////// 스타일 //////////////////////////////
const Container = styled(Grid2)``;

const GridItem = styled(Grid2)``;

const AddButton = styled(Button)`
  color: ${({ theme }) => theme.palette.text.white};
`;
