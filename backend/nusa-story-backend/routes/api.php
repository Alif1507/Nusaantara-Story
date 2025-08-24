<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rules\Password;

Route::post("/auth/register", function (Request $request) {
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
})->middleware("throttle:6,1");

Route::post('/auth/login', function (Request $request)  {
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
})->middleware("throttle:10,1");

Route::post("auth/logout", function (Request $request) {
    $request->user()->currentAccessToken()?->delete();
    return response()->json([
        "message" => "all tokens revoked"
    ]);
})->middleware("auth:sanctum");

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
