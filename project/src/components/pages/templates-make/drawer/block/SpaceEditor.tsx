import { Slider, Stack, styled } from "@mui/material";
import SpaceBlock from "../../../templates/block/SpaceBlock";
import CommonAddButton from "./CommonAddButton";
import { useAddBlockDrawerStore } from "@/store";
import { SpaceBlockType } from "@/types/template/blockType";

const SpaceEditor = () => {
  const { blockEditorState, setBlockEditorState } = useAddBlockDrawerStore();

  const isSpaceBlockExist = blockEditorState && 'height' in blockEditorState;

  const editBlockState = isSpaceBlockExist ? (blockEditorState as SpaceBlockType) : { height: 10 };

  function setEditBlockState(value: SpaceBlockType) {
    setBlockEditorState(value);
  }

  return (
    <Container>
      {/* 미리보기 */}
      <SpaceBlock blockData={{ height: editBlockState.height }} preview={true} />

      {/* 슬라이더 */}
      <Slider
        aria-label="Temperature"
        value={editBlockState.height}
        defaultValue={10}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={10}
        marks
        min={10}
        max={100}
        onChange={(e, value) => setEditBlockState({ height: value as number })}
      />

      {/* 블록 추가 버튼 */}
      <CommonAddButton blockState={{ variant: "space", content: { height: editBlockState.height } }} />
    </Container>
  );
};

export default SpaceEditor;

const Container = styled(Stack)`
  row-gap: 8px;
`;
