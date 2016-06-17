@extends('layouts.auth')
@section('content')
<div class="container">
  <div class="row">
    <div class="col m10 push-m1 login-box">
      <form class="form-horizontal" role="form" method="POST" action="{{ url('/register') }}">
        {{ csrf_field() }}
        <div class="input-field{{ $errors->has('name') ? ' has-error' : '' }}">
          <label for="name" class="col-md-4 control-label">Name</label>
          <input id="name" type="text" name="name" value="{{ old('name') }}">
          @if ($errors->has('name'))
            <span class="help-block">
              <strong>{{ $errors->first('name') }}</strong>
            </span>
          @endif
        </div>
        <div class="input-field{{ $errors->has('email') ? ' has-error' : '' }}">
          <label for="email" class="col-md-4 control-label">E-Mail Address</label>
          <input id="email" type="email" name="email" value="{{ old('email') }}">
          @if ($errors->has('email'))
            <span class="help-block">
              <strong>{{ $errors->first('email') }}</strong>
            </span>
          @endif
        </div>
        <div class="input-field{{ $errors->has('password') ? ' has-error' : '' }}">
          <label for="password" class="col-md-4 control-label">Password</label>
          <input id="password" type="password" name="password">
          @if ($errors->has('password'))
            <span class="help-block">
              <strong>{{ $errors->first('password') }}</strong>
            </span>
          @endif
        </div>
        <div class="input-field{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
          <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>
          <input id="password-confirm" type="password" name="password_confirmation">
          @if ($errors->has('password_confirmation'))
            <span class="help-block">
              <strong>{{ $errors->first('password_confirmation') }}</strong>
            </span>
          @endif
        </div>
        <div class="input-field">
          <label for="unique-code" class="col-md-4 control-label">Unique register code</label>
          <input id="unique-code" type="text" name="unique-code">
          @if ($errors->has('password_confirmation'))
            <span class="help-block">
              <strong>{{ $errors->first('password_confirmation') }}</strong>
            </span>
          @endif
        </div>
        <div class="input-field section">
          <div class="col-md-6 col-md-offset-4">
            <button type="submit" class="btn btn-primary">
              <i class="fa fa-btn fa-user"></i> Register
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
@endsection
