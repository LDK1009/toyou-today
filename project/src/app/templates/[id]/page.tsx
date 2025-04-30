import TemplatesIdContainer from "@/components/pages/templates-[id]/TeaplatesIdContainer";
import { readTemplateById } from "@/service/tables/templates";
import { Metadata } from "next";

type PropsType = Promise<{ id: string }>;

// 동적 메타데이터 설정
export async function generateMetadata({ params }: { params: PropsType }): Promise<Metadata> {
  const { id } = await params;
  const { data } = await readTemplateById(id);

  return {
    title: "To You, Today",
    description: data?.name
      ? ` ${data.name}에게 선물하는 한 장의 페이지`
      : "소중한 사람을 위한 한 장의 페이지를 선물하세요.",
    openGraph: {
      title: "To You, Today",
      description: data?.name
        ? ` ${data.name}에게 선물하는 한 장의 페이지`
        : "소중한 사람을 위한 한 장의 페이지를 선물하세요.",
      url: `/templates/${data.id}`,
      images: [{ url: "/img/og.png", width: 1200, height: 630 }],
    },
  };
}

const TemplatesIdPage = async ({ params }: { params: PropsType }) => {
  const { id } = await params;
  const { data } = await readTemplateById(id);

  return <TemplatesIdContainer templateData={data} />;
};

export default TemplatesIdPage;
