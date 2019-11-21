module.exports = {
  apps: [
    {
      name: 'Space',
      script: 'dist/server.js',
      args: '',
      instances: 'max',
      autorestart: true,
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '1G',
      env: {
        PRODUCTION: false
      },
      env_production: {
        PRODUCTION: true
      }
    }
  ],

  deploy: {
    production: {
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
