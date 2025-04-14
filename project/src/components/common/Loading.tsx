"use client";

import { CircularProgress } from "@mui/material";

const Loading = () => {
  return <CircularProgress sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />;
};

export default Loading;
