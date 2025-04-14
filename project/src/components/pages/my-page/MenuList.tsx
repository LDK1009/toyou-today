import { mixinFlex, mixinBorderRadius, mixinBoxShadow } from "@/styles/mixins";
import { styled, Typography, Paper, Divider } from "@mui/material";
import React, { ReactNode } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

//////////////////////////////////////// Types ////////////////////////////////////////

/**
 * 메뉴 리스트 컴포넌트 Props 타입 정의
 */
interface PropsType {
  datas: MenusType[];  // 메뉴 카테고리 목록
}

/**
 * 메뉴 카테고리 타입 정의
 */
type MenusType = {
  category: string;  // 카테고리 이름
  menus: MenuType[];  // 카테고리 내 메뉴 목록
};

/**
 * 메뉴 항목 타입 정의
 */
type MenuType = {
  title: string;  // 메뉴 제목
  icon: ReactNode;  // 메뉴 아이콘
  onClick: () => void;  // 클릭 핸들러
};

//////////////////////////////////////// Component ////////////////////////////////////////

/**
 * 메뉴 리스트 컴포넌트
 * 카테고리별 메뉴 목록을 표시
 */
const MenuList = ({ datas }: PropsType) => {
  //////////////////////////////////////// Render ////////////////////////////////////////
  
  return (
    <Container>
      {datas.map((category, idx) => (
        <CategoryCard key={idx} elevation={2}>
          {/* 카테고리 헤더 */}
          <CategoryHeader>
            <CategoryText variant="subtitle1" fontWeight="bold">
              {category.category}
            </CategoryText>
          </CategoryHeader>

          {/* 카테고리 구분선 */}
          <Divider sx={{ width: "100%" }} />

          {/* 메뉴 목록 */}
          <MenuItemContainer>
            {category.menus.map((menu, menuIdx) => (
              <React.Fragment key={menuIdx}>
                {/* 메뉴 항목 */}
                <MenuItem onClick={menu.onClick}>
                  <IconTitleWrap>
                    <IconWrapper>{menu.icon}</IconWrapper>
                    <MenuTitle variant="body1">{menu.title}</MenuTitle>
                  </IconTitleWrap>
                  <ArrowIcon />
                </MenuItem>
                
                {/* 마지막 항목이 아닌 경우 구분선 추가 */}
                {menuIdx < category.menus.length - 1 && <MenuDivider />}
              </React.Fragment>
            ))}
          </MenuItemContainer>
        </CategoryCard>
      ))}
    </Container>
  );
};

export default MenuList;

//////////////////////////////////////// Styles ////////////////////////////////////////

// 메뉴 리스트 컨테이너 스타일
const Container = styled("div")`
  width: 100%;
  ${mixinFlex("column")};
  gap: 24px;
`;

// 카테고리 카드 스타일
const CategoryCard = styled(Paper)`
  ${mixinFlex("column")};
  width: 100%;
  overflow: hidden;
  ${mixinBorderRadius("medium")};
  ${mixinBoxShadow("light")};
`;

// 카테고리 헤더 스타일
const CategoryHeader = styled("div")`
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

// 카테고리 텍스트 스타일
const CategoryText = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

// 메뉴 항목 컨테이너 스타일
const MenuItemContainer = styled("div")`
  width: 100%;
  ${mixinFlex("column")};
`;

// 메뉴 항목 스타일
const MenuItem = styled("div")`
  ${mixinFlex("row")};
  width: 100%;
  justify-content: space-between;
  padding: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.palette.action.hover};
  }
`;

// 메뉴 구분선 스타일
const MenuDivider = styled(Divider)`
  width: 100%;
  margin: 0 16px;
`;

// 아이콘과 제목을 감싸는 컨테이너 스타일
const IconTitleWrap = styled("div")`
  ${mixinFlex("row")};
  gap: 16px;
  justify-content: start;
  align-items: center;
`;

// 아이콘 래퍼 스타일
const IconWrapper = styled("div")`
  ${mixinFlex()};
  color: ${({ theme }) => theme.palette.primary.main};

  & svg {
    width: 24px;
    height: 24px;
  }
`;

// 화살표 아이콘 스타일
const ArrowIcon = styled(ArrowForwardIosOutlinedIcon)`
  color: ${({ theme }) => theme.palette.text.secondary};
  width: 16px;
  height: 16px;
`;

// 메뉴 제목 스타일
const MenuTitle = styled(Typography)`
  font-weight: 500;
`;
