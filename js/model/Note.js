function Note(pitch, type){
  this.pitch = pitch || []; // Array of pitch
  this.type = type || 4; // quarter note
}

Note.fromJSON = function (json) {
  var pitch = json.pitch;
  var type = json.type;
  var note = new Note(pitch, type);
  return note;
}
