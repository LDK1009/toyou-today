import ThemeProviderWrapper from "@/styles/ThemeProviderWrapper";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ClientSnackbarProvider from "@/lib/ClientSnackbarProvider";
import CommonBottomNavigation from "@/components/common/CommonBottomNavigation";
import CommonHeader from "@/components/common/CommonHeader";
import GlobalStyles from "@/styles/GlobalStyles";
import TsParticleInit from "@/lib/TsParticleInit";

// SEO 메타데이터
export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "투유, 투데이",
  description: "오늘, 너를 위한 한 장의 페이지",
  keywords: "생일, 기념일, 감성, 선물, 메시지, 카드, 템플릿, 나만의 페이지",
  openGraph: {
    title: "투유, 투데이",
    description: "오늘, 너를 위한 한 장의 페이지",
    url: "https://toyou-today.site",
    images: [
      {
        url: "https://toyou-today.site/img/logo-512.png",
        width: 512,
        height: 512,
        alt: "투유, 투데이-logo",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/img/logo-192.png",
    apple: "/img/logo-512.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <TsParticleInit />
        {/* MUI 캐시 프로바이더 (Next15 - MUI 호환)  */}
        <AppRouterCacheProvider>
          {/* MUI 테마 프로바이더 */}
          <ThemeProviderWrapper>
            {/* 커스텀 전역 스타일 적용 */}
            <GlobalStyles />
            {/* 스낵바 */}
            <ClientSnackbarProvider />
            {/* 헤더 */}
            <CommonHeader />
            {/* 페이지 컨텐츠 */}
            {children}
            {/* 바텀 내비게이션 */}
            <CommonBottomNavigation />
          </ThemeProviderWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
