<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Where My Kids App</title>
    @include('partial.stylesheets')
</head>
<body id="admin-layout" class="app">
  @include('partial.nav')
<main class="mdl-layout__content">
  @yield('content')
</main>



@include('partial.scripts')
</body>
</html>
