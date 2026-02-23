import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {},
  // Allow dev server to be accessed from any host
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ]
  },
}

export default nextConfig
