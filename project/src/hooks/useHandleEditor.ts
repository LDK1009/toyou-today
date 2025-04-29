import { useAddBlockDrawerStore } from "@/store";
import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import { BlockType } from "@/types/template/blockType";

export function useHandleEditor() {
  const {
    template: { blocks: currentBlocks },
    updateBlock,
    addBlock,
  } = useMakeTemplateStore();

  const {
    // 상태
    editMode,
    editTargetBlockIndex,

    // 액션 - 드로어
    setIsOpen: setEditorOpen,
    setAllState: setEditorAllState,

    // 액션 - 수정 모드
    setEditMode,
    setEditTargetBlockIndex,
    setEditTargetBlockData,
  } = useAddBlockDrawerStore();

  function handleEditorClose() {
    // 수정 모드 끄기
    setEditMode(false);
    // 수정 모드 대상 블록 인덱스 초기화
    setEditTargetBlockIndex(0);
    // 수정 모드 대상 블록 데이터 초기화
    setEditTargetBlockData(null);
    // 드로어 닫기
    setEditorOpen(false);
  }

  ////////// 에디터 수정모드로 열기 //////////
  function openEditorInEditMode(editTargetBlockIndex: number, editTargetBlockData: BlockType) {
    // 수정 모드 켜기
    setEditMode(true);
    // 수정 모드 대상 블록 인덱스 설정
    setEditTargetBlockIndex(editTargetBlockIndex);
    // 수정 모드 대상 블록 데이터 설정
    setEditTargetBlockData(editTargetBlockData);
    // 에디터 열기
    setEditorAllState(currentBlocks[editTargetBlockIndex].variant, "top", true);
  }

  ////////// 블록 수정 버튼 클릭 시 실행 //////////
  function handleSubmitButtonClick(currentBlockState: BlockType) {
    // 수정 모드
    if (editMode) {
      // 타켓 블록 데이터 수정
      updateBlock(editTargetBlockIndex, currentBlockState);
    }
    // 추가 모드
    else {
      addBlock(currentBlockState);
    }

    // 에디터 닫기 설정
    handleEditorClose();
  }

  return { handleEditorClose, openEditorInEditMode, handleSubmitButtonClick };
}
