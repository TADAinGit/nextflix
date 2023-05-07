/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    TMDB_API: "8b467f2e095cb2b351add412203a0b0e",
    TMDB_BASE_URL: "https://api.themoviedb.org/3",
  },
  images: {
    domains: ["image.tmdb.org"],
  },
};

module.exports = nextConfig;
