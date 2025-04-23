import { Button, Slider, Stack, styled } from "@mui/material";
import SpaceBlock from "../../../block/SpaceBlock";
import { useState } from "react";
import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import { useAddBlockDrawerStore } from "@/store";

const SpaceEditor = () => {
  const [height, setHeight] = useState(10);
  const { addBlock } = useMakeTemplateStore();
  const { setIsOpen: setIsAddBlockDrawerOpen } = useAddBlockDrawerStore();

  // 블럭 추가 버튼 클릭 시 실행
  function handleAddBlockButtonClick() {
    addBlock({
      variant: "space",
      content: {
        height: height,
      },
    });
    setIsAddBlockDrawerOpen(false);
  }

  // 슬라이더 값 텍스트 변환(접근성 처리)
  function valuetext(value: number) {
    return `${value}°C`;
  }

  return (
    <Container>
      {/* 미리보기 */}
      <SpaceBlock blockData={{ height: height }} preview={true} />
      {/* 슬라이더 */}
      <Slider
        aria-label="Temperature"
        defaultValue={10}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={10}
        marks
        min={10}
        max={100}
        onChange={(e, value) => setHeight(value as number)}
      />
      <AddButton onClick={handleAddBlockButtonClick} variant="contained" fullWidth>
        추가
      </AddButton>
    </Container>
  );
};

export default SpaceEditor;

const Container = styled(Stack)`
  row-gap: 8px;
`;

const AddButton = styled(Button)`
  color: ${({ theme }) => theme.palette.text.white};
`;
