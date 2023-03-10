<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'occupation' => $this->occupation,
            'location' => $this->location,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'email' => $this->email,
            'image_path' => $this->image_path,
            'friend_list' => $this->friend_list,
        ];
    }
}
