/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "liff.scgbadmintonacademy.com",
        port: "80",
        pathname: "/image/**",
      },
    ],
  },
};
