/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '182.163.101.173',
        port: '49029',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
