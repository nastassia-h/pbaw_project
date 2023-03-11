<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                "message" => "Provided email or password is invalid"
            ]);
        }
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(["user" => $user, "token" => $token]);
    }

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        $imageName = time() . '.' . $request->image_path->extension();
        $request->image_path->move(public_path('images'), $imageName);

        /** @var \App\Models\User $user */
        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'occupation' => $data['occupation'],
            'location' => $data['location'],
            'friend_list' => [],
            'post_list' => [],
            'image_path' => $imageName,
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(["user" => $user, "token" => $token]);
        // return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete;

        return response('', 204);
    }
}
