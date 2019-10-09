
$(document).ready(function(){
    // jQuery methods go here...
    console.log("hello world")
    var window_height = $(window).height()
    var dropdown_link_offset = $("#navbarDropdownMenuLink").offset();
    var y_position = dropdown_link_offset.top + $("#navbarDropdownMenuLink").height();
    $("#hw-dropdown-menu").css("max-height", 0.75*(window_height-y_position)+"px")
    var window_width = $(window).width()
    $("#hw-dropdown-menu").css("max-width", 0.75*(window_width)+"px")
    setOpeningImgDimensionsAccordingToWidtHeightRatioOf(0.5);
  });

  function toggler_dark_light_mode() {
    if ($("#hwBookContent").css("color") == "rgb(0, 0, 0)") {
      // dark mode
      $("#hwBookContent").css("background-image", "url('Resources/black_paper.png')")
      $("#hwBookContent").css("color", "white")
      $(".navbar").removeClass("navbar-dark")
      $(".navbar").addClass("navbar-light")
      $(".navbar").css("background-color", "rgba(255, 255, 255, 0.85)")
      
     } else {
      // light mode
      $("#hwBookContent").css("background-image", "url('Resources/paper_fibers.png')")
      $("#hwBookContent").css("color", "black")
      $(".navbar").removeClass("navbar-light")
      $(".navbar").addClass("navbar-dark")
      $(".navbar").css("background-color", "rgba(0, 0, 0, 0.85)")
     }
  }

  function hideDropDownInNavBar() {
    console.log("click")
    // iterate over all elements with the class "navbar-toggler"
    $('.navbar-toggler').each(function(i, obj) {
      // for each element 
      $(this).addClass("collapsed")
    });
    $('.navbar-collapse').each(function(i, obj) {
      // for each element 
      $(this).removeClass("show")
    });
  }

  function setOpeningImgDimensionsAccordingToWidtHeightRatioOf(ratio) {
    var canvasWidthAsString = $("#reverseScaleClockCanvasOpeningImg").css("width")
    var canvasWidth = parseInt(canvasWidthAsString, 10); // 10 means parse this string in the decimal number system
    var canvasHeight = (1/ratio)*canvasWidth
    // set max-height to 1000px
    if (canvasHeight > 1000) {
      canvasHeight = 1000; 
      canvasWidth = ratio*canvasHeight;
    }
    $("#reverseScaleClockCanvasOpeningImg").css("height", canvasHeight+"px")
    $("#reverseScaleClockCanvasOpeningImg").css("width", canvasWidth+"px")
    $("#reverseScaleClockCanvasOpeningImg").css("visibility", "visible")
    // center the element
    var parentDivWidth = $('#reverseScaleClockCanvasOpeningImg').parent().width()
    var sideMargin = (parentDivWidth-1-1-canvasWidth)/2
    $("#reverseScaleClockCanvasOpeningImg").css("margin-left", sideMargin+"px")
    $("#reverseScaleClockCanvasOpeningImg").css("margin-right", sideMargin+"px")
  }