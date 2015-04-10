import AbstractApi from './abstract_api';

const BASE_URL    = "https://app-v1.winearound.com";
const APP_NAME    = "test";
const APP_VERSION = "1";

class Api extends AbstractApi {
  constructor() {
    super(BASE_URL);
  }

  defaultHeaders() {
    return Object.assign(
      super.defaultHeaders(),
      {
        'Accept-Language': 'it' // FIXME: choose lang
      }
    );
  }
};

export default new Api();
