var resetButton = document.getElementById('reset');
var spokeSlider = document.getElementById('userspokes');

newCanvas(16)

resetButton.onclick = function(){

  var spokes = spokeSlider.value;
  newCanvas(spokes);

}


var cx, cy, wedgeAngle, spokes, ctx;

function newCanvas(userSpokes) {

  console.log(userSpokes)

  pendown = false

  var canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  var h = canvas.height;
  var w = canvas.width;

  // Clear
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, w, h);

  // Center x, center y
  cx = w/2;
  cy = h/2;

  spokes = userSpokes;  // Should be an even number

  wedgeAngle = (2*Math.PI) / spokes ;

  // Draw spokes

  var angle = 0;

  var length = Math.sqrt( cx * cx + cy * cy  )     // hacky find the max length will need to draw and draw all spokes that length
                    // Pythagoras IRL!!   a squared plus b squared = c squared

  console.log(length)

  for (var s = 0 ; s < spokes ; s++) {

    // Line at an angle of angle, starting at the center

    var x = length * Math.sin(angle);
    var y = length * Math.cos(angle);

    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + x, cy + y);
    ctx.stroke();

    angle += wedgeAngle;

  }
}

// Add listener to canvas

canvas.onclick =function(){
  draw(event.offsetX, event.offsetY);
}

var pendown = false;

canvas.onmousedown = function() {
  pendown = true;
}

canvas.onmouseup = function() {
  pendown = false;
}

canvas.onmousemove = function() {
  if (pendown) {
    draw(event.offsetX, event.offsetY);
  }
}

function draw(x, y) {    // Canvas coordinates
  // Draw at location
  // mirror around the kaleidoscope

  // console.log('canvas' , x, y)

  var cartx = x-cx;
  var carty = -y + cy;   //  cartesian coords of first dot

  // console.log('cartesian' , cartx, carty);   //Cartesian coordinates  - 0,0 in center of canvas

  var angle_from_center = Math.atan(cartx / carty);

  var dist_from_center = Math.sqrt( cartx*cartx + carty*carty)

  // console.log('Angle from center ' + angle_from_center);
  // console.log('Distance  from center ' + dist_from_center);

  //var mirrored_angle_from_center = wedgeAngle - angle_from_center
  var mirrored_angle_from_center = (2*Math.PI) - angle_from_center
  // console.log('Mirrored Angle from center ' + mirrored_angle_from_center);

  var double_angle = wedgeAngle * 2

  for (var s = 0 ; s < spokes ; s+=2) {

      //Draw original

       // drawCircle(x, y);  // works, cuz uses canvas coords

       // In cartesian
       var dotx = dist_from_center * Math.sin(angle_from_center)
       var doty = dist_from_center * Math.cos(angle_from_center)

      //  console.log('dot incartesian', dotx, doty)
       // Convert to canvase

       var canvasx = dotx + cx;
       var canvasy = -doty + cy;

      //  console.log('dot in canvas' , canvasx, canvasy)

       drawCircle(canvasx, canvasy)


      // var mx = length * Math.sin(mirrored_angle_from_center) + cx;
      // var my = length * Math.cos(mirrored_angle_from_center) + cy;
      //
      // drawCircle(mx, my);

      var dotx = dist_from_center * Math.sin(mirrored_angle_from_center)
      var doty = dist_from_center * Math.cos(mirrored_angle_from_center)

      // console.log('dot incartesian', dotx, doty)
      // Convert to canvase

      var canvasx = dotx + cx;
      var canvasy = -doty + cy;

      // console.log('dot in canvas' , canvasx, canvasy)

      drawCircle(canvasx, canvasy)

      angle_from_center += double_angle;
      mirrored_angle_from_center += double_angle;

  }

}


function drawCircle(x, y) {

  //console.log('draw ' + x + ' ' + y);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 1, 0, Math.PI*2)
  ctx.stroke()


}

// enables right-click and save
var dataURL = canvas.toDataURL();


// TODO save image.
