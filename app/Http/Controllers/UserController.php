<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index(Request $request)
    {
        return $request->user();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserRequest  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        if (isset($data['image_path'])) {
            $relativePath = $this->saveImage($data['image_path']);
            $data['image_path'] = $relativePath;

            // If there is an old image, delete it
            if ($user->image_path) {
                $absolutePath = public_path($user->image_path);
                File::delete($absolutePath);
            }
        }

        $user->update($data);
        return new UserResource($user);
    }

    public function setFriend(Request $request)
    {
        $user = $request->user();
        $friend_id = $request->friend_id;

        $friend = new UserResource(User::findOrFail($friend_id));

        $user_friend_list = $user->friend_list;
        $friend_list = $friend->friend_list;

        if (is_array($user_friend_list) && in_array($friend_id, $user_friend_list)) {
            unset($user_friend_list[array_search($friend_id, $user_friend_list)]);
            unset($friend_list[array_search($user->id, $friend_list)]);
        } else {
            $user_friend_list[] = $friend_id;
            $friend_list[] = $user->id;
        }

        $user->update(['friend_list' => $user_friend_list]);
        $friend->update(['friend_list' => $friend_list]);
        return $user->friend_list;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
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
