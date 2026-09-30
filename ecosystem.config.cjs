const path = require('path');

module.exports = {
  apps: [
    {
      name: 'nexuserp',
      cwd: path.join(__dirname, 'server'),
      script: 'index.ts',
      interpreter: 'node',
      node_args: '--import tsx',
      env: {
        NODE_ENV: 'production',
      },
      max_memory_restart: '400M',
    },
  ],
};
