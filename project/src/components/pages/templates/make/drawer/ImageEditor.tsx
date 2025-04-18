import { getCurrentUserUID } from "@/service/auth";
import { getImageUrl, uploadImage } from "@/service/buckets/images";
import { useAddBlockDrawerStore } from "@/store";
import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import { ImageBlockType } from "@/types/template/blockType";
import { DateToYYYYMMDDHHMMSS } from "@/utils/time";
import { AddRounded, ImageRounded } from "@mui/icons-material";
import { Button, CircularProgress, Stack, styled, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { AlignPicker, AnimationPicker } from "./CommonPicker";
import ImageBlock from "../../block/ImageBlock";

const ImageEditor = () => {
  const [blockState, setBlockState] = useState<ImageBlockType>({
    imgSrc: "",
    align: "center",
    animation: "none",
  });

  ////////////////////////////// State //////////////////////////////
  const { addBlock } = useMakeTemplateStore();
  const { setIsOpen: setIsAddBlockDrawerOpen } = useAddBlockDrawerStore();

  ////////////////////////////// Function //////////////////////////////
  // 이미지 블록 상태 수정 함수
  const setBlockStateProperty = (key: string, value: string | number) => {
    setBlockState((prev) => ({ ...prev, [key]: value }));
  };

  // 이미지 추가 버튼 클릭 함수
  function handleAddImageButtonClick() {
    // 이미지 블록 상태 비구조화
    const { imgSrc, align, animation } = blockState;

    // 이미지 추가
    addBlock({
      variant: "image",
      content: {
        imgSrc,
        align,
        animation,
      },
    });

    // 이미지 추가 블록 드로어 닫기
    setIsAddBlockDrawerOpen(false);
  }

  return (
    <Container>
      <FileSelectArea blockData={blockState} setBlockStateProperty={setBlockStateProperty} />
      <AlignPicker currentAlign={blockState.align} setEditBlockStateProperty={setBlockStateProperty} />
      <AnimationPicker currentAnimation={blockState.animation} setEditBlockStateProperty={setBlockStateProperty} />
      <AddButton onClick={handleAddImageButtonClick} startIcon={<AddRounded />} variant="contained" fullWidth>
        추가
      </AddButton>
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
const FileSelectArea = ({ blockData, setBlockStateProperty }: { blockData: ImageBlockType; setBlockStateProperty: (key: string, value: string | number) => void }) => {
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

const AddButton = styled(Button)`
  color: ${({ theme }) => theme.palette.text.white};
`;