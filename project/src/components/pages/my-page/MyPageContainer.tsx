"use client";

import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "./Header";
import { styled, CircularProgress } from "@mui/material";
import { mixinContainer, mixinFlex } from "@/styles/mixins";
import AccountInformation from "./AccountInformation";
import MenuList from "./MenuList";
import {
  InfoOutlined,
  NotificationsOutlined,
  SecurityOutlined,
  SettingsOutlined,
  HelpOutlineOutlined,
  FeedbackOutlined,
} from "@mui/icons-material";
import ButtonGroup from "./ButtonGroup";

/**
 * 마이페이지 컨테이너 컴포넌트
 * 사용자 프로필, 계정 정보, 메뉴 목록, 계정 관리 버튼 등을 표시
 */
const MyPageContainer = () => {
  //////////////////////////////////////// Store ////////////////////////////////////////
  const { user } = useAuthStore();

  //////////////////////////////////////// Hooks ////////////////////////////////////////
  const router = useRouter();

  //////////////////////////////////////// Effects ////////////////////////////////////////
  // Effects - 로그인 상태 확인 및 리다이렉트
  useEffect(() => {
    if (!user.isSignIn) {
      router.push("/auth/sign-in");
    }
  }, [user.isSignIn, router]);

  //////////////////////////////////////// Loading ////////////////////////////////////////
  // 로그인 상태가 아닐 경우 로딩 표시
  if (!user.isSignIn) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  //////////////////////////////////////// Variables ////////////////////////////////////////
  // 계정 정보 데이터
  const AccountInformationProps = [
    { title: "이메일", value: user.email },
    { title: "가입일", value: new Date(user?.created_at).toLocaleDateString() },
  ];

  // 메뉴 리스트 데이터
  const MenuListProps = [
    {
      category: "계정 설정",
      menus: [
        {
          title: "개인정보 관리",
          icon: <InfoOutlined />,
          onClick: () => {
            alert("개인정보 관리");
          },
        },
        {
          title: "알림 설정",
          icon: <NotificationsOutlined />,
          onClick: () => {
            alert("알림 설정");
          },
        },
        {
          title: "보안 설정",
          icon: <SecurityOutlined />,
          onClick: () => {
            alert("보안 설정");
          },
        },
      ],
    },
    {
      category: "앱 설정",
      menus: [
        {
          title: "앱 환경설정",
          icon: <SettingsOutlined />,
          onClick: () => {
            alert("앱 환경설정");
          },
        },
        {
          title: "도움말",
          icon: <HelpOutlineOutlined />,
          onClick: () => {
            alert("도움말");
          },
        },
        {
          title: "피드백 보내기",
          icon: <FeedbackOutlined />,
          onClick: () => {
            alert("피드백 보내기");
          },
        },
      ],
    },
  ];

  //////////////////////////////////////// Render ////////////////////////////////////////

  return (
    <Container>
      <Header nickname={user.email} imgSrc="/img/logo-192.png" />
      <AccountInformation items={AccountInformationProps} />
      <MenuList datas={MenuListProps} />
      <ButtonGroup />
    </Container>
  );
};

export default MyPageContainer;

// 메인 컨테이너 스타일
const Container = styled("div")`
  ${mixinContainer()};
  ${mixinFlex("column")};
  align-items: flex-start;
  row-gap: 24px;
`;

// 로딩 상태 컨테이너 스타일
const LoadingContainer = styled("div")`
  ${mixinContainer()};
  ${mixinFlex("column")};
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
