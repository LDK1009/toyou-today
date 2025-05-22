import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import React from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack, styled } from "@mui/material";
import CommonAddButton from "./CommonAddButton";
import { useAddBlockDrawerStore } from "@/store";
import { mixinFlex } from "@/styles/mixins";

const CalenderEditor = () => {
  // 전역 에디터 상태
  const { blockEditorState, setBlockEditorState } = useAddBlockDrawerStore();

  const isCalendarBlockExist = blockEditorState && "date" in blockEditorState;

  const editBlockState = isCalendarBlockExist ? { date: dayjs(blockEditorState.date) } : { date: dayjs() };

  const date = editBlockState.date;

  function setDate(value: Dayjs) {
    setBlockEditorState({ date: value });
  }

  ////////////////////////////// Render //////////////////////////////
  return (
    <>
      <CalenderContainer>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
          <DemoContainer components={["DateCalendar"]}>
            <DemoItem label="">
              <StyledDateCalendar value={date} onChange={(newValue) => setDate(newValue)} />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </CalenderContainer>
      <CommonAddButton blockState={{ variant: "calendar", content: { date } }} />
    </>
  );
};

export default CalenderEditor;

const CalenderContainer = styled(Stack)`
  width: 100%;
  height: 100%;
  ${mixinFlex("row", "center", "center")}
`;

const StyledDateCalendar = styled(DateCalendar)`
  & .MuiButtonBase-root.MuiPickersDay-root.Mui-selected {
    color: ${({ theme }) => theme.palette.text.white};
    font-weight: bold;
  }
`;
