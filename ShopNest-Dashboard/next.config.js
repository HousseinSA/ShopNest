/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  cookies: {
    domain: '.vercel.app',
  },
  async headers() {
    if (process.env.NODE_ENV == 'production')
    return [
      {
        source: '/api/auth/:path*',
        has: [{ type: 'header', key: 'Origin', value: '(?<serviceName>^https://.*.vercel.app$)' }],
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
            { key: 'Access-Control-Allow-Origin', value: ':origin' },
            { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS, PATCH, DELETE, POST, PUT' },
            {
              key: 'Access-Control-Allow-Headers',
              value:
                  'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
            },
        ],
      },
    ];
  },
};

export default nextConfig;
