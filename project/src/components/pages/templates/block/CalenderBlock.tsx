"use client";

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CalendarBlockType } from "@/types/template/blockType";
import "dayjs/locale/ko";
import { styled } from "@mui/material";

const CalenderBlock = ({ blockData }: { blockData: CalendarBlockType }) => {
  const { date } = blockData;

  const calenderDate = dayjs(date);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <DemoContainer components={["DateCalendar"]}>
          <DemoItem label="" sx={{ "& .Mui-selected": { color: "blue" } }}>
            <StyledDateCalendar value={calenderDate} onChange={() => {}} readOnly />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
};

export default CalenderBlock;

const StyledDateCalendar = styled(DateCalendar)`
  & .MuiButtonBase-root.MuiPickersDay-root.Mui-selected {
    color: ${({ theme }) => theme.palette.text.white};
    font-weight: bold;
  }

  & .MuiButtonBase-root.MuiPickersDay-root.MuiPickersDay-today {
    border: 0px;
  }
`;
