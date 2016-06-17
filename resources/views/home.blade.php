@extends('layouts.app')

@section('content')
  <div class="row">
    <div class="col m12">
      @can('odin')
        <a href="#">Odin level</a>
      @endcan
    </div>
  </div>
  <div class="row valign-wrapper">
            <div class="col s2">
              <img src="images/yuna.jpg" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
            </div>
            <div class="col s10">
              <span class="black-text">
                This is a square image. Add the "circle" class to it to make it appear circular.
              </span>
            </div>
          </div>
@endsection
