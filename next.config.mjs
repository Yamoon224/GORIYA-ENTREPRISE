/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },

    experimental: {
        turbo: false, // ← désactive Turbopack
    },
}

export default nextConfig
