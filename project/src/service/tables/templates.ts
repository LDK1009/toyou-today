import { supabase } from "@/lib/supabaseClient";
import { MakeTemplateType } from "@/types/template/templateType";

export async function createTemplate(template: MakeTemplateType) {
  const { data, error } = await supabase.from("templates").insert(template).select().single();
  
  return { data, error };
}

export async function readTemplates() {
  const { data, error } = await supabase.from("templates").select("*").order("createdAt", { ascending: false });

  return { data, error };
}

export async function readTemplateById(id: string) {
  const { data, error } = await supabase.from("templates").select("*").eq("id", id).single();

  return { data, error };
}
