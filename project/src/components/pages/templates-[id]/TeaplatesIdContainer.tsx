"use client";

import { mixinContainer } from "@/styles/mixins";
import { TemplateType } from "@/types/template/templateType";
import { Box, Stack } from "@mui/material";
import { styled } from "@mui/material";
import BlockList from "./container/BlockList";
import CopyButton from "./container/CopyButton";
import RollingPaperPageAsset from "../templates/page-asset/rollingpaper/RollingPaperPageAsset";
import BackgroundMusicPageAsset from "../templates/page-asset/BackgroundMusicPageAsset";
import ParticlePageAsset from "../templates/page-asset/ParticlePageAsset";
import BottomButtonList from "./container/BottomButtonList";

type PropsType = {
  templateData: TemplateType;
};

const TeaplatesIdContainer = ({ templateData }: PropsType) => {
  // 페이지 에셋
  const particle = templateData.pageAssets?.particle;
  const backgroundMusic = templateData.pageAssets?.backgroundMusic;
  const rollingPaper = templateData.pageAssets?.rollingPaper;

  return (
    <Container>
      {/* 폭죽 */}
      {particle?.isActive && (
        <ParticlePageAsset
          particle={particle.textConfettiProps.particle}
          emitters={particle.textConfettiProps.emitters}
        />
      )}

      {/* 배경음악 */}
      {backgroundMusic?.isActive && <BackgroundMusicPageAsset pageAssetData={backgroundMusic} />}

      {/* 상단 */}
      <Top>
        {/* 이 템플릿으로 시작하기 */}
        {templateData.public && <CopyButton template={templateData} />}
      </Top>

      {/* 컨텐츠 */}
      <Content>
        {/* 블록 리스트 */}
        <BlockList blocks={templateData.blocks} />

        {/* 롤링페이퍼 */}
        {rollingPaper?.isActive && <RollingPaperPageAsset templateId={Number(templateData.id)} preview={false} />}
      </Content>

      {/* 하단 */}
      <Bottom>
        {/* 하단 버튼 리스트 */}
        <BottomButtonList templateData={templateData} />
      </Bottom>
    </Container>
  );
};

export default TeaplatesIdContainer;

const Container = styled(Stack)`
  ${mixinContainer()}
  padding-bottom: 150px !important;
  row-gap: 32px;
`;

const Top = styled(Box)``;

const Content = styled(Box)``;

const Bottom = styled(Stack)`
  width: 100%;
  row-gap: 8px;
`;
