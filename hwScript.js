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
    // background-image: url('Resources/paper_fibers.png');
    if ($("#testDiv").css("color") == "rgb(0, 0, 0)") {
        $("#testDiv").css("background-image", "url('Resources/black_paper.png')")
        $("#testDiv").css("color", "white")
    } else {
        $("#testDiv").css("background-image", "url('Resources/paper_fibers.png')")
        $("#testDiv").css("color", "black")
    }
    
  }