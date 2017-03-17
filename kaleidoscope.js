var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var h = canvas.height;
var w = canvas.width;

// Center x, center y
var cx = w/2;
var cy = h/2;

var spokes = 16;  // Should be an even number

var wedgeAngle = (2*Math.PI) / spokes ;

// Draw spokes

var angle = 0;

var length = Math.sqrt( cx * cx + cy * cy  )     // hacky find the max length will need to draw and draw all spokes that length
                  // Pythagoras IRL!!   a squared plus b squared = c squared

console.log(length)

for (var s = 0 ; s < spokes ; s++) {


  // Line at an angle of angle, starting at the center

  var x = length * Math.sin(angle);
  var y = length * Math.cos(angle);

  console.log(angle + ' ' + x + ' ' +  y + ' ' + s)

  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + x, cy + y);
  ctx.stroke();

  angle += wedgeAngle;

}
