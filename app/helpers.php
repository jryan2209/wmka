<?php

function flash($message)
  {
    returne session()->flash('flash_message', $message);
  }
