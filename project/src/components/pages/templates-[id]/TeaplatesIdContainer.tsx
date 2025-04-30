"use client";

import { mixinContainer } from "@/styles/mixins";
import { TemplateType } from "@/types/template/templateType";
import { Box } from "@mui/material";
import { styled } from "@mui/material";
import BlockList from "./container/BlockList";
import CopyButton from "./container/CopyButton";

type PropsType = {
  templateData: TemplateType;
};

const TeaplatesIdContainer = ({ templateData }: PropsType) => {
  return (
    <Container>
      <CopyButton template={templateData} />
      <BlockList blocks={templateData.blocks} />
    </Container>
  );
};

export default TeaplatesIdContainer;

const Container = styled(Box)`
  ${mixinContainer()}
`;
