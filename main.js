// Instantiate Global Variables
var SoundArray = [];
var record = false;
var play = false;
var startTime = 0;

function soundClick(button) {
  new Audio(button + '.mp3').play();
}