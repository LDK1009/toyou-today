import { QuizBlockType } from "@/types/template/blockType";
import { QuestionMarkRounded, RestartAltRounded } from "@mui/icons-material";
import { Box, Button, Stack, styled, TextField, Typography } from "@mui/material";
import { shouldForwardProp } from "@/utils/mui";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

type QuizBlockProps = {
  blockData: QuizBlockType;
  preview?: boolean;
};

const QuizBlock = ({ blockData, preview = false }: QuizBlockProps) => {
  ////////////////////////////// State //////////////////////////////
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isAnswerIncorrect, setIsAnswerIncorrect] = useState(false);
  const [inputValue, setInputValue] = useState("");
  // 애니메이션 재생을 위한 키 상태 추가
  const [animationKey, setAnimationKey] = useState(0);


  ////////////////////////////// Variable //////////////////////////////
  // 퀴즈 블록 데이터
  const { color, question, answer } = blockData;
  // 퀴즈 블록 데이터 색상
  const colorProps = isAnswerCorrect ? "#2196F3" : isAnswerIncorrect ? "#F44336" : color;
  // 오답 진동 애니메이션 변수
  const shakeAnimationVariants = {
    correct: {
      scale: [1, 1.1, 1],
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    incorrect: {
      x: [0, 8, 0, -8, 0, 4, 0, -4, 0],
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  ////////////////////////////// hooks //////////////////////////////
  // 퀴즈 블록 데이터 뷰 참조
  const inViewRef = useRef(null);
  // 퀴즈 블록 데이터 뷰 참조 확인
  const isInView = useInView(inViewRef);

  ////////////////////////////// Function //////////////////////////////
  // 정답 확인
  function checkAnswer() {
    // 정답 확인
    if (inputValue === answer) {
      setIsAnswerIncorrect(false);
      setIsAnswerCorrect(true);
      setAnimationKey((prev) => prev + 1); // 애니메이션 키 증가
      return;
    }
    // 오답 확인
    else {
      setIsAnswerCorrect(false);
      setIsAnswerIncorrect(true);
      setAnimationKey((prev) => prev + 1); // 애니메이션 키 증가
      return;
    }
  }

  // 초기화
  function resetAnswer() {
    setInputValue("");
    setIsAnswerCorrect(false);
    setIsAnswerIncorrect(false);
  }

  // 퀴즈 블록 데이터 렌더링
  return (
    <QuizBlockMotion
      key={animationKey} // 키 속성 추가
      animate={isAnswerCorrect ? "correct" : isAnswerIncorrect ? "incorrect" : "initial"}
      variants={shakeAnimationVariants}
    >
      <QuizBlockContainer $color={colorProps} $isAnswerCorrect={isAnswerCorrect} ref={inViewRef}>
        {/* 물음표 || 정답 애니메이션 */}
        {isAnswerCorrect ? (
          // 정답 애니메이션
          <AnimatedCircle />
        ) : isAnswerIncorrect ? (
          // 오답 애니메이션
          <AnimatedX />
        ) : (
          // 물음표 애니메이션
          <AnimatedQuestionIcon isInView={isInView} />
        )}

        {/* 질문 */}
        <QuestionText variant="h5" color={colorProps}>
          {question}
        </QuestionText>

        {/* 정답 || 정답 입력 및 제출 버튼 */}
        {isAnswerCorrect ? (
          // 정답 박스
          <CorrectAnswerArea colorProps={colorProps} answer={answer} />
        ) : (
          // 정답 입력 및 제출 버튼
          <InputSubmitWrapper>
            <Input
              $color={colorProps}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="정답을 입력해주세요."
            />
            <SubmitButton onClick={checkAnswer} $color={colorProps}>
              제출
            </SubmitButton>
          </InputSubmitWrapper>
        )}

        {/* 초기화 버튼 */}
        {preview && (
          <Button variant="outlined" onClick={resetAnswer} startIcon={<RestartAltRounded />}>
            초기화
          </Button>
        )}
      </QuizBlockContainer>
    </QuizBlockMotion>
  );
};

export default QuizBlock;

//////////////////////////////////////// 스타일 ////////////////////////////////////////
const QuizBlockMotion = styled(motion.div)`
  width: 95%;
`;

type QuizBlockContainerProps = {
  $color: string;
  $isAnswerCorrect: boolean;
};

const QuizBlockContainer = styled(Stack, { shouldForwardProp })<QuizBlockContainerProps>`
  width: 100%;
  padding: 16px;
  row-gap: 16px;
  position: relative;
  border-radius: 8px;
  border: 3px ${({ $isAnswerCorrect }) => ($isAnswerCorrect ? "solid" : "dashed")} ${({ $color }) => $color};
  transition: all 0.3s ease;

  & svg {
    color: ${({ $color }) => $color};
  }
`;

const QuestionText = styled(Typography)`
  font-weight: bold;
`;

const InputSubmitWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
`;

type InputProps = {
  $color: string;
};

const Input = styled(TextField, { shouldForwardProp })<InputProps>`
  flex: 1;
  height: 40px;

  & .MuiOutlinedInput-root {
    height: 40px;

    & fieldset {
      border-color: ${({ $color }) => $color};
    }

    &:hover fieldset {
      border-color: ${({ $color }) => $color};
    }

    &.Mui-focused fieldset {
      border-color: ${({ $color }) => $color};
    }
  }
`;

type SubmitButtonProps = {
  $color: string;
};

const SubmitButton = styled(Button, { shouldForwardProp })<SubmitButtonProps>`
  color: ${({ theme }) => theme.palette.text.white};
  background-color: ${({ $color }) => $color};
  height: 40px;
`;
//////////////////////////////////////// 하위 컴포넌트 ////////////////////////////////////////
//////////////////// 물음표 애니메이션 ////////////////////
const AnimatedQuestionIcon = ({ isInView }: { isInView: boolean }) => {
  // 딸랑딸랑 애니메이션 변수
  const bellAnimationVariants = {
    ringing: {
      rotate: [0, 15, 0, -15, 0, 10, 0, -10, 0],
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <QuestionIconMotion
      initial={{ rotate: 0 }}
      animate={isInView ? "ringing" : "initial"}
      variants={bellAnimationVariants}
    >
      <QuestionIcon />
    </QuestionIconMotion>
  );
};

const QuestionIconMotion = styled(motion.div)`
  position: absolute;
  right: -40px;
  top: -40px;
  transform-origin: bottom center;
`;

const QuestionIcon = styled(QuestionMarkRounded)`
  font-size: 80px;
  transform: rotate(15deg);
`;

//////////////////// 동그라미(정답) 애니메이션 ////////////////////
const AnimatedCircle = () => {
  const draw = {
    hidden: { rotate: 90, pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 },
      },
    },
  };

  const boxSize = 80;

  return (
    <AnimatedCircleContainer
      width={boxSize}
      height={boxSize}
      viewBox={`0 0 ${boxSize} ${boxSize}`}
      initial="hidden"
      animate="visible"
    >
      <CirclePath cx={boxSize / 2} cy={boxSize / 2} r={30} variants={draw} />
    </AnimatedCircleContainer>
  );
};

const AnimatedCircleContainer = styled(motion.svg)`
  position: absolute;
  right: -30px;
  top: -30px;
`;

const CirclePath = styled(motion.circle)`
  stroke: ${({ theme }) => theme.palette.info.main};
  stroke-width: 10px;
  stroke-linecap: round;
  fill: ${({ theme }) => theme.palette.background.paper};
`;

//////////////////// 엑스(오답) 애니메이션 ////////////////////
const AnimatedX = () => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = i * 0.2;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 0.3, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };

  const boxSize = 80;
  const line1 = {
    start: [20, 20],
    end: [60, 60],
  };

  const line2 = {
    start: [60, 20],
    end: [20, 60],
  };

  return (
    <AnimatedXContainer
      width={boxSize}
      height={boxSize}
      viewBox={`0 0 ${boxSize} ${boxSize}`}
      initial="hidden"
      animate="visible"
    >
      {/* 20,20 -> 60,60 */}
      <XPath1 x1={line1.start[0]} y1={line1.start[1]} x2={line1.end[0]} y2={line1.end[1]} variants={draw} custom={1} />
      {/* 60,20 -> 20,60 */}
      <XPath2
        x1={line2.start[0]}
        y1={line2.start[1]}
        x2={line2.end[0]}
        y2={line2.end[1]}
        variants={draw}
        custom={1.5}
      />
    </AnimatedXContainer>
  );
};

const AnimatedXContainer = styled(motion.svg)`
  position: absolute;
  right: -30px;
  top: -30px;
`;

const XPath1 = styled(motion.line)`
  stroke: ${({ theme }) => theme.palette.error.main};
  stroke-width: 10px;
  stroke-linecap: round;
`;

const XPath2 = styled(XPath1)``;

//////////////////// 정답 박스 ////////////////////
const CorrectAnswerArea = ({ colorProps, answer }: { colorProps: string; answer: string }) => {
  return (
    <CorrectAnswerContainer>
      <CorrectAnswerText variant="body1" color={colorProps}>
        정답!
      </CorrectAnswerText>
      <CorrectAnswerText variant="h4" color={colorProps}>
        {answer}
      </CorrectAnswerText>
    </CorrectAnswerContainer>
  );
};

const CorrectAnswerContainer = styled(Box)`
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.palette.info.main};
`;

const CorrectAnswerText = styled(Typography)`
  font-weight: bold;
  text-align: center;
`;
