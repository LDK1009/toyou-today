import React, { useEffect, useRef, useState } from "react";
import { Box, Tooltip } from "@mui/material";
import { styled } from "@mui/material";
import { MusicNoteRounded, MusicOffRounded } from "@mui/icons-material";
import { mixinFlex } from "@/styles/mixins";
import { shouldForwardProp } from "@/utils/mui";
import { BackgroundMusicAssetType } from "@/types/template/pageAssetType";

const BackgroundMusicPageAsset = ({ pageAssetData }: { pageAssetData: BackgroundMusicAssetType }) => {
  // 배경음악 활성화 상태
  const [isMusicStart, setIsMusicStart] = useState(true);

  // 배경음악 데이터
  const { label, musicSrc } = pageAssetData || {};

  // 배경음악 오디오 요소
  const audioRef = useRef<HTMLAudioElement>(null);

  // 배경음악 활성화 상태 변경 함수
  function handleMusicOnClick() {
    setIsMusicStart(!isMusicStart);
  }

  // 배경음악 활성화 상태 변경 시 오디오 재생 여부 확인
  useEffect(() => {
    if (audioRef.current) {
      if (isMusicStart) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicStart]);

  // 배경음악 렌더링
  return (
    <>
      {/* 배경음악 활성화 상태 표시 */}
      <Tooltip title={label}>
        <MusicIconWrapper onClick={handleMusicOnClick} $isActive={isMusicStart || false}>
          {isMusicStart ? <MusicNoteRounded /> : <MusicOffRounded />}
        </MusicIconWrapper>
      </Tooltip>
      {/* 배경음악 오디오 요소 */}
      <audio ref={audioRef} src={musicSrc} autoPlay />
    </>
  );
};

export default BackgroundMusicPageAsset;

type MusicIconWrapperProps = {
  $isActive: boolean;
};

const MusicIconWrapper = styled(Box, { shouldForwardProp })<MusicIconWrapperProps>`
  ${mixinFlex("row", "center", "center")}

  width: 50px;
  height: 50px;

  position: fixed;
  z-index: 100;
  bottom: 86px;
  right: 16px;

  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.background.paper};

  & .MuiSvgIcon-root {
    font-size: 30px;
    color: ${({ theme }) => theme.palette.primary.main};
  }

  animation: ${({ $isActive }) => ($isActive ? "rotate 7s linear infinite" : "none")};

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
