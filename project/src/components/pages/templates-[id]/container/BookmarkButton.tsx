import { readIsBookmarkedByTemplateId, createBookmark, deleteBookmark } from "@/service/tables/bookmarks";
import { mixinMuiButtonNoShadow, mixinMuiCircleShapeButton } from "@/styles/mixins";
import { BookmarkBorderRounded, BookmarkRounded } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { Button, styled } from "@mui/material";
import { useEffect, useState } from "react";

const BookmarkButton = ({ templateId }: { templateId: number }) => {
  // 북마크 여부
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 북마크 여부 확인
  async function checkIsBookmarked() {
    const { data, error } = await readIsBookmarkedByTemplateId(templateId);

    if (error) {
      return;
    }

    setIsBookmarked(data);
  }

  // 마운트 시 북마크 여부 확인
  useEffect(() => {
    checkIsBookmarked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 북마크 하기
  async function handleBookmark() {
    if (isBookmarked) {
      await deleteBookmark(templateId);
      setIsBookmarked(false);
      return;
    }

    await createBookmark(templateId);
    setIsBookmarked(true);
    enqueueSnackbar("북마크에 추가되었습니다.", { variant: "success" });
  }

  return (
    <Container onClick={handleBookmark} variant="outlined">
      {isBookmarked ? <BookmarkRounded /> : <BookmarkBorderRounded />}
    </Container>
  );
};

export default BookmarkButton;

const Container = styled(Button)`
  ${mixinMuiButtonNoShadow}
  ${mixinMuiCircleShapeButton(50)}

  & .MuiSvgIcon-root {
    width: 32px;
    height: 32px;
  }
`;
