
// /**@type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: ['images.unsplash.com'],
//     },
//   };
  
//   module.exports = nextConfig;
  


// next.config.js
const { parsed: env } = require('dotenv').config();

const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  env, // Include the environment variables here
};

module.exports = nextConfig;
