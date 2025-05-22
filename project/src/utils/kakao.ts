import { TemplateType } from "@/types/template/templateType";

export function shareMessage(templateData: TemplateType) {
  // @ts-expect-error - window.Kakao 타입이 전역에 정의되지 않음
  window.Kakao.Share.sendScrap({
    requestUrl: `${window.location.origin}/templates/${templateData.id}`,
    templateId: 120404,
    templateArgs: {
      title: `🎁 소중한 '${templateData.name}' 님을 위한 페이지가 도착했어요`,
      content: "선물받은 페이지를 확인해보세요!",
      templateId: templateData.id,
    },
  });
}
