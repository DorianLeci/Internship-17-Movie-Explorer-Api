set -euo pipefail

echo "===Running database migrations==="
npx prisma migrate deploay

echo "===Seeding database==="
npx prisma db seed

echo "===Starting backend==="
exec "$@"