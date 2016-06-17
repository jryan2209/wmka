@extends('layouts.app')

@section('content')
<div class="row">
  <div class="col m12">
    @can('odin')
      <a href="#">Odin level</a>
    @endcan
  </div>
</div>
@endsection
