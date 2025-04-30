"use client";

import { BlockType } from "@/types/template/blockType";
import SpaceBlock from "../../templates/block/SpaceBlock";
import TextBlock from "../../templates/block/TextBlock";
import dynamic from "next/dynamic";
import ImageBlock from "../../templates/block/ImageBlock";
import GalleryBlock from "../../templates/block/GalleryBlock";
import GifBlock from "../../templates/block/GifBlock";
import VideoBlock from "../../templates/block/VideoBlock";
import LinkBlock from "../../templates/block/LinkBlock";
import QuizBlock from "../../templates/block/QuizBlock";
import React from "react";
import { Stack } from "@mui/material";
import { styled } from "@mui/material";

// 동적으로 CalenderBlock 불러오기 (클라이언트 사이드에서만 렌더링)
const CalenderBlock = dynamic(() => import("../../templates/block/CalenderBlock"), {
  ssr: false,
});

const BlockList = ({ blocks }: { blocks: BlockType[] }) => {
  // 렌더링
  return (
    <Container>
      {blocks.map((el) => {
        return (
          <React.Fragment key={el.id}>
            {el.variant === "space" && <SpaceBlock blockData={el.content} />}
            {el.variant === "text" && <TextBlock blockData={el.content} />}
            {el.variant === "calendar" && <CalenderBlock blockData={el.content} />}
            {el.variant === "image" && <ImageBlock blockData={el.content} />}
            {el.variant === "gallery" && <GalleryBlock blockData={el.content} />}
            {el.variant === "gif" && <GifBlock blockData={el.content} />}
            {el.variant === "video" && <VideoBlock blockData={el.content} />}
            {el.variant === "link" && <LinkBlock blockData={el.content} />}
            {el.variant === "quiz" && <QuizBlock blockData={el.content} />}
          </React.Fragment>
        );
      })}
    </Container>
  );
};

export default BlockList;

const Container = styled(Stack)`
  width: 100%;
  padding-top: 16px;
  flex-direction: column;
  row-gap: 40px;
`;
