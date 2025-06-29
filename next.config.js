/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Allow cross-origin requests in development
  allowedDevOrigins: ['http://localhost:3847', 'http://10.255.255.254:3847'],
}

module.exports = nextConfig