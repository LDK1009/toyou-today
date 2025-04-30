import { Button, TextField } from "@mui/material";

import { styled } from "@mui/material";

import { getMultipleImageUrls, uploadMultipleImages } from "@/service/buckets/images";
import { GalleryBlockItemType, GalleryBlockType } from "@/types/template/blockType";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { ImageRounded, ReplayRounded } from "@mui/icons-material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import CommonAddButton from "./CommonAddButton";
import { useAddBlockDrawerStore } from "@/store";

const GalleryEditor = () => {
  // const [blockStates, setBlockStates] = useState<GalleryBlockType>([]);

  const initBlockState: GalleryBlockType = [];

  const { blockEditorState, setBlockEditorState } = useAddBlockDrawerStore();

  const isGalleryBlockExist =
    blockEditorState &&
    Array.isArray(blockEditorState) &&
    blockEditorState.every((item) => "imgSrc" in item && "text" in item);

  const blockStates = isGalleryBlockExist ? (blockEditorState as GalleryBlockType) : initBlockState;

  const setBlockStates = (newBlockStates: GalleryBlockType) => {
    setBlockEditorState(newBlockStates);
  };

  // 블록 데이터 수정
  function setBlockStateProperty(index: number, key: keyof GalleryBlockItemType, value: string) {
    const prevBlockStates = blockStates;

    const newBlockStates = prevBlockStates.map((el, idx) => {
      if (idx === index) {
        el[key] = value;
      }
      return el;
    });

    setBlockStates(newBlockStates);
  }

  return (
    <>
      {/* 이미지 선택 영역(조건 렌더링은 컴포넌트 내부에서 처리(파일 재업로드로 인한 우회)) */}
      <FileSelectArea blockStates={blockStates} setBlockStates={setBlockStates} />

      {/* 이미지 미리보기 영역 */}
      {blockStates.length > 0 && (
        <PreviewAndTextInputs blockStates={blockStates} setBlockStateProperty={setBlockStateProperty} />
      )}

      {/* 버튼 영역 */}
      <ButtonWrapper>
        {/* 이미지 재업로드 버튼 */}
        {blockStates.length > 0 && (
          <>
            <ReselectButton
              onClick={() => document.getElementById("file-input")?.click()}
              variant="outlined"
              startIcon={<ReplayRounded />}
              fullWidth
            >
              재업로드
            </ReselectButton>
            <CommonAddButton
              blockState={{ variant: "gallery", content: blockStates }}
              disabled={blockStates.length === 0}
            />
          </>
        )}
      </ButtonWrapper>
    </>
  );
};

export default GalleryEditor;
////////////////////////////// 하위 컴포넌트 //////////////////////////////
const ButtonWrapper = styled(Stack)`
  row-gap: 8px;
`;

const ReselectButton = styled(Button)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

////////////////////////////// 하위 컴포넌트 //////////////////////////////
////////// 이미지 선택 컴포넌트 //////////
const FileSelectArea = ({
  blockStates,
  setBlockStates,
}: {
  blockStates: GalleryBlockType;
  setBlockStates: (blockStates: GalleryBlockType) => void;
}) => {
  const [loading, setLoading] = useState(false);

  // 파일 선택 시 파일 선택 핸들러
  async function handleFileSelectChange(e: React.ChangeEvent<HTMLInputElement>) {
    // 이미 이미지가 있는 경우 초기화
    setBlockStates([]);

    // 파일 선택 시 파일 배열 가져오기
    const files = e.target.files;
    // 파일 타입 제한
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    // 파일 1개당 크기 제한(10MB)
    const maxSize = 10 * 1024 * 1024;
    // 파일 최대 개수 제한
    const maxCount = 10;

    // 파일이 선택되지 않았을 경우 오류 메시지 표시
    if (!files?.length) {
      enqueueSnackbar("이미지를 선택해주세요.", { variant: "error" });
      return;
    }

    // 파일 배열로 변환
    const filesArray = Array.from(files);

    // 파일 개수 제한 초과 시 오류 메시지 표시
    if (filesArray.length > maxCount) {
      enqueueSnackbar(`최대 ${maxCount}장까지 업로드 가능합니다.`, { variant: "error" });
      return;
    }

    // 파일 타입 확인
    for (const el of filesArray) {
      if (!validTypes.includes(el.type)) {
        enqueueSnackbar("JPG 또는 PNG 형식의 이미지만 업로드 가능합니다.", { variant: "error" });
        return; // 함수 전체 종료
      }
    }

    // 파일 크기 확인 (10MB 제한)
    for (const el of filesArray) {
      if (el.size > maxSize) {
        enqueueSnackbar("이미지 크기는 10MB 이하여야 합니다.", { variant: "error" });
        return; // 함수 전체 종료
      }
    }

    // 이미지 업로드 시작
    setLoading(true);
    const { data: uploadResult, error: uploadError } = await uploadMultipleImages(filesArray);

    // 이미지 업로드 실패 시 오류 메시지 표시
    if (uploadError) {
      enqueueSnackbar(uploadError, { variant: "error" });
      setLoading(false);
      return;
    }

    // 이미지 경로 배열 생성
    const imagePaths = uploadResult?.map((el) => el?.path);

    // 이미지 URL 배열 생성
    const { data: imageUrls } = await getMultipleImageUrls(imagePaths as string[]);

    // 블록 데이터 저장
    const initBlockData = imageUrls?.map((el) => {
      return {
        imgSrc: el.publicUrl,
        text: "",
      };
    });

    setBlockStates(initBlockData);
    setLoading(false);
  }

  return (
    <FileSelectAreaContainer>
      {/* 보여지는 파일 선택 버튼 */}
      {blockStates.length === 0 && (
        <FileSelectButton htmlFor="file-input">
          {loading ? (
            <>
              <CircularProgress />
              <Typography variant="caption">🚨 3초 이상 로딩중이라면 다시 시도해주세요. 🚨</Typography>
              <Typography variant="caption">👆 클릭하여 다시 시도하기</Typography>
            </>
          ) : (
            <>
              <ImageRounded />
              <Typography variant="caption">
                최대 10장
                <br />
                .jpg, .png 첨부가능
              </Typography>
            </>
          )}
        </FileSelectButton>
      )}

      {/* 숨겨진 실제 인풋 */}
      <FileSelectInput
        type="file"
        multiple
        id="file-input"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileSelectChange}
      ></FileSelectInput>
    </FileSelectAreaContainer>
  );
};

export const FileSelectAreaContainer = styled(Stack)``;

export const FileSelectButton = styled("label")`
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

export const FileSelectInput = styled("input")`
  display: none; // 기존 버튼 숨기기
`;

////////// 이미지 미리보기 컴포넌트 //////////
const PreviewAndTextInputs = ({
  blockStates,
  setBlockStateProperty,
}: {
  blockStates: GalleryBlockType;
  setBlockStateProperty: (index: number, key: keyof GalleryBlockItemType, value: string) => void;
}) => {
  return (
    <PreviewAndTextInputsContainer>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={false}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
      >
        {blockStates.map((el, idx) => (
          <SwiperSlide key={idx}>
            <SlideWrapper>
              <div></div>
              <PreviewImage src={el.imgSrc} alt="이미지 불러오기 실패" width={200} height={200} />
              <TextInput
                value={el.text}
                onChange={(e) => setBlockStateProperty(idx, "text", e.target.value)}
                placeholder={
                  idx % 3 === 0
                    ? "예시) 늘 해맑던 네 모습"
                    : idx % 2 === 0
                    ? "예시) 너와 함께한 추억"
                    : "예시) 우리의 첫 만남"
                }
              />
            </SlideWrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </PreviewAndTextInputsContainer>
  );
};

const PreviewAndTextInputsContainer = styled("div")`
  width: 100%;
  padding: 16px;
`;

const PreviewImage = styled(Image)`
  width: 100px;
  height: auto;
  border-radius: 8px;
`;

const TextInput = styled(TextField)`
  width: 100%;
`;

const SlideWrapper = styled(Stack)`
  padding: 16px;
  align-items: center;
  justify-content: space-between;
  row-gap: 16px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
`;

export const FileReselectButton = styled("label")`
  width: 100%;
`;
