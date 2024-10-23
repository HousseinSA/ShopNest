/** @type {import('next').NextConwfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
<<<<<<< HEAD
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**',
      }
    ],
   
=======
      }
    ],
    // domains: ['res.cloudinary.com']
>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c
  }
}

export default nextConfig
