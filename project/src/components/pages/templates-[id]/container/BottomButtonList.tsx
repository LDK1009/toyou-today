import { TemplateType } from "@/types/template/templateType";
import CopyLinkButton from "./CopyLinkButton";
import { Stack, styled } from "@mui/material";
import BookmarkButton from "./BookmarkButton";
import KakaoShareButton from "./KakaoShareButton";

const BottomButtonList = ({ templateData }: { templateData: TemplateType }) => {
  return (
    <Container>
      {/* 북마크 */}
      <BookmarkButton templateId={Number(templateData.id)} />

      {/* URL 복사 */}
      <CopyLinkButton templateId={Number(templateData.id)} />

      {/* 카카오 공유 */}
      <KakaoShareButton />
    </Container>
  );
};

export default BottomButtonList;

const Container = styled(Stack)`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;
