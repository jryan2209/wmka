<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model {

	public $timestamps = false;

	public function siteUser() {
		return $this->hasMany('App\SiteUser');
	}
	public function permissions() {
        return $this->belongsToMany('App\Permission');
    }

}
