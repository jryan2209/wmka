<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Role;
use App\Site;
use App\Http\Requests;
use Illuminate\Http\Request;



class DashController extends Controller
{
  public function __construct()
  {
    $this->middleware('auth');
  }

  public function index()
  {

    $user = User::find(Auth::id());
    
    if ($user->hasRole('odin')) {

      $allusers = User::paginate(12);
      $sites = Site::paginate(12);
      $roles = Role::get();

      return view('admin.dash', compact('sites','roles','allusers'));
    }
    if ($user->hasRole('organiser')) {

    }
    if($user->hasRole('parent')){

    }
    if($user->hasRole('child')){

    }
  }
}
