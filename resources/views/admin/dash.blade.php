@extends('layouts.app')

@section('content')
<div class="row">
  <div class="col s12 m12">
    <h1>Administration</h1>
  </div>
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
            <a href="#">Save</a>
          </div>
          {{ Form::close() }}
        </div>
    </div>
    <div class="col m6 s12">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Create Users</span>
            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
          </div>
          <div class="card-action">
            <a href="#">Save</a>
          </div>
        </div>
      </div>
      <div class="col m6 s12">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">Sites</span>
              <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
            </div>
            <div class="card-action">
              <a href="#">Save</a>
            </div>
          </div>
        </div>
        <div class="col m6 s12">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">Active User Infomation</span>
                <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
              </div>
              <div class="card-action">
                <a href="#">Save</a>
              </div>
            </div>
          </div>
  </div>
</div>
@endsection
