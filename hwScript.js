
$(document).ready(function(){
    // jQuery methods go here...
    console.log("hello world")
    var window_height = $(window).height()
    var dropdown_link_offset = $("#navbarDropdownMenuLink").offset();
    var y_position = dropdown_link_offset.top + $("#navbarDropdownMenuLink").height();
    $("#hw-dropdown-menu").css("max-height", 0.75*(window_height-y_position)+"px")
    var window_width = $(window).width()
    $("#hw-dropdown-menu").css("max-width", 0.75*(window_width)+"px")
    window.requestAnimationFrame(drawTheReverseScaleClock);
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
    // fith height in the screen. we want to make sure the clock img will fit completlly inside the screen without the need to scroll down to see the entire img
    // so we shrink it again
    let bodyHeigt = $("body").height()
    let navbarHeight = $(".navbar").first().height()
    let navbarTopPaddingAsString = $(".navbar").first().css("padding-top")
    let navbarTopPadding = parseInt(navbarTopPaddingAsString, 10);
    let imgTitleHeight = $($(".hwChapterNumber")[1]).height() 
    if (canvasHeight > (bodyHeigt-navbarHeight-2*navbarTopPadding-imgTitleHeight)) {
      canvasHeight = 0.9*(bodyHeigt-navbarHeight-2*navbarTopPadding-imgTitleHeight)
      canvasWidth = ratio*canvasHeight;
    }
    // set dimensions for both img canvas and svg
    $("#reverseScaleClockCanvasOpeningImg").css("height", canvasHeight+"px")
    $("#reverseScaleClockCanvasOpeningImg").css("width", canvasWidth+"px")
    $("#reverseScaleClockCanvasOpeningImg").css("visibility", "visible")
    $("#reverseScaleClockCanvasOpeningImgSVG").css("height", canvasHeight+"px")
    $("#reverseScaleClockCanvasOpeningImgSVG").css("width", canvasWidth+"px")
    $("#reverseScaleClockCanvasOpeningImgSVG").css("visibility", "visible")
    $("#reverseScaleClockCanvasOpeningImgClockAperatus").css("height", canvasHeight+"px")
    $("#reverseScaleClockCanvasOpeningImgClockAperatus").css("width", canvasWidth+"px")
    $("#reverseScaleClockCanvasOpeningImgClockAperatus").css("visibility", "visible")
    // center the canvas element
    var parentDivWidth = $('#reverseScaleClockCanvasOpeningImg').parent().width()
    var sideMargin = (parentDivWidth-canvasWidth)/2
    $("#reverseScaleClockCanvasOpeningImg").css("margin-left", sideMargin+"px")
    $("#reverseScaleClockCanvasOpeningImg").css("margin-right", sideMargin+"px")
    // center the svg element
    var parentDivWidth = $('#reverseScaleClockCanvasOpeningImgSVG').parent().width()
    var sideMargin = (parentDivWidth-canvasWidth)/2
    $("#reverseScaleClockCanvasOpeningImgSVG").css("margin-left", sideMargin+"px")
    $("#reverseScaleClockCanvasOpeningImgSVG").css("margin-right", sideMargin+"px")
    // center the aperatus img. TODO: seems there is duplicate
    var parentDivWidth = $('#reverseScaleClockCanvasOpeningImgClockAperatus').parent().width()
    var sideMargin = (parentDivWidth-canvasWidth)/2
    $("#reverseScaleClockCanvasOpeningImgClockAperatus").css("margin-left", sideMargin+"px")
    $("#reverseScaleClockCanvasOpeningImgClockAperatus").css("margin-right", sideMargin+"px")
    // since the static position of the canvas and svg image will make it render below the apartus img , as stated in the html file, we use relitive to re-position the canvas and svg to interlap with svg
    $("#reverseScaleClockCanvasOpeningImg").css("position", "relative")
    $("#reverseScaleClockCanvasOpeningImg").css("top", -2*canvasHeight+"px")
    $("#reverseScaleClockCanvasOpeningImgSVG").css("position", "relative")
    $("#reverseScaleClockCanvasOpeningImgSVG").css("top", -canvasHeight+"px")
    // shrink the parentElement
    let parentElement = $('#reverseScaleClockCanvasOpeningImgSVG').parent()
    let oldHeight = parentElement.height()
    parentElement.css("height", oldHeight-canvasHeight+"px")
  }
  
  // If we use the canvas element with static dimensions, then we can draw with no problem, but if we need dynamic dimensions that will sclae autometically, according to the parent div element, for example (such as 80% width, in our case), then we have a problem and the canvas element will scale the drawing as well, similarlly to scaling of an image.
  // In Addition the canvas seems to have a defult dimensions of 300px X 150px with an aspect ratio of 2.
  // If we just set static dimensions of 400px X 1000px , this will still result in streatching of the drawing in the y direction
  // this is all because of the need to take into account the pixsel density resulution, each screen has or the Dot Per Inch - dpi
  // read this artical to explain.
  // the solution is this method that should be called inside every draw function
  // https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
  function fix_dpi(widthInPx, heightInPx) {
    //get DPI
    let dpi = window.devicePixelRatio;
    //get canvas
    let canvas = document.getElementById('reverseScaleClockCanvasOpeningImg');
    //get context
    let ctx = canvas.getContext('2d');
    //get CSS height
    //the + prefix casts it to an integer
    //the slice method gets rid of "px"
    let style_height = heightInPx//+getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    //get CSS width
    let style_width = widthInPx// +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    //scale the canvas
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);    
  }

  function drawTheReverseScaleClock() {
    // remember!!! what you are drawing here is in a 400 X 1000 canvas but don't forget to multiply by the dpi
    var widthInPx = 400
    var heightInPx = 1000
    // ----------------------------------------------------------------------------------
    // remember!!!! - you're scaling the canvas, so 400X1000 become 1200X3000 (in iphone6 for example), so when you draw multiply each length or coordinate by the dpi
    // don't worry if these sounds very big, because after we draw we shrink the canvas to an actual fitting size
    fix_dpi(widthInPx, heightInPx)
    let dpi = window.devicePixelRatio;
    // ----------------------------------------------------------------------------------
    var canvasWidth = widthInPx// $("#reverseScaleClockCanvasOpeningImg").width()
    var canvasHeight = heightInPx//$("#reverseScaleClockCanvasOpeningImg").height()
    var canvasElement = document.getElementById('reverseScaleClockCanvasOpeningImg');
    if (canvasElement.getContext) {
      // remember!!! what you are drawing here is in a 400 X 1000 canvas but don't forget to multiply by the dpi
      var ctx = canvasElement.getContext('2d');
      ctx.strokeStyle = "red"
      ctx.fillStyle = "red"
      let lineWidthBeforDpi = 1;
      let lineWidth = lineWidthBeforDpi*dpi;
      ctx.lineWidth = lineWidth;
      ctx.strokeRect(0.5*lineWidth, 0.5*lineWidth, canvasWidth*dpi-lineWidth, canvasHeight*dpi-lineWidth)
      ctx.save()
      // get time
      var now = new Date();
      var sec = now.getSeconds();
      var miliSec = now.getMilliseconds();
      // write Minitues
      var min = now.getMinutes();
      ctx.translate(200*dpi,300*dpi)
      ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec)
      ctx.strokeStyle = "black"
      ctx.fillStyle = "black"
      drawTheMinutesHandUsingContext(ctx,dpi)
      ctx.restore()
      ctx.save()
      // write Hrs
      var hr = now.getHours();
      ctx.translate(200*dpi,300*dpi)
      ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) *sec/*hr * (Math.PI / 12) + (Math.PI / 30) * min + (Math.PI / 1800) *sec + (Math.PI/2)*/)
      ctx.strokeStyle = "black"
      ctx.fillStyle = "black"
      ctx.lineWidth = 4*dpi;
      drawTheHoursHandUsingContext(ctx,dpi)     
      ctx.restore()
      ctx.save()
      // write seconds
      var sec = now.getSeconds();
      var miliSec = now.getMilliseconds();
      ctx.translate(200*dpi,300*dpi)
      ctx.rotate((sec+miliSec/1000) * Math.PI/30)
      drawTheSecondsHandUsingContext(ctx,dpi)
      ctx.restore()
      ctx.save()
      // animate
      window.requestAnimationFrame(drawTheReverseScaleClock);
    }
  }

  function drawCanvasArcBetweenTwoPoints(x1,y1,x2,y2,xCenter,yCenter,context,dpi,CounterClockWise) {
    var radius = Math.sqrt((y1-yCenter)*(y1-yCenter) + (x1-xCenter)*(x1-xCenter))
    var x1Diff = x1-xCenter
    var y1Diff = y1-yCenter
    var startAngle = 0
    if (x1Diff == radius) {
      startAngle = 0
    } else if (x1Diff == -radius) {
      startAngle = -Math.PI
    } else if (x1Diff == 0) {
      startAngle = Math.PI/2*y1Diff/radius
    } else if (y1Diff < 0 && x1Diff < 0) {
      // 2nd Quad
      startAngle = Math.atan(y1Diff/x1Diff)-Math.PI
    } else if (y1Diff > 0 && x1Diff < 0) {
      // 3rd Quad
      startAngle = Math.atan(y1Diff/x1Diff)+Math.PI
    } else {
      startAngle = Math.atan(y1Diff/x1Diff)
    }
    var x2Diff = x2-xCenter
    var y2Diff = y2-yCenter
    var endAngle = 0
    if (x2Diff == radius) {
      endAngle = 0
    } else if (x2Diff == -radius) {
      endAngle = -Math.PI
    } else if (x2Diff == 0) {
      endAngle = Math.PI/2*y2Diff/radius
    } else if (y2Diff < 0 && x2Diff < 0) {
      // 2nd Quad
      endAngle = Math.atan(y2Diff/x2Diff)-Math.PI
    } else if (y2Diff > 0 && x2Diff < 0) {
      // 3rd Quad
      endAngle = Math.atan(y2Diff/x2Diff)+Math.PI
    } else {
      endAngle = Math.atan(y2Diff/x2Diff)
    }
    
    context.arc(xCenter*dpi,yCenter*dpi,radius,startAngle,endAngle,CounterClockWise)
  }

  function drawTheHoursHandUsingContext(ctx,dpi) {
    ctx.beginPath();
      ctx.moveTo(0, 0);
    ctx.lineTo(6*dpi,0*dpi)
      drawCanvasArcBetweenTwoPoints(6,0,2,-5.66,0,0,ctx,dpi,true)
      ctx.lineTo(2*dpi,-23.02*dpi)
      drawCanvasArcBetweenTwoPoints(2,-23.2,5.2,-26.0,5,-23.0,ctx,dpi, false)
      ctx.lineTo(10*dpi,-26*dpi)
      ctx.lineTo(10*dpi,-34*dpi)
      ctx.lineTo(2*dpi,-34*dpi)
      ctx.lineTo(2*dpi,-37.29*dpi)
      drawCanvasArcBetweenTwoPoints(2,-37.29,2,-50.71,0,-44,ctx,dpi, true)
      ctx.lineTo(1*dpi,-93*dpi)
      ctx.arc(0*dpi,-93*dpi,1*dpi,0,Math.PI,true)
      //Mirror
      ctx.lineTo(-2*dpi,-50.71*dpi)
      drawCanvasArcBetweenTwoPoints(-2,-50.71,-2,-37.29,0,-44,ctx,dpi, true)
      ctx.lineTo(-2*dpi,-34*dpi)
      ctx.lineTo(-10*dpi,-34*dpi)
      ctx.lineTo(-10*dpi,-26*dpi)
      ctx.lineTo(-5.2*dpi,-26*dpi)
      ctx.arc(-5,-23,3,-Math.PI/2,0, false)
      ctx.lineTo(-2*dpi,-5.66*dpi)
      drawCanvasArcBetweenTwoPoints(-2,-5.66,-6,0,0,0,ctx,dpi,true)
      ctx.lineTo(0*dpi,0*dpi)
      ctx.stroke();
      ctx.fill()
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.strokeStyle = 'red'
      ctx.fillStyle = 'red'
      ctx.arc(0*dpi,0*dpi,6*dpi,0 , Math.PI * 2, true)
      ctx.stroke();
      ctx.fill()
  }

  function drawTheMinutesHandUsingContext(ctx,dpi) {
    ctx.beginPath();
      ctx.moveTo(-2*dpi, -5.643*dpi);
      ctx.lineTo(-2*dpi, -11*dpi);
      ctx.bezierCurveTo(-3*dpi, -16*dpi, -5*dpi, -20*dpi, -7*dpi, -23*dpi);
      ctx.bezierCurveTo(-5*dpi, -27*dpi, -3*dpi, -32*dpi, -3*dpi, -37*dpi);
      ctx.bezierCurveTo(-3*dpi, -42*dpi, -4*dpi, -48*dpi, -7*dpi, -53*dpi);
      ctx.bezierCurveTo(-3*dpi, -54*dpi, -11*dpi, -54*dpi, -14*dpi, -53*dpi);
      ctx.bezierCurveTo(-17*dpi, -54*dpi, -18*dpi, -57*dpi, -16*dpi, -61*dpi);
      ctx.bezierCurveTo(-12*dpi, -66*dpi, -8*dpi, -71*dpi, -5*dpi, -77*dpi);
      ctx.bezierCurveTo(-3*dpi, -88*dpi, -2*dpi, -103*dpi, -2*dpi, -119*dpi);
      ctx.arc(0*dpi,-119*dpi,2*dpi,-Math.PI,0,false)
      // Mirror
      ctx.bezierCurveTo(2*dpi, -103*dpi, 3*dpi, -88*dpi, 5*dpi, -77*dpi);
      ctx.bezierCurveTo(8*dpi, -71*dpi, 12*dpi, -66*dpi, 16*dpi, -61*dpi);
      ctx.bezierCurveTo(18*dpi, -57*dpi, 17*dpi, -54*dpi, 14*dpi, -53*dpi);
      ctx.bezierCurveTo(11*dpi, -54*dpi, 3*dpi, -54*dpi, 7*dpi, -53*dpi);
      ctx.bezierCurveTo(4*dpi, -48*dpi, 3*dpi, -42*dpi, 3*dpi, -37*dpi);
      ctx.bezierCurveTo(3*dpi, -32*dpi, 5*dpi, -27*dpi, 7*dpi, -23*dpi);
      ctx.bezierCurveTo(5*dpi, -20*dpi, 3*dpi, -16*dpi, 2*dpi, -11*dpi);
      ctx.lineTo(2*dpi, -5.643*dpi);
      ctx.stroke();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.strokeStyle = 'red'
      ctx.fillStyle = 'red'
      ctx.arc(0*dpi,0*dpi,6*dpi,0 , Math.PI * 2, true)
      ctx.stroke();
      ctx.fill()
  }

  function drawTheSecondsHandUsingContext(ctx,dpi) {
    ctx.beginPath();
      var r1 = 1.5;
      var r2 = 0.75;
      ctx.moveTo(r1*dpi, 0);
      ctx.arc(0*dpi,0*dpi,r1*dpi,0,-0.1*Math.PI,true)
      ctx.lineTo(r2*dpi,-90*dpi);
      ctx.arc(0*dpi,-90*dpi,r1*dpi,0,-Math.PI,true)
      ctx.lineTo(-r1*dpi,0*dpi);
      ctx.stroke();
      ctx.fill()  
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0*dpi,0*dpi,r1*dpi,0,2*Math.PI,true)
      ctx.stroke();
      ctx.fill()  
  }