/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.cernahomecare.com",
            },
        ],
        qualities: [75, 100],
    },
};

module.exports = nextConfig;