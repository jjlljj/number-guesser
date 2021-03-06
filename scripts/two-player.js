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
rangeSubmit.addEventListener('click', setRange);
inputClear.addEventListener('click', function(){ clear() });
// call guessing function!!
inputSubmit.addEventListener('click', function(){ numberGuesser( userInput, randomNumber) });
// reload
gameReset.addEventListener('click', function(){ reset() });

function getRandomNumber(range, min) {
  randomNumber =  Math.floor(Math.random() * range) +  min;
}

function rangeFeedback(text){
   guessBetween.innerText = text;
    rangeMin.value = '';
    rangeMax.value = '';
}

function setRange() {
  minNumber = parseInt(rangeMin.value);
  maxMath = parseInt(rangeMax.value - rangeMin.value);
  maxNumber = parseInt(rangeMax.value);
  clickCount += 1;

  if (isNaN(minNumber) || isNaN(maxMath)) {
    if(clickCount%2 === 1){
      rangeFeedback('Two Numbers please!!');
    } else {
      rangeFeedback('Please enter two numbers!!');
    }
  } else if (minNumber >= maxMath) {
    if (clickCount%2 === 1) {
      rangeFeedback('Very funny... Two numbers please!!');
    } else {
      rangeFeedback('Good joke... Two numbers please!!');
    }
  } else if(maxMath - minNumber <= 5) {
    if (clickCount%2 === 1) {
      rangeFeedback("That's too easy... Two numbers please!!")
    } else {
      rangeFeedback("That's no fun... Two numbers please!!")
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

function gameFeeback(upperText, guessText, lowerText) {
  lastGuessWas.innerText = upperText;
  userGuess.innerText = guessText;
  gameHint.innerText = lowerText;
}

// clear function
function clear() {
  inputClear.disabled = true;
  userInput.value = '';
  gameFeeback('Guess the number','??','Win the game');
  console.log('all clear');
}
//keep score
function scoreBoard() {
  playerOneScore.innerText = playerOneWins;
  playerTwoScore.innerText = playerTwoWins;
}

// hint & gameplay function
function numberGuesser(guess, number){
  var guessAsNumber = parseInt(guess.value);
  inputClear.disabled = false;
  console.log("max is " + maxNumber);

  if (isNaN(guessAsNumber)) {
    gameFeeback("That is not a number!",":(","Please enter a number")
    console.log('number check fail')
  } else {
  userGuess.innerText = userInput.value; 
  lastGuessWas.innerText = "Your last guess was";
    if(guessAsNumber > number) {
      gameHint.innerText = "That is too high";
    } else if (guessAsNumber < number) {
      gameHint.innerText = "That is too low";
    } else if (guessAsNumber === number) {
      gameFeeback('BOOM!! You Win!!!', userInput.value,'Play again??')
      gameReset.innerText = "Yes";
      win = true;
      if (win === true && gameCount%2 === 1) {
        playerOneWins += 1;
        scoreBoard();
      } else {
        playerTwoWins += 1;
        scoreBoard();
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
    playerHighlight('0px 0px 9px #EB008B', 'none')
    } else {
    playerHighlight('none', '0px 0px 9px #EB008B')
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
        gameFeeback("You didn't guess the number",":(","And you're out of time" )
        gameReset.focus();
       }
      clearInterval(id);
      }
  }, 1000);
}

function playerHighlight(p1,p2) {
  playerOneScore.style.textShadow = p1;
  playerTwoScore.style.textShadow = p2;
}

goTimer.addEventListener('click', function () {
  console.log('timer click')
  inputSubmit.disabled = false;
  userInput.disabled = false;
  goTimer.disabled = true; 
  gameFeeback('Ready to play??', '??', 'Guess away!!')
  goTimer.innerText = '00:30';
  var timeInSeconds = 29;
  startTimer(timeInSeconds, goTimer);
  userInput.focus();
  if (gameCount%2 ===1 ) {
    playerHighlight('0px 0px 9px #EB008B','none')
  } else {
    playerHighlight('none','0px 0px 9px #EB008B')
  }
});

