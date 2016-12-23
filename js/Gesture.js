function MyTouch(){
  this.x = 0;
  this.y = 0;
  this.vx = 0; // x velocity
  this.vy = 0; // y velocity
  this.dx = 0; // delta x
  this.dy = 0; // delta y
  this.id = 'none'; // identifier
}

var TouchState = {
  none: 0,
  mouseDown: 1,
  mouseLeave: 2,
  touch1: 3,
  touch2: 4,
  touch3More: 5
};
var touchState = TouchState.none;
var twoTouchDistance = 0.0;

MyTouch.prototype.down = function(x, y, id){
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.dx = 0;
  this.dy = 0;
  this.id = id;
};

MyTouch.prototype.move = function(x, y){
  this.dx = x - this.x;
  this.dy = y - this.y;
  this.vx = this.vx * 0.8 + this.dx * 0.2;
  this.vy = this.vy * 0.8 + this.dy * 0.2;
  this.x = x;
  this.y = y;
};

MyTouch.prototype.distanceTo = function(touch){
  var dx = this.x - touch.x;
  var dy = this.y - touch.y;
  return Math.sqrt(dx * dx + dy * dy);
};

var touch1 = new MyTouch();
var touch2 = new MyTouch();

function mouseDown(e){
  e.preventDefault();
  if(e.button == 0){
    if(touchState < TouchState.touch1){
      touchState = TouchState.mouseDown;
      touch1.down(e.clientX, e.clientY, 'mouse');
      control.down(touch1);
    }
  }
}

function mouseMove(e){
  e.preventDefault();
  touch1.move(e.clientX, e.clientY);
  if(e.buttons & 1){
    if(touchState == TouchState.mouseDown){
      touchState = TouchState.mouseDown;
      control.drag(touch1);
    }
  }
  else{
    control.move(touch1);
  }
}

function mouseUp(e){
  e.preventDefault();
  if(e.button==0){
    if(touchState == TouchState.mouseDown){
      control.up(touch1);
    }
    touchState = TouchState.none;
  }
}

function mouseLeave(e){
  if(touchState == TouchState.none){
    control.exit(touch1);
  }
  else{
    control.cancel();
  }
  touchState = TouchState.mouseLeave;
}

function mouseEnter(e){
  touchState = TouchState.none;
}

function onWheel(e){
  if(touchState <= TouchState.touch2){
    if(e.ctrlKey){
      // Does nothing
    }
    else{
      control.scroll(e.deltaX, e.deltaY);
    }
  }
}

function touchStart(e){
  e.preventDefault();
  var changed = e.changedTouches;
  for(var i = 0; i < changed.length; i++){
    var t = changed[i];
    switch (touchState) {
      case TouchState.none:
        touchState = TouchState.touch1;
        touch1.down(t.clientX, t.clientY, t.identifier);
        control.down(touch1);
        break;
      case TouchState.touch1:
        touchState = TouchState.touch2;
        touch2.down(t.clientX, t.clientY, t.identifier);
        control.down2(touch1, touch2);
        break;
      case TouchState.touch2:
        touchState = TouchState.touch3More;
        control.cancel();
        break;
      default:
        break;
    }
  }
}

function touchMove(e){
  e.preventDefault();
  if(touchState == TouchState.touch1 && e.touches.length == 1){
    var t1 = e.touches[0];
    touch1.move(t1.clientX, t1.clientY);
    control.drag(touch1);
  }
  else if(touchState == TouchState.touch2 && e.touches.length == 2){
    var t1 = e.touches[0];
    var t2 = e.touches[1];
    if(t1.identifier == touch1.id){
      touch1.move(t1.clientX, t1.clientY);
      touch2.move(t2.clientX, t2.clientY);
    }
    else{
      touch2.move(t1.clientX, t1.clientY);
      touch1.move(t2.clientX, t2.clientY);
    }
    control.drag2(touch1, touch2);
  }
}

function touchEnd(e){
  e.preventDefault();
  var changed = e.changedTouches;
  switch (touchState) {
    case TouchState.touch1:
      control.up(touch1);
      touchState = TouchState.none;
      break;
    case TouchState.touch2:
      control.cancel();
      if(e.touches.length == 0){
        touchState = TouchState.none;
      }
      else{
        touchState = TouchState.touch3More;
      }
      break;
    case TouchState.touch3More:
      if(e.touches.length == 0){
        touchState = TouchState.none;
      }
      break;
    default:
      break;
  }
}

function touchCancel(e){

}

canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('mouseup', mouseUp);
canvas.addEventListener('mouseleave', mouseLeave);
canvas.addEventListener('mouseenter', mouseEnter);
canvas.addEventListener('wheel', onWheel);

canvas.addEventListener('touchstart', touchStart, false);
canvas.addEventListener('touchmove', touchMove, false);
canvas.addEventListener('touchend', touchEnd, false);
canvas.addEventListener('touchcancel', touchCancel, false);
