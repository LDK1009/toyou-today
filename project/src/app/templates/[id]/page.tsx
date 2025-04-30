import TemplatesIdContainer from "@/components/pages/templates-[id]/TeaplatesIdContainer";
import { readTemplateById } from "@/service/tables/templates";
import { templateInfo } from "@/utils/templateInfo";
import { Metadata } from "next";

type PropsType = Promise<{ id: string }>;

// 동적 메타데이터 설정
export async function generateMetadata({ params }: { params: PropsType }): Promise<Metadata> {
  const { id } = await params;
  const { data } = await readTemplateById(id);

  return {
    title: `${templateInfo.name} | ${data?.name ? `${data.name}의 페이지` : "페이지"}`,
    description: data?.name ? ` ${data.name}에게 선물하는 한 장의 페이지` : "페이지를 찾을 수 없습니다.",
    openGraph: {
      title: `${templateInfo.name} | ${data?.name ? `${data.name}의 페이지` : "페이지"}`,
      description: data?.name ? ` ${data.name}에게 선물하는 한 장의 페이지` : "페이지를 찾을 수 없습니다.",
      url: `${templateInfo.link}/${data.id}`,
      images: [{ url: "/img/og.png", width: 1200, height: 630, alt: "og-image" }],
      type: "website",
    },
  };
}

const TemplatesIdPage = async ({ params }: { params: PropsType }) => {
  const { id } = await params;
  const { data } = await readTemplateById(id);

  return <TemplatesIdContainer templateData={data} />;
};

export default TemplatesIdPage;
