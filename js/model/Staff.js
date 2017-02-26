function Staff() {
  this.measures = [];
  this.part = null;
}

Staff.fromJSON = function (json) {
  var staff = new Staff();
  var measures = json.measures;
  for (var i = 0; i < measures.length; i++) {
    staff.addMeasure(Measure.fromJSON(measures[i]));
  }
  return staff;
};

Staff.prototype.addMeasure = function (measure) {
  if (measure.staff !== null) {
    throw new Error('Measure already belongs to another Staff');
  }
  this.measures.push(measure);
  measure.staff = this;
};

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
