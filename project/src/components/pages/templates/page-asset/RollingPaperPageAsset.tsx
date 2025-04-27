import * as React from "react";
import Box from "@mui/material/Box";
import {
  RollingPaperAssetType,
  RollingPaperAsset_CommentItemType,
  RollingPaperAsset_EmpathyItemType,
} from "@/types/template/pageAssetType";
import CommonTab from "@/components/common/CommonTab";
import { Button, Grid2, Stack, styled, Typography } from "@mui/material";
import { mixinHideScrollbar } from "@/styles/mixins";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import BubbleLayer from "@/components/common/BubbleLayer";
import { HistoryEduRounded } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";

const RollingPaperPageAsset = ({ pageAssetData }: { pageAssetData: RollingPaperAssetType }) => {
  // 탭 리스트
  const tabList = [
    {
      label: "댓글",
      component: <CommentTab comments={pageAssetData.comments} />,
    },
    {
      label: "공감",
      component: <EmpathyTab empathies={pageAssetData.empathies} />,
    },
  ];

  return (
    <Container>
      <CommonTab tabList={tabList} />
    </Container>
  );
};

export default RollingPaperPageAsset;

//////////////////////////////////////// 스타일 ////////////////////////////////////////
const Container = styled(Box)`
  width: 100%;
`;

//////////////////////////////////////// 하위 컴포넌트 ////////////////////////////////////////
//////////////////// 댓글 & 공감 아이템 애니메이션 ////////////////////
const ItemAnimation = ({
  children,
  index,
  isAnimateStart,
}: {
  children: React.ReactNode;
  index: number;
  isAnimateStart: boolean;
}) => {
  const animationVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    transition: {
      type: "spring",
      duration: 0.1,
      delay: index * 0.05,
      stiffness: 100,
      damping: 10,
    },
  };

  return (
    <motion.div
      variants={animationVariants}
      initial="hidden"
      animate={isAnimateStart ? "visible" : "hidden"}
      transition={animationVariants.transition}
    >
      {children}
    </motion.div>
  );
};

//////////////////// 댓글 탭 ////////////////////
type CommentTabPropsType = {
  comments: RollingPaperAsset_CommentItemType[];
};

const CommentTab = ({ comments }: CommentTabPropsType) => {
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef);

  return (
    <CommentTab_Container ref={inViewRef}>
      <ReadLetterModeButton
        variant="outlined"
        startIcon={<HistoryEduRounded />}
        onClick={() => enqueueSnackbar("개발 중인 기능입니다.", { variant: "info" })}
      >
        편지 모드로 보기
      </ReadLetterModeButton>
      {comments.map((item, idx) => (
        <CommentItem key={idx} {...item} isCommentTabView={isInView} index={idx} />
      ))}
    </CommentTab_Container>
  );
};

const CommentTab_Container = styled(Stack)`
  width: 100%;
  row-gap: 8px;
  padding-top: 16px;
  height: 300px;
  overflow-y: auto;
  ${mixinHideScrollbar}
`;

const ReadLetterModeButton = styled(Button)``;

//////////////////// 댓글 아이템 ////////////////////

type CommentItemPropsType = RollingPaperAsset_CommentItemType & {
  isCommentTabView: boolean;
  index: number;
};

const CommentItem = ({ nickname, comment, isCommentTabView, index }: CommentItemPropsType) => {
  return (
    <ItemAnimation isAnimateStart={isCommentTabView} index={index}>
      <CommentItem_Container>
        <CommentItem_Nickname variant="caption">{nickname}</CommentItem_Nickname>
        <CommentItem_Comment variant="body2">{comment}</CommentItem_Comment>
      </CommentItem_Container>
    </ItemAnimation>
  );
};

const CommentItem_Container = styled(Stack)`
  width: 100%;
  padding: 8px;
  row-gap: 4px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
`;

const CommentItem_Nickname = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

const CommentItem_Comment = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

//////////////////// 공감 탭 ////////////////////
const EmpathyTab = ({ empathies }: { empathies: RollingPaperAsset_EmpathyItemType[] }) => {
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef);
  return (
    <EmpathyTab_Container ref={inViewRef}>
      <EmpathyItemWrapper container spacing={1}>
        {empathies.map((item, idx) => (
          <EmpathyItem key={idx} {...item} isEmpathyTabView={isInView} index={idx} />
        ))}
      </EmpathyItemWrapper>
      {isInView && <BubbleLayer />}
    </EmpathyTab_Container>
  );
};

const EmpathyTab_Container = styled(Box)`
  width: 100%;
  height: 300px;
  overflow-y: auto;
  ${mixinHideScrollbar}

  padding-top: 16px;
`;

const EmpathyItemWrapper = styled(Grid2)`
  width: 100%;
`;

//////////////////// 공감 아이템 ////////////////////
type EmpathyItemPropsType = RollingPaperAsset_EmpathyItemType & {
  isEmpathyTabView: boolean;
  index: number;
};

const EmpathyItem = ({ nickname, emoji, isEmpathyTabView, index }: EmpathyItemPropsType) => {
  return (
    <Grid2 size={6}>
      <ItemAnimation isAnimateStart={isEmpathyTabView} index={index}>
        <EmpathyItem_Container>
          <EmpathyItem_Nickname variant="caption">{nickname}</EmpathyItem_Nickname>
          <EmpathyItem_Empathy variant="body2">{emoji}</EmpathyItem_Empathy>
        </EmpathyItem_Container>
      </ItemAnimation>
    </Grid2>
  );
};

const EmpathyItem_Container = styled(Stack)`
  width: 100%;
  flex-direction: row;
  padding: 8px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
`;

const EmpathyItem_Nickname = styled(CommentItem_Nickname)``;

const EmpathyItem_Empathy = styled(CommentItem_Comment)``;
