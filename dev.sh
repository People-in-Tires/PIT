#!/usr/bin/env bash
# Start the database and the Next.js dev server for local testing.

# Stop the script as soon as any command fails
set -e

# Always run from the folder this script is in (the PIT root)
cd "$(dirname "$0")"

# Load variables from .env (like POSTGRES_DB) into this shell
set -a
source .env
set +a

# Start only the db service and wait until its healthcheck passes
docker compose up -d --wait db

# Move into the Next.js project; everything below runs from PIT/pit
cd pit

# Sync the Prisma schema to the database
npx prisma db push --force-reset --url "postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}"

# Regenerate the Prisma client
npx prisma generate

# Fill the database with test data
npx prisma db seed

# Start Next.js
npm run dev &

# Start Prisma studio
npx prisma studio --url "postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}" &

# Keep the terminal open
wait
