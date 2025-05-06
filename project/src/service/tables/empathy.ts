import { supabase } from "@/lib/supabaseClient";

export const createEmpathy = async (templateId: number, nickname: string, emoji: string) => {
  const response = await supabase.from("empathies").insert({
    templateId,
    nickname,
    emoji,
  });

  return response;
};

export const readEmpathies = async (templateId: number) => {
  const response = await supabase.from("empathies").select("*").eq("templateId", templateId);

  return response.data;
};


