/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["liff.scgbadmintonacademy.com"],
  },
};

module.exports = nextConfig;
