import './style.css';
import '../modules/api.js';
import '../modules/localStroge.js';
import Leaderboard from '../modules/leaderboard.js';

const leaderboard = new Leaderboard();
const submitBtn = document.querySelector('.add');
const notify = document.querySelector('.notify-user');
const message = document.querySelector('.message');

const nameInput = document.querySelector('.user');
const scoreInput = document.querySelector('.score');
submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const user = nameInput.value;
  const score = scoreInput.value;
  const body = {
    user,
    score,
  };
  if (user && score) {
    const result = await leaderboard.addNewScores(body);
    nameInput.value = '';
    scoreInput.value = '';
    const textNode = document.createTextNode(result.result);
    message.appendChild(textNode);
    notify.classList.add('success');

    setTimeout(() => {
      message.innerHTML = '';
      notify.classList.remove('success');
    }, 2000);
  } else {
    const result = await leaderboard.addNewScores();
    const textNode = document.createTextNode(result.message);
    message.appendChild(textNode);
    notify.classList.add('error');

    setTimeout(() => {
      message.innerHTML = '';
      notify.classList.remove('error');
    }, 2000);
  }
});

const scoreList = document.querySelector('.display-scores');

const display = async () => {
  const scores = await leaderboard.getScores();
  scoreList.innerHTML = scores.result.reduce((output, score, i) => (
    `${output
    }
    <p class ="score-${i % 2 === 0 ? 'odd' : ''} padding">${score.user}: ${score.score}</p>
    `
  ), '');
};

const refresh = document.querySelector('.refresh');
refresh.addEventListener('click', async () => {
  display();
});

window.onload = () => {
  display();
};
