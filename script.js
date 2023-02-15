'use strict';
//Score
let counter = 20; //Beginning score
//Highscore
let highCounter = 0; //Beginning highscore

/******************************************************Selectors********************************************************/

let inputField = document.querySelector('.guess');

let message = document.querySelector('.message');

let checkBtn = document.querySelector('.check');

let againBtn = document.querySelector('.again');

let numBanner = document.querySelector('.number');

let score = document.querySelector('.score');

let highScore = document.querySelector('.highscore');

/******************************************************Functions********************************************************/

//Function to generate random number
let randomNum = () => Math.trunc(Math.random() * 20 + 1);

//Generated secret number
let secretNumber = randomNum();
console.log(secretNumber);

//Function to insert text to .message

let insertMessage = text => {
  message.textContent = text;
};

//Function to change .message according to situation
const decideWinner = () => {
  let inputValue = Number(inputField.value);

  //When input is blank
  if (!inputValue) {
    insertMessage(`🚫 No number`);

    //When number is not in the limit
  } else if (inputValue > 20 || inputValue < 1) {
    insertMessage(`🚫 Enter a number between 1-20`);

    //When guess is right
  } else if (inputValue === secretNumber) {
    insertMessage(`🎉 Correct number!`);
    numBanner.textContent = secretNumber;
    document.body.classList.add('bg-change');
    numBanner.style.width = '30rem';
    

    if (counter > highCounter) {
      highCounter = counter;
      highScore.textContent = highCounter;
    }

    //When guess is wrong
  } else if (inputValue !== secretNumber) {
    if (counter > 1) {
      inputValue > secretNumber
        ? insertMessage(`📈 Too high!`)
        : insertMessage(`📉 Too low!`);
      counter--;
      score.textContent = counter;
    } else {
      insertMessage(`💣 You lost the game`);
      score.textContent = 0;
    }
  }
};


//Function to reset all required fields

const reset = () => {
    score.textContent = 20;
    counter = 20;
    document.body.classList.remove('bg-change');
    secretNumber = randomNum();
    console.log(secretNumber);
    insertMessage(`Start guessing...`);
    numBanner.textContent = '?';
    inputField.value = '';
    numBanner.style.width = '15rem';
}

/*************************************************Event Listeners***************************************************/

//Event listener to define .check usability
checkBtn.addEventListener('click', function () {
  decideWinner();
});


//Event listener to access check button through enter key
document.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        decideWinner();
    }
})

//Event listener to define .again usability
againBtn.addEventListener('click', function () {
    reset();
});

//Event listener to access again button through space key
document.addEventListener("keydown", function(event){
    if(event.key === " "){
        reset();
    }
})