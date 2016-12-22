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

scrollMode.down2 = function(touch1, touch2){
  view.stopScroll();
};

scrollMode.drag2 = function(touch1, touch2){
  view.scroll(-(touch1.dx + touch2.dx) / 2, -(touch1.dy + touch2.dy) / 2);
};

scrollMode.up2 = function(touch1, touch2){
  view.continueScroll(-(touch1.vx + touch2.vx) / 2, -(touch1.vy + touch2.vy) / 2);
};

scrollMode.cancel2 = function(touch1, touch2){
  view.stopScroll();
};
