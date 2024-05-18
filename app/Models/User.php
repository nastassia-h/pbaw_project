<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'occupation',
        'location',
        'image_path',
        'friend_list',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'friend_list' => 'array',
    ];

    public function roles()
    {
        return $this
            ->belongsToMany(Role::class)
            ->withTimestamps();
    }

    public function setRole($roleName)
    {
        $role = Role::where('name', $roleName)->first();

        if ($role) {
            $this->roles()->sync([$role->id]);
        }
    }

    public function getRole()
    {
        return $this->roles->pluck('name');;
    }

    public function hasRole(string $role)
    {
        return in_array(
            $role,
            $this->roles->pluck('name')->toArray()
        );
    }
}
