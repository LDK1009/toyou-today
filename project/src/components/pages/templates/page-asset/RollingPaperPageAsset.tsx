import * as React from "react";
import Box from "@mui/material/Box";
import {
  RollingPaperAssetType,
  RollingPaperAsset_CommentItemType,
  RollingPaperAsset_EmpathyItemType,
} from "@/types/template/pageAssetType";
import CommonTab from "@/components/common/CommonTab";
import { Button, Fade, Grid2, Stack, styled, TextField, Typography } from "@mui/material";
import { mixinHideScrollbar } from "@/styles/mixins";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import BubbleLayer from "@/components/common/BubbleLayer";
import { CloseFullscreenRounded, HistoryEduRounded, ReplayRounded } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { shouldForwardProp } from "@/utils/mui";
import { Typewriter } from "react-simple-typewriter";
const RollingPaperPageAsset = ({
  pageAssetData,
  preview = false,
}: {
  pageAssetData: RollingPaperAssetType;
  preview?: boolean;
}) => {
  // 탭 리스트
  const tabList = [
    {
      label: "댓글",
      component: <CommentTab comments={pageAssetData.comments} preview={preview} />,
    },
    {
      label: "공감",
      component: <EmpathyTab empathies={pageAssetData.empathies} preview={preview} />,
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
const Container = styled(Stack)`
  width: 100%;
  row-gap: 16px;
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

//////////////////////////////////////// 댓글 탭 관련 컴포넌트 ////////////////////////////////////////
//////////////////// 댓글 탭 ////////////////////
type CommentTabPropsType = {
  comments: RollingPaperAsset_CommentItemType[];
  preview?: boolean;
};

const CommentTab = ({ comments, preview }: CommentTabPropsType) => {
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef);
  const [isLetterMode, setIsLetterMode] = useState(false);

  return (
    <CommentTab_Container ref={inViewRef}>
      {/* 편지 모드 레이어 */}
      {isLetterMode && <LetterLayer comments={comments} setIsLetterMode={setIsLetterMode} />}

      {/* 댓글 목록 섹션 */}
      <CommentTab_CommentSection>
        <ReadLetterModeButton
          variant="outlined"
          startIcon={<HistoryEduRounded />}
          onClick={() => setIsLetterMode(true)}
        >
          편지 모드로 보기
        </ReadLetterModeButton>
        {comments.map((item, idx) => (
          <CommentItem key={idx} {...item} isCommentTabView={isInView} index={idx} />
        ))}
      </CommentTab_CommentSection>

      {/* 댓글 입력 섹션 */}
      <CommentInputSection preview={preview} />
    </CommentTab_Container>
  );
};

const CommentTab_Container = styled(Stack)`
  width: 100%;
  row-gap: 16px;
  padding-top: 16px;
`;

const CommentTab_CommentSection = styled(Stack)`
  width: 100%;
  row-gap: 8px;
  height: 320px;
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
//////////////////// 댓글 입력 섹션 ////////////////////
const CommentInputSection = ({ preview }: { preview?: boolean }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmitButtonClick = () => {
    // 미리보기 모드 예외 처리
    if (preview) {
      enqueueSnackbar("미리보기 모드에서는 댓글을 입력할 수 없습니다.", { variant: "info" });
      return;
    }

    // 입력값 없음 예외 처리
    if (inputValue.trim() === "") {
      enqueueSnackbar("댓글을 입력해주세요.", { variant: "error" });
      return;
    }

    /**
     * 댓글 제출
     * 1. 기존 댓글 상태 가져오기
     * 2. 새로운 댓글 추가
     * 3. DB에 댓글 추가
     * */
    console.log(inputValue);

    return;
  };

  return (
    <CommentInputSection_Container container spacing={1}>
      <Grid2 size={9.5}>
        <CommentInputSection_Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="댓글을 입력해주세요."
        />
      </Grid2>
      <Grid2 size={2.5}>
        <CommentInputSection_Button onClick={handleSubmitButtonClick} variant="contained">
          <HistoryEduRounded />
        </CommentInputSection_Button>
      </Grid2>
    </CommentInputSection_Container>
  );
};

const CommentInputSection_Container = styled(Grid2)``;

const CommentInputSection_Input = styled(TextField)`
  width: 100%;
  & .MuiInputBase-root {
    height: 40px;
    border: 1px solid ${({ theme }) => theme.palette.primary.main};
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const CommentInputSection_Button = styled(Button)`
  width: 100%;
  height: 100%;
  box-shadow: none;

  & .MuiSvgIcon-root {
    color: ${({ theme }) => theme.palette.text.white};
  }
`;

//////////////////// 편지 모드 ////////////////////
const LetterLayer = ({
  comments,
  setIsLetterMode,
}: {
  comments: RollingPaperAsset_CommentItemType[];
  setIsLetterMode: (isLetterMode: boolean) => void;
}) => {
  // 편지 모드 열림 여부
  const [open, setOpen] = useState(true);
  // 타이핑 카운트
  const [typingCount, setTypingCount] = useState(1);
  // 현재 타이핑 중인 댓글 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);
  // 편지 시작 여부
  const [isStart, setIsStart] = useState(false);
  // 편지 완료 여부
  const [isEnd, setIsEnd] = useState(false);

  // 편지 모드 닫기
  function handleClose() {
    setOpen(false);
    setTimeout(() => {
      setIsLetterMode(false);
    }, 300);
  }

  // 타이핑 진행 상황 추적
  function handleType(comment: string) {
    // 타이핑 카운트 증가
    setTypingCount((prev) => prev + 1);

    // 타이핑 완료 후 실행 함수 호출
    if (typingCount === comment.length) {
      console.log("타이핑 완료!");
      // 마지막 댓글 타이핑 완료 시 완료 여부 변경
      if (currentIndex === comments.length - 1) {
        setTimeout(() => {
          setIsEnd(true);
        }, 1500);
        return;
      }
      // 다음 댓글 타이핑 시작
      setTimeout(() => {
        // 타이핑 완료 후 다음 댓글로 넘어가기
        setCurrentIndex((prev) => prev + 1);
        // 타이핑 카운트 초기화
        setTypingCount(1);
      }, 1500);
    }
  }

  //
  function handleRestart() {
    setIsEnd(false);
    setCurrentIndex(0);
    setTypingCount(1);
  }

  useEffect(() => {
    console.log(typingCount);
  }, [typingCount]);

  useEffect(() => {
    setTimeout(() => {
      setIsStart(true);
    }, 500);
  }, []);

  return (
    <Fade in={open} timeout={300}>
      <LetterLayer_Container>
        {/* 닫기 */}
        <LetterLayer_CloseButton onClick={handleClose}>
          <CloseFullscreenRounded />
        </LetterLayer_CloseButton>

        {/* 닉네임 */}
        <AnimatePresence>
          <LetterLayer_Nickname key={currentIndex} variant="h5">
            {comments[currentIndex].nickname}
          </LetterLayer_Nickname>
        </AnimatePresence>

        {/* 댓글 */}
        {isStart && (
          <Typewriter
            key={currentIndex}
            words={[comments[currentIndex].comment]}
            loop={1}
            cursor={false}
            typeSpeed={150}
            onType={() => handleType(comments[currentIndex].comment)}
            delaySpeed={0}
          />
        )}

        {/* 다시보기 */}
        {isEnd && (
          <Fade in={isEnd} timeout={300}>
            <LetterLayer_RestartButton onClick={handleRestart} startIcon={<ReplayRounded />}>
              다시보기
            </LetterLayer_RestartButton>
          </Fade>
        )}
      </LetterLayer_Container>
    </Fade>
  );
};

const LetterLayer_Container = styled(Stack)`
  width: 100vw;
  height: 100vh;
  padding-top: 200px;

  align-items: center;
  row-gap: 24px;

  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.palette.background.default};
  z-index: 9999;
`;

const LetterLayer_Nickname = styled(Typography)`
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.main};
  animation: fadeIn 1s ease-in-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const LetterLayer_CloseButton = styled(Button)`
  position: absolute;
  top: 16px;
  right: 0px;
`;

const LetterLayer_RestartButton = styled(Button)`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
`;

//////////////////// 공감 탭 ////////////////////
type EmpathyTabPropsType = {
  empathies: RollingPaperAsset_EmpathyItemType[];
  preview?: boolean;
};

const EmpathyTab = ({ empathies, preview }: EmpathyTabPropsType) => {
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef);
  return (
    <EmpathyTab_Container ref={inViewRef}>
      <EmpathyTab_EmpathySection>
        <EmpathyItemWrapper container spacing={1}>
          {empathies.map((item, idx) => (
            <EmpathyItem key={idx} {...item} isEmpathyTabView={isInView} index={idx} />
          ))}
        </EmpathyItemWrapper>
      </EmpathyTab_EmpathySection>
      <EmpathyInputSection preview={preview} />
      {isInView && <BubbleLayer />}
    </EmpathyTab_Container>
  );
};

const EmpathyTab_Container = styled(Stack)`
  width: 100%;
  row-gap: 16px;
`;

const EmpathyTab_EmpathySection = styled(Box)`
  width: 100%;
  height: 320px;
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

//////////////////// 공감 입력 섹션 ////////////////////
const EmpathyInputSection = ({ preview }: { preview?: boolean }) => {
  console.log(preview);

  const emojiList = ["🎉", "🎊", "🔥", "👍🏻", "💕"];

  const [inputValue, setInputValue] = useState("");
  const [bubbleState, setBubbleState] = useState(false);

  useEffect(() => {
    if (inputValue) {
      setBubbleState(true);
    } else {
      setBubbleState(false);
    }
  }, [inputValue]);

  const handleEmojiButtonClick = (item: string) => {
    // 현재 입력한 이모지를 클릭했다면
    if (item === inputValue) {
      setInputValue("");
      return;
    } else {
      setInputValue(item);
      /**
       * 1. 기존 공감 목록 가져오기
       * 2. 공감 목록에 이미 사용자의 동일한 이모지가 있다면 함수 종료
       * 3. 공감 목록에 사용자의 동일한 이모지가 없다면 공감 상태에 추가
       * 4. DB에 공감 추가
       */
    }
  };

  return (
    <EmpathyInputSection_Container>
      {emojiList.map((item, idx) => (
        <EmpathyInputSection_EmpathyButton
          key={idx}
          onClick={() => handleEmojiButtonClick(item)}
          $isSelected={item === inputValue}
        >
          {item}
        </EmpathyInputSection_EmpathyButton>
      ))}
      {bubbleState && <BubbleLayer />}
    </EmpathyInputSection_Container>
  );
};

const EmpathyInputSection_Container = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
`;

type EmpathyInputSection_EmpathyButtonPropsType = {
  $isSelected: boolean;
};

const EmpathyInputSection_EmpathyButton = styled(Button, {
  shouldForwardProp,
})<EmpathyInputSection_EmpathyButtonPropsType>`
  min-width: 40px;
  min-height: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme, $isSelected }) => ($isSelected ? theme.palette.primary.light : "transparent")};
  transform: ${({ $isSelected }) => ($isSelected ? "scale(1.5)" : "scale(1)")};
  transition: all 0.3s ease-in-out;
`;
