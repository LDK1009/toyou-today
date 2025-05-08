import { supabase } from "@/lib/supabaseClient";
import { getCurrentUserUID } from "../auth";

// 북마크 생성
export async function createBookmark(templateId: number) {
  const { data: uid } = await getCurrentUserUID();

  const response = await supabase.from("bookmarks").insert({
    uid: uid,
    templateId: templateId,
  });

  return response;
}

// 북마크 여부 확인
export async function readIsBookmarkedByTemplateId(templateId: number) {
  const { data: uid } = await getCurrentUserUID();

  const { data, error } = await supabase.from("bookmarks").select("*").eq("uid", uid).eq("templateId", templateId);

  if (error) {
    return { data: false, error: error };
  }

  if (data?.length === 0) {
    return { data: false, error: null };
  }

  return { data: true, error: null };
}

// 북마크 삭제
export async function deleteBookmark(templateId: number) {
  const { data: uid } = await getCurrentUserUID();

  const response = await supabase.from("bookmarks").delete().eq("uid", uid).eq("templateId", templateId);

  return response;
}

// 북마크 목록 조회
export async function readBookmarks() {
  const { data: uid } = await getCurrentUserUID();

  const response = await supabase.from("bookmarks").select("*").eq("uid", uid);

  return response;
}
