import AbstractApi from './abstract_api';
import storage from './storage';

const BASE_URL    = "https://artquest.ninja/api/v1";

class Api extends AbstractApi {
  constructor() {
    super(BASE_URL);
  }

  getPuzzles(params) {
    return this.get('/puzzles', params);
  }

  startPuzzle(puzzleId) {
    return this.put('/start', {
      puzzleId: puzzleId
    });
  }

  defaultHeaders() {
    return Object.assign(
      super.defaultHeaders(),
      {
        'Accept-Language': 'en', // FIXME: choose lang
        'X-Auth-Token': storage.userId()
      }
    );
  }
};

export default new Api();
