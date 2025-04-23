"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useAddBlockDrawerStore } from "@/store";
import TextEditor from "./TextEditor";
import { styled } from "@mui/material";
import CalenderEditor from "./CalenderEditor";
import ImageEditor from "./ImageEditor";
import VideoEditor from "./VideoEditor";
import GifEditor from "./GifEditor";
import GalleryEditor from "./GalleryEditor";
import SpaceEditor from "./SpaceEditor";
import LinkEditor from "./LinkEditor";
import QuizEditor from "./QuizEditor";
export default function AddBlockDrawer() {
  ////////////////////////////// State //////////////////////////////
  const { anchor, isOpen, setIsOpen } = useAddBlockDrawerStore();

  ////////////////////////////// Render //////////////////////////////
  return (
    <Container
      anchor={anchor}
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      onOpen={() => {
        setIsOpen(true);
      }}
    >
      <DrawerContent />
    </Container>
  );
}
//////////////////////////////////////////////////////////// 스타일

const Container = styled(SwipeableDrawer)`
  & .MuiPaper-root {
    border-radius: 0px 0px 8px 8px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.3);
    padding: 16px;
  }

  & .MuiBackdrop-root {
    background-color: rgba(182, 185, 190, 0.3);
    backdrop-filter: blur(1px);
  }
`;

//////////////////////////////////////////////////////////// 하위 컴포넌트
const DrawerContent = () => {
  const { variant } = useAddBlockDrawerStore();

  return (
    <DrawerContentContainer role="presentation">
      {variant === "space" && <SpaceEditor />}
      {variant === "text" && <TextEditor />}
      {variant === "calendar" && <CalenderEditor />}
      {variant === "image" && <ImageEditor />}
      {variant === "gallery" && <GalleryEditor />}
      {variant === "gif" && <GifEditor />}
      {variant === "video" && <VideoEditor />}
      {variant === "link" && <LinkEditor />}
      {variant === "quiz" && <QuizEditor />}
    </DrawerContentContainer>
  );
};

const DrawerContentContainer = styled(Box)``;
