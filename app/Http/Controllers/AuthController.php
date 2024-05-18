<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                "message" => "Provided email or password is invalid"
            ], 401);
        }
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if (!$user->hasRole('user')) {
            return response([
                "message" => "Provided email or password is invalid"
            ], 401);
        }

        $roleNames = $user->roles->pluck('name');
        unset($user->roles);

        $token = $user->createToken('main')->plainTextToken;

        return response(["user" => $user, "roles" => $roleNames, "token" => $token]);
    }

    public function adminlogin(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                "message" => "Provided email or password is invalid"
            ], 401);
        }
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if (!$user->hasRole('admin')) {
            return response([
                "message" => "Provided email or password is invalid"
            ], 401);
        }

        $roleNames = $user->roles->pluck('name');
        unset($user->roles);

        $token = $user->createToken('main')->plainTextToken;

        return response(["user" => $user, "roles" => $roleNames, "token" => $token]);
    }

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        if (isset($data['image_path'])) {
            $relativePath = $this->saveImage($data['image_path']);
            $data['image_path'] = $relativePath;
        }

        /** @var \App\Models\User $user */
        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'occupation' => $data['occupation'],
            'location' => $data['location'],
            'friend_list' => [],
            'image_path' => $data['image_path'] ?? null,
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $user->setRole('user');
        $token = $user->createToken('main')->plainTextToken;

        unset($user->roles);
        return response(["user" => $user, "roles" => $user->getRole(), "token" => $token]);
        // return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete;

        return response('', 204);
    }

    private function saveImage($image)
    {
        // Check if image is valid base64 string
        if (preg_match("/^data:image\/(\w+);base64,/", $image, $type)) {
            // Take out the base64 encoded text without mime type
            $image = substr($image, strpos($image, ',') + 1);
            // Get file extension
            $type = strtolower($type[1]); // jpg, png, gif

            // Check if file is an image
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('did not match data URI with image data');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }
}
