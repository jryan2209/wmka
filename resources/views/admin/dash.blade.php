@extends('layouts.app')

@section('content')
<div class="row">
  <div class="col s12 m12">
    <h1>Administration</h1>
  </div>
  <div class="row">
    <div class="col m6 s12">
        <div class="card blue-grey darken-1">
          {{ Form::open(array('url' => 'site/store')) }}
            <div class="card-content white-text">
              <span class="card-title">Create Organisation</span>
                <div class="input-field">
                  <input id="organisation" type="text" name="organisation" class="validate">
                  <label for="organisation">Organisation Name</label>
                </div>
                <div class="input-field">
                  <input id="type" type="text" name="type" class="validate">
                  <label for="type">Organisation Type</label>
                </div>
                <div class="file-field input-field">
                  <div class="btn">
                    <span>upload</span>
                    <input type="file">
                  </div>
                  <div class="file-path-wrapper">
                    <input class="file-path validate" placeholder="add logo" type="text">
                  </div>
                </div>
                <div class="input-field">
                  <input id="content_name" name="content_name" type="text" class="validate">
                  <label for="content_name">Main Content</label>
                </div>
                <div class="input-field">
                  <input id="contact_number" name="contact_number" type="text" class="validate">
                  <label for="contact_number">Contact Number</label>
                </div>
                <div class="input-field">
                  <input id="email" name="email" type="email" class="validate">
                  <label for="email">Contact Email</label>
                </div>
                <div class="input-field">
                  <textarea id="address" class="materialize-textarea"></textarea>
                  <label for="address">Address</label>
                </div>
            </div>
            <div class="card-action">
            <button type="submit" class="waves-effect waves-light btn" name="button">Save site</button>
            </div>
            {{ Form::close() }}
          </div>
      </div>
      <div class="col m6 s12">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Sites</span>
            <div class="collection">
              @foreach($sites as $site)
                <a href="{{ url('/')}}/sites/{{ $site->id }}" class="collection-item">{{ $site->name }}</a>
              @endforeach
            </div>
            {!! $sites->render() !!}
          </div>
        </div>
        </div>
      </div>
      <div class="row">
        <div class="col m6 s12">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">Create Users</span>
              {{ Form::open(array('url' => 'user/store')) }}
              <div class="input-field">
                <input id="full-name" type="text" name="fullName" class="validate">
                <label for="full-name">Full Name</label>
              </div>
              <div class="input-field">
                <input id="user-email" type="email" name="userEmail" class="validate">
                <label for="user-email">Email</label>
              </div>
              <div class="input-field">
                <input id="password" type="text" name="password" class="validate">
                <label for="password">Password</label>
              </div>
              <div class="input-field">
                <input id="confirm-password" type="text" name="confirmpassword" class="validate">
                <label for="confirm-password">Confirm Password</label>
              </div>
              <div class="input-field">
                <select class="browser-default" name="role">
                  <option value="" disabled selected>Select Site</option>
                  @foreach($sites as $site)
                    <option value="{{ $site->id }}">{{ $site->name }}</option>
                  @endforeach
                </select>
              </div>
              <div class="input-field">
                <select class="browser-default" name="site">
                  <option value="" disabled selected>Select Role</option>
                  @foreach($roles as $role)
                    <option value="{{ $role->id }}">{{ $role->name }}</option>
                  @endforeach
                </select>
              </div>
            </div>
            <div class="card-action">
              <button type="submit" class="waves-effect waves-light btn" name="button">Save User</button>
            </div>
            {{ Form::close() }}
          </div>
          </div>
          <div class="col m6 s12">
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                  <span class="card-title">Active User Infomation</span>
                  <div class="collection">
                    @foreach($allusers as $alluser)
                      <a href="{{ $alluser->id }}" class="collection-item">{{ $alluser->name }}</a>
                    @endforeach
                  </div>
                  {!! $allusers->render() !!}
                </div>
                <div class="card-action">
                  <a href="#">Save</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
@endsection
