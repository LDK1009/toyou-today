import * as React from "react";
import Box from "@mui/material/Box";
import CommonTab from "@/components/common/CommonTab";
import { Button, Fade, Grid2, Stack, styled, TextField, Typography } from "@mui/material";
import { mixinHideScrollbar, mixinTextInputBorder } from "@/styles/mixins";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import BubbleLayer from "@/components/common/BubbleLayer";
import { CloseFullscreenRounded, HistoryEduRounded, ReplayRounded } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { shouldForwardProp } from "@/utils/mui";
import { Typewriter } from "react-simple-typewriter";
import { CommentType } from "@/types/tables/commentType";
import { EmpathyType } from "@/types/tables/empathyType";
import { readComments } from "@/service/tables/comments";
import { readEmpathies } from "@/service/tables/empathy";

type PropsType = {
  templateId?: number;
  preview?: boolean;
};

const RollingPaperPageAsset = ({ templateId, preview = false }: PropsType) => {
  const [comments, setComments] = useState<CommentType[] | []>([]);
  const [empathies, setEmpathies] = useState<EmpathyType[] | []>([]);

  // 댓글, 공감 데이터 가져오기
  async function fetchData() {
    if (preview === false && templateId) {
      const comments = await readComments(templateId);
      const empathies = await readEmpathies(templateId);
      setComments(comments || []);
      setEmpathies(empathies || []);
    }
  }

  // 마운트 시 댓글, 공감 데이터 가져오기
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId, preview]);

  // 미리보기 데이터
  const previewData = {
    comments: [
      { id: 1, nickname: "동규", comment: "생일 축하해! 행복한 하루 보내 :)" },
      { id: 2, nickname: "수민", comment: "생일 진심으로 축하해! 오늘 행복한 하루 보내자" },
      { id: 3, nickname: "민재", comment: "한 살 더 예뻐진 거 축하해. 멋진 한 해 되자" },
      { id: 4, nickname: "서연", comment: "오늘은 그냥 마음껏 즐기자" },
      { id: 5, nickname: "현우", comment: "생일 인생샷 꼭 올려줘야 해" },
      { id: 6, nickname: "지수", comment: "멋지다 진짜. 생일 기념으로 밥 한번 사줘" },
      { id: 7, nickname: "태현", comment: "생일인 거 오늘 하루 내내 티 내도 돼" },
      { id: 8, nickname: "소연", comment: "앞으로 좋은 일만 가득했으면 좋겠다" },
      { id: 9, nickname: "예진", comment: "오늘 주인공 너야. 생일 축하해" },
      { id: 10, nickname: "도윤", comment: "생일 소식 들으니까 괜히 나도 기분 좋다" },
      { id: 11, nickname: "채원", comment: "진심으로 축하해. 행복 가득한 하루 보내" },
      { id: 12, nickname: "유준", comment: "좋은 소식 들으니까 마음까지 따뜻해진다" },
      { id: 13, nickname: "하은", comment: "오늘은 너만 생각하면서 신나게 놀아" },
      { id: 14, nickname: "지후", comment: "생일 다음은 내 차례니까 기대해줘" },
      { id: 15, nickname: "민서", comment: "오늘은 무조건 니가 주인공이야. 생일 축하해" },
      { id: 16, nickname: "성민", comment: "오늘 하루 특별하게 보내자. 생일 축하해" },
      { id: 17, nickname: "다은", comment: "생일이니까 곧 만나서 한잔하자" },
      { id: 18, nickname: "예준", comment: "생일 사진 올려줘. 보고 싶어" },
      { id: 19, nickname: "하린", comment: "생일 축하해. 앞으로도 항상 행복하자" },
      { id: 20, nickname: "시우", comment: "진짜 멋있다. 생일 진심으로 축하해" },
    ],
    empathies: [
      { id: 1, nickname: "지훈", emoji: "🔥" },
      { id: 2, nickname: "수민", emoji: "💕" },
      { id: 3, nickname: "민재", emoji: "🎉" },
      { id: 4, nickname: "서연", emoji: "👍🏻" },
      { id: 5, nickname: "현우", emoji: "🔥" },
      { id: 6, nickname: "지수", emoji: "🎊" },
      { id: 7, nickname: "태현", emoji: "🎉" },
      { id: 8, nickname: "소연", emoji: "💕" },
      { id: 9, nickname: "예진", emoji: "🔥" },
      { id: 10, nickname: "도윤", emoji: "🎉" },
      { id: 11, nickname: "채원", emoji: "🎊" },
      { id: 12, nickname: "유준", emoji: "👍🏻" },
      { id: 13, nickname: "하은", emoji: "💕" },
      { id: 14, nickname: "지후", emoji: "🔥" },
      { id: 15, nickname: "민서", emoji: "🎉" },
      { id: 16, nickname: "성민", emoji: "🎊" },
      { id: 17, nickname: "다은", emoji: "💕" },
      { id: 18, nickname: "예준", emoji: "👍🏻" },
      { id: 19, nickname: "하린", emoji: "🔥" },
      { id: 20, nickname: "시우", emoji: "🎊" },
      { id: 21, nickname: "은채", emoji: "💕" },
      { id: 22, nickname: "윤아", emoji: "🎉" },
      { id: 23, nickname: "도현", emoji: "👍🏻" },
      { id: 24, nickname: "가은", emoji: "🎊" },
      { id: 25, nickname: "세진", emoji: "🔥" },
      { id: 26, nickname: "하영", emoji: "💕" },
      { id: 27, nickname: "서윤", emoji: "🎉" },
      { id: 28, nickname: "주원", emoji: "🔥" },
      { id: 29, nickname: "나윤", emoji: "💕" },
      { id: 30, nickname: "정우", emoji: "👍🏻" },
    ],
  };

  // 탭 리스트
  const tabList = [
    {
      label: "댓글",
      component: <CommentTab comments={preview ? previewData.comments : comments} preview={preview} />,
    },
    {
      label: "공감",
      component: <EmpathyTab empathies={preview ? previewData.empathies : empathies} preview={preview} />,
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
  comments: CommentType[] | [];
  preview?: boolean;
};

const CommentTab = ({ comments, preview }: CommentTabPropsType) => {
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef);
  const [isLetterMode, setIsLetterMode] = useState(false);

  function handleReadLetterModeButtonClick() {
    if (comments.length === 0) {
      enqueueSnackbar("첫번째 댓글을 남겨주세요!", { variant: "info" });
      return;
    }
    setIsLetterMode(true);
  }

  return (
    <CommentTab_Container ref={inViewRef}>
      {/* 편지 모드 레이어 */}
      {isLetterMode && <LetterLayer comments={comments} setIsLetterMode={setIsLetterMode} />}

      {/* 댓글 목록 섹션 */}
      <CommentTab_CommentSection>
        <ReadLetterModeButton
          variant="outlined"
          startIcon={<HistoryEduRounded />}
          onClick={handleReadLetterModeButtonClick}
        >
          편지 모드로 보기
        </ReadLetterModeButton>
        {comments.length > 0 ? (
          comments.map((item, idx) => <CommentItem key={idx} {...item} isCommentTabView={isInView} index={idx} />)
        ) : (
          <CommentTab_CommentSection_Empty>
            <CommentTab_CommentSection_Empty_Text variant="body2">
              첫번째 댓글을 남겨주세요!
            </CommentTab_CommentSection_Empty_Text>
          </CommentTab_CommentSection_Empty>
        )}
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

const CommentTab_CommentSection_Empty = styled(Stack)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const CommentTab_CommentSection_Empty_Text = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

const ReadLetterModeButton = styled(Button)``;

//////////////////// 댓글 아이템 ////////////////////
type CommentItemPropsType = CommentType & {
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

  async function handleSubmitButtonClick() {
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
  }

  ${({ theme }) => mixinTextInputBorder(theme)};
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
  comments: CommentType[];
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
  empathies: EmpathyType[] | [];
  preview?: boolean;
};

const EmpathyTab = ({ empathies, preview }: EmpathyTabPropsType) => {
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef);
  return (
    <EmpathyTab_Container ref={inViewRef}>
      <EmpathyTab_EmpathySection>
        {empathies.length > 0 ? (
          <EmpathyItemWrapper container spacing={1}>
            {empathies.map((item, idx) => (
              <EmpathyItem key={idx} {...item} isEmpathyTabView={isInView} index={idx} />
            ))}
          </EmpathyItemWrapper>
        ) : (
          <EmpathyTab_EmpathySection_Empty>
            <EmpathyTab_EmpathySection_Empty_Text variant="body2">
              첫번째 공감을 남겨주세요!
            </EmpathyTab_EmpathySection_Empty_Text>
          </EmpathyTab_EmpathySection_Empty>
        )}
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

const EmpathyTab_EmpathySection_Empty = styled(Stack)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const EmpathyTab_EmpathySection_Empty_Text = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

//////////////////// 공감 아이템 ////////////////////
type EmpathyItemPropsType = EmpathyType & {
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
