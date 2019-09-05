
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
    if ($("#hwBookContent").css("color") == "rgb(0, 0, 0)") {
        // dark mode
        $("#hwBookContent").css("background-image", "url('Resources/black_paper.png')")
        $("#hwBookContent").css("color", "white")
        $(".navbar").removeClass("navbar-dark")
        $(".navbar").addClass("navbar-light")
        $(".navbar").css("background-color", "rgba(255, 255, 255, 0.9)")
        
    } else {
        // light mode
        $("#hwBookContent").css("background-image", "url('Resources/paper_fibers.png')")
        $("#hwBookContent").css("color", "black")
        $(".navbar").removeClass("navbar-light")
        $(".navbar").addClass("navbar-dark")
        $(".navbar").css("background-color", "rgba(0, 0, 0, 0.9)")
    }
    
  }