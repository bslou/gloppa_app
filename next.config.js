/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

//module.exports = nextConfig
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/image/**",
      },
    ],
  },
};
