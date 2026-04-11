/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.cernahomecare.com",
            },
        ],
    },
};

module.exports = nextConfig;