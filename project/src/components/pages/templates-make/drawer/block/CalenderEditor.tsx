import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import React, { useState } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/material";
import CommonAddButton from "./CommonAddButton";

const CalenderEditor = () => {
  ////////////////////////////// State //////////////////////////////
  // 날짜 선택 상태
  const [date, setDate] = useState<Dayjs>(dayjs());

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
      <CommonAddButton blockState={{ variant: "calendar", content: { date } }} />
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
