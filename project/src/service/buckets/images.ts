import { supabase } from "@/lib/supabaseClient";
import { getCurrentUserUID } from "../auth";
import { DateToYYYYMMDDHHMMSS } from "@/utils/time";
import { v4 as uuidv4 } from "uuid";

////////// 이미지 업로드 //////////
export const uploadImage = async (fileName: string, file: File) => {
  const response = await supabase.storage.from("images").upload(fileName, file);

  return response;
};

////////// 이미지 URL 가져오기 //////////
export const getImageUrl = async (fileName: string) => {
  const response = await supabase.storage.from("images").getPublicUrl(fileName);

  return response;
};

////////// 여러 이미지 업로드 //////////
export const uploadMultipleImages = async (files: File[]) => {
  // 현재 유저 정보 가져오기
  const { data: uid } = await getCurrentUserUID();
  if (!uid) {
    return {
      data: null,
      error: "로그인 후 이미지를 업로드해주세요.",
    };
  }

  // 이미지 업로드 프로미스 배열 생성
  const uploadPromises = files.map((file) => {
    const uuid = uuidv4();
    const fileName = `${uid}-${DateToYYYYMMDDHHMMSS(new Date())}-${uuid}`;
    return uploadImage(fileName, file);
  });

  // 모든 이미지 업로드 프로미스 실행
  const results = await Promise.all(uploadPromises);

  // 모든 결과에 에러가 없는지 확인
  const hasError = results.some((result) => result.error);

  // 에러가 있는 경우 에러 반환
  if (hasError) {
    return {
      data: null,
      error: "이미지 업로드에 실패했습니다.",
    };
  }

  // 성공한 경우 data 반환
  return {
    data: results.map((result) => result.data),
    error: null,
  };
};


////////// 여러 이미지 URL 가져오기 //////////
export const getMultipleImageUrls = async (imagePaths: string[]) => {
  // 이미지 업로드 프로미스 배열 생성
  const uploadPromises = imagePaths.map((imagePath) => {
    return getImageUrl(imagePath);
  });

  // 모든 이미지 URL 가져오기 프로미스 실행
  const results = await Promise.all(uploadPromises);

  // 성공한 경우 data 반환
  return {
    data: results.map((result) => result.data),
    error: null,
  };
};

