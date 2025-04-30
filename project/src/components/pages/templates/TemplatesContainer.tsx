"use client";

import { Box } from "@mui/material";

import { mixinContainer } from "@/styles/mixins";
import { styled } from "@mui/material";
import { TemplateType } from "@/types/template/templateType";
import TemplateList from "./container/TemplateList";

const TemplatesContainer = ({ templates }: { templates: TemplateType[] }) => {
  return (
    <Container>
        <TemplateList templates={templates}/>
    </Container>
  );
};

export default TemplatesContainer;

const Container = styled(Box)`
  ${mixinContainer()}
`;
