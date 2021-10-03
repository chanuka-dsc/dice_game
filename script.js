'use strict';

//Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const currentScore0Element = document.getElementById('current--0');
const currentScore1Element = document.getElementById('current--1');

const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');

const switchPlayer = function () {
  currentScore = 0; // setting score to 0 incase of rolling a  1
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

let currentScore = 0;
let currentPlayer = 0;
const scores = [0, 0];
let gameStatus = true;

const startConditions = function () {};

//setting starting conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');

//rolling dice function

buttonRoll.addEventListener('click', function () {
  // 1. genarate a random dice roll
  if (gameStatus) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;
    // 3. check whether its 1, if its true swtich to next player
    if (dice !== 1) {
      // add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

buttonHold.addEventListener('click', function () {
  if (gameStatus) {
    scores[currentPlayer] += currentScore;
    if (scores[currentPlayer] < 50) {
      document.getElementById(`score--${currentPlayer}`).textContent =
        scores[currentPlayer];
      switchPlayer();
      diceElement.classList.add('hidden');
    } else {
      gameStatus = false;

      //scores[currentPlayer] += currentScore;
      document.getElementById(`score--${currentPlayer}`).textContent =
        scores[currentPlayer];

      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('palyer--active');
    }

    diceElement.classList.add('hidden');
  }
});

buttonNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--winner');

  currentScore = 0;
  currentPlayer = 0;
  scores[0] = 0;
  scores[1] = 0;
  gameStatus = true;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore0Element.textContent = 0;
  currentScore1Element.textContent = 0;
  diceElement.classList.add('hidden');

  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
});
