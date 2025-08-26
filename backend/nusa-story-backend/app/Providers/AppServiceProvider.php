<?php

namespace App\Providers;

use App\Models\Book;
use App\Policies\BookPolicy;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    
        protected $policies = [
            Book::class => BookPolicy::class
        ];
    

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
