import TemplatesMakeContainer from "@/components/pages/templates-make/TemplatesMakeContainer";
import { templateInfo } from "@/utils/templateInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${templateInfo.name} | 페이지 제작`,
  description: "템플릿을 제작하여 소중한 사람에게 페이지를 선물해보세요!",
  openGraph: {
    title: `${templateInfo.name} | 페이지 제작`,
    description: "템플릿을 제작하여 소중한 사람에게 페이지를 선물해보세요!",
    url: `${templateInfo.link}/templates/make`,
    images: [{ url: "/img/og.png", width: 1200, height: 630, alt: "og-image" }],
    type: "website",
  },
};

const MakeTemplatePage = () => {
  return <TemplatesMakeContainer />;
};

export default MakeTemplatePage;
