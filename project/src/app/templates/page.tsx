import TemplatesContainer from "@/components/pages/templates/TemplatesContainer";
import { Metadata } from "next";
import { templateInfo } from "@/utils/templateInfo";
import { readTemplates } from "@/service/tables/templates";
import { TemplateType } from "@/types/template/templateType";

// 동적 메타데이터 설정
export async function generateMetadata(): Promise<Metadata> {
  const { data } = await readTemplates();
  const templateCount = data?.length;

  return {
    title: `${templateInfo.name} | 템플릿`,
    description: `총 ${templateCount}개의 템플릿을 통해 소중한 사람에게 선물할 페이지를 간편하게 제작해보세요!`,
    openGraph: {
      title: `${templateInfo.name} | 템플릿`,
      description: `총 ${templateCount}개의 템플릿을 통해 소중한 사람에게 선물할 페이지를 간편하게 제작해보세요!`,
      url: `${templateInfo.link}/templates`,
      images: [{ url: "/img/og.png", width: 1200, height: 630, alt: "og-image" }],
      type: "website",
    },
  };
}

const TemplatesPage = async () => {
  const { data } = await readTemplates();

  return <TemplatesContainer templates={data as TemplateType[]} />;
};

export default TemplatesPage;
