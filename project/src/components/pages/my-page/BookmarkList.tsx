import { useBookmarkListStore } from "@/store/my-page/bookmarkList";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { styled } from "@mui/material";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import BookmarkItem from "./BookmarkItem";

const BookmarkList = () => {
  const { bookmarkList, fetchBookmarkList } = useBookmarkListStore();

  // 북마크 목록 조회
  useEffect(() => {
    fetchBookmarkList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(bookmarkList);

  return (
    <Container>
      <Title variant="h6">저장한 템플릿</Title>
      <BookmarkListContainer>
        <Swiper
          direction={"vertical"}
          slidesPerView={3}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          modules={[Mousewheel]} // 필요한 모듈 추가
          style={{ width: "100%", height: "100%" }}
        >
          {bookmarkList.map((el) => (
            <SwiperSlide key={el.id}>
              <BookmarkItem templateData={el.templates} />
            </SwiperSlide>
          ))}
        </Swiper>
      </BookmarkListContainer>
    </Container>
  );
};

export default BookmarkList;

const Container = styled(Stack)`
  width: 100%;
  row-gap: 4px;
`;

const Title = styled(Typography)`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const BookmarkListContainer = styled(Stack)`
  width: 100%;
  row-gap: 8px;
  border-radius: 8px;
  height: 200px;
`;
