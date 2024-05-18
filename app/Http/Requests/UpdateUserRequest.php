<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return ($this->user()->id === $this->route('user')->id || $this->user()->hasRole('admin'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'first_name' => 'required|string|max:55',
            'last_name' => 'required|string|max:55',
            'occupation' => 'string',
            'location' => 'string',
            'image_path' => 'string',
            'email' => 'required|email|unique:users,email,' . $this->id,
            'password' => [
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols()
            ]
        ];
    }
}
