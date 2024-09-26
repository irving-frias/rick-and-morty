/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ['rickandmortyapi.com'], // Add your image domain here
  },
};

export default nextConfig;
