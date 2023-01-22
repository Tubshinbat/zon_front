module.exports = {
  apps: [
    {
      name: "zon-cms-portal",
      script: "npm start",
      autorestart: true,
      env: {
        PORT: 5000,
        NODE_ENV: "production",
        SERVER_ENV: "production",
        DEBUG: "server:*",
        DEBUG_COLORS: true,
        NEXT_PUBLIC_ENV_API_PREFIX: "/api/v1",
        NEXT_PUBLIC_API_PREFIX: "/api/v1",
      },
    },
  ],
};
