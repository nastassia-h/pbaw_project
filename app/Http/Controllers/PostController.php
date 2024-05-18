<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\LikePostRequest;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return PostResource::collection(
            Post::query()->orderBy('id', 'desc')->paginate(10)
        );
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function userPosts(Request $request)
    {
        return PostResource::collection(
            Post::where('user_id', $request->id)->orderBy('id', 'desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePostRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePostRequest $request)
    {
        $data = $request->validated();

        $data['likes'] = [];

        // Check if image was given and save on local file system
        if (isset($data['image_path'])) {
            $relativePath = $this->saveImage($data['image_path']);
            $data['image_path'] = $relativePath;
        }

        $post = Post::create($data);

        return new PostResource($post);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post, Request $request)
    {
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePostRequest  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(LikePostRequest $request, Post $post)
    {
        $user_id = $request->user()->id;

        $likes = $post->likes;


        if (is_array($likes) && in_array($user_id, $likes)) {
            unset($likes[array_search($user_id, $likes)]);
        } else {
            $likes[] = $user_id;
        }

        $post->update(['likes' => $likes]);

        return new PostResource($post);
    }

    public function like(LikePostRequest $request, Post $post)
    {
        $user_id = $request->user()->id;

        $post = new PostResource(Post::findOrFail($request->id));

        $likes = $post->likes;

        if (is_array($likes) && in_array($user_id, $likes)) {
            unset($likes[array_search($user_id, $likes)]);
        } else {
            $likes[] = $user_id;
        }

        $post->update(['likes' => $likes]);
        return new PostResource($post);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post, Request $request)
    {

        $user = $request->user();
        if ($user->id !== $post->user_id) {
            return abort(403, 'Unauthorized action.');
        }

        $post->delete();

        // If there is an old image, delete it
        if ($post->image_path) {
            $absolutePath = public_path($post->image_path);
            File::delete($absolutePath);
        }

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
