import TemplatesContainer from "@/components/pages/templates/TemplatesContainer";
import { Metadata } from "next";
import { templateInfo } from "@/utils/templateInfo";

export const metadata: Metadata = {
  title: `${templateInfo.name} | 템플릿`,
  description: "템플릿을 통해 소중한 사람에게 선물할 페이지를 간편하게 제작해보세요!",
  openGraph: {
    title: `${templateInfo.name} | 템플릿`,
    description: "템플릿을 통해 소중한 사람에게 선물할 페이지를 간편하게 제작해보세요!",
    url: `${templateInfo.link}/templates`,
    images: [{ url: "/img/og.png", width: 1200, height: 630, alt: "og-image" }],
    type: "website",
  },
};

const TemplatesPage = () => {
  return <TemplatesContainer />;
};

export default TemplatesPage;
