module.exports = {
    apps: [
      {
        name: 'remark-attendance-back',
        script: 'npm',
        args: 'start',
        instances: 1, // Use a single instance
        exec_mode: 'fork', // Use fork mode for single instance
        autorestart: true,
        watch: false,
        max_memory_restart: '2G',
        env: {
          NODE_ENV: 'production',
          PORT: 8005, 
        }
      }
    ]
  };
  