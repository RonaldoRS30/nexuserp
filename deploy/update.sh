#!/usr/bin/env bash
# Pulls the latest code and restarts the production app.
# Usage on the server: bash /var/www/nexuserp/deploy/update.sh
set -euo pipefail

cd "$(dirname "$0")/.."

git pull --ff-only
npm ci --no-audit --no-fund
npm run build:client
npm run db:init
pm2 startOrReload ecosystem.config.cjs --update-env
pm2 save

echo "NexusERP actualizado."
