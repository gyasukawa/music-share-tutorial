// Instantiate Global Variables
var SoundArray = [];
var record = false;
var play = false;
var startTime = 0;

$(document).ready(function() {
  $("#record").click(function() {
    // Stop Recording
    if (record) {
      $(this).css("background", "none");
      record = false;
      play = false;
      updateBeats();
      saveToParse();
    }
    // Start Recording
    else {
      $(this).css("background", "red");
      record = true;
      play = true;
      startTime = Date.now();
      playBack();
    }
  });

  $("#play").click(function() {
    if (play) {
      return;
    }
    play = true;
    playBack();
  });

  $("#stop").click(function() {
    if (play || record) {
      // Stop Recording
      if (record) {
        $("#record").css("background", "none");
        record = false;
        updateBeats();
      }
      play = false;
    }
  });
});

function playBack() {
  if (!record) {
    startTime = Date.now();
  }
  function playItBack(idx) {
    setTimeout(function() {
      var item = SoundArray[idx];
      if (!play || idx >= SoundArray.length) {
        play = false;
        return;
      }
      while (Date.now() - startTime < item.time) {
        playItBack(idx);
        return;
      }
      playSound(item.button);
      playItBack(idx + 1);
    }, 5);
  }
  playItBack(0);
}

function soundClick(button) {
  if (record) {
    var elapsed = Date.now() - startTime;
    publishBeat(elapsed, button);
    updateBeats();
  }
  playSound(button);
}

function playSound(button) {
  new Audio(button + '.mp3').play();
}

function compare(a,b) {
  if (a.time < b.time)
    return -1;
  if (a.time < b.time)
    return 1;
  return 0;
}

function updateBeats() {
  SoundArray.sort(compare);
  var html = "<tr><th>Time</th><th>Button</th></tr>";
  for (var i = 0; i < SoundArray.length; i++) {
    html += "<tr><td>" + SoundArray[i].time + ":</td><td>" + SoundArray[i].button + "</td></tr>"
  }
  $("#beats").html(html);
}