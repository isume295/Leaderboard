import API from './api.js';
import LocalStorage from './localStroge.js';

const api = new API();
class LeaderBoard {
  constructor() {
    this.LocalStorage = new LocalStorage();
    this.idGame = this.LocalStorage.getItem('id');
  }

  async getScores() {
    const fetchScores = api.getScore(await this.idGame);
    return fetchScores;
  }

  async addNewScores(body) {
    const submitScore = api.createScore(await this.idGame, body);
    return submitScore;
  }
}
export default LeaderBoard;