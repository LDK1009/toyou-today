import { supabase } from "@/lib/supabaseClient";
import { MakeTemplateType } from "@/types/template/templateType";
import { getCurrentUserUID } from "../auth";

////////// 템플릿 생성
export async function createTemplate(template: MakeTemplateType) {
  const { data, error } = await supabase.from("templates").insert(template).select().single();
  
  return { data, error };
}

////////// 템플릿 조회
export async function readTemplates() {
  const { data, error } = await supabase.from("templates").select("*").order("createdAt", { ascending: false });

  return { data, error };
}

////////// 공개 템플릿 조회
export async function readPublicTemplates() {
  const { data, error } = await supabase.from("templates").select("*").eq("public", true).order("createdAt", { ascending: false });

  return { data, error };
}

////////// ID로 템플릿 조회
export async function readTemplateById(id: string) {
  const { data, error } = await supabase.from("templates").select("*").eq("id", id).single();

  return { data, error };
}

////////// makerID로 템플릿 조회
export async function readTemplateByMakerId() {
  const { data : uid } = await getCurrentUserUID();
  const { data, error } = await supabase.from("templates").select("*").eq("makerId", uid).order("createdAt", { ascending: false });

  return { data, error };
}

////////// 템플릿 삭제
export async function deleteTemplate(id: string) {
  const { data, error } = await supabase.from("templates").delete().eq("id", id);

  return { data, error };
}