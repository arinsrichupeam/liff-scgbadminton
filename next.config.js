/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/png'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'liff.scgbadmintonacademy.com',
        pathname: '/img/**',
      },
    ],
  },
};

module.exports = nextConfig;
