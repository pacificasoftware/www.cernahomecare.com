const nextConfig = {
    output: "standalone",

    images: {
        qualities: [75, 100],

        localPatterns: [
            {
                pathname: "/assets/**",
            },
        ],

        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.cernahomecare.com",
                pathname: "/uploads/locations/**",
            },
        ],
    },
};

export default nextConfig;