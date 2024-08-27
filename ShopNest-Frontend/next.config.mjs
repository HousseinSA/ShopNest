/** @type {import('next').NextConwfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
      }
    ],
    // domains: ['res.cloudinary.com']

  }
}

export default nextConfig
