import API from './api.js';

class LocalStorage {
  constructor() {
    this.localStorage = localStorage;
  }

  async getItem(key) {
    const data = this.localStorage.getItem(key);
    const idGame = data ? JSON.parse(data) : await new API().createGame();
    this.setItem('id', idGame);
    return idGame;
  }

  setItem = (key, value) => {
    this.localStorage.setItem(key, JSON.stringify(value));
  };
}
export default LocalStorage;