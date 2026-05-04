module.exports = {
  apps: [
    {
      name: "nabanna-backend",
      cwd: "C:/apps/NABANNA-FULL-STACK-APP/backend",
      script: "src/server.js",
      env: {
        NODE_ENV: "production",
        PORT: 5000
      }
    },
    {
      name: "nabanna-frontend",
      cwd: "C:/apps/NABANNA-FULL-STACK-APP/frontend",
      script: "server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOST: "0.0.0.0"
      }
    }
  ]
};
