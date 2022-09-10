'use strict';

let scores;
let currentScore;
let activePlayer;

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.close-modal');

const closeModal = function () {
  modal.classList.add('hidden');
};
const showModal = function () {
  modal.classList.remove('hidden');
};

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  current0El.textContent = 0;
  current1El.textContent = 0;
};
init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
const winner = function (active) {
  document.querySelector(`.player--${active}`).classList.add('player--winner');
  document
    .querySelector(`.player--${active}`)
    .classList.remove('player--active');
  btnRoll.classList.add('hidden');
  btnHold.classList.add('hidden');
  const audioElement = new Audio('sound/congrats.mp3');
  audioElement.play();

  document.querySelector('.center').textContent = `Player ${
    active + 1
  } wins 😍🎉🔥`;
  showModal();
  document.addEventListener('keydown', function (evet) {
    if (evet.key === 'Escape') closeModal();
  });
  btnCloseModal.addEventListener('click', closeModal);
};

btnRoll.addEventListener('click', function () {
  let dice = Math.floor(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `imgs/dice-${dice}.png`;
  if (dice !== 1) {
    currentScore += dice;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});
btnHold.addEventListener('click', function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    winner(activePlayer);
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
