/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'lain.bgm.tv',
        port: '',
        pathname: '/pic/cover/**',
      },
    ],
  },
}

module.exports = nextConfig
