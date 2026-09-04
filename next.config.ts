const nextConfig = {
    output: "standalone",

    images: {
        qualities: [75, 100],

        remotePatterns: [
            {
                protocol: "https",
                hostname: "admin.cernahomecare.com",
                pathname: "/assets/**",
            },
        ],
    },
};

export default nextConfig;