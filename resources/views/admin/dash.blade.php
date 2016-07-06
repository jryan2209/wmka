@extends('layouts.app')
@section('content')
<div class="main-wrapper">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <h3 class="h3-responsive text-xs-center">Admin Dashboard</h3>
       <hr>
      </div>
      <div class="col-md-6">
        <div class="card z-depth-5">
          {{ Form::open(array('url' => 'site/store')) }}
              <div class="card-block">
                <h4 class="card-title">
                  <a class="btn btn-primary" data-toggle="collapse" href="#collapseOrganisation" aria-expanded="false" aria-controls="collapseOrganisation">Create Organisation</a>
                </h4>
                <div class="collapse" id="collapseOrganisation">
                  <div class="md-form">
                    <input id="organisation" type="text" name="organisation" class="validate">
                    <label for="organisation">Organisation Name</label>
                  </div>
                  <div class="md-form">
                    <input id="type" type="text" name="type" class="validate">
                    <label for="type">Organisation Type</label>
                  </div>
                  <div class="md-form">
                    <textarea type="text" id="address" class="md-textarea"></textarea>
                    <label for="address">Organisation Address</label>
                  </div>
                  <div class="file-field spacer">
                    <div class="btn btn-primary">
                      <span>Choose file</span>
                      <input type="file">
                    </div>
                    <div class="file-path-wrapper">
                      <input class="file-path validate" type="text" placeholder="add logo">
                    </div>
                  </div>
                  <div class="spacer"></div>
                  <div class="md-form">
                    <input id="content_name" name="content_name" type="text" class="validate">
                    <label for="content_name">Main Content</label>
                  </div>
                  <div class="md-form">
                    <input id="contact_number" name="contact_number" type="text" class="validate">
                    <label for="contact_number">Contact Number</label>
                  </div>
                  <div class="md-form">
                    <input id="email" name="email" type="email" class="validate">
                    <label for="email">Contact Email</label>
                  </div>
                <button type="submit" class="waves-effect waves-light btn cyan" name="button">Save site
                  <i class="fa fa-floppy-o" aria-hidden="true"></i>
                </button>
            </div>
          {{ Form::close() }}
          </div>
        </div>
        <div class="card z-depth-5">
          <div class="card-block">
            <div class="card-content">
              <h4 class="card-title">
                <a class="btn btn-primary" data-toggle="collapse" href="#collapseUser" aria-expanded="false" aria-controls="collapseUser">Create User</a>
              </h4>
              <div class="collapse" id="collapseUser">
                {{ Form::open(array('url' => 'user/store')) }}
                <div class="md-form">
                  <input id="full-name" type="text" name="fullName" class="validate">
                  <label for="full-name">Full Name</label>
                </div>
                <div class="md-form">
                  <input id="user-email" type="email" name="userEmail" class="validate">
                  <label for="user-email">Email</label>
                </div>
                <div class="md-form">
                  <input id="password" type="text" name="password" class="validate">
                  <label for="password">Password</label>
                </div>
                <div class="md-form">
                  <input id="confirm-password" type="text" name="confirmpassword" class="validate">
                  <label for="confirm-password">Confirm Password</label>
                </div>
                <select class="mdb-select">
                  <option value="" disabled selected>Choose Site</option>
                  @foreach($sites as $site)
                    <option value="{{ $site->id }}">{{ $site->name }}</option>
                  @endforeach
                </select>
                <select class="mdb-select">
                  <option value="" disabled selected>Select Role</option>
                  @foreach($roles as $role)
                    <option value="{{ $role->id }}">{{ $role->name }}</option>
                  @endforeach
                </select>

            <div class="card-action">
              <button type="submit" class="waves-effect waves-light btn cyan" name="button">Save User
                <i class="fa fa-floppy-o" aria-hidden="true"></i></button>
                {{ Form::close() }}
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-block">
            <div class="card-content">
              <h4 class="card-title">Sites</h4>
              <div class="list-group z-depth-0">
                @foreach($sites as $site)
                  <a href="{{ url('/')}}/sites/{{ $site->id }}" class="list-group-item">{{ $site->name }}</a>
                @endforeach
              </div>
              {!! $sites->render() !!}
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-block">
            <div class="card-content">
              <h4 class="card-title">Active User Infomation</h4>
              <div class="list-group z-depth-0">
                @foreach($allusers as $alluser)
                  <a href="{{ $alluser->id }}" class="list-group-item">{{ $alluser->name }}</a>
                @endforeach
              </div>
              {!! $allusers->render() !!}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
