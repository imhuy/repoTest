/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tk-storage.s3.ap-southeast-1.amazonaws.com',
        port: '',
        pathname: '/host/**',
      },
    ],
  },
}
