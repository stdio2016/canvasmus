function Staff() {
  this.measures = [];
  this.part = null;
}

Staff.prototype.drawOn = function (ctx) {
  const lineY = 150;
  ctx.strokeStyle='black';
  for (var i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(0, lineY - i * Units.sp * 2);
    // TODO change canvas.width to something better
    ctx.lineTo(canvas.width, lineY - i * Units.sp * 2);
    ctx.stroke();
  }
};
