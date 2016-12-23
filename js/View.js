var changed=false;
var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');
function resize(){
    canvas.height=canvas.clientHeight;
    canvas.width=canvas.clientWidth;
    draw();
}
canvas.addEventListener('resize', resize);

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.scale(viewpoint.scale, viewpoint.scale);
  ctx.translate(-viewpoint.x, -viewpoint.y);
  drawTest();
  ctx.restore();
}

function drawTest(){
  ctx.strokeRect(0, 0, 50, 30);
  ctx.font = '20px DroidSans';
  ctx.fillText("Test", 0, 20);
}

function makeChange(){
  if(!changed){
    requestAnimationFrame(draw);
    changed = true;
  }
}

view = {};

viewpoint = {
  x: 0.0,
  measure: 0,
  y: 0.0,
  part: 0,
  scale: 1.0,
  vx: 0.0,
  vy: 0.0,
  moving: false
};

view.scroll = function(dx, dy, unscaled){
  if (unscaled) {
    viewpoint.x += dx;
    viewpoint.y += dy;
  }
  else {
    viewpoint.x += dx / viewpoint.scale;
    viewpoint.y += dy / viewpoint.scale;
  }
  // TODO: update measure number
  // TODO: update part number
  draw();
};

view.zoom = function(newZoom, centerX, centerY){
  if (newZoom > 3) {
    newZoom = 3;
  }
  if (newZoom < 0.1) {
    newZoom = 0.1;
  }
  var oldZoom = viewpoint.scale;
  var deltaZoom = 1 - oldZoom / newZoom;
  this.scroll(deltaZoom * centerX, deltaZoom * centerY, true);
  viewpoint.scale = newZoom;
};

view.stopScroll = function(){
  viewpoint.moving = false;
};

view.continueScroll = function(vx, vy){
  viewpoint.moving = true;
  viewpoint.vx = vx;
  viewpoint.vy = vy;
};
