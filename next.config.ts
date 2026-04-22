/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.cernahomecare.com",
            },
            {
                protocol: "http",
                hostname: "www.cernahealth.com",
            },
            {
                protocol: "http",
                hostname: "blog.healthcarefirst.com",
            },
            {
                protocol: "http",
                hostname: "static.thefrisky.com",
            },
        ],
        qualities: [75, 100],
    },
};

module.exports = nextConfig;