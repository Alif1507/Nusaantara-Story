#!/usr/bin/env bash
set -e

cd /var/www

# install vendor jika belum ada
if [ ! -d "vendor" ]; then
  composer install --no-interaction --prefer-dist
fi

# permissions untuk cache & storage
chown -R www-data:www-data storage bootstrap/cache || true
chmod -R 775 storage bootstrap/cache || true

# jika APP_KEY kosong, generate sementara (untuk dev)
if [ -z "$APP_KEY" ]; then
  php artisan key:generate --force || true
fi

# tunggu DB siap
echo ">> Menunggu database..."
until php -r "try{ new PDO('mysql:host=' . getenv('DB_HOST') . ';port=' . getenv('DB_PORT') . ';dbname=' . getenv('DB_DATABASE'), getenv('DB_USERNAME'), getenv('DB_PASSWORD')); echo 'ok'; }catch(Exception \$e){ exit(1);}"; do
  sleep 2
done

# migrasi & storage link
php artisan migrate --force || true
php artisan storage:link || true

php artisan config:clear || true
php artisan cache:clear || true
php artisan route:clear || true

exec "$@"
