import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    domains:['m.media-amazon.com','firebasestorage.googleapis.com'],

  },
  eslint:{
    ignoreDuringBuilds:true,
  }
};



export default nextConfig;
