var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;
var i = 0;
mouseClickPrevent = false;
//start the game on keypress
$(document).keydown(function () {
  if (!started) {
    started = true;
    nextSequence();
  }
});
$(".btn").on("click", function handlerFunction(event) {
  if (started == true && mouseClickPrevent == false) {
    var userChosenColour = this.id;
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(i);
  }
});
function nextSequence() {
  mouseClickPrevent = false;
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
//button on press play sound
function playSound(name) {
  var sound = new Audio(`sounds/${name}.mp3`);
  sound.play();
}
//button Pressing animation
function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}
// compare the gamePattern array element against each of the current level userClickedPattern elements
function checkAnswer(currentLevel) {
  if (currentLevel < level) {
    if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
      $("body").addClass("game-over");
      playSound("wrong");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 1500);
      $("#level-title").text(
        "Oops Wrong Pattern!!"
      );
      level = 0;
      gamePattern = [];
      userClickedPattern = [];
      i = 0;
    } else {
      i++;
    }
  }
  if (userClickedPattern.length == gamePattern.length ) {
    mouseClickPrevent = true;
    userClickedPattern = [];
    setTimeout(nextSequence, 2000);
    i = 0;
  }
}
