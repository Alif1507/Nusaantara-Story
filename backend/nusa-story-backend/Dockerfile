FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libpng-dev libonig-dev libxml2-dev libicu-dev \
 && docker-php-ext-install pdo_mysql bcmath pcntl intl zip \
 && rm -rf /var/lib/apt/lists/*

# (opsional) GD
RUN docker-php-ext-configure gd --with-freetype --with-jpeg || true \
 && docker-php-ext-install -j$(nproc) gd || true

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN printf "memory_limit=512M\nupload_max_filesize=16M\npost_max_size=16M\n" > /usr/local/etc/php/conf.d/custom.ini

ENTRYPOINT ["/entrypoint.sh"]
CMD ["php-fpm", "-F"]
