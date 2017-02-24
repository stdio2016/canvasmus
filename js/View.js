var changed=false;
var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');
function resize(){
    canvas.height=canvas.clientHeight;
    canvas.width=canvas.clientWidth;
    draw();
}
canvas.addEventListener('resize', resize);

// TODO
var testScore = Test.makeScore();

function draw(){
  changed = false;
  moveViewpoint();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.scale(viewpoint.scale, viewpoint.scale);
  ctx.translate(-viewpoint.x, -viewpoint.y);
  testScore.drawOn(ctx);
  ctx.restore();
}

function moveViewpoint(){
  if(viewpoint.moving){
    var vx=viewpoint.vx,vy=viewpoint.vy;
    if(vx*vx+vy*vy<=0.5){
      viewpoint.moving=false;
    }
    else{
      viewpoint.x+=vx;
      viewpoint.y+=vy;
      var magn=Math.sqrt(vx*vx+vy*vy);
      viewpoint.vx-=vx/magn*0.4;
      viewpoint.vy-=vy/magn*0.4;
      makeChange();
    }
  }
  if(viewpoint.x>2700-canvas.width) viewpoint.x=2700-canvas.width;
  if(viewpoint.x<0) viewpoint.x=0;
  if(viewpoint.y>canvas.height-50) viewpoint.y=canvas.height-50;
  if(viewpoint.y<0) viewpoint.y=0;
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
  var deltaZoom = newZoom / oldZoom - 1;
  viewpoint.scale = newZoom;
  this.scroll(deltaZoom * centerX, deltaZoom * centerY);
};

view.getZoom = function(){
  return viewpoint.scale;
};

view.stopScroll = function(){
  viewpoint.moving = false;
};

view.continueScroll = function(vx, vy){
  viewpoint.moving = true;
  viewpoint.vx = vx;
  viewpoint.vy = vy;
  makeChange();
};
