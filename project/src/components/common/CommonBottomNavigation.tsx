"use client";

import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Paper, styled } from "@mui/material";
import { CottageOutlined, PersonOutlineOutlined, SearchOutlined } from "@mui/icons-material";
import { mixinFlex } from "@/styles/mixins";
import { useLoadingRouter } from "@/hooks/useLoadingRouter";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("home");

  // 네비게이션 아이템 리스트
  const navigationItems = [
    {
      label: "홈",
      value: "home",
      icon: <CottageOutlined />,
      href: "/",
    },
    {
      label: "템플릿",
      value: "templates",
      icon: <SearchOutlined />,
      href: "/templates",
    },
    {
      label: "마이페이지",
      value: "mypage",
      icon: <PersonOutlineOutlined />,
      href: "/my-page",
    },
  ];

  // 네비게이션 아이템 선택 시 실행되는 함수
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // 라우터 이동 함수
  const { navigateWithLoading } = useLoadingRouter();

  /////////////////////////////// 렌더링 ///////////////////////////////
  return (
    <Container elevation={3}>
      <BottomNavigation value={value} onChange={handleChange}>
        {navigationItems.map((item) => (
          <BottomNavigationAction
            key={item.value}
            onClick={() => navigateWithLoading(item.href)}
            label={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Container>
  );
}

const Container = styled(Paper)`
  width: 100%;
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: 1000;

  & .MuiBottomNavigation-root {
    width: 100%;
    ${mixinFlex("row")};
    justify-content: space-between;
  }
`;
