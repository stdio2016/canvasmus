function Pitch(step, octave, alter){
  this.step = step || 1; // from Do(1) to Si(7)
  if(octave === 0){
    this.octave = octave;
  }
  else {
    this.octave = octave || 4; // C4 is middle C
  }
  this.alter = alter || 0;
}
