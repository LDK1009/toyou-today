import { getCurrentUserUID } from "@/service/auth";
import { getImageUrl, uploadImage } from "@/service/buckets/images";
import { ImageBlockType } from "@/types/template/blockType";
import { DateToYYYYMMDDHHMMSS } from "@/utils/time";
import { ImageRounded } from "@mui/icons-material";
import { CircularProgress, Stack, styled, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { AlignAndAnimationPicker } from "./CommonPicker";
import ImageBlock from "../../../templates/block/ImageBlock";
import CommonAddButton from "./CommonAddButton";
import { useAddBlockDrawerStore } from "@/store";

const ImageEditor = () => {
  const initBlockState: ImageBlockType = {
    imgSrc: "",
    align: "center",
    animation: "none",
  };

  const { blockEditorState, setBlockEditorState } = useAddBlockDrawerStore();

  const isImageBlockExist =
    blockEditorState && "imgSrc" in blockEditorState && "align" in blockEditorState && "animation" in blockEditorState;
  const blockState = isImageBlockExist ? (blockEditorState as ImageBlockType) : initBlockState;

  function setBlockState(value: ImageBlockType) {
    setBlockEditorState(value);
  }

  ////////////////////////////// Function //////////////////////////////
  // 이미지 블록 상태 수정 함수
  const setBlockStateProperty = (key: string, value: string | number) => {
    setBlockState({ ...blockState, [key]: value });
  };

  return (
    <Container>
      <FileSelectArea blockData={blockState} setBlockStateProperty={setBlockStateProperty} />
      <AlignAndAnimationPicker blockState={blockState} setBlockStateProperty={setBlockStateProperty} />
      <CommonAddButton blockState={{ variant: "image", content: blockState }} disabled={blockState.imgSrc === ""} />
    </Container>
  );
};

export default ImageEditor;

////////////////////////////// 스타일 //////////////////////////////
const Container = styled(Stack)`
  row-gap: 16px;
`;

////////////////////////////// 하위 컴포넌트 //////////////////////////////
////////// 이미지 선택 영역 //////////
const FileSelectArea = ({
  blockData,
  setBlockStateProperty,
}: {
  blockData: ImageBlockType;
  setBlockStateProperty: (key: string, value: string | number) => void;
}) => {
  const [loading, setLoading] = useState(false);

  // 파일 선택 시 파일 선택 핸들러
  async function handleFileSelectChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) {
      enqueueSnackbar("이미지를 선택해주세요.", { variant: "error" });
      return;
    }

    // 파일 타입 확인
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      enqueueSnackbar("JPG 또는 PNG 형식의 이미지만 업로드 가능합니다.", { variant: "error" });
      return;
    }

    // 파일 크기 확인 (10MB 제한)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      enqueueSnackbar("이미지 크기는 10MB 이하여야 합니다.", { variant: "error" });
      return;
    }

    const { data: uid } = await getCurrentUserUID();
    const fileName = `${uid}-${DateToYYYYMMDDHHMMSS(new Date())}`;

    setLoading(true);
    const { error: uploadError } = await uploadImage(fileName, file);

    if (uploadError) {
      enqueueSnackbar("이미지 업로드 실패", { variant: "error" });
      setLoading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = await getImageUrl(fileName);

    setBlockStateProperty("imgSrc", publicUrl);
    setLoading(false);
  }

  return (
    <>
      <FileSelectButton_Container>
        <FileSelectButton_Label htmlFor="file">
          {loading ? (
            <CircularProgress />
          ) : blockData.imgSrc ? (
            <ImageBlock blockData={blockData} preview />
          ) : (
            <>
              <ImageRounded />
              <Typography variant="caption">
                최대 10MB 이하
                <br />
                .jpg, .png 첨부가능
              </Typography>
            </>
          )}
        </FileSelectButton_Label>
        <FileSelectButton_Input
          type="file"
          id="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileSelectChange}
        ></FileSelectButton_Input>
      </FileSelectButton_Container>
    </>
  );
};

export const FileSelectButton_Container = styled(Stack)``;

export const FileSelectButton_Label = styled("label")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 8px;

  width: 100%;
  height: 150px;
  text-align: center;

  background-color: ${({ theme }) => theme.palette.background.default};
  border: 3px dashed ${({ theme }) => theme.palette.primary.main};
  border-radius: 16px;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const FileSelectButton_Input = styled("input")`
  display: none; // 기존 버튼 숨기기
`;
