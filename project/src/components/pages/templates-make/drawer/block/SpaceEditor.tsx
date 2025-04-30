import { Slider, Stack, styled } from "@mui/material";
import SpaceBlock from "../../../templates/block/SpaceBlock";
import CommonAddButton from "./CommonAddButton";
import { useAddBlockDrawerStore } from "@/store";
import { SpaceBlockType } from "@/types/template/blockType";

const SpaceEditor = () => {
  const { blockEditorState, setBlockEditorState } = useAddBlockDrawerStore();

  return (
    <Container>
      {/* 미리보기 */}
      <SpaceBlock blockData={{ height: (blockEditorState as SpaceBlockType)?.height }} preview={true} />

      {/* 슬라이더 */}
      <Slider
        aria-label="Temperature"
        value={(blockEditorState as SpaceBlockType)?.height || 10}
        defaultValue={10}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={10}
        marks
        min={10}
        max={100}
        onChange={(e, value) => setBlockEditorState({ height: value as number })}
      />

      {/* 블록 추가 버튼 */}
      <CommonAddButton
        blockState={{ variant: "space", content: { height: (blockEditorState as SpaceBlockType)?.height } }}
      />
    </Container>
  );
};

export default SpaceEditor;

const Container = styled(Stack)`
  row-gap: 8px;
`;
