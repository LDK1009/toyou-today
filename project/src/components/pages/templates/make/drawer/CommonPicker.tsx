import {
  DoNotDisturbAltRounded,
  CachedRounded,
  FormatAlignCenterRounded,
  FormatAlignRightRounded,
  KeyboardDoubleArrowLeftRounded,
  KeyboardDoubleArrowRightRounded,
  KeyboardDoubleArrowUpRounded,
  KeyboardDoubleArrowDownRounded,
} from "@mui/icons-material";
import { FormatAlignLeftRounded } from "@mui/icons-material";
import { Stack, styled, Typography } from "@mui/material";
import { mixinHideScrollbar } from "@/styles/mixins";
////////////////////////////// 정렬 선택기 //////////////////////////////
type AlignPickerProps = {
  currentAlign: string;
  setEditBlockStateProperty: (key: string, value: string | number) => void;
};

export const AlignPicker = ({ currentAlign, setEditBlockStateProperty }: AlignPickerProps) => {
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
          onClick={() => setEditBlockStateProperty("align", alignment.value)}
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

////////////////////////////// 애니메이션 선택기 //////////////////////////////
type AnimationPickerProps = {
  currentAnimation: string;
  setEditBlockStateProperty: (key: string, value: string | number) => void;
};

export const AnimationPicker = ({ currentAnimation, setEditBlockStateProperty }: AnimationPickerProps) => {
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

////////////////////////////// 정렬&애니메이션 선택기 //////////////////////////////
export const AlignAndAnimationPicker = ({
  blockState,
  setBlockStateProperty,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blockState: any;
  setBlockStateProperty: (key: string, value: string | number) => void;
}) => {
  return (
    <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
      {/* 정렬 선택 */}
      <Stack rowGap={0.5}>
        <Typography color="primary">정렬</Typography>
        <AlignPicker currentAlign={blockState.align} setEditBlockStateProperty={setBlockStateProperty} />
      </Stack>
      {/* 애니메이션 선택 */}
      <Stack rowGap={0.5}>
        <Typography color="primary">애니메이션</Typography>
        <AnimationPicker currentAnimation={blockState.animation} setEditBlockStateProperty={setBlockStateProperty} />
      </Stack>
    </Stack>
  );
};

////////////////////////////// 색상 선택기 //////////////////////////////
type ColorPickerProps = {
  currentColor: string;
  handleColorBoxClick: (color: string) => void;
};

export const ColorPicker = ({ currentColor, handleColorBoxClick }: ColorPickerProps) => {
  const colors = [
    "#000000", // 검정
    "#FFFFFF", // 흰색
    "#FFB6B9", // 메인 색상
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
          color={color === "#FFFFFF" ? "#FFB6B9" : color}
          isSelected={color === currentColor}
          onClick={() => handleColorBoxClick(color)}
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
  ${mixinHideScrollbar()}
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
