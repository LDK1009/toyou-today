import { supabase } from "@/lib/supabaseClient";

export const createComment = async (templateId: number, nickname: string, comment: string) => {
  const response = await supabase.from("comments").insert({
    templateId,
    nickname,
    comment,
  });

  return response;
};

export const readComments = async (templateId: number) => {
  const response = await supabase.from("comments").select("*").eq("templateId", templateId);

  return response.data;
};


