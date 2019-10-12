
$(document).ready(function(){
    // jQuery methods go here...
    console.log("hello world")
    var window_height = $(window).height()
    var dropdown_link_offset = $("#navbarDropdownMenuLink").offset();
    var y_position = dropdown_link_offset.top + $("#navbarDropdownMenuLink").height();
    $("#hw-dropdown-menu").css("max-height", 0.75*(window_height-y_position)+"px")
    var window_width = $(window).width()
    $("#hw-dropdown-menu").css("max-width", 0.75*(window_width)+"px")
    drawTheReverseScaleClock()
    setOpeningImgDimensionsAccordingToWidtHeightRatioOf(0.4);
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
    $("#reverseScaleClockCanvasOpeningImg").css("width", 80+"%") // set the width to be 80% if it results in too big height, we will fix it
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
    var sideMargin = (parentDivWidth-canvasWidth)/2
    $("#reverseScaleClockCanvasOpeningImg").css("margin-left", sideMargin+"px")
    $("#reverseScaleClockCanvasOpeningImg").css("margin-right", sideMargin+"px")
  }
  
  // If we use the canvas element with static dimensions, then we can draw with no problem, but if we need dynamic dimensions that will sclae autometically, according to the parent div element, for example (such as 80% width, in our case), then we have a problem and the canvas element will scale the drawing as well, similarlly to scaling of an image.
  // In Addition the canvas seems to have a defult dimensions of 300px X 150px with an aspect ratio of 2.
  // If we just set static dimensions of 400px X 1000px , this will still result in streatching of the drawing in the y direction
  // this is all because of the need to take into account the pixsel density resulution, each screen has or the Dot Per Inch - dpi
  // read this artical to explain.
  // the solution is this method that should be called inside every draw function
  // https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
  function fix_dpi() {
    //get DPI
    let dpi = window.devicePixelRatio;
    //get canvas
    let canvas = document.getElementById('reverseScaleClockCanvasOpeningImg');
    //get context
    let ctx = canvas.getContext('2d');
    //get CSS height
    //the + prefix casts it to an integer
    //the slice method gets rid of "px"
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    //get CSS width
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    //scale the canvas
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);    
  }

  function drawTheReverseScaleClock() {
    // ----------------------------------------------------------------------------------
    // remember!!!! - you're scaling the canvas, so 400X1000 become 1200X3000, so when you draw multiply each length or coordinate by the dpi
    // don't worry if these sounds very big, because after we draw we shrink the canvas to an actual fitting size
    fix_dpi()
    let dpi = window.devicePixelRatio;
    // ----------------------------------------------------------------------------------
    var canvasWidth = $("#reverseScaleClockCanvasOpeningImg").width()
    var canvasHeight = $("#reverseScaleClockCanvasOpeningImg").height()
    var canvasElement = document.getElementById('reverseScaleClockCanvasOpeningImg');
    if (canvasElement.getContext) {
      // remember!!! what you are drawing here is in a 400 X 1000 canvas but don't forget to multiply by the dpi
      var ctx = canvasElement.getContext('2d');
      let lineWidthBeforDpi = 2;
      let lineWidth = lineWidthBeforDpi*dpi;
      ctx.lineWidth = lineWidth;
      ctx.strokeRect(0.5*lineWidth, 0.5*lineWidth, canvasWidth*dpi-lineWidth, canvasHeight*dpi-lineWidth)
      /*
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvasWidth*dpi, 0*dpi);
    ctx.lineTo(canvasWidth*dpi, canvasHeight*dpi);
    ctx.lineTo(0*dpi, canvasHeight*dpi);
    ctx.closePath();
    ctx.stroke();
    */
    }
  }
