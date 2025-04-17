import { getCurrentUserUID } from "@/service/auth";
import { getImageUrl, uploadImage } from "@/service/buckets/images";
import { DateToYYYYMMDDHHMMSS } from "@/utils/time";
import { AddRounded, ImageRounded } from "@mui/icons-material";
import { Button, styled, Typography } from "@mui/material";
import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const ImageEditor = () => {
  return (
    <div>
      <FileSelectArea />
      <AddButton onClick={() => {}} startIcon={<AddRounded />} variant="contained" fullWidth>
        추가
      </AddButton>
    </div>
  );
};

export default ImageEditor;

////////////////////////////// 하위 컴포넌트 //////////////////////////////
const FileSelectArea = () => {
  const [imgSrc, setImgSrc] = useState("");

  // 파일 선택 시 파일 선택 핸들러
  async function handleFileSelectChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const { data: uid } = await getCurrentUserUID();
    const fileName = `${uid}-${DateToYYYYMMDDHHMMSS(new Date())}`;

    if (file) {
      const { error: uploadError } = await uploadImage(fileName, file);

      if (uploadError) {
        enqueueSnackbar("이미지 업로드 실패", { variant: "error" });
        console.error(uploadError);
        return;
      }

      const {
        data: { publicUrl },
      } = await getImageUrl(fileName);

      setImgSrc(publicUrl);
    }
  }

  return (
    <>
      <FileSelectButton_Container>
        <FileSelectButton_Label htmlFor="file">
            {imgSrc}

          {imgSrc ? (
            <Image src={imgSrc} alt="이미지" width={100} height={100} />
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
        <FileSelectButton_Input type="file" id="file" onChange={handleFileSelectChange}></FileSelectButton_Input>
      </FileSelectButton_Container>
    </>
  );
};

export const FileSelectButton_Container = styled("div")``;

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
  color: ${({ theme }) => theme.palette.primary.main};

  border-radius: 16px;
`;

export const FileSelectButton_Input = styled("input")`
  display: none; // 기존 버튼 숨기기
`;

const AddButton = styled(Button)`
  color: ${({ theme }) => theme.palette.text.white};
`;
