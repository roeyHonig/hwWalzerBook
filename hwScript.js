$(document).ready(function(){
    // jQuery methods go here...
    console.log("hello world")
    var window_height = $(window).height()
    var dropdown_link_offset = $("#navbarDropdownMenuLink").offset();
    var y_position = dropdown_link_offset.top + $("#navbarDropdownMenuLink").height();
    $("#hw-dropdown-menu").css("max-height", 0.75*(window_height-y_position)+"px")
  });

  function sayHello() {
    // TODO: toggle dark / light mode
  }