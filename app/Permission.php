<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model {

	public $timestamps = false;

	public function users()
	{
		return $this->belongsToMany('App\User', 'group_user');
	}
	public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

}
