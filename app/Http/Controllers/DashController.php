<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Role;
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
      // dd('here');
    }

    return view('admin.dash');
  }
}
