<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Site;
use App\Http\Requests;
use Illuminate\Http\Request;



class SiteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($sites)
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

      $site = new Site();
      $site->name = $request->organisation;
      $site->type = $request->type;
      $site->primary_contact = $request->content_name;
      $site->phone = $request->contact_number;
      $site->email = $request->email;
      $site->address = $request->address;
      $site->save();

      return view('admin.dash');

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($site)
    {
        $site = site::find($site);
        return view('admin.sites', compact('site'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $site = Site::find($id);
        $site->name = $request->organisation;
        $site->type = $request->type;
        $site->primary_contact = $request->content_name;
        $site->phone = $request->contact_number;
        $site->email = $request->email;
        $site->address = $request->address; // Address is not saving ?????

        // $site->save();

        return redirect()->back()->withInput();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
