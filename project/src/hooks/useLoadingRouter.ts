import { useLoadingStore } from "@/store/ui/loadingStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const useLoadingRouter = () => {
  // 라우터 이동 함수
  const router = useRouter();
  // 현재 경로
  const pathname = usePathname();
  // 로딩 상태
  const { setIsLoading } = useLoadingStore();

  // 경로 변경 시 로딩 종료
  useEffect(() => {
    setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // 라우터 이동 전 로딩 시작
  const navigateWithLoading = (path: string) => {
    // 현재 경로와 이동할 경로가 같으면 로딩 상태 변경 없이 이동
    if (path === pathname) return;
    // 로딩 상태 변경
    setIsLoading(true);
    // 라우터 이동
    router.push(path);
  };

  return { navigateWithLoading };
};
