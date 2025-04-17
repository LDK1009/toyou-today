import { supabase } from "@/lib/supabaseClient";

export const uploadImage = async (fileName: string, file: File) => {
  const response = await supabase.storage
    .from('images')
    .upload(fileName, file);

  return response;
};

export const getImageUrl = async (fileName: string) => {
  const response = await supabase.storage
    .from('images')
    .getPublicUrl(fileName);

  return response;
};
