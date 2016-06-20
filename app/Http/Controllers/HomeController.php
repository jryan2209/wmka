<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Role;
use App\Http\Requests;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $user = User::find(Auth::id());

      if ($user->hasRole('odin')) {
        return redirect('admin/dash');
      }
      if ($user->hasRole('organiser')) {

      }
      if($user->hasRole('parent')){

      }
      if($user->hasRole('child')){

      }
    }
}
