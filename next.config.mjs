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

    headers: () => [{
        source: '/:path*',
        headers: [{
            key: 'Cache-Control',
            value: 'no-store'
        }]
    }]
};

export default nextConfig;