import { mixinHideScrollbar, mixinSwitch } from "@/styles/mixins";
import { CheckCircleOutlineRounded, MusicNoteRounded, PauseRounded, PlayArrowRounded } from "@mui/icons-material";
import { Button, Slider, Stack, styled, Switch, Typography } from "@mui/material";
import React, { useState, useRef } from "react";
import { shouldForwardProp } from "@/utils/mui";
import { BackgroundMusicAssetType } from "@/types/template/pageAssetType";
import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import { useAddBlockDrawerStore } from "@/store";

const BackgroundMusicEditor = () => {
  // 템플릿 상태 구독
  const { template: templateState, setPageAsset } = useMakeTemplateStore();
  const { setIsOpen: setAddBlockDrawerOpen } = useAddBlockDrawerStore();

  // 활성화 상태 초기화
  const initIsActive = templateState?.pageAssets?.backgroundMusic?.isActive === true ? true : false;

  // 페이지 에셋 상태(전송 타입)
  const [pageAssetState, setPageAssetState] = useState<BackgroundMusicAssetType>({
    isActive: initIsActive,
    label: "샘플 음악",
    musicSrc: "/music/birthday-1.mp3",
  });

  // 음악 상태
  const [musicState, setMusicState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
  });

  // 음악 상태 변경
  function handleMusicPropertyChange(key: "isPlaying" | "currentTime" | "duration", value: boolean | number) {
    setMusicState({ ...musicState, [key]: value });
  }

  // 음악 재생 참조
  const audioRef = useRef<HTMLAudioElement>(null);

  // 음악 목록
  type MusicListItmeType = {
    label: string;
    src: string;
  };

  const musicList: MusicListItmeType[] = [
    { label: "생일1", src: "/music/birthday-1.mp3" },
    { label: "생일2", src: "/music/birthday-2.mp3" },
    { label: "생일3", src: "/music/birthday-3.mp3" },
    { label: "생일4", src: "/music/birthday-4.mp3" },

    { label: "귀여운1", src: "/music/cute-1.mp3" },
    { label: "귀여운2", src: "/music/cute-2.mp3" },
    { label: "귀여운3", src: "/music/cute-3.mp3" },
    { label: "귀여운4", src: "/music/cute-4.mp3" },

    { label: "빠른1", src: "/music/speed-1.mp3" },
    { label: "빠른2", src: "/music/speed-2.mp3" },
    { label: "빠른3", src: "/music/speed-3.mp3" },

    { label: "잔잔한1", src: "/music/windless-1.mp3" },
    { label: "잔잔한2", src: "/music/windless-2.mp3" },
    { label: "잔잔한3", src: "/music/windless-3.mp3" },

    { label: "행복한1", src: "/music/happy-1.mp3" },
    { label: "행복한2", src: "/music/happy-2.mp3" },
    { label: "행복한3", src: "/music/happy-3.mp3" },
    { label: "행복한4", src: "/music/happy-4.mp3" },

    { label: "웅장한1", src: "/music/magnificent-1.mp3" },
    { label: "웅장한2", src: "/music/magnificent-2.mp3" },

    { label: "신성한1", src: "/music/sacred-1.mp3" },
    { label: "신성한2", src: "/music/sacred-2.mp3" },
    { label: "신성한3", src: "/music/sacred-3.mp3" },
  ];

  // 오디오 시간 업데이트 핸들러
  function handleTimeUpdate() {
    if (audioRef.current) {
      handleMusicPropertyChange("currentTime", audioRef.current.currentTime);
    }
  }

  // 오디오 로드 완료 핸들러
  function handleLoadedData() {
    if (audioRef.current) {
      handleMusicPropertyChange("duration", audioRef.current.duration);
    }
  }

  // 재생/일시정지 토글
  function handlePlay() {
    if (audioRef.current) {
      if (musicState.isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      handleMusicPropertyChange("isPlaying", !musicState.isPlaying);
    }
  }

  // 시간 포맷팅 함수
  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  // 시간 이동 핸들러
  function handleSeek(seekTime: number) {
    handleMusicPropertyChange("currentTime", seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  }

  // 음악 선택 핸들러
  function handleMusicSelect(music: MusicListItemType) {
    if (audioRef.current) {
      audioRef.current.src = music.src;
      audioRef.current.load();

      // 오디오가 로드된 후 재생하도록 이벤트 리스너 추가
      const playAudio = () => {
        audioRef.current?.play().catch((error) => console.error("오디오 재생 오류:", error));
        // 이벤트 리스너 제거 (한 번만 실행)
        audioRef.current?.removeEventListener("canplaythrough", playAudio);
      };

      audioRef.current.addEventListener("canplaythrough", playAudio);

      setPageAssetState({ ...pageAssetState, label: music.label, musicSrc: music.src });
      handleMusicPropertyChange("isPlaying", true);
    }
  }

  // 배경음악 에셋 추가 핸들러
  function handleAddButtonClick() {
    setPageAsset("backgroundMusic", pageAssetState);
    audioRef.current?.pause();
    handleMusicPropertyChange("isPlaying", false);
    setAddBlockDrawerOpen(false);
  }

  return (
    <Container>
      <audio
        ref={audioRef}
        src={pageAssetState.musicSrc || "/music/cute-1.mp3"}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
      />

      {/* 1. 스위치 섹션 */}
      <SwitchSection pageAssetState={pageAssetState} setPageAssetState={setPageAssetState} />

      {/* 2. 미리보기 섹션 */}

      <PreviewSection
        pageAssetState={pageAssetState}
        musicState={musicState}
        onTogglePlay={handlePlay}
        onSeek={handleSeek}
        formatTime={formatTime}
      />

      {/* 3. 음악 라이브러리 섹션 */}
      <MusicSelctSection
        musicList={musicList}
        selectedMusic={pageAssetState.musicSrc}
        onMusicSelect={handleMusicSelect}
      />

      {/* 4. 추가 버튼 */}
      <EditButton variant="contained" onClick={handleAddButtonClick} startIcon={<CheckCircleOutlineRounded />}>
        저장
      </EditButton>
    </Container>
  );
};

//////////////////////////////////////// 스타일 ////////////////////////////////////////
const Container = styled(Stack)`
  row-gap: 16px;
`;

const TitleWrapper = styled(Stack)``;

const Title = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

const EditButton = styled(Button)`
  width: 100%;
  color: ${({ theme }) => theme.palette.text.white};
`;

//////////////////////////////////////// 하위 컴포넌트 ////////////////////////////////////////

// ============================================================
// 1. 스위치 섹션 컴포넌트
// ============================================================
interface SwitchSectionProps {
  pageAssetState: BackgroundMusicAssetType;
  setPageAssetState: React.Dispatch<React.SetStateAction<BackgroundMusicAssetType>>;
}

const SwitchSection = ({ pageAssetState, setPageAssetState }: SwitchSectionProps) => {
  return (
    <SwitchSectionContainer>
      <TitleWrapper>
        <Title>활성화</Title>
        <StyledSwitch
          checked={pageAssetState.isActive}
          onChange={() => setPageAssetState({ ...pageAssetState, isActive: !pageAssetState.isActive })}
        />
      </TitleWrapper>
    </SwitchSectionContainer>
  );
};

const SwitchSectionContainer = styled(Stack)`
  align-items: center;
  justify-content: center;
`;

const StyledSwitch = styled(Switch)`
  ${({ theme }) => mixinSwitch(50, 25, theme)}
`;

// ============================================================
// 2. 미리보기 섹션 컴포넌트
// ============================================================

type MusicStateType = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
};

type PreviewSectionPropType = {
  pageAssetState: BackgroundMusicAssetType;
  musicState: MusicStateType;
  onTogglePlay: () => void;
  onSeek: (seekTime: number) => void;
  formatTime: (time: number) => string;
};

const PreviewSection = ({ pageAssetState, musicState, onTogglePlay, onSeek, formatTime }: PreviewSectionPropType) => {
  const { label } = pageAssetState;
  const { isPlaying, currentTime, duration } = musicState;

  return (
    <TitleWrapper>
      <Title>선택된 음악 : {label}</Title>

      {/* <input type="range" min={0} max={duration || 100} value={currentTime} onChange={onSeek} /> */}
      <Slider value={currentTime} max={duration} onChange={(e, value) => onSeek(Number(value))} />
      {/* 시간 및 재생 컨트롤러 */}
      <TimeTextAndPlayControlWrapper>
        <TimeText variant="caption">{formatTime(currentTime)}</TimeText>
        <PlayControlButton onClick={onTogglePlay}>
          {isPlaying ? <PauseRounded /> : <PlayArrowRounded />}
        </PlayControlButton>
        <TimeText variant="caption">{formatTime(duration)}</TimeText>
      </TimeTextAndPlayControlWrapper>
    </TitleWrapper>
  );
};

const TimeTextAndPlayControlWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TimeText = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

const PlayControlButton = styled(Button)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

// ============================================================
// 3. 음악 라이브러리 섹션 컴포넌트
// ============================================================
type MusicSelctSectionProps = {
  musicList: MusicListItemType[];
  selectedMusic: string | null;
  onMusicSelect: (music: MusicListItemType) => void;
};

type MusicListItemType = {
  label: string;
  src: string;
};

const MusicSelctSection = ({ musicList, selectedMusic, onMusicSelect }: MusicSelctSectionProps) => {
  return (
    <TitleWrapper>
      <Title>음악 라이브러리</Title>
      <MusicSelectButtonWrapper>
        {musicList.map((el, index) => (
          <MusicSelectButton
            key={index}
            onClick={() => onMusicSelect({ label: el.label, src: el.src })}
            variant="outlined"
            $isSelected={selectedMusic === el.src}
          >
            <MusicSelectButtonContent>
              <MusicNoteRounded />
              <Typography variant="caption">{el.label}</Typography>
              {/* <Typography variant="caption">{el.src}</Typography> */}
            </MusicSelectButtonContent>
          </MusicSelectButton>
        ))}
      </MusicSelectButtonWrapper>
    </TitleWrapper>
  );
};

const MusicSelectButtonWrapper = styled(Stack)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  column-gap: 8px;
  overflow-x: auto;
  ${mixinHideScrollbar}
`;

type MusicSelectButtonProps = {
  $isSelected: boolean;
};

const MusicSelectButton = styled(Button, { shouldForwardProp })<MusicSelectButtonProps>`
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.palette.primary.main : theme.palette.background.paper};
  color: ${({ theme, $isSelected }) => ($isSelected ? theme.palette.text.white : theme.palette.text.primary)};
  transition: all 0.3s ease;
`;

const MusicSelectButtonContent = styled(Stack)`
  align-items: center;
`;

export default BackgroundMusicEditor;
