<header>
  <nav class="cyan">
    <div class="container">
      <a href="#" data-activates="nav-mobile" class="button-collapse top-nav full hide-on-large-only">
        <i class="material-icons">menu</i>
      </a>
    </div>
    <ul class="right hide-on-med-and-down">
      <li>
        <a class="dropdown-button valign-wrapper" href="#!" data-activates="dropdown1">
          <img class="profile_thumb" src="https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/12987166_10153699393133681_3041571987900494143_n.jpg?oh=4cad5a8428f3bfae358f9accad20a43c&oe=57C86144" alt="">
          <span class="valign nav_text">
             {{Auth::user()->name}}
          </span>
          <i class="material-icons right">arrow_drop_down</i>
        </a>
      </li>
    </ul>
    <ul id="dropdown1" class="dropdown-content">
      <li><a href="#!">You profile</a></li>
      @can('odin')
        <li><a href="{{ url('/')}}/logout">Dashboard</a></li>
      @endcan
      <li class="divider"></li>
      <li><a href="{{ url('/')}}/logout">Logout</a></li>
    </ul>
    <ul id="slide-out" class="side-nav">
      <li><a href="#!">First Sidebar Link</a></li>
      <li><a href="#!">Second Sidebar Link</a></li>
    </ul>
  </nav>
  <ul id="nav-mobile" class="side-nav fixed" style="transform: translateX(0%);">
    <li><a href="#!">First Sidebar Link</a></li>
    <li><a href="#!">Second Sidebar Link</a></li>
  </ul>
</header>
