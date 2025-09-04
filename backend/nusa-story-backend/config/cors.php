<?php

// config/cors.php

$defaultOrigin = env('FRONTEND_URL', 'http://localhost:5173'); // FE kamu
$extraOrigins = array_filter(array_map('trim', explode(',', env('CORS_ALLOWED_ORIGINS', ''))));
$allowedOrigins = array_values(array_unique(array_filter(array_merge([$defaultOrigin], $extraOrigins))));

return [

    /*
    |--------------------------------------------------------------------------
    | Paths
    |--------------------------------------------------------------------------
    |
    | Hanya path ini yang akan diproses CORS middleware. Pastikan endpoint kamu
    | ada di routes/api.php (mis. /api/uploads/images) agar tercakup 'api/*'.
    |
    */
    'paths' => [
        'api/*',
        'sanctum/csrf-cookie',
        // kalau kamu PAKSA pakai route non-API untuk upload, tambahkan:
        // 'uploads/*',
    ],

    /*
    |--------------------------------------------------------------------------
    | Allowed Methods
    |--------------------------------------------------------------------------
    */
    'allowed_methods' => ['*'],

    /*
    |--------------------------------------------------------------------------
    | Allowed Origins
    |--------------------------------------------------------------------------
    |
    | Sumber asal (origin) yang diizinkan. Default ambil dari FRONTEND_URL,
    | bisa tambah banyak via CORS_ALLOWED_ORIGINS (dipisah koma) di .env.
    |
    */
    'allowed_origins' => $allowedOrigins,

    /*
    |--------------------------------------------------------------------------
    | Allowed Origins Patterns
    |--------------------------------------------------------------------------
    */
    'allowed_origins_patterns' => [],

    /*
    |--------------------------------------------------------------------------
    | Allowed Headers
    |--------------------------------------------------------------------------
    */
    'allowed_headers' => ['*'],

    /*
    |--------------------------------------------------------------------------
    | Exposed Headers
    |--------------------------------------------------------------------------
    */
    'exposed_headers' => [],

    /*
    |--------------------------------------------------------------------------
    | Max Age
    |--------------------------------------------------------------------------
    */
    'max_age' => 0,

    /*
    |--------------------------------------------------------------------------
    | Supports Credentials
    |--------------------------------------------------------------------------
    |
    | Kamu pakai Bearer token, jadi biarkan FALSE. Kalau suatu saat pakai
    | cookie/Sanctum SPA, ubah ke TRUE dan pastikan allowed_origins spesifik.
    |
    */
    'supports_credentials' => false,
];
