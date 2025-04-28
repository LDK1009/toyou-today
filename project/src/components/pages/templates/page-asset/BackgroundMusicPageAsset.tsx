import React, { useEffect, useRef } from "react";
import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import { Box, Tooltip } from "@mui/material";
import { styled } from "@mui/material";
import { MusicNoteRounded, MusicOffRounded } from "@mui/icons-material";
import { mixinFlex } from "@/styles/mixins";
import { shouldForwardProp } from "@/utils/mui";
const BackgroundMusicPageAsset = () => {
  const { template: templateState, setPageAsset } = useMakeTemplateStore();
  const backgroundMusicPageAsset = templateState?.pageAssets?.backgroundMusic;

  const { isActive, label, musicSrc } = backgroundMusicPageAsset || {};

  const audioRef = useRef<HTMLAudioElement>(null);

  function handleMusicOnClick() {
    if (backgroundMusicPageAsset) {
      setPageAsset("backgroundMusic", {
        ...backgroundMusicPageAsset,
        isActive: !backgroundMusicPageAsset?.isActive,
      });
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      if (isActive) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isActive]);

  return (
    <>
      <Tooltip title={label}>
        <MusicIconWrapper onClick={handleMusicOnClick} $isActive={isActive || false}>
          {isActive ? <MusicNoteRounded /> : <MusicOffRounded />}
        </MusicIconWrapper>
      </Tooltip>
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
