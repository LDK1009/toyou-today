import React from "react";
import TemplateItem from "./TemplateItem";
import { TemplateType } from "@/types/template/templateType";
import { Grid2, styled } from "@mui/material";

const TemplateList = ({ templates }: { templates: TemplateType[] }) => {
  return (
    <Container container spacing={2}>
      {templates.map((el, idx) => {
        return <TemplateItem key={idx} template={el} />;
      })}
    </Container>
  );
};

export default TemplateList;

const Container = styled(Grid2)`
  width: 100%;
`;
