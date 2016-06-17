@extends('layouts.auth')

@section('content')
<div class="row">
  <div class="col m8 push-m2 auth">
    <div class="card z-depth-0">
      <div class="card-content">
        <div class="row">
          <div class="col m6">
            <form class="form-horizontal" role="form" method="POST" action="{{ url('/login') }}">
              {{ csrf_field() }}
              <div class="input-field">
                <input id="email" type="email" name="email" class="validate" value="{{ old('email') }}">
                <label for="email">Email</label>
                @if ($errors->has('email'))
                  <span class="help-block thin">
                      {{ $errors->first('email') }}
                  </span>
                @endif
              </div>
              <div class="input-field">
                <input id="password" type="password" name="password" class="validate" value="{{ old('email') }}">
                <label for="password">Password</label>
                @if ($errors->has('password'))
                    <span class="help-block thin">
                        {{ $errors->first('password') }}
                    </span>
                @endif
                <a class="thin right" href="{{ url('/password/reset') }}" style="margin-top: -15px;">Forgotten?</a>
              </div>
              <div class="row section">
                <div class="col m6">
                    <input type="checkbox" class="filled-in" id="remember" name="remember" />
                    <label for="remember">remember me!</label>
                </div>
                <div class="col m6">
                  <button class="btn waves-effect waves-light right" type="submit">login</button>
                </div>
              </div>

            </form>
          </div>
          <div class="col m6">
            <h3 class="thin center-align">No account yet?</h3>
              <div class="center-align">
                <a class="waves-effect waves-light btn" href="{{ url('/register') }}">Sign up here</a>
              </div>
            <h3 class="thin center-align">
							or
						</h3>
            <div class="center-align section">
              <a class="waves-effect waves-light btn blue"><i class="fa fa-facebook-official" aria-hidden="true"></i> Sign in with Facebook</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
