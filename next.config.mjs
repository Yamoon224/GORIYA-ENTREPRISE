/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },

    experimental: {
        turbo: false, // ← désactive Turbopack
    },
}

export default nextConfig
