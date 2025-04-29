import React, { useState } from "react";
import { TextField, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { QuizBlockType } from "@/types/template/blockType";
import { ColorPicker } from "@/components/pages/templates/make/drawer/block/CommonPicker";
import QuizBlock from "../../../block/QuizBlock";
import CommonAddButton from "./CommonAddButton";

const QuizEditor = () => {
  ////////////////////////////// State //////////////////////////////
  const [blockState, setBlockState] = useState<QuizBlockType>({
    question: "",
    answer: "",
    color: "#FFB6B9",
  });

  ////////////////////////////// Functions //////////////////////////////
  // 퀴즈 정답 변경
  const handleAnswerChange = (value: string) => {
    setBlockState({ ...blockState, answer: value });
  };

  // 퀴즈 질문 변경
  const handleQuestionChange = (value: string) => {
    setBlockState({ ...blockState, question: value });
  };

  const handleColorChange = (color: string) => {
    setBlockState({ ...blockState, color });
  };

  ////////////////////////////// Render //////////////////////////////
  return (
    <Container>
      {/* 퀴즈 블록 미리보기 */}
      {blockState.question && <QuizBlock blockData={blockState} preview={true} />}

      {/* 색상 선택 섹션 */}
      <SectionWrapper>
        <SectionTitle>색상</SectionTitle>
        <ColorPicker currentColor={blockState.color} handleColorBoxClick={handleColorChange} />
      </SectionWrapper>

      {/* 질문 입력 섹션 */}
      <SectionWrapper>
        <SectionTitle>질문</SectionTitle>
        <StyledTextField
          placeholder="퀴즈 질문을 입력하세요"
          value={blockState.question}
          onChange={(e) => handleQuestionChange(e.target.value)}
        />
      </SectionWrapper>

      {/* 정답 입력 섹션 */}
      <SectionWrapper>
        <SectionTitle>정답</SectionTitle>
        <StyledTextField
          placeholder="퀴즈 정답을 입력하세요"
          value={blockState.answer}
          onChange={(e) => handleAnswerChange(e.target.value)}
        />
      </SectionWrapper>

      {/* 추가 버튼 섹션 */}
      <CommonAddButton
        blockState={{ variant: "quiz", content: blockState }}
        disabled={blockState.question === "" || blockState.answer === ""}
      />
    </Container>
  );
};

////////////////////////////// Styles //////////////////////////////
const Container = styled(Stack)`
  padding: 16px;
  padding-top: 24px;
  row-gap: 16px;
`;

const SectionWrapper = styled(Stack)`
  row-gap: 4px;
`;

const SectionTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 8px;
  }
`;

export default QuizEditor;
