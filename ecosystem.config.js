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
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
