import { CheckCircleOutlineRounded } from "@mui/icons-material";
import { Stack, TextField, Typography } from "@mui/material";

import { styled } from "@mui/material";
import { useState } from "react";
import VideoBlock from "../../../templates/block/VideoBlock";
import CommonAddButton from "./CommonAddButton";
import { useAddBlockDrawerStore } from "@/store";
import { VideoBlockType } from "@/types/template/blockType";

const VideoEditor = () => {
  /////////////////////////////////////////////////////////////// State
  // 전역 블록 상태
  const { blockEditorState, setBlockEditorState } = useAddBlockDrawerStore();

  // 비디오 블록 존재 여부
  const isVideoBlockExist = blockEditorState && "videoLink" in blockEditorState;

  // 비디오 블록 상태
  const videoLink = isVideoBlockExist ? (blockEditorState as VideoBlockType).videoLink : "";

  // 비디오 블록 상태 수정
  const setVideoLink = (newVideoLink: string) => {
    setBlockEditorState({ ...blockEditorState, videoLink: newVideoLink });
  };

  // 입력값
  const [inputValue, setInputValue] = useState("");

  // 유튜브 링크 유효성 검사
  const [isCorrectLink, setIsCorrectLink] = useState(false);

  /////////////////////////////////////////////////////////////// Function

  function handleChangeVideoLink(e: React.ChangeEvent<HTMLInputElement>) {
    // 입력받은 유튜브 링크
    const inputLink = e.target.value;
    setInputValue(inputLink);
    // 유튜브 링크 유효성 검사
    const isValid = checkCorrectLink(inputLink);

    if (isValid) {
      const formattedLink = formatVideoLink(inputLink);
      setVideoLink(formattedLink as string);
      setIsCorrectLink(true);
    } else {
      setVideoLink("");
      setIsCorrectLink(false);
    }
  }

  // 유튜브 링크 형식 변환
  function formatVideoLink(link: string) {
    // 정규식 설명:
    // ^@? - 문자열 시작, @ 기호 포함 가능 (선택적)
    // (?:https?:\/\/)? - URL의 시작 부분, http:// 또는 https:// (선택적)
    // (?:www\.)? - www. 부분 (선택적)
    // (?:youtube\.com\/watch\?v=|youtu\.be\/) - 유튜브 도메인과 경로 패턴 (2가지 형식)
    // ([a-zA-Z0-9_-]{11}) - 유튜브 비디오 ID (11자리 영숫자, 언더스코어, 하이픈)
    // (?:[?&]si=[^&]*)? - ?si= 또는 &si= 파라미터와 그 값 (선택적)
    const regex =
      /^@?(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&]si=[^&]*)?/;
    const match = link.match(regex);

    // 비디오 ID가 추출되면 임베드 링크 형식으로 변환
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }

    return null;
  }

  // 유튜브 링크 유효성 검사
  function checkCorrectLink(link: string) {
    // 정규식 설명:
    // ^@? - 문자열 시작, @ 기호 포함 가능 (선택적)
    // (?:https?:\/\/)? - URL의 시작 부분, http:// 또는 https:// (선택적)
    // (?:www\.)? - www. 부분 (선택적)
    // (?:youtube\.com\/watch\?v=|youtu\.be\/) - 다음 두 가지 패턴 중 하나와 일치:
    //   - youtube.com/watch?v= (일반 유튜브 URL)
    //   - youtu.be/ (유튜브 짧은 URL)
    // ([a-zA-Z0-9_-]{11}) - 유튜브 비디오 ID (11자리 영숫자, 언더스코어, 하이픈)
    // (?:[?&]si=[^&]*)? - ?si= 또는 &si= 파라미터와 그 값 (선택적)
    const regex =
      /^@?(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&]si=[^&]*)?/;
    return regex.test(link);
  }

  return (
    <div>
      {videoLink !== "" && <VideoBlock blockData={{ videoLink }} />}
      <InputWrapper>
        <YoutubeLinkInput
          label="유튜브 링크"
          value={inputValue}
          onChange={handleChangeVideoLink}
          color={isCorrectLink ? "success" : "primary"}
          error={inputValue !== "" && !isCorrectLink}
          helperText={
            inputValue !== "" && !isCorrectLink
              ? `유효한 유튜브 링크가 아닙니다 ( 참고 : 유튜브 > 공유 > 링크 복사 )`
              : ""
          }
        />
        {isCorrectLink && (
          <Stack direction="row" alignItems="center" gap={1}>
            <CheckCircleOutlineRounded color="success" />
            <Typography variant="caption" color="success">
              유효한 유튜브 링크입니다
            </Typography>
          </Stack>
        )}
      </InputWrapper>

      <CommonAddButton blockState={{ variant: "video", content: { videoLink } }} disabled={!isCorrectLink} />
    </div>
  );
};

export default VideoEditor;

const InputWrapper = styled(Stack)`
  width: 100%;
  gap: 8px;
  margin-bottom: 16px;
  margin-top: 16px;
`;

const YoutubeLinkInput = styled(TextField)`
  width: 100%;
`;
