/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/dat2lyvva/image/upload/**',
            },
        ],
    },
}

// "https://res.cloudinary.com/dat2lyvva/image/upload/v1709282190/laptop_store/nffr9cq8xdmm5knbe0tn.jpg"

module.exports = nextConfig
