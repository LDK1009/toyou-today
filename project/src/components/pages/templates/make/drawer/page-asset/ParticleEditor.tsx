import React, { useEffect, useState } from "react";
import { Button, Grid2, Slider, Stack, styled, Switch, TextField, Typography } from "@mui/material";
import { ParticleAssetInputType, ParticleAssetType } from "@/types/template/pageAssetType";
import {
  NorthRounded,
  SouthRounded,
  WestRounded,
  EastRounded,
  NorthEastRounded,
  NorthWestRounded,
  SouthEastRounded,
  SouthWestRounded,
} from "@mui/icons-material";
import TextConfetti, { emitterOptionsType } from "@/components/common/TextConfetti";
import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";
import { useAddBlockDrawerStore } from "@/store";
import { mixinHideScrollbar, mixinSwitch } from "@/styles/mixins";

const ParticleEditor = () => {
  ////////////////////////////////////////////////// State //////////////////////////////////////////////////
  const { template: templateState } = useMakeTemplateStore();
  const initIsActive = templateState.pageAssets?.particle?.isActive === true ? true : false;

  // 페이지 에셋 상태(전송 타입)
  const [pageAssetState, setPageAssetState] = useState<ParticleAssetType | null>(null);

  // 페이지 에셋 상태(입력 타입)
  const [pageAssetInputState, setPageAssetInputState] = useState<ParticleAssetInputType>({
    isActive: initIsActive,
    text: "🎉",
    size: 10,
    speed: 1,
    emitterDirectionVariant: "top",
  });

  const { setIsOpen: setIsOpenAddBlockDrawer } = useAddBlockDrawerStore();

  const { setPageAsset } = useMakeTemplateStore();
  ////////////////////////////////////////////////// Effect //////////////////////////////////////////////////
  // 데이터 포맷팅
  useEffect(() => {
    const { isActive, text, size, speed, emitterDirectionVariant } = pageAssetInputState;

    setPageAssetState((prev) => ({
      ...prev,
      isActive: isActive,
      textConfettiProps: {
        particle: {
          text: text,
          size: [size / 2, size],
          speed: [(speed * 40) / 2, speed * 40],
        },
        emitters: emitterFormatter(emitterDirectionVariant, size),
      },
    }));
  }, [pageAssetInputState]);

  ////////////////////////////////////////////////// Variable //////////////////////////////////////////////////
  // 추천 텍스트
  const recommendedText = [
    "🎉",
    "🥳",
    "🎊",
    "🎈",
    "🎂",
    "🍰",
    "🧁",
    "🎁",
    "💐",
    "👏",
    "🏆",
    "🥇",
    "🥈",
    "🥉",
    "🏅",
    "🌟",
    "✨",
    "💫",
    "💖",
    "❤️",
    "💕",
    "💝",
    "🍾",
    "🍷",
    "🥂",
    "🍻",
    "🎵",
    "🎶",
    "💃",
    "🕺",
  ];

  // 방향 종류 리스트
  const emitterDirectionVariantList = [
    { variant: "top", icon: <NorthRounded /> },
    { variant: "bottom", icon: <SouthRounded /> },
    { variant: "left", icon: <WestRounded /> },
    { variant: "right", icon: <EastRounded /> },
    {
      variant: "top-cross",
      icon: (
        <>
          <NorthEastRounded />
          <NorthWestRounded />
        </>
      ),
    },
    {
      variant: "bottom-cross",
      icon: (
        <>
          <SouthEastRounded />
          <SouthWestRounded />
        </>
      ),
    },
  ];

  ////////////////////////////////////////////////// Function //////////////////////////////////////////////////
  // 입력 상태 프로퍼티 변경
  function handlePropertyChange(key: keyof ParticleAssetInputType, value: boolean | string | number) {
    setPageAssetInputState({ ...pageAssetInputState, [key]: value });
  }

  // 방향 종류 포맷팅
  function emitterFormatter(emitterDirectionVariant: string, size: number): emitterOptionsType[] {
    const particleQuantity = 300 / size;
    const crossEmitterParticleQuantity = particleQuantity / 2;

    switch (emitterDirectionVariant) {
      case "top":
        return [
          {
            direction: "top",
            position: "bottom",
            repeatCount: 1,
            duration: 0.1,
            delay: 0,
            particleQuantity: particleQuantity,
          },
        ];
      case "bottom":
        return [
          {
            direction: "bottom",
            position: "top",
            repeatCount: 1,
            duration: 0.1,
            delay: 0,
            particleQuantity: particleQuantity,
          },
        ];
      case "left":
        return [
          {
            direction: "left",
            position: "right",
            repeatCount: 1,
            duration: 0.1,
            delay: 0,
            particleQuantity: particleQuantity,
          },
        ];
      case "right":
        return [
          {
            direction: "right",
            position: "left",
            repeatCount: 1,
            duration: 0.1,
            delay: 0,
            particleQuantity: particleQuantity,
          },
        ];
      case "top-cross":
        return [
          {
            direction: "top-right",
            position: "bottom-left",
            repeatCount: 1,
            duration: 0.1,
            delay: 0,
            particleQuantity: crossEmitterParticleQuantity,
          },
          {
            direction: "top-left",
            position: "bottom-right",
            repeatCount: 1,
            duration: 0.1,
            delay: 0,
            particleQuantity: crossEmitterParticleQuantity,
          },
        ];
      case "bottom-cross":
        return [
          {
            direction: "bottom-right",
            position: "top-left",
            repeatCount: 1,
            duration: 0.1,
            delay: 0,
            particleQuantity: crossEmitterParticleQuantity,
          },
          {
            direction: "bottom-left",
            position: "top-right",
            repeatCount: 1,
            duration: 0.1,
            delay: 0,
            particleQuantity: crossEmitterParticleQuantity,
          },
        ];
      default:
        return [];
    }
  }

  // 페이지 에셋 추가 버튼 클릭
  function handleAddPageAssetButtonClick() {
    setPageAsset("particle", pageAssetState as ParticleAssetType);
    setIsOpenAddBlockDrawer(false);
  }

  ////////////////////////////////////////////////// Render //////////////////////////////////////////////////
  return (
    <Container>
      {/* 미리보기 */}
      {pageAssetState?.isActive && (
        <TextConfetti
          particle={pageAssetState.textConfettiProps.particle}
          emitters={pageAssetState.textConfettiProps.emitters}
        />
      )}

      {/* 그리드 컨테이너 */}
      <Grid2 container columnSpacing={3} rowSpacing={2} sx={{ width: "100%" }}>
        {/* 스위치 */}
        <Grid2 size={12}>
          <SwitchController pageAssetInputState={pageAssetInputState} handlePropertyChange={handlePropertyChange} />
        </Grid2>

        {/* 폭죽 문구 */}
        <Grid2 size={3}>
          <TextController pageAssetInputState={pageAssetInputState} handlePropertyChange={handlePropertyChange} />
        </Grid2>

        {/* 추천 문구 */}
        <Grid2 size={9}>
          <RecommendedText recommendedText={recommendedText} handlePropertyChange={handlePropertyChange} />{" "}
        </Grid2>

        {/* 속도 */}
        <Grid2 size={3}>
          <SpeedController handlePropertyChange={handlePropertyChange} />
        </Grid2>

        {/* 크기 */}
        <Grid2 size={9}>
          <SizeController handlePropertyChange={handlePropertyChange} />
        </Grid2>

        {/* 방향 */}
        <Grid2 size={12}>
          <DirectionController
            emitterDirectionVariantList={emitterDirectionVariantList}
            handlePropertyChange={handlePropertyChange}
          />
        </Grid2>
      </Grid2>

      <AddButton variant="contained" onClick={handleAddPageAssetButtonClick}>
        추가
      </AddButton>
    </Container>
  );
};

export default ParticleEditor;
////////////////////////////////////////////////// 스타일 //////////////////////////////////////////////////
const Container = styled(Stack)`
  align-items: center;
  justify-content: center;
  row-gap: 16px;
`;

const CategoryWrapper = styled(Stack)`
  row-gap: 4px;
`;

const TitleText = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

const AddButton = styled(Button)`
  width: 100%;
  color: ${({ theme }) => theme.palette.text.white};
`;

////////////////////////////////////////////////// 하위 컴포넌트 //////////////////////////////////////////////////
//////////////////////////////// 스위치 컴포넌트 //////////////////////////////////
type LowerComponentProps = {
  pageAssetInputState: ParticleAssetInputType;
  handlePropertyChange: (key: keyof ParticleAssetInputType, value: string | number | boolean) => void;
};

//////////////////////////////// 스위치 컴포넌트 //////////////////////////////////
const SwitchController = ({ pageAssetInputState, handlePropertyChange }: LowerComponentProps) => {
  return (
    <SwitchControllerContainer>
      <CategoryWrapper>
        <TitleText align="center">활성화</TitleText>
        <SwitchWrapper>
          <StyledSwitch
            checked={pageAssetInputState.isActive}
            onChange={() => handlePropertyChange("isActive", !pageAssetInputState.isActive)}
            size="medium"
            required
          />
        </SwitchWrapper>
      </CategoryWrapper>
    </SwitchControllerContainer>
  );
};

const SwitchControllerContainer = styled(Stack)`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SwitchWrapper = styled(Stack)`
  align-items: center;
  justify-content: center;
`;

const StyledSwitch = styled(Switch)`
  ${({ theme }) => mixinSwitch(50, 25, theme)}
`;

//////////////////////////////// 폭죽 문구 컴포넌트 ///////////////// /////////////////
const TextController = ({ pageAssetInputState, handlePropertyChange }: LowerComponentProps) => {
  return (
    <CategoryWrapper>
      <TitleText>문구</TitleText>
      <TextField
        value={pageAssetInputState.text}
        onChange={(e) => handlePropertyChange("text", e.target.value)}
        sx={{ "& .MuiInputBase-root": { height: "50px" } }}
        placeholder="예) 축하, 😎"
      />
    </CategoryWrapper>
  );
};

//////////////////////////////// 추천 문구 컴포넌트 //////////////////////////////////
const RecommendedText = ({
  recommendedText,
  handlePropertyChange,
}: {
  recommendedText: string[];
  handlePropertyChange: (key: keyof ParticleAssetInputType, value: string | number | boolean) => void;
}) => {
  return (
    <CategoryWrapper>
      <TitleText>추천 문구</TitleText>
      <RecommendedTextScroll>
        {recommendedText.map((text) => (
          <RecommendedTextButton key={text} variant="outlined" onClick={() => handlePropertyChange("text", text)}>
            {text}
          </RecommendedTextButton>
        ))}
      </RecommendedTextScroll>
    </CategoryWrapper>
  );
};

const RecommendedTextScroll = styled(Stack)`
  width: 100%;
  flex-direction: row;
  overflow-x: auto;
  align-items: center;
  justify-content: start;
  column-gap: 4px;

  ${mixinHideScrollbar}

  & .MuiButtonBase-root {
    padding: 4px;
  }
`;

const RecommendedTextButton = styled(Button)`
  max-width: 50px;
  min-width: 50px;
  aspect-ratio: 1/1;
`;

//////////////////////////////// 크기 컴포넌트 //////////////////////////////////
const SizeController = ({
  handlePropertyChange,
}: {
  handlePropertyChange: (key: keyof ParticleAssetInputType, value: string | number | boolean) => void;
}) => {
  return (
    <CategoryWrapper>
      <TitleText>크기</TitleText>
      <Slider
        defaultValue={10}
        valueLabelDisplay="auto"
        shiftStep={10}
        step={10}
        marks
        min={10}
        max={50}
        onChange={(e, value) => handlePropertyChange("size", value as number)}
      />
    </CategoryWrapper>
  );
};

//////////////////////////////// 속도 컴포넌트 //////////////////////////////////
const SpeedController = ({
  handlePropertyChange,
}: {
  handlePropertyChange: (key: keyof ParticleAssetInputType, value: string | number | boolean) => void;
}) => {
  return (
    <CategoryWrapper>
      <TitleText>속도</TitleText>
      <Slider
        defaultValue={1}
        valueLabelDisplay="auto"
        shiftStep={1}
        step={1}
        marks
        min={1}
        max={3}
        onChange={(e, value) => handlePropertyChange("speed", value as number)}
      />
    </CategoryWrapper>
  );
};

//////////////////////////////// 방향 컴포넌트 //////////////////////////////////
const DirectionController = ({
  emitterDirectionVariantList,
  handlePropertyChange,
}: {
  emitterDirectionVariantList: { variant: string; icon: React.ReactNode }[];
  handlePropertyChange: (key: keyof ParticleAssetInputType, value: string | number | boolean) => void;
}) => {
  return (
    <CategoryWrapper>
      <TitleText>방향</TitleText>
      <DirectionControllerButtonWrapper>
        {emitterDirectionVariantList.map((el, idx) => (
          <Button
            key={idx}
            variant="outlined"
            onClick={() => handlePropertyChange("emitterDirectionVariant", el.variant)}
          >
            <IconWrapper>{el.icon}</IconWrapper>
          </Button>
        ))}
      </DirectionControllerButtonWrapper>
    </CategoryWrapper>
  );
};

const DirectionControllerButtonWrapper = styled(Stack)`
  width: 100%;
  flex-direction: row;
  overflow-x: auto;
  align-items: center;
  justify-content: start;
  column-gap: 8px;

  ${mixinHideScrollbar}

  & .MuiButtonBase-root {
    padding: 4px;
    min-width: 50px;
    max-width: 50px;
    aspect-ratio: 1/1;
  }
`;

//////////////////////////////////////// 방향 종류 컴포넌트 ////////////////////////////////////////
const IconWrapper = styled(Stack)`
  flex-direction: row;
`;
