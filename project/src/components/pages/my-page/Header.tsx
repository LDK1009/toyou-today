import { mixinFlex, mixinBorderRadius, mixinBoxShadow } from "@/styles/mixins";
import { styled, Typography, Paper } from "@mui/material";
import Image from "next/image";

//////////////////////////////////////// Types ////////////////////////////////////////

/**
 * 헤더 컴포넌트 Props 타입 정의
 */
interface PropsType {
  imgSrc: string;  // 프로필 이미지 경로
  nickname: string;  // 사용자 닉네임(이메일)
}

//////////////////////////////////////// Component ////////////////////////////////////////

/**
 * 마이페이지 헤더 컴포넌트
 * 사용자 프로필 정보를 표시
 */
const Header = ({ imgSrc, nickname }: PropsType) => {
  //////////////////////////////////////// Render ////////////////////////////////////////
  
  return (
    <Container>
      {/* 섹션 제목 */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        내 프로필
      </Typography>
      
      {/* 프로필 카드 */}
      <ProfileCard elevation={2}>
        {/* 프로필 이미지 */}
        <ProfileImg 
          src={imgSrc} 
          alt={`${nickname}의 프로필 이미지`} 
          width={80} 
          height={80} 
        />
        
        {/* 프로필 정보 */}
        <ProfileInfo>
          <NicknameText variant="body1">{nickname}</NicknameText>
          <StatusText variant="body2">일반 회원</StatusText>
        </ProfileInfo>
      </ProfileCard>
    </Container>
  );
};

export default Header;

//////////////////////////////////////// Styles ////////////////////////////////////////

// 헤더 컨테이너 스타일
const Container = styled("div")`
  ${mixinFlex("column")};
  align-items: flex-start;
  width: 100%;
`;

// 프로필 카드 스타일
const ProfileCard = styled(Paper)`
  ${mixinFlex("row")};
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 16px;
  gap: 20px;
  ${mixinBorderRadius("medium")};
  ${mixinBoxShadow("light")};
`;

// 프로필 이미지 스타일
const ProfileImg = styled(Image)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

// 프로필 정보 컨테이너 스타일
const ProfileInfo = styled("div")`
  ${mixinFlex("column")};
  align-items: flex-start;
  gap: 4px;
`;

// 닉네임 텍스트 스타일
const NicknameText = styled(Typography)`
  font-weight: 600;
`;

// 상태 텍스트 스타일
const StatusText = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: 500;
`;
