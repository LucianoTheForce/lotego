/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
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
  // Configure allowed dev origins
  allowedDevOrigins: [
    'http://localhost:3847',
    'http://127.0.0.1:3847',
    'http://10.255.255.254:3847',
    'http://172.24.232.248:3847',
    'http://localhost:3848',
    'http://127.0.0.1:3848',
    'http://10.255.255.254:3848',
    'http://172.24.232.248:3848',
  ],
  // Turbopack configuration (moved from experimental)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // Enable CORS in development
  async headers() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*',
            },
          ],
        },
      ];
    }
    return [];
  },
}

module.exports = nextConfig