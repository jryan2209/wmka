@extends('layouts.app')

@section('content')
  <div class="main-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <h3 class="h3-responsive text-xs-center">Site Admin</h3>
         <hr>
         <div class="card">
           <div class="card-block">
             {{ Form::open(array('url' => 'sites/' .$site->id)) }}
               <div class="card-content">
                 <h4 class="card-title spacer">Site Infomation</h4>
                   <div class="md-form">
                     <input id="organisation" type="text" name="organisation" value="{{$site->name}}" class="validate">
                     <label for="organisation">Organisation Name</label>
                   </div>
                   <div class="md-form">
                     <input id="type" type="text" name="type" class="validate" value="{{$site->type}}">
                     <label for="type">Organisation Type</label>
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
                     <input id="content_name" name="content_name" type="text" value="{{$site->primary_contact}}">
                     <label for="content_name">Main Content</label>
                   </div>
                   <div class="md-form">
                     <input id="contact_number" name="contact_number" value="{{$site->phone}}" type="text">
                     <label for="contact_number">Contact Number</label>
                   </div>
                   <div class="md-form">
                     <input id="email" name="email" type="email" value="{{$site->email}}" class="validate">
                     <label for="email">Contact Email</label>
                   </div>
                   <div class="md-form">
                     <textarea type="text" id="address" class="md-textarea">{{$site->address}}</textarea>
                     <label for="address">Organisation Address</label>
                   </div>
               </div>
               <div class="card-action">
                 <button type="submit" class="waves-effect waves-light btn cyan" name="button">Update site</button>
               </div>
               {{ Form::close() }}
           </div>
           </div>
        </div>
      </div>
    </div>
  </div>
@endsection
