import { useState } from "react";
import api from "@/lib/apiClient";
import { enqueueSnackbar } from "notistack";
import {
  Stack,
  TextField,
  CircularProgress,
  styled,
  Grid2,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMoreRounded, ImageSearchRounded } from "@mui/icons-material";
import Image from "next/image";
import { GifBlockType } from "@/types/template/blockType";
import GifBlock from "@/components/pages/templates/block/GifBlock";
import { AlignAndAnimationPicker } from "./CommonPicker";
import CommonAddButton from "./CommonAddButton";
import { useAddBlockDrawerStore } from "@/store";

const GifEditor = () => {
  // 상태 초기화값
  const initBlockState: GifBlockType = {
    gifSrc: "",
    align: "center",
    animation: "none",
  };

  // 전역 블록 상태
  const { blockEditorState, setBlockEditorState } = useAddBlockDrawerStore();

  // 블록 존재 여부
  const isGifBlockExist =
    blockEditorState && "gifSrc" in blockEditorState && "align" in blockEditorState && "animation" in blockEditorState;

  // 블록 상태  
  const blockState = isGifBlockExist ? (blockEditorState as GifBlockType) : initBlockState;

  // 블록 상태 수정
  const setBlockState = (newBlockState: GifBlockType) => {
    setBlockEditorState(newBlockState);
  };

  // 검색 결과 이미지 목록
  const [imgs, setImgs] = useState([]);
  // 검색 쿼리
  const [searchQuery, setSearchQuery] = useState("");
  // 로딩 상태
  const [loading, setLoading] = useState(false);
  // 아코디언 열림 상태
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

  // 검색 결과 가져오기
  const getGifs = async () => {
    setLoading(true);
    const {
      data: { data: gifsData, error },
    } = await api.get("/gifs", {
      params: {
        query: searchQuery,
      },
    });

    if (error) {
      enqueueSnackbar("gif 가져오기 실패", { variant: "error" });
      return;
    }

    setImgs(gifsData);
    setLoading(false);
  };

  // 검색 버튼 클릭
  async function handleSearchButtonClick() {
    await getGifs();
    setSearchQuery("");
    setIsAccordionExpanded(true);
  }

  // 이미지 선택
  const handleImgClick = (src: string) => {
    setBlockStateProperty("gifSrc", src);
  };

  // 이미지 블록 상태 수정 함수
  function setBlockStateProperty(key: string, value: string | number) {
    setBlockState({ ...blockState, [key]: value });
  }

  return (
    <Container>
      {/* 검색 입력 영역 */}
      <SearchInputWrapper container>
        <Grid2 size={10}>
          <SearchInput label="검색" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} fullWidth />
        </Grid2>
        <Grid2 size={2}>
          <SearchButton onClick={handleSearchButtonClick} fullWidth>
            <ImageSearchRounded />
          </SearchButton>
        </Grid2>
      </SearchInputWrapper>

      {/* 선택된 이미지 미리보기 */}
      {blockState.gifSrc && (
        <Stack justifyContent="center" alignItems="center">
          <Typography component="span" color="primary">
            미리보기
          </Typography>
          <GifBlock blockData={blockState} preview />
        </Stack>
      )}

      {/* 검색 결과 이미지 목록 */}
      <GifImageAccordion expanded={isAccordionExpanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreRounded color="primary" />}
          aria-controls="panel1-content"
          id="panel1-header"
          onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}
        >
          <Typography component="span" color="primary">
            GIF 이미지
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* 검색 결과 이미지 목록 */}
          <GifImageWrapper justifyContent={loading ? "center" : "start"}>
            {loading ? (
              <CircularProgress />
            ) : imgs.length > 0 ? (
              imgs.map((el, idx) => (
                <GifImage
                  key={idx}
                  src={el}
                  alt={`git-{el}`}
                  width={100}
                  height={100}
                  onClick={() => handleImgClick(el)}
                />
              ))
            ) : (
              <Typography align="center" color="text.secondary" sx={{ width: "100%" }}>
                검색 결과가 없습니다.
              </Typography>
            )}
          </GifImageWrapper>
        </AccordionDetails>
      </GifImageAccordion>

      {/* 정렬&애니메이션 선택기 */}
      <AlignAndAnimationPicker
        blockState={blockState}
        setBlockStateProperty={(key, value) => setBlockStateProperty(key as keyof GifBlockType, value)}
      />

      {/* 제출 */}
      <CommonAddButton blockState={{ variant: "gif", content: blockState }} disabled={blockState.gifSrc === ""} />
    </Container>
  );
};

export default GifEditor;

const Container = styled(Stack)`
  row-gap: 16px;
`;

const SearchInputWrapper = styled(Grid2)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  row-gap: 8px;
`;

const SearchInput = styled(TextField)`
  & .MuiInputBase-root {
    height: 48px;
    border: 1px solid ${({ theme }) => theme.palette.primary.main};
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const SearchButton = styled(Button)`
  height: 48px;
  & svg {
    font-size: 32px;
  }
`;

const GifImageWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
  width: 100%;
  overflow-x: auto;

  /* Chrome, Safari, Opera*/
  ::-webkit-scrollbar {
    display: none;
  }

  /* Firefox */
  scrollbar-width: none;

  /* IE and Edge */
  -ms-overflow-style: none;
`;

const GifImage = styled(Image)`
  width: 100px;
  height: auto;
  min-width: 100px;
`;

const GifImageAccordion = styled(Accordion)`
  &.MuiAccordion-root {
    padding: 0px;
    box-shadow: none;
    margin: 0px;
    background-color: ${({ theme }) => theme.palette.background.default};
  }

  & .MuiButtonBase-root {
    padding: 0px;
  }

  & .MuiAccordionDetails-root {
    padding: 0px;
  }

  &::before {
    display: none;
  }
`;
