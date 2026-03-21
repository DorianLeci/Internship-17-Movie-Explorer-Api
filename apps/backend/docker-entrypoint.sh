#!/bin/sh
set -euo pipefail

echo "=== Running database migrations ==="
npx prisma migrate deploy

echo "=== Seeding database ==="
npx prisma db seed

echo "=== Starting backend ==="
exec "$@"
