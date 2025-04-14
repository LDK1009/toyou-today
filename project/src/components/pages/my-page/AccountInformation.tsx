import { mixinFlex, mixinBorderRadius, mixinBoxShadow } from "@/styles/mixins";
import { styled, Typography, Paper, Divider } from "@mui/material";

//////////////////////////////////////// Types ////////////////////////////////////////

/**
 * 계정 정보 컴포넌트 Props 타입 정의
 */
interface PropsType {
  items: { title: string; value: string }[];  // 계정 정보 항목 배열
}

//////////////////////////////////////// Component ////////////////////////////////////////

/**
 * 계정 정보 컴포넌트
 * 사용자의 계정 관련 정보를 표시
 */
const AccountInformation = ({ items }: PropsType) => {
  //////////////////////////////////////// Render ////////////////////////////////////////
  
  return (
    <Container>
      {/* 섹션 제목 */}
      <SectionTitle variant="subtitle1" fontWeight="bold">계정 정보</SectionTitle>
      
      {/* 정보 카드 */}
      <InfoCard elevation={2}>
        {items.map((item, index) => (
          <InfoItem key={index}>
            {/* 정보 항목 제목 */}
            <InfoTitle variant="body2">{item.title}</InfoTitle>
            
            {/* 정보 항목 값 */}
            <InfoValue variant="body1">{item.value}</InfoValue>
            
            {/* 마지막 항목이 아닌 경우 구분선 추가 */}
            {index < items.length - 1 && <Divider sx={{ width: '100%', my: 1 }} />}
          </InfoItem>
        ))}
      </InfoCard>
    </Container>
  );
};

export default AccountInformation;

//////////////////////////////////////// Styles ////////////////////////////////////////

// 계정 정보 컨테이너 스타일
const Container = styled("div")`
  ${mixinFlex("column")};
  width: 100%;
  gap: 16px;
  align-items: flex-start;
`;

// 섹션 제목 스타일
const SectionTitle = styled(Typography)`
  margin-bottom: -8px;
`;

// 정보 카드 스타일
const InfoCard = styled(Paper)`
  ${mixinFlex("column")};
  width: 100%;
  padding: 16px;
  ${mixinBorderRadius("medium")};
  ${mixinBoxShadow("light")};
`;

// 정보 항목 스타일
const InfoItem = styled("div")`
  ${mixinFlex("column")};
  width: 100%;
  align-items: flex-start;
  gap: 4px;
`;

// 정보 항목 제목 스타일
const InfoTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;

// 정보 항목 값 스타일
const InfoValue = styled(Typography)`
  font-weight: 500;
`;
