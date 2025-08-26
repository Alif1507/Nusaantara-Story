<?php

namespace App\Policies;

use App\Models\Book;
use App\Models\User;

class BookPolicy
{
    /**
     * Create a new policy instance.
     */
   
        public function view(User $user, Book $book): bool { return $book->user_id === $user->id; }
        public function update(User $user, Book $book): bool { return $book->user_id === $user->id; }
        public function delete(User $user, Book $book): bool { return $book->user_id === $user->id; }
    
}
