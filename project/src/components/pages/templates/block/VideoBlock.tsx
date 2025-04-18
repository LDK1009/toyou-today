import { VideoBlockType } from "@/types/template/blockType";
import React from "react";

const VideoBlock = ({ blockData }: { blockData: VideoBlockType }) => {
  return (
    <div>
      <iframe
        src={blockData.videoLink}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{ width: "100%", aspectRatio: 16 / 9 }}
      ></iframe>
    </div>
  );
};

export default VideoBlock;
