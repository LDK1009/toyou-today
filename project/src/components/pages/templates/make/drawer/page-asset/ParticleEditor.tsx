import React, { useEffect, useState } from "react";
import { Button, Slider, Stack, styled, Switch, TextField } from "@mui/material";
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

const ParticleEditor = () => {
  ////////////////////////////////////////////////// State //////////////////////////////////////////////////
  const [pageAssetState, setPageAssetState] = useState<ParticleAssetType | null>(null);

  const [pageAssetInputState, setPageAssetInputState] = useState<ParticleAssetInputType>({
    isActive: false,
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
  const recommendedText = [
    "생일 축하해",
    "사랑해",
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
  function handlePropertyChange(key: keyof ParticleAssetInputType, value: boolean | string | number) {
    setPageAssetInputState({ ...pageAssetInputState, [key]: value });
  }

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

  function handleAddPageAssetButtonClick() {
    setPageAsset("particle", pageAssetState as ParticleAssetType);
    setIsOpenAddBlockDrawer(false);
  }

  return (
    <Container>
      {pageAssetState?.isActive && (
        <TextConfetti
          particle={pageAssetState.textConfettiProps.particle}
          emitters={pageAssetState.textConfettiProps.emitters}
        />
      )}
      <pre>{JSON.stringify(pageAssetState, null, 2)}</pre>
      <pre>{JSON.stringify(pageAssetInputState, null, 2)}</pre>

      {/* 스위치 */}
      <div>
        <div>파티클 활성화</div>
        <div>{pageAssetInputState.isActive ? "ON" : "OFF"}</div>
        <Switch
          checked={pageAssetInputState.isActive}
          onChange={() => handlePropertyChange("isActive", !pageAssetInputState.isActive)}
        />
      </div>

      {/* 텍스트 입력 */}
      <div>
        <div>파티클 텍스트</div>
        <TextField
          label="폭죽 파티클"
          value={pageAssetInputState.text}
          onChange={(e) => handlePropertyChange("text", e.target.value)}
          placeholder="텍스트 또는 이모지를 입력해주세요."
        />
      </div>

      {/* 추천 텍스트 */}
      <div style={{ width: "100%", overflowX: "auto" }}>
        <div>추천 텍스트</div>
        <Stack direction="row" spacing={0.5}>
          {recommendedText.map((text) => (
            <Button key={text} variant="outlined" onClick={() => handlePropertyChange("text", text)}>
              {text}
            </Button>
          ))}
        </Stack>
      </div>

      {/* 크기 */}
      <div style={{ width: "100%", padding: "0 10px" }}>
        <div>파티클 크기</div>
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
      </div>

      {/* 속도 */}
      <div style={{ width: "100%", padding: "0 10px" }}>
        <div>파티클 속도</div>
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
      </div>

      {/* 방향 종류 */}
      <div style={{ width: "100%", padding: "0 10px" }}>
        <div>파티클 속도</div>
        {emitterDirectionVariantList.map((el, idx) => (
          <Button
            key={idx}
            variant="outlined"
            onClick={() => handlePropertyChange("emitterDirectionVariant", el.variant)}
          >
            <IconWrapper>{el.icon}</IconWrapper>
          </Button>
        ))}
      </div>

      <Button variant="contained" onClick={handleAddPageAssetButtonClick}>
        추가
      </Button>
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

////////////////////////////////////////////////// 하위 컴포넌트 //////////////////////////////////////////////////

//////////////////////////////////////// 방향 종류 컴포넌트 ////////////////////////////////////////
const IconWrapper = styled(Stack)`
  flex-direction: row;
`;
