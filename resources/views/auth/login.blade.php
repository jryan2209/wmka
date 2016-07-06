@extends('layouts.auth')

@section('content')
  <div class="container">
    <div class="row">
      <div class="col-md-10 col-md-offset-1 login-block">
        <div class="card">
          <div class="card-block">
            <div class="row">
                <div class="col-md-6">
                  <form class="form-horizontal" role="form" method="POST" action="{{ url('/login') }}">
                    {{ csrf_field() }}
                    <div class="md-form">
                      <i class="fa fa-envelope prefix"></i>
                      <input id="email" type="email" name="email" class="form-control validate" value="{{ old('email') }}">
                      <label for="email">Enter your email</label>
                      @if ($errors->has('email'))
                        <span class="help-block thin">
                            {{ $errors->first('email') }}
                        </span>
                      @endif
                    </div>
                    <div class="md-form">
                      <i class="fa fa-lock prefix"></i>
                      <input id="password" type="password" name="password" class="form-control validate" value="{{ old('password') }}">
                      <label for="password">Type your password</label>
                      @if ($errors->has('password'))
                          <span class="help-block thin">
                              {{ $errors->first('password') }}
                          </span>
                      @endif
                      <a href="#"><small>forgot your password!</small></a>
                    </div>
                    <div>
                    </div>
                    <div class="md-form">
                      <button type="submit" class="btn btn-success-outline waves-effect pull-right">Login <i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                    </div>
                </div>
                <div class="col-md-6">
                  <div class="register-block flex-center">
                    <div>
                      <a class="btn btn-primary-outline waves-effect flex-center" href="{{ url('/register') }}">Sign up here</a>
                      <div class="spacer">

                      </div>
                      <h5 class="text-xs-center">or</h5>
                      <button type="button" class="btn btn-fb"><i class="fa fa-facebook left"></i> Facebook</button>
                      <button type="button" class="btn btn-gplus"><i class="fa fa-google-plus left"></i> Google +</button>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection
