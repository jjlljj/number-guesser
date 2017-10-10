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
// field selectors
var lastGuessWas = document.querySelector('#last-guess-was');
var gameHint = document.querySelector('#game-hint') ; 
var userGuess = document.querySelector('#user-guess');
var guessBetween = document.querySelector('#guess-between');

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

inputMax = maxNumber;
inputMin = minNumber;

// default state on load
gameContainer.style.visibility = "hidden"; 
rangeContainer.style.visibility = "visible";
inputClear.disabled = true;
gameReset.disabled = true;

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
    inputSubmit.disabled = false;
    rangeContainer.style.visibility = "hidden";
    gameContainer.style.visibility = "visible";
    clickCount = 0;
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
      if (winCount > 0) {
      lastGuessWas.innerText = "BOOM!! You Win Again!!!";
      } else {
      lastGuessWas.innerText = "BOOM!! You Win!!!";
      }
      gameHint.innerText = "Play again??";
      gameReset.innerText = "Yes";
      win = true;
      winCount += 1;
      inputSubmit.disabled = true;
      inputClear.disabled = true;
      gameReset.disabled = false;
    }
  }
  userInput.value = '';
};



// resets random number & 
function reset() {
    console.log(win + " " + winCount);
    
    if (winCount > 5 && win === true ) {  
      maxMath += 100;
      minNumber -= 50;
    } else if (win === true) {
      maxMath += 20;
      minNumber -= 10;
    };
    if (winCount === 0 ) {            
      lastGuessWas.innerText = "Ready to play??";
    } else if (winCount === 1) {
       lastGuessWas.innerText = "You have 1 win";
    } else {
      lastGuessWas.innerText = "You have won " + winCount + " times";
    }

   getRandomNumber(maxMath, minNumber);

    inputMax = maxNumber;
    inputMin = minNumber;

    maxNumber = maxMath + minNumber;
    userGuess.innerText = "??"
    gameHint.innerText = "Guess away!!";
    gameReset.innerText = "Reset";
    userInput.value = '';
    win = false;
    // button states
    inputSubmit.disabled = false;
    inputClear.disabled = true;
    gameReset.disabled = true;

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

// limit key inputs excluding '-' & numbers
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

var goTimer = document.querySelector("#time");

var timeOut 

function printNumbers() {
  for (var i = 0; i < 10; i++){
  timeoutID = window.setTimeout(countDown(i), 800);
  }
  goTimer.innerText = "out of time";
}

function countDown(num) {
  console.log(num)
  goTimer.innerText = num;
}

function clearAlert() {
  window.clearTimeout(timeoutID);
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerText = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
        display.innerText = 'Time is up!!';
        inputSubmit.disabled = true;    
        }
    }, 1000);

    
}

goTimer.addEventListener('click', function () {
    console.log('click')
    goTimer.innerText = 10;
    var oneMinute = 10;
    startTimer(oneMinute, goTimer);
  }
);




