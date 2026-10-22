#!/bin/sh
set -e

SECRET_FILE=/app/secrets/auth_secret

# Alleen genereren als er nog geen AUTH_SECRET is meegegeven
if [ -z "$AUTH_SECRET" ]; then
	if [ ! -f "$SECRET_FILE" ]; then
		mkdir -p "$(dirname "$SECRET_FILE")"
		node -e "console.log(require('crypto').randomBytes(32).toString('base64'))" >"$SECRET_FILE"
		echo "Nieuwe AUTH_SECRET gegenereerd"
	fi
	export AUTH_SECRET="$(cat "$SECRET_FILE")"
fi

# ensure database is in the correct state
yarn prisma db push --accept-data-loss
yarn prisma db seed

exec "$@"
