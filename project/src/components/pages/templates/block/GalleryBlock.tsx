import { GalleryBlockType } from "@/types/template/blockType";
import { SwiperSlide } from "swiper/react";
import { Stack, styled, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Swiper } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { AnimationBlock } from "./AnimationBlock";

const GalleryBlock = ({ blockData }: { blockData: GalleryBlockType }) => {
  return (
    <Container>
      <StyledSwiperSlideContainer
        slidesPerView={1}
        spaceBetween={30}
        loop={false}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
      >
        {blockData.map((el, idx) => (
          <SwiperSlide key={idx}>
            <SlideWrapper>
              <Box>
                <AnimationBlock animationType="fadeInToBottom">
                  <StyledImage src={el.imgSrc} alt="" width={200} height={200} />
                </AnimationBlock>
                <AnimationBlock animationType="fadeInToTop">
                  <Typography variant="body1" align="center" color="primary.dark">
                    {el.text}
                  </Typography>
                </AnimationBlock>
              </Box>
            </SlideWrapper>
          </SwiperSlide>
        ))}
      </StyledSwiperSlideContainer>
    </Container>
  );
};

export default GalleryBlock;

const Container = styled(Box)`
  width: 100%;
`;

const StyledImage = styled(Image)`
  width: 200px;
  height: auto;
  border-radius: 8px;
`;

const StyledSwiperSlideContainer = styled(Swiper)`
  & .swiper-slide {
    display: flex;
    height: auto;
    align-items: center;
  }

  .swiper-wrapper {
    display: flex;
    align-items: stretch;
  }

  border: 1px solid ${({ theme }) => theme.palette.primary.light};
  border-radius: 8px;
  box-shadow: 0 8px 8px 0 rgba(255, 182, 185, 0.1);
`;

const SlideWrapper = styled(Stack)`
  width: 100%;
  align-items: center;
  justify-content: center;
  row-gap: 16px;
  padding: 16px;
`;
