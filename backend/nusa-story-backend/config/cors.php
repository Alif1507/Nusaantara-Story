<?php

// config/cors.php

$defaultOrigin = env('FRONTEND_URL', 'http://localhost:5173'); // FE kamu
$extraOrigins = array_filter(array_map('trim', explode(',', env('CORS_ALLOWED_ORIGINS', ''))));
$allowedOrigins = array_values(array_unique(array_filter(array_merge([$defaultOrigin], $extraOrigins))));

return [

    // pastikan semua endpoint yang dipanggil browser ada di /api/*
    'paths' => ['api/*','uploads/*'],

    'allowed_methods' => ['*'],

    // origin FE kamu
    'allowed_origins' => ['http://localhost:5173'],

    'allowed_origins_patterns' => [],

    // <- ini yang bikin preflight lolos
    // boleh pakai wildcard:
    // 'allowed_headers' => ['*'],
    // atau spesifik (direkomendasikan):
    'allowed_headers' => ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],

    'exposed_headers' => [],

    // cache preflight
    'max_age' => 86400,

    // pakai Bearer token, jadi false
    'supports_credentials' => false,

];
