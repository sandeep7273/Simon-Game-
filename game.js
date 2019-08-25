
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).keypress(function(){
    if (!started){
    nextSequence();
    started= true;
}
});
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
      
    makeSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });

  function animatePress(currentColor){
      $("#"+currentColor).addClass("pressed");
      setTimeout(function(){
          $("#" + currentColor).removeClass("pressed")
      }, 100);
  }

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);
    level ++
    $('h1').text("level "+level);
}

function makeSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('success');

        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000);
        }
    }else{
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("h1").text("Game Over, Press Any Key to Restast")
        $('body').addClass("game-over");
        setTimeout(function(){
            $('body').removeClass("game-over")
        }, 200);
        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}