if (!window.Test) {
  Test = {};
}

Test.exampleScore = {
"parts":[
  {
    "staffs":[
      {
        "measures":[
        [
          {"pitch":[{"step":5,"octave":4}]},
          {"pitch":[{"step":3,"octave":4}]},
          {"pitch":[{"step":3,"octave":4}],"type":2}
        ],[
          {"pitch":[{"step":4,"octave":4}]},
          {"pitch":[{"step":2,"octave":4}]},
          {"pitch":[{"step":2,"octave":4}],"type":2}
        ],[
          {"pitch":[{"step":1,"octave":4}]},
          {"pitch":[{"step":2,"octave":4}]},
          {"pitch":[{"step":3,"octave":4}]},
          {"pitch":[{"step":4,"octave":4}]}
        ],[
          {"pitch":[{"step":5,"octave":4}]},
          {"pitch":[{"step":5,"octave":4}]},
          {"pitch":[{"step":5,"octave":4}],"type":2}
        ],[
          {"pitch":[{"step":5,"octave":4}]},
          {"pitch":[{"step":3,"octave":4}]},
          {"pitch":[{"step":3,"octave":4}],"type":2}
        ],[
          {"pitch":[{"step":4,"octave":4}]},
          {"pitch":[{"step":2,"octave":4}]},
          {"pitch":[{"step":2,"octave":4}],"type":2}
        ],[
          {"pitch":[{"step":1,"octave":4}]},
          {"pitch":[{"step":3,"octave":4}]},
          {"pitch":[{"step":5,"octave":4}]},
          {"pitch":[{"step":5,"octave":4}]}
        ],[
          {"pitch":[{"step":3,"octave":4}],"type":1}
        ],[
          {"pitch":[{"step":2,"octave":4}]},
          {"pitch":[{"step":2,"octave":4}]},
          {"pitch":[{"step":2,"octave":4}]},
          {"pitch":[{"step":2,"octave":4}]}
        ],[
          {"pitch":[{"step":2,"octave":4}]},
          {"pitch":[{"step":3,"octave":4}]},
          {"pitch":[{"step":4,"octave":4}],"type":2}
        ],[
          {"pitch":[{"step":3,"octave":4}]},
          {"pitch":[{"step":3,"octave":4}]},
          {"pitch":[{"step":3,"octave":4}]},
          {"pitch":[{"step":3,"octave":4}]}
        ],[
          {"pitch":[{"step":3,"octave":4}]},
          {"pitch":[{"step":4,"octave":4}]},
          {"pitch":[{"step":5,"octave":4}],"type":2}
        ],[
          {"pitch":[{"step":5,"octave":4}]},
          {"pitch":[{"step":3,"octave":4}]},
          {"pitch":[{"step":3,"octave":4}],"type":2}
        ],[
          {"pitch":[{"step":4,"octave":4}]},
          {"pitch":[{"step":2,"octave":4}]},
          {"pitch":[{"step":2,"octave":4}],"type":2}
        ],[
          {"pitch":[{"step":1,"octave":4}]},
          {"pitch":[{"step":3,"octave":4}]},
          {"pitch":[{"step":5,"octave":4}]},
          {"pitch":[{"step":5,"octave":4}]}
        ],[
          {"pitch":[{"step":1,"octave":4}],"type":1}
        ]]
      }]
  }]
};

Test.makeScore = function() {
  var score = Score.fromJSON(Test.exampleScore);
  return score;
};
