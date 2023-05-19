import './style.css';
import '../modules/api.js';
import '../modules/localStroge.js';
import Leaderboard from '../modules/leaderboard.js';

const leaderboard = new Leaderboard();
const submitBtn = document.querySelector('.add');

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
    await leaderboard.addNewScores(body);
    nameInput.value = '';
    scoreInput.value = '';
  }
});

const scoreList = document.querySelector('.display-scores');

const display = async () => {
  const scores = await leaderboard.getScores();
  scoreList.innerHTML = scores.result.reduce((output, score) => (
    `${output
    }
    <p>${score.user}: ${score.score}</p>
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
