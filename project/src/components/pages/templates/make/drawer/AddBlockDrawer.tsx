"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useAddBlockDrawerStore } from "@/store";
import TextEditor from "./TextEditor";

export default function AddBlockDrawer() {
  const { anchor, isOpen, setIsOpen } = useAddBlockDrawerStore();

  return (
    <SwipeableDrawer
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
    </SwipeableDrawer>
  );
}

//////////////////////////////////////////////////////////// 하위 컴포넌트

// 하위 컴포넌트
const DrawerContent = () => {
  const { anchor, variant } = useAddBlockDrawerStore();

  return (
    <Box sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }} role="presentation">
      {variant === "text" && <TextEditor />}
    </Box>
  );
};
