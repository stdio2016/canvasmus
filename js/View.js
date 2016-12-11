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
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(line[0], line[1], 10, 0, 2 * Math.PI);
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(line[0], line[1]);
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

viewer = {};
viewer.down = function(touch){
  cancelled = false;
  velo = [0, 0];
  line = [touch.x, touch.y];
  draw();
  console.log('down');
};

viewer.move = function(touch){
  draw();
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(touch.x, touch.y, 10, 0, 2 * Math.PI);
  ctx.fill();
};

viewer.drag = function(touch){
  line.push(touch.x);
  line.push(touch.y);
  draw();
};

viewer.up = function(touch){
  velo = [touch.vx, touch.vy];
  console.log('up');
  draw();
};

viewer.cancel = function(touch){
  velo = [touch.vx, touch.vy];
  cancelled = true;
  draw();
  console.log('cancelled');
};

viewer.scroll = function(sx, sy){
  velo = [sx, sy];
  draw();
  console.log('scroll');
};

viewer.exit = function(touch){
  cancelled = true;
  draw();
  console.log('exit');
};

viewer.down2 = function(touch1, touch2){
  velo = [0, 0];
  line = [touch1.x, touch1.y];
  line2 = [touch2.x, touch2.y];
  draw();
};

viewer.drag2 = function(touch1, touch2){
  line.push(touch1.x);
  line.push(touch1.y);
  line2.push(touch2.x);
  line2.push(touch2.y);
  draw();
};

viewer.up2 = function(touch1, touch2){
  velo = [touch1.vx + touch2.vx, touch1.vy + touch2.vy];
  console.log('up');
  draw();
};

viewer.cancel2 = function(touch){
  velo = [touch1.vx + touch2.vx, touch1.vy + touch2.vy];
  cancelled = true;
  draw();
  console.log('cancelled');
};
