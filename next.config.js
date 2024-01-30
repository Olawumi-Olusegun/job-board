/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "pvgnihzyimpht9z3.public.blob.vercel-storage.com",
            }
        ]
    }
}

module.exports = nextConfig
