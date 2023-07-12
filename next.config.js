/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
    domains: ['digital-ocean-strapi-techservice.sgp1.digitaloceanspaces.com'],
  },
};

module.exports = nextConfig;
