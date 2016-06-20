@extends('layouts.app')

@section('content')
  <div class="row">
    <div class="col s12 m12">
      <h1>Organisation Infomation</h1>
    </div>
    <div class="row">
      <div class="col m12 s12">
          <div class="card blue-grey darken-1">
            {{ Form::open(array('url' => 'sites/' .$site->id)) }}
              <div class="card-content white-text">
                  <div class="input-field">
                    <input id="organisation" type="text" name="organisation" value="{{$site->name}}" class="validate">
                    <label for="organisation">Organisation Name</label>
                  </div>
                  <div class="input-field">
                    <input id="type" type="text" name="type" class="validate" value="{{$site->type}}">
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
                    <input id="content_name" name="content_name" type="text" value="{{$site->primary_contact}}" class="validate">
                    <label for="content_name">Main Content</label>
                  </div>
                  <div class="input-field">
                    <input id="contact_number" name="contact_number" value="{{$site->phone}}" type="text" class="validate">
                    <label for="contact_number">Contact Number</label>
                  </div>
                  <div class="input-field">
                    <input id="email" name="email" type="email" value="{{$site->email}}" class="validate">
                    <label for="email">Contact Email</label>
                  </div>
                  <div class="input-field">
                    <textarea id="address" class="materialize-textarea" value="address">{{$site->address}}</textarea>
                    <label for="address">Address</label>
                  </div>
              </div>
                @can('edit-site')
                  <div class="card-action">
                    <button type="submit" class="waves-effect waves-light btn" name="button">Update site</button>
                  </div>
                @endcan
              {{ Form::close() }}
            </div>
        </div>
      </div>
@endsection
