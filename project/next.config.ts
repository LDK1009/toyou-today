// PWA 설정
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

// next.config 설정
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...기존에 추가했었던 next.config.ts 설정
  compiler: {
    emotion: true, // mui style 적용
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iuuvobnkbfasnpxjjqvq.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      // Giphy 이미지 경로 추가 (0~9까지 한번에 설정)
      {
        protocol: 'https',
        hostname: 'media*.giphy.com',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
