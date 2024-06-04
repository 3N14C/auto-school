/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: '**'
        }]
    },

    experimental: {
        missingSuspenseWithCSRBailout: true
    },
};

export default nextConfig;