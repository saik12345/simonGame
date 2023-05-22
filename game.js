var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;
var i=0;
$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function handlerFunction(event) {
  // console.log(event);
 
  var userChosenColour = this.id;
  animatePress(userChosenColour);
  playSound(userChosenColour);
  // console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  //   console.log(userClickedPattern);
  checkAnswer(i);
});

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  // console.log(randomNumber);

  // console.log(buttonColours[randomNumber]);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // console.log(gamePattern);
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var sound = new Audio(`sounds/${name}.mp3`);
  sound.play();
}
function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}
function checkAnswer(currentLevel)
{
  console.log(currentLevel);
  console.log(userClickedPattern);
  console.log(gamePattern);
  if(userClickedPattern.length!=gamePattern.length)
  {
    console.log("hello");
    if(userClickedPattern[currentLevel]!=gamePattern[currentLevel])
    {
      $("body").addClass("game-over");
      playSound("wrong");
      setTimeout(function(){
              $("body").removeClass("game-over");
      },20000);
    }
    else{
      i++;
    }
  }
    else
    {
      userClickedPattern=[];
      i=0;
      setTimeout(nextSequence,1000);
    }
    
  }
  
  
