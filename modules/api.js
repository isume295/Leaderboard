class API {
  baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

  constructor() {
    this.url = this.baseURL;
  }

  fetchData = async (url, method, body) => {
    const settingRequest = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let request;
    if (method === 'GET') {
      request = new Request(url, settingRequest);
    } else if (method === 'POST') {
      settingRequest.body = JSON.stringify(body);
      request = new Request(url, settingRequest);
    }
    if (!request) throw new Error('invalid');
    const response = await fetch(request);
    const responseJson = await response.json();
    return responseJson;
  };

  createGame = async () => {
    const endPoint = 'games/';
    const url = this.url + endPoint;
    const body = {
      name: 'my Game',
    };

    const responseJSON = await this.fetchData(url, 'POST', body);
    const gameID = responseJSON.result.split(' ')[3];
    return gameID;
  };

  createScore = async (id, body) => {
    const endPoint = `games/${id}/scores/`;
    const url = this.url + endPoint;
    const responseJSON = await this.fetchData(url, 'POST', body);
    return responseJSON;
  };

  getScore = async (id) => {
    const endPoint = `games/${id}/scores/`;
    const url = this.url + endPoint;
    const responseJSON = await this.fetchData(url, 'GET');
    return responseJSON;
  }
}

export default API;