<?php

use App\Http\Controllers\api\UserController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookPublicController;
use App\Http\Controllers\RecoController;
use App\Http\Controllers\UploadController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rules\Password;

Route::post("/auth/register", function (Request $request) 
{
    $data = $request->validate([
        'name' => "required|string|max:244",
        "email" =>  ['required','string','lowercase','email','max:255','unique:'.User::class],
        "password" => ["required", "confirmed", Password::min(8)->letters()->numbers()]
    ]);

    $user = User::create([
        'name'     => $data['name'],
        'email'    => $data['email'],
        'password' => Hash::make($data['password']),
    ]);

    $token = $user->createToken('react', ['*'])->plainTextToken;

    return response()->json(['token' => $token, 'user' => $user], 201);
})->name("register")->middleware("throttle:6,1");


Route::post('/auth/login', function (Request $request) 
{
     $data = $request->validate([
        'email' => "required|email",
        "password" => "required"
    ]);

    $user = User::where("email", $data["email"])->first();
    if (!$user || !Hash::check($data['password'], $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 442);
    }

    $abilities = ['*'];

    $tokenplain = $user->createToken('react', $abilities)->plainTextToken;

    return response()->json([
        'token' => $tokenplain,
        "user" => $user
    ]);
})->name("login")->middleware("throttle:10,1");


Route::post("auth/logout", function (Request $request) 
{
     $request->user()->currentAccessToken()?->delete();
     return response()->json([
        "message" => "all tokens revoked"
    ]);
})->name("logout")->middleware("auth:sanctum");

Route::middleware("auth:sanctum")->post("/uploads/images", [UploadController::class, "store"]);

Route::middleware('auth:sanctum')->group(function(){
Route::get('/books', [BookController::class,'index']);
Route::post('/books', [BookController::class,'store']);
Route::get('/books/{book}', [BookController::class,'show']);
Route::put('/books/{book}', [BookController::class,'update']);
Route::delete('/books/{book}', [BookController::class,'destroy']);
Route::post('/books/{book}/publish', [BookController::class,'publish']);
});
Route::post('/recommendations', [RecoController::class, 'recommend']);
Route::get('/public/books/{slug}' , [BookPublicController::class, "showBySlug"]);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
