#!/usr/bin/env bash
set -euo pipefail

mkdir -p /workspaces/tanstack-laravel/backend
cd /workspaces/tanstack-laravel/backend

if [ ! -f artisan ]; then
  composer create-project laravel/laravel . --no-interaction
else
  composer install --no-interaction
fi

php artisan install:api --no-interaction
cp -f /workspaces/tanstack-laravel/backend-template/routes/api.php routes/api.php
cp -f /workspaces/tanstack-laravel/backend-template/app/Http/Controllers/TodoController.php app/Http/Controllers/TodoController.php
cp -f /workspaces/tanstack-laravel/backend-template/app/Models/Todo.php app/Models/Todo.php
cp -f /workspaces/tanstack-laravel/backend-template/database/migrations/2026_08_28_000000_create_todos_table.php database/migrations/2026_08_28_000000_create_todos_table.php
touch database/database.sqlite
if [ ! -f .env ]; then cp .env.example .env; fi
sed -i 's|^DB_CONNECTION=.*|DB_CONNECTION=sqlite|' .env
sed -i 's|^DB_DATABASE=.*|DB_DATABASE=/workspaces/tanstack-laravel/backend/database/database.sqlite|' .env
if ! grep -q '^APP_KEY=.\+' .env; then
  php artisan key:generate --force
fi
php artisan migrate --force
