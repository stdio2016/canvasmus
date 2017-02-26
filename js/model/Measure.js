function Measure() {
  this.staff = null;
  this.notes = [];
}

Measure.fromJSON = function (json) {
  var measure = new Measure();
  for (var i = 0; i < json.length; i++) {
    measure.notes.push(Note.fromJSON(json[i]));
  }
  return measure;
};
