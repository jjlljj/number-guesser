// container selectors
var gameContainer = document.querySelector('#game-container')
var rangeContainer = document.querySelector('#range-container')

// input value selector
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
// var maxMath = 100;
// var minNumber = 0;
var minNumber = 0;
var maxMath = 100;
var maxNumber = maxMath + minNumber;
var randomNumber = 0;
var guessAsNumber = parseInt(userInput.value);
var clickCount = 0;   // this is for the range submit so that the answers are varied


// range set button
rangeSubmit.addEventListener('click', function(){
  minNumber = parseInt(rangeMin.value);
  maxMath = parseInt(rangeMax.value);
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
  }
    else { 
    randomNumber =  Math.floor(Math.random() * maxMath) + 1 +  minNumber;
    console.log(randomNumber);
    //brings up game panel
    rangeContainer.style.visibility = "hidden";
    gameContainer.style.visibility = "visible";
    inputSubmit.disabled = false;
    clickCount = 0;
  }
});









// state on load
gameContainer.style.visibility = "hidden"; 
rangeContainer.style.visibility = "visible";
inputClear.disabled = true;
gameReset.disabled = true;
// inputSubmit.disabled = true;

var win = false;
var winCount = 0;

// clear button
inputClear.addEventListener('click', function(){
  inputClear.disabled = true;
  userInput.value = '';
  userGuess.innerText = "??"
  lastGuessWas.innerText = "Guess the number";
  gameHint.innerText = "Win the game";
  console.log('all clear');
 }
);

// // so i don't have to actually play the game...
// console.log(randomNumber);

// gives you the hints...
function numberGuesser(guess, number){
  var guessAsNumber = parseInt(guess.value);
  inputClear.disabled = false;


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
  }

  else {
  userGuess.innerText = userInput.value; 
  lastGuessWas.innerText = "Your last guess was";

    if(guessAsNumber > number) {
      gameHint.innerText = "That is too high";
    }
    else if (guessAsNumber < number) {
      gameHint.innerText = "That is too low";
    }
    else if (guessAsNumber === number) {
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

// call guessing function!!
inputSubmit.addEventListener('click', function(){ numberGuesser(userInput,randomNumber)});


// reload
gameReset.addEventListener('click', function(){
  console.log(win + " " + winCount);
  // make game more interesting by increasing range
  if (winCount > 5 && win === true ) {
    maxMath += 100;
    minNumber -= 50;
  } else if (win === true) {
    maxMath += 20;
    minNumber -= 10;
  };
  // win count keeper
  if (winCount === 0 ) {
    lastGuessWas.innerText = "Ready to play??";
  } else if (winCount === 1) {
     lastGuessWas.innerText = "You have 1 win";
  } else {
    lastGuessWas.innerText = "You have won " + winCount + " times";
  }
  // for new number
  randomNumber =  Math.floor(Math.random() * maxMath) + minNumber ;
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
);




