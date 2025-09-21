const container = document.querySelector('.container');
const imgList = document.querySelectorAll('.imgs-list');
const imgOpp = document.querySelector('.tick');
const imgName = document.querySelectorAll('.img-name');
const score = document.querySelectorAll('.score');
const hiddenScore = document.querySelectorAll('.hidden-score');
const finalResult = document.querySelector('.final-result');
const fields = document.querySelector('.fields');
const playAgainBtn = document.querySelector('.play-again');

let playerScore = 0;
let opponentScore = 0;
let time_seconds = 3;

function reset() {
  imgList[0].innerHTML = `
  <li><img class="img-detail rock" src="images/img0.png" alt="Rock image"/></li>
  <li><img class="img-detail paper" src="images/img1.png" alt="Paper image" /></li>
  <li><img class="img-detail scissors" src="images/img2.png" alt="Scissors image" /></li>`;

  imgList[1].innerHTML = `
  <li><img class="img-detail tick" src="images/img3.png" alt="Tick image placeholder"/></li>`;

  imgName[0].textContent = '';
  imgName[1].textContent = '';
}

function comparePickedImages(pos) {
  if (pos === 0) {
    playerScore += 1;
    score[pos].textContent = playerScore;
    hiddenScore[pos].textContent = playerScore;
    return playerScore;
  } else {
    opponentScore += 1;
    score[pos].textContent = opponentScore;
    hiddenScore[pos].textContent = opponentScore;
    return opponentScore;
  }
}

// Image Picked It's Name
function imgName_and_Picture(pos, innerContent, name) {
  // SETTING A TIMER WHICH WILL RESET THE GAME AFTER COMPARING RESULTS
  if (pos === 0) {
    const resetTimer = setInterval(() => {
      time_seconds -= 1;
      if (time_seconds === 0) {
        reset();
        clearInterval(resetTimer);
        time_seconds = 3;
      }
    }, 1000);
  }

  imgList[pos].innerHTML = innerContent;
  imgName[pos].textContent = name;
  imgPickedName = name.toLowerCase();
  return imgPickedName;
}

// PLAY AGAIN BUTTON
playAgainBtn.addEventListener('click', function () {
  playerScore = 0;
  opponentScore = 0;

  score[0].textContent = 0;
  score[1].textContent = 0;
  hiddenScore[0].textContent = 0;
  hiddenScore[1].textContent = 0;

  reset();
  finalResult.classList.add('hidden');
  fields.classList.remove('hidden');
});

// CONTAINER CLICK EVENT
container.addEventListener('click', function (e) {
  if (!e.target.classList.contains('img-detail')) return;
  const clicked = e.target;
  const random = Math.floor(Math.random() * 3);
  if (clicked.closest('.field--2')) return;

  let opponentPick;
  let playerPick;
  let randomImgName;
  let playerImgName;
  let randomImgnumber = 0;
  let playerImgnumber = 0;

  // 1. RANDOM IMG PICKED WITH ITS NAME
  if (random === 0) {
    randomImgName = 'rock';
    randomImgnumber = 0;
  } else if (random === 1) {
    randomImgName = 'paper';
    randomImgnumber = 1;
  } else if (random === 2) {
    randomImgName = 'scissors';
    randomImgnumber = 2;
  }

  // 2. IMAGE PICKED BY PLAYER FROM PLAYER'S SIDE
  if (clicked.classList.contains('rock')) {
    playerImgName = 'rock';
    playerImgnumber = 0;
  } else if (clicked.classList.contains('paper')) {
    playerImgName = 'paper';
    playerImgnumber = 1;
  } else if (clicked.classList.contains('scissors')) {
    playerImgName = 'scissors';
    playerImgnumber = 2;
  }

  opponentPick = imgName_and_Picture(
    1,
    `<li> <img class="img-detail ${randomImgName}" src="images/img${randomImgnumber}.png" alt="${randomImgName} image" /></li>`,
    `${randomImgName.toUpperCase()}`
  );
  playerPick = imgName_and_Picture(
    0,
    `<li> <img class="img-detail ${playerImgName}" src="images/img${playerImgnumber}.png" alt="${playerImgName} image" /></li>`,
    `${playerImgName.toUpperCase()}`
  );

  // 3. COMPARING IMAGES PICKED WITH THEIR NAMES
  if (playerPick === opponentPick) {
  } else if (playerPick === 'rock' && opponentPick === 'paper')
    opponentScore = comparePickedImages(1);
  else if (playerPick === 'rock' && opponentPick === 'scissors')
    playerScore = comparePickedImages(0);
  else if (playerPick === 'paper' && opponentPick === 'rock')
    playerScore = comparePickedImages(0);
  else if (playerPick === 'paper' && opponentPick === 'scissors')
    opponentScore = comparePickedImages(1);
  else if (playerPick === 'scissors' && opponentPick === 'rock')
    opponentScore = comparePickedImages(1);
  else if (playerPick === 'scissors' && opponentPick === 'paper')
    playerScore = comparePickedImages(0);

  // 4. ANNOUNCE THE WINNER
  if (opponentScore === 3 || playerScore === 3) {
    finalResult.classList.remove('hidden');
    fields.classList.add('hidden');
    document.querySelector('.outcome').textContent =
      opponentScore === 3 ? 'You lose...' : 'You win!';
  }
});
