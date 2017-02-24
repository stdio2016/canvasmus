function Score() {
  this.parts = [];
  this.measurePos = [];
}

Score.fromJSON = function (json) {
  var score = new Score();
  var parts = json.parts;
  for (var i = 0; i < parts.length; i++) {

  }
};

Score.prototype.addPart = function (part) {
  this.parts.push(part);
};

Score.prototype.drawOn = function (ctx) {
  ctx.font = '20px DroidSans';
  var testStr = 'It works! 你好ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk_mnopqrstuvwxyz0123456789';
   textBox = ctx.measureText(testStr);
  ctx.strokeRect(100, 100, textBox.width, 20);
  ctx.fillText(testStr, 100, 100 + 20 * 0.8);
};
