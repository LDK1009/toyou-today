"use client";

import { mixinContainer } from "@/styles/mixins";
import { TemplateType } from "@/types/template/templateType";
import { Box } from "@mui/material";
import { styled } from "@mui/material";
import BlockList from "./container/BlockList";
import CopyButton from "./container/CopyButton";
import RollingPaperPageAsset from "../templates/page-asset/RollingPaperPageAsset";
import BackgroundMusicPageAsset from "../templates/page-asset/BackgroundMusicPageAsset";
import ParticlePageAsset from "../templates/page-asset/ParticlePageAsset";

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

      {/* 이 템플릿으로 시작하기 */}
      <CopyButton template={templateData} />

      {/* 블록 리스트 */}
      <BlockList blocks={templateData.blocks} />

      {/* 롤링페이퍼 */}
      {rollingPaper?.isActive && <RollingPaperPageAsset templateId={Number(templateData.id)} preview={false} />}
    </Container>
  );
};

export default TeaplatesIdContainer;

const Container = styled(Box)`
  ${mixinContainer()}
  padding-bottom: 150px !important;
`;
