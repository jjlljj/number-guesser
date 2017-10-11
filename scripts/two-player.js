// container selectors
var gameContainer = document.querySelector('#game-container')
var rangeContainer = document.querySelector('#range-container')

// input selector
var userInput = document.querySelector('#user-input');
// input button selector
var inputSubmit = document.querySelector('#input-submit');
// clear and reset buttons
var inputClear = document.querySelector('#clear-button');
var gameReset = document.querySelector('#reset-button');
//range value selectors
var rangeMin = document.querySelector('#range-min');
var rangeMax = document.querySelector('#range-max');
//range submit selector
var rangeSubmit = document.querySelector('#range-submit');
// timer selector
var goTimer = document.querySelector("#time");

// field selectors
var lastGuessWas = document.querySelector('#last-guess-was');
var gameHint = document.querySelector('#game-hint') ; 
var userGuess = document.querySelector('#user-guess');
var guessBetween = document.querySelector('#guess-between');
var playerOneScore = document.querySelector('.p1')
var playerTwoScore = document.querySelector('.p2')

// math
var minNumber = 0;
var maxMath = 0;
var maxNumber = maxMath + minNumber;
var randomNumber = 0;
var guessAsNumber = parseInt(userInput.value);
var clickCount = 0;   // for range submit so user feedback is varied
var inputMax = userInput.max;
var inputMin = userInput.min;
var win = false;
var winCount = 0;
var gameCount = 1;
var playerOneWins = 0;
var playerTwoWins = 0;

inputMax = maxNumber;
inputMin = minNumber;

// default state on load
gameContainer.style.visibility = "hidden"; 
rangeContainer.style.visibility = "visible";
inputClear.disabled = true;
gameReset.disabled = true;
userInput.disabled = true;


// event listeners
rangeSubmit.addEventListener('click', function(){ setRange() });
inputClear.addEventListener('click', function(){ clear() });
// call guessing function!!
inputSubmit.addEventListener('click', function(){ numberGuesser( userInput, randomNumber) });
// reload
gameReset.addEventListener('click', function(){ reset() });

function getRandomNumber(range, min) {
  randomNumber =  Math.floor(Math.random() * range) +  min;
}

function setRange() {
  minNumber = parseInt(rangeMin.value);
  maxMath = parseInt(rangeMax.value - rangeMin.value);
  maxNumber = parseInt(rangeMax.value);
  clickCount += 1;

  if (isNaN(minNumber) || isNaN(maxMath)) {
    if(clickCount%2 === 1){
      guessBetween.innerText = 'Two Numbers please!!';
      rangeMin.value = '';
      rangeMax.value = '';
    } else {
      guessBetween.innerText = 'Please enter two numbers!!';
      rangeMin.value = '';
      rangeMax.value = '';
    }
  } else if (minNumber >= maxMath) {
    if (clickCount%2 === 1) {
      guessBetween.innerText = 'Very funny... Two numbers please!!'
      rangeMin.value = '';
      rangeMax.value = '';
    } else {
      guessBetween.innerText = 'Good joke... Two numbers please!!'
      rangeMin.value = '';
      rangeMax.value = '';
    }
  } else if(maxMath - minNumber <= 5) {
    if (clickCount%2 === 1) {
      guessBetween.innerText = "That's too easy... Two numbers please!!"
      rangeMin.value = '';
      rangeMax.value = '';
    } else {
      guessBetween.innerText = "That's no fun... Two numbers please!!"
      rangeMin.value = '';
      rangeMax.value = '';
    }
  } else { 
    getRandomNumber(maxMath, minNumber);
    console.log(randomNumber);
    //brings up game panel
    inputSubmit.disabled = true;
    rangeContainer.style.visibility = "hidden";
    gameContainer.style.visibility = "visible";
    clickCount = 0;
    console.log('focus')
    goTimer.focus();
  }
};


// clear function
function clear() {
  inputClear.disabled = true;
  userInput.value = '';
  userGuess.innerText = "??"
  lastGuessWas.innerText = "Guess the number";
  gameHint.innerText = "Win the game";
  console.log('all clear');
}

// hint & gameplay function
function numberGuesser(guess, number){
  var guessAsNumber = parseInt(guess.value);
  inputClear.disabled = false;
  console.log("max is " + maxNumber);

  if (isNaN(guessAsNumber)) {
    userGuess.innerText = ":(";
    lastGuessWas.innerText = "That is not a number!";
    gameHint.innerText = "Please enter a number";
    console.log('number check fail')

  } else if (guessAsNumber > maxNumber) {
    console.log('max number');
    lastGuessWas.innerText = "Too big!!"
    userGuess.innerText = "??"
    gameHint.innerText = "The maximum number is " + maxNumber;
  } else if (guessAsNumber < minNumber) {
    console.log('min number');
    lastGuessWas.innerText = "Too low!!";
    userGuess.innerText = "??";
    gameHint.innerText = "The minimum number is " + minNumber;
  }  else {
  userGuess.innerText = userInput.value; 
  lastGuessWas.innerText = "Your last guess was";

    if(guessAsNumber > number) {
      gameHint.innerText = "That is too high";
    } else if (guessAsNumber < number) {
      gameHint.innerText = "That is too low";
    } else if (guessAsNumber === number) {
      lastGuessWas.innerText = "BOOM!! You Win!!!";
      gameHint.innerText = "Play again??";
      gameReset.innerText = "Yes";
      win = true;
      if (win === true && gameCount%2 === 1) {
        playerOneWins += 1;
        playerOneScore.innerText = playerOneWins;
        playerTwoScore.innerText = playerTwoWins;
      } else {
        playerTwoWins += 1;
        playerOneScore.innerText = playerOneWins;
        playerTwoScore.innerText = playerTwoWins;
      }
      inputSubmit.disabled = true;
      inputClear.disabled = true;
      gameReset.disabled = false;

    }
  }
  userInput.value = '';
  if (win === true ) {
    gameReset.focus();
  } else {userInput.focus();
  }
};





// resets random number & 
function reset() {
    console.log(win + " " + winCount);

    if (winCount > 5 && win === true ) {  
      maxMath += 100;
      minNumber -= 50;
    } else if (win === true && gameCount%2 === 0) {
      maxMath += 20;
      minNumber -= 10;
    };
    if (winCount === 0 ) {            
      lastGuessWas.innerText = "Ready to play??";
    } else {
      lastGuessWas.innerText = "You got the number! ";
    }


   getRandomNumber(maxMath, minNumber);

    inputMax = maxNumber;
    inputMin = minNumber;

    maxNumber = maxMath + minNumber;
    userGuess.innerText = "??"
    gameHint.innerText = "Lets Play!!";
    gameReset.innerText = "Reset";
    userInput.value = '';
    gameCount += 1;
    win = false;
    // button states
    inputSubmit.disabled = true;
    inputClear.disabled = true;
    gameReset.disabled = true;
    goTimer.disabled = false; 

    if (gameCount%2 ===1 ) {
      playerOneScore.style.textShadow = '0px 0px 9px #EB008B';
      playerTwoScore.style.textShadow = 'none';
    } else {
      playerOneScore.style.textShadow = 'none';
      playerTwoScore.style.textShadow = '0px 0px 9px #EB008B';
    }

    goTimer.focus();

    console.log('reset');
    console.log(randomNumber);
    console.log('max number ' + maxNumber)
    console.log('min number ' + minNumber)
}

// limit key input to min & max
function inputLimit(keyValue) {
  if  (parseInt(keyValue) > maxNumber) {
    return maxNumber;
    alert('maxmax')
  } else if (parseInt(keyValue) < minNumber) {
    return minNumber;
    alert('minmin')
  } else {
    return keyValue;
  }
}

// limit key inputs excluding '-' & numbers on game input
userInput.addEventListener('keyup', function(){
  keyStroke = this.value;
  if (keyStroke === "-") {
    return keyStroke
  } else if(isNaN(keyStroke)) {
    this.value = ""
  } else {
    keyStroke = inputLimit(keyStroke);
    this.value = keyStroke;
  }
});

// limit key inputs on range to numbers only
rangeMin.addEventListener('keyup', function(){
  keyStroke = this.value;
  if (keyStroke === "-") {
    return keyStroke
  } else if(isNaN(keyStroke)) {
    this.value = ""}
});

rangeMax.addEventListener('keyup', function(){
  keyStroke = this.value;
  if (keyStroke === "-") {
    return keyStroke
  } else if(isNaN(keyStroke)) {
    this.value = ""}
});





function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var id = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerText = minutes + ":" + seconds;

        if (--timer < 0 || win === true) {
            timer = 0;
        display.innerText = 'GO';
        inputSubmit.disabled = true; 
        gameReset.disabled = false; 
        userInput.disabled = true; 
        if (win !== true ) {
        lastGuessWas.innerText = "You didn't guess the number";
        gameHint.innerText = "And you're out of time";
        gameReset.focus();
        }
        clearInterval(id);
        }
    }, 1000);

}

goTimer.addEventListener('click', function () {
    console.log('click')
    inputSubmit.disabled = false;
    userInput.disabled = false;
    lastGuessWas.innerText = "Ready to play??";
    gameHint.innerText = "Guess away!!";
    goTimer.innerText = '00:30';
    var timeInSeconds = 29;
    startTimer(timeInSeconds, goTimer);
    goTimer.disabled = true; 
    userInput.focus();
    if (gameCount%2 ===1 ) {
      playerOneScore.style.textShadow = '0px 0px 9px #EB008B';
      playerTwoScore.style.textShadow = 'none';
    } else {
      playerOneScore.style.textShadow = 'none';
      playerTwoScore.style.textShadow = '0px 0px 9px #EB008B';
    }
  }
);


