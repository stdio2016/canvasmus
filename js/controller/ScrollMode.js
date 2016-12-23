var scrollMode = {};

scrollMode.down = function(touch){
  view.stopScroll();
};

scrollMode.move = function(touch){
  ;
};

scrollMode.drag = function(touch){
  view.scroll(-touch.dx, -touch.dy);
};

scrollMode.up = function(touch){
  view.continueScroll(-touch.vx, -touch.vy);
};

scrollMode.cancel = function(touch){
  ;
};

scrollMode.scroll = function(sx, sy){
  view.stopScroll();
  view.scroll(sx * 20, sy * 20);
};

scrollMode.exit = function(touch){
  ;
};

scrollMode.fingerDistance = 0.0;
scrollMode.beginZoom = 1.0;

scrollMode.down2 = function(touch1, touch2){
  view.stopScroll();
  this.fingerDistance = touch1.distanceTo(touch2);
  this.beginZoom = view.getZoom();
};

scrollMode.drag2 = function(touch1, touch2){
  view.zoom(touch1.distanceTo(touch2) / this.fingerDistance * this.beginZoom,
    (touch1.x + touch2.x) / 2, (touch1.y + touch2.y) / 2);
  view.scroll(-(touch1.dx + touch2.dx) / 2, -(touch1.dy + touch2.dy) / 2);
};

scrollMode.up2 = function(touch1, touch2){
  view.continueScroll(-(touch1.vx + touch2.vx) / 2, -(touch1.vy + touch2.vy) / 2);
};
