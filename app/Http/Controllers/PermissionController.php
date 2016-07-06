<?php namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Role;
use App\Permission;
use App\Http\Requests;
use Illuminate\Http\Request;


class PermissionController extends Controller {
	public function __construct()
	{
		$this->middleware('auth');
	}
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		return view('admin.permission');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show()
	{

	}

}
