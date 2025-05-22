import { Stack, styled, Typography } from "@mui/material";
import { useEffect } from "react";
import PageItem from "./PageItem";
import { useMyPageListStore } from "@/store/my-page/myPageList";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";

const PageList = () => {
  // 페이지 리스트 상태
  const { pageList, fetchPageList } = useMyPageListStore();

  // 마운트 시 페이지 리스트 조회
  useEffect(() => {
    fetchPageList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Title variant="h6">내 페이지</Title>
      <PageListContainer>
        <Swiper
          direction={"vertical"}
          slidesPerView={3} // 한 번에 3개 아이템 보이기
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          modules={[Mousewheel]} // 필요한 모듈 추가
          style={{ width: "100%", height: "100%" }}
        >
          {pageList.map((el) => (
            <SwiperSlide key={el.id}>
              <PageItem pageData={el} />
            </SwiperSlide>
          ))}
        </Swiper>
      </PageListContainer>
    </Container>
  );
};

export default PageList;

const Container = styled(Stack)`
  width: 100%;
  row-gap: 4px;
`;

const Title = styled(Typography)`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const PageListContainer = styled(Stack)`
  width: 100%;
  row-gap: 8px;
  border-radius: 8px;
  height: 200px;
`;
