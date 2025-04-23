import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import React, { useState } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, styled } from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import { useAddBlockDrawerStore } from "@/store";
import { useMakeTemplateStore } from "@/store/template/makeTemplateStore";

const CalenderEditor = () => {
  ////////////////////////////// State //////////////////////////////
  // 날짜 선택 상태
  const [date, setDate] = useState<Dayjs>(dayjs());
  // 템플릿 블록 추가 액션
  const { addBlock } = useMakeTemplateStore();
  // 블록 추가 드래그 모달 상태
  const { setIsOpen: setAddBlockDrawerIsOpen } = useAddBlockDrawerStore();

  ////////////////////////////// Functions //////////////////////////////
  // 추가 버튼 클릭 함수
  function handleAddButtonClick() {
    addBlock({ variant: "calendar", content: { date } });
    setAddBlockDrawerIsOpen(false);
  }

  ////////////////////////////// Render //////////////////////////////
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <DemoContainer components={["DateCalendar"]}>
          <DemoItem label="">
            <StyledDateCalendar value={date} onChange={(newValue) => setDate(newValue)} />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
      <AddButton onClick={handleAddButtonClick} startIcon={<AddRounded />} variant="contained" fullWidth>
        추가
      </AddButton>
    </>
  );
};

export default CalenderEditor;

const StyledDateCalendar = styled(DateCalendar)`
  & .MuiButtonBase-root.MuiPickersDay-root.Mui-selected {
    color: ${({ theme }) => theme.palette.text.white};
    font-weight: bold;
  }
`;

const AddButton = styled(Button)`
  color: ${({ theme }) => theme.palette.text.white};
`;

