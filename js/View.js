var changed=false;
var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');
function resize(){
    canvas.height=canvas.clientHeight;
    canvas.width=canvas.clientWidth;
    draw();
}
canvas.addEventListener('resize', resize);
var cancelled = false;
var line = [];
var line2 = [];
var velo = [0, 0];
resize();

function draw(){
  ctx.fillStyle='white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if(line.length >= 2){
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(line[0], line[1], 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(line[0], line[1]);
    for(var i=2; i<line.length; i+=2){
      ctx.lineTo(line[i], line[i+1]);
    }
    ctx.stroke();
  }
  if(line2.length >= 2){
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(line2[0], line2[1], 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(line2[0], line2[1]);
    for(var i=2; i<line2.length; i+=2){
      ctx.lineTo(line2[i], line2[i+1]);
    }
    ctx.stroke();
  }
  if(cancelled){
    ctx.fillStyle = 'gray';
    ctx.beginPath();
    ctx.arc(line[line.length-2], line[line.length-1], 10, 0, 2 * Math.PI);
    ctx.fill();
  }
  if(velo[0] || velo[1]){
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(line[line.length-2], line[line.length-1]);
    ctx.lineTo(line[line.length-2] + velo[0],
      line[line.length-1] + velo[1]);
    ctx.stroke();
  }
  changed = false;
}

function makeChange(){
  if(!changed){
    requestAnimationFrame(draw);
    changed = true;
  }
}

view = {};

view.viewpoint = {
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
    this.viewpoint.x += dx;
    this.viewpoint.y += dy;
  }
  else {
    this.viewpoint.x += dx / this.viewpoint.scale;
    this.viewpoint.y += dy / this.viewpoint.scale;
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
  var oldZoom = this.viewpoint.scale;
  var deltaZoom = 1 - oldZoom / newZoom;
  this.scroll(deltaZoom * centerX, deltaZoom * centerY, true);
  this.viewpoint.scale = newZoom;
};

view.stopScroll = function(){
  this.viewpoint.moving = false;
};

view.continueScroll = function(vx, vy){
  this.viewpoint.moving = true;
  this.viewpoint.vx = vx;
  this.viewpoint.vy = vy;
};
