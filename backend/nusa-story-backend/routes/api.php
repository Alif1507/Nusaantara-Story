<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;



Route::post('/auth/login', function (Request $request)  {
    $data = $request->validate([
        'email' => "required|email",
        "password" => "required"
    ]);

    $user = User::whwre("email", $data["email"])->first();
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
