import { Slider, Stack, styled } from "@mui/material";
import SpaceBlock from "../../../block/SpaceBlock";
import { useState } from "react";
import CommonAddButton from "./CommonAddButton";

const SpaceEditor = () => {
  const [height, setHeight] = useState(10);

  return (
    <Container>
      {/* 미리보기 */}
      <SpaceBlock blockData={{ height: height }} preview={true} />
      {/* 슬라이더 */}
      <Slider
        aria-label="Temperature"
        defaultValue={10}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={10}
        marks
        min={10}
        max={100}
        onChange={(e, value) => setHeight(value as number)}
      />
      <CommonAddButton blockState={{ variant: "space", content: { height: height } }} />
    </Container>
  );
};

export default SpaceEditor;

const Container = styled(Stack)`
  row-gap: 8px;
`;
